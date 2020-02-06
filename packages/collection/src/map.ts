import {useMethods} from '@huse/methods';

interface MapMethods<K, V> {
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}

const clone = <K, V>(map: Map<K, V>) => new Map(map.entries());

const methods = {
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
    clear<K, V>() {
        return new Map<K, V>();
    },
};

export default function useMap<K, V>(initialValue: Iterable<[K, V]> = []) {
    return useMethods<Map<K, V>, MapMethods<K, V>>(methods, () => new Map(initialValue));
}

