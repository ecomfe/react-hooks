import {useMethodsNative} from '@huse/methods';

function createMethods<T>() {
    return {
        push(state: T[], item: T) {
            return [...state, item];
        },
        unshift(state: T[], item: T) {
            return [item, ...state];
        },
        pop(state: T[]) {
            if (!state.length) {
                return state;
            }

            return state.slice(0, -1);
        },
        shift(state: T[]) {
            if (!state.length) {
                return state;
            }

            return state.slice(1);
        },
        slice(state: T[], start?: number, end?: number) {
            return state.slice(start, end);
        },
        splice(state: T[], index: number, deleteCount: number, ...insertions: T[]) {
            return [
                ...state.slice(0, index),
                ...insertions,
                ...state.slice(index + deleteCount),
            ];
        },
        remove(state: T[], item: T) {
            const next = state.filter(v => v !== item);
            return state.length === next.length ? state : next;
        },
        removeAt(state: T[], index: number) {
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1),
            ];
        },
        insertAt(state: T[], index: number, item: T) {
            return [
                ...state.slice(0, index),
                item,
                ...state.slice(index),
            ];
        },
        concat(state: T[], item: T | T[]) {
            return state.concat(item);
        },
        replace(state: T[], from: T, to: T) {
            const index = state.indexOf(from);
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    to,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        },
        replaceAll(state: T[], from: T, to: T) {
            const has = state.includes(from);
            return has ? state.map(v => (v === from ? to : v)) : state;
        },
        replaceAt(state: T[], index: number, item: T) {
            return [
                ...state.slice(0, index),
                item,
                ...state.slice(index + 1),
            ];
        },
        filter(state: T[], predicate: (item: T, index: number) => boolean) {
            return state.filter(predicate);
        },
        union(state: T[], array: T[]) {
            return [...new Set([...state, ...array])];
        },
        intersect(state: T[], array: T[]) {
            const coming = new Set(array);
            return [...new Set(state.filter(v => coming.has(v)))];
        },
        difference(state: T[], array: T[]) {
            const coming = new Set(array);
            return state.filter(v => !coming.has(v));
        },
        reverse(state: T[]) {
            return state.slice().reverse();
        },
        sort(state: T[], compare?: (x: T, y: T) => number) {
            return state.slice().sort(compare);
        },
        clear() {
            return [];
        },
    };
}

export default function useArray<T>(initialValue: T[] = []) {
    return useMethodsNative(createMethods<T>(), initialValue);
}
