import {useMethodsNative} from '@huse/methods';

const clone = <K, V>(map: Map<K, V>) => new Map(map.entries());

function createReducers<K, V>() {
    return {
        set(state: Map<K, V>, key: K, value: V) {
            return clone(state).set(key, value);
        },
        setAll(state: Map<K, V>, entries: Iterable<[K, V]>) {
            const output = clone(state);
            for (const [key, value] of entries) {
                output.set(key, value);
            }
            return output;
        },
        delete(state: Map<K, V>, key: K) {
            if (state.has(key)) {
                const output = clone(state);
                output.delete(key);
                return output;
            }

            return state;
        },
        deleteAll(state: Map<K, V>, keys: Iterable<K>) {
            const output = clone(state);
            for (const key of keys) {
                output.delete(key);
            }
            return output;
        },
        clear() {
            return new Map<K, V>();
        },
    };
}

export default function useMap<K, V>(initialValue: Iterable<[K, V]> = []) {
    return useMethodsNative(createReducers<K, V>(), () => new Map(initialValue));
}

