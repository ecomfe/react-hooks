import {useState, useEffect, useCallback} from 'react';

function getStorage<T>(key: string, initialValue: T): T {
    if (!window?.localStorage) {
        return initialValue;
    }

    try {
        const stringValue = window.localStorage.getItem(key);
        return stringValue ? JSON.parse(stringValue) : initialValue;
    }
    catch {
        return initialValue;
    }
}

const isFunction = (value: unknown): value is (...args: any) => any =>
    typeof value === 'function';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState(() => getStorage<T>(key, initialValue));
    const setStorageValue = useCallback(
        (newValue: T | ((prevValue?: T) => T)) => {
            const currentValue = isFunction(newValue) ? newValue(value) : newValue;
            // eslint-disable-next-line no-unused-expressions
            window?.localStorage?.setItem(key, JSON.stringify(currentValue));
            setValue(currentValue);
        },
        [key, value]
    );
    useEffect(
        () => {
            if (!window?.localStorage) {
                return;
            }

            const notify = (e: StorageEvent) => {
                if (e.storageArea === localStorage && e.key === key) {
                    try {
                        setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
                    }
                    catch {
                        setValue(initialValue);
                    }
                }
            };
            window.addEventListener('storage', notify);
            return () => {
                window.removeEventListener('storage', notify);
            };
        },
        [initialValue, key]
    );

    return [value, setStorageValue];
}
