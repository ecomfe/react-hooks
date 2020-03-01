import {useState, useEffect, useMemo} from 'react';
import debounce from 'debounce';

export function useDebouncedValue<T>(value: T, wait: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            if (wait <= 0) {
                return;
            }

            const tick = setTimeout(() => setDebouncedValue(value), wait);
            return () => clearTimeout(tick);
        },
        [value, wait]
    );

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
