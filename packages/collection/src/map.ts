import {useState, useMemo, Dispatch, SetStateAction} from 'react';

export interface MapMethods<K, V> {
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}

export type MapHook<K, V> = [Map<K, V>, MapMethods<K, V>, Dispatch<SetStateAction<Map<K, V>>>];

const clone = <K, V>(map: Map<K, V>) => new Map(map.entries());

const reducers = {
    set<K, V>(state: Map<K, V>, key: K, value: V) {
        return clone(state).set(key, value);
    },
    setAll<K, V>(state: Map<K, V>, entries: Iterable<[K, V]>) {
        const output = clone(state);
        for (const [key, value] of entries) {
            output.set(key, value);
        }
        return output;
    },
    delete<K, V>(state: Map<K, V>, key: K) {
        if (state.has(key)) {
            const output = clone(state);
            output.delete(key);
            return output;
        }

        return state;
    },
    deleteAll<K, V>(state: Map<K, V>, keys: Iterable<K>) {
        const output = clone(state);
        for (const key of keys) {
            output.delete(key);
        }
        return output;
    },
};

export default function useMap<K, V>(initialValue: Iterable<[K, V]> = []): MapHook<K, V> {
    const [value, setValue] = useState(() => new Map(initialValue));
    const methods = useMemo(
        () => {
            return {
                set(key: K, value: V) {
                    setValue(state => reducers.set(state, key, value));
                },
                setAll(entries: Iterable<[K, V]>) {
                    setValue(state => reducers.setAll(state, entries));
                },
                delete(key: K) {
                    setValue(state => reducers.delete(state, key));
                },
                deleteAll(keys: Iterable<K>) {
                    setValue(state => reducers.deleteAll(state, keys));
                },
                clear() {
                    setValue(new Map<K, V>());
                },
            };
        },
        []
    );
    return [value, methods, setValue];
}

