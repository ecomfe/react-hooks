import {useEffect, useRef} from 'react';

export function useTimeout(callback: (() => void) | undefined, time: number): void {
    const fn = useRef(callback);
    useEffect(
        () => {
            fn.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            if (time < 0) {
                return;
            }

            const trigger = () => fn.current && fn.current();
            const tick = setTimeout(trigger, time);
            return () => clearTimeout(tick);
        },
        [time]
    );
}

export function useInterval(callback: (() => void) | undefined, time: number): void {
    const fn = useRef(callback);
    useEffect(
        () => {
            fn.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            if (time < 0) {
                return;
            }

            const trigger = () => fn.current && fn.current();
            const tick = setInterval(trigger, time);
            return () => clearTimeout(tick);
        },
        [time]
    );
}

export function useStableInterval(callback: (() => any) | undefined, time: number): void {
    const fn = useRef(callback);
    useEffect(
        () => {
            fn.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            if (time < 0) {
                return;
            }

            // To get rid of type checking on Node's `setTimeout` function
            let tick: any = null;
            let running = true;
            const trigger = () => {
                const next = () => {
                    // It is possible that when `clearTimeout` is happening an async callback is in pending state,
                    // then when this callback resolves it will continue to start a new timer,
                    // therefore we need a `running` flag to indicate whether a future timer is able to start.
                    if (running) {
                        tick = setTimeout(trigger, time);
                    }
                };

                if (!fn.current) {
                    next();
                    return;
                }

                const reutrnValue = fn.current();
                if (typeof reutrnValue?.then === 'function') {
                    reutrnValue.then(next, next);
                }
                else {
                    next();
                }
            };
            tick = setTimeout(trigger, time);

            return () => {
                running = false;
                clearTimeout(tick);
            };
        },
        [time]
    );
}
