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

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState(() => getStorage<T>(key, initialValue));
    const setStorageValue = useCallback(
        (value: T) => {
            // eslint-disable-next-line no-unused-expressions
            window?.localStorage?.setItem(key, JSON.stringify(value));
            setValue(value);
        },
        [key]
    );
    useEffect(
        () => {
            if (!window?.localStorage) {
                return;
            }

            const notify = (e: StorageEvent) => {
                if (e.key === key) {
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
