import {useEffect, useRef} from 'react';

export function useTimeout(callback: (() => void) | undefined, time: number): void {
    const fn = useRef(callback);
    fn.current = callback;
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
    fn.current = callback;
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
    fn.current = callback;
    useEffect(
        () => {
            if (time < 0) {
                return;
            }

            // To get rid of type checking on Node's `setTimeout` function
            let tick: any = null;
            const trigger = () => {
                const next = () => {
                    tick = setTimeout(trigger, time);
                };

                if (!fn.current) {
                    next();
                    return;
                }

                const reutrnValue = fn.current();
                if (typeof reutrnValue?.then === 'function') {
                    reutrnValue.then(next);
                }
                else {
                    next();
                }
            };
            tick = setTimeout(trigger, time);
            return () => clearTimeout(tick);
        },
        [time]
    );
}
