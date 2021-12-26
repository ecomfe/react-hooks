import {useState, useEffect, useMemo, useRef} from 'react';
import debounce from 'debounce';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
interface DebounceOption {
    immediate?: boolean;
}

/**
 * Wrapper `React.useEffect` with debounce ability
 * @param callback {Function} function that contains imperative,
 * will excute both in udpate and cleanup stage. Notice! this won't use it's return function like `useEffect`
 * @param dependency {Function} function to wrap
 * @param wait {Number} timeout in ms (`100`)
 * @param option.immediate {Boolean} whether to execute at the beginning (`false`)
 */
export function useDebouncedEffect<T>(
    callback: () => void | (() => void),
    dependency: T,
    wait: number,
    option: DebounceOption = {}
): void {
    const callbackRef = useRef(callback);
    const cleanUpRef = useRef(noop);
    const {immediate} = option;

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

            const cleanUp = tick => {
                clearTimeout(tick);
                cleanUpRef.current();
                cleanUpRef.current = noop;
            };

            if (immediate && cleanUpRef.current === noop) {
                trigger();
                cleanUpRef.current = trigger;

                const tick = setTimeout(() => (cleanUpRef.current = noop), wait);
                return () => cleanUp(tick);
            }
            else {
                const tick = setTimeout(trigger, wait);
                return () => cleanUp(tick);
            }
        },
        [dependency, wait, immediate]
    );
}

export function useDebouncedValue<T>(value: T, wait: number, option?: DebounceOption): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useDebouncedEffect(() => setDebouncedValue(value), value, wait, option);

    return wait > 0 ? debouncedValue : value;
}

/**
 * Create a debounced callback base on lib `debounce`
 * @param callback {Function} function to wrap
 * @param wait {Number} timeout in ms (`100`)
 * @param option.immediate {Boolean} whether to execute at the beginning (`false`)
 */
export function useDebouncedCallback<C extends (...args: any) => any>(
    callback: C,
    wait: number,
    option: DebounceOption = {}
): C {
    const {immediate} = option;
    const debouncedCallback = useMemo(
        () => (wait > 0 ? debounce(callback, wait, immediate) : callback),
        [callback, wait, immediate]
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
