import {useState, useMemo, SetStateAction, Dispatch} from 'react';

export interface SetMethods<T> {
    add(item: T): void;
    addAll(items: Iterable<T>): void;
    delete(item: T): void;
    deleteAll(items: Iterable<T>): void;
    clear(): void;
}

export type SetHook<T> = [Set<T>, SetMethods<T>, Dispatch<SetStateAction<Set<T>>>];

const clone = <T>(set: Set<T>) => new Set(set.values());

const reducers = {
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
};

export default function useSet<T>(initialValue: Iterable<T> = []): SetHook<T> {
    const [value, setValue] = useState(() => new Set(initialValue));
    const methods = useMemo(
        () => {
            return {
                add(item: T) {
                    return setValue(state => reducers.add(state, item));
                },
                addAll(items: Iterable<T>) {
                    return setValue(state => reducers.addAll(state, items));
                },
                delete(item: T) {
                    return setValue(state => reducers.delete(state, item));
                },
                deleteAll(items: Iterable<T>) {
                    return setValue(state => reducers.deleteAll(state, items));
                },
                clear() {
                    setValue(new Set<T>());
                },
            };
        },
        []
    );
    return [value, methods, setValue];
}

