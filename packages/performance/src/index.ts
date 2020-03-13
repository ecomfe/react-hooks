import {useRef, useEffect} from 'react';

interface Timings {
    [flag: string]: number;
    initialRender: number;
    initialLayout: number;
}

export interface TimingOptions {
    flags?: {[name: string]: boolean};
}

export function usePerformanceTiming(callback: (timings: Timings) => void, options: TimingOptions = {}): void {
    const {flags = {}} = options;
    const timings = useRef<Timings>({initialRender: performance.now(), initialLayout: 0});
    const notify = useRef(callback);
    useEffect(
        () => {
            notify.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            timings.current.initialLayout = performance.now();
            // Users may send a `setState` as callback, in order to trigger an update, clone it.
            notify.current({...timings.current});
        },
        []
    );
    useEffect(
        () => {
            const newTimings = Object.entries(flags).filter(([name, triggered]) => triggered && !timings.current[name]);

            if (!newTimings.length) {
                return;
            }

            for (const [name] of newTimings) {
                timings.current[name] = performance.now();
            }

            notify.current({...timings.current});
        },
        [flags]
    );
}

interface TimeRange {
    start: number;
    end: number;
    ellapsed: number;
}

export function useLayoutTiming(callback: (timing: TimeRange) => void, meaningful: boolean = true): void {
    const renderStart = useRef(performance.now());
    const reported = useRef(false);
    const notify = useRef(callback);
    useEffect(
        () => {
            notify.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            if (reported.current || !meaningful) {
                return;
            }

            const now = performance.now();
            const range: TimeRange = {
                start: renderStart.current,
                end: now,
                ellapsed: now - renderStart.current,
            };
            notify.current(range);
        },
        [meaningful]
    );
}
