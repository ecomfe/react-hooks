import {useMethods} from '@huse/methods';

const createMethods = <T>() => {
    return {
        push(state: T[], item: T) {
            state.push(item);
        },
        unshift(state: T[], item: T) {
            state.unshift(item);
        },
        pop(state: T[]) {
            if (state.length !== 0) {
                state.splice(state.length - 1, 1);
            }
        },
        shift(state: T[]) {
            if (state.length !== 0) {
                state.splice(0, 1);
            }
        },
        slice(state: T[], start?: number, end?: number) {
            return state.slice(start, end);
        },
        splice(state: T[], index: number, deleteCount: number, ...insertions: T[]) {
            state.splice(index, deleteCount, ...insertions);
        },
        remove(state: T[], item: T) {
            return state.filter(v => v !== item);
        },
        removeAt(state: T[], index: number) {
            state.splice(index, 1);
        },
        insertAt(state: T[], index: number, item: T) {
            state.splice(index, 0, item);
        },
        concat(state: T[], item: T | T[]) {
            return state.concat(item);
        },
        replace(state: T[], from: T, to: T) {
            const index = state.indexOf(from);
            if (index >= 0) {
                state.splice(index, 1, to);
            }
        },
        replaceAll(state: T[], from: T, to: T) {
            const has = state.includes(from);
            return has ? state.map(v => (v === from ? to : v)) : state;
        },
        replaceAt(state: T[], index: number, item: T) {
            state.splice(index, 1, item);
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
};

export default function useArray<T>(initialValue: T[] = []) {
    return useMethods(createMethods<T>(), initialValue);
}
