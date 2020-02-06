import {useMethods} from '@huse/methods';

interface SetMethods<T> {
    add(item: T): void;
    addAll(items: Iterable<T>): void;
    delete(item: T): void;
    deleteAll(items: Iterable<T>): void;
    clear(): void;
}

const clone = <T>(set: Set<T>) => new Set(set.values());

const methods = {
    add<T>(state: Set<T>, item: T) {
        if (state.has(item)) {
            return state;
        }

        return clone(state).add(item);
    },
    addAll<T>(state: Set<T>, items: Iterable<T>) {
        const output = clone(state);
        for (const item of items) {
            output.add(item);
        }
        return output;
    },
    delete<T>(state: Set<T>, item: T) {
        if (state.has(item)) {
            const output = clone(state);
            output.delete(item);
            return output;
        }

        return state;
    },
    deleteAll<T>(state: Set<T>, items: Iterable<T>) {
        const output = clone(state);
        for (const item of items) {
            output.delete(item);
        }
        return output;
    },
    clear<T>() {
        return new Set<T>();
    },
};

export default function useSet<T>(initialValue: Iterable<T> = []) {
    return useMethods<Set<T>, SetMethods<T>>(methods, () => new Set(initialValue));
}

