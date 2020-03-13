import {useState, useEffect, useMemo, useRef} from 'react';
import debounce from 'debounce';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useDebouncedEffect<T>(callback: () => void | (() => void), value: T, wait: number): void {
    const callbackRef = useRef(callback);
    const cleanUpRef = useRef(noop);
    useEffect(
        () => {
            callbackRef.current = callback;
        },
        [callback]
    );
    useEffect(
        () => {
            if (wait <= 0) {
                return;
            }

            cleanUpRef.current();
            cleanUpRef.current = noop;

            const callback = callbackRef.current;
            const trigger = () => {
                const cleanUp = callback();

                if (typeof cleanUp === 'function') {
                    cleanUpRef.current = cleanUp;
                }
                else if (cleanUp !== undefined) {
                    // eslint-disable-next-line no-console
                    console.warn('useDebouncedEffect callback should return undefined or a clean-up function');
                }
            };
            const tick = setTimeout(trigger, wait);
            return () => {
                clearTimeout(tick);
                cleanUpRef.current();
                cleanUpRef.current = noop;
            };
        },
        [value, wait]
    );
}

export function useDebouncedValue<T>(value: T, wait: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useDebouncedEffect(() => setDebouncedValue(value), value, wait);

    return wait > 0 ? debouncedValue : value;
}

interface DebouncedFunction {
    clear(): void;
}

export function useDebouncedCallback<C extends Function>(callback: C, wait: number): C {
    const debouncedCallback = useMemo(
        () => (wait > 0 ? debounce(callback, wait) : callback),
        [callback, wait]
    );
    useEffect(
        () => {
            return () => {
                const callback = debouncedCallback as any;
                callback.clear && callback.clear();
            };
        },
        [debouncedCallback]
    );

    return debouncedCallback;
}
