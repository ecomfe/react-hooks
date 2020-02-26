import {useState, useEffect, useMemo} from 'react';
import debounce from 'debounce';

export function useDebouncedValue<T>(value: T, wait: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const tick = setTimeout(() => setDebouncedValue(value), wait);
            return () => clearTimeout(tick);
        },
        [value, wait]
    );

    return debouncedValue;
}

export function useDebouncedCallback<C extends Function>(callback: C, wait: number): C {
    const debouncedCallback = useMemo(
        () => debounce(callback, wait),
        [callback, wait]
    );
    useEffect(
        () => {
            return () => debouncedCallback.clear();
        },
        [debouncedCallback]
    );

    return debouncedCallback;
}
