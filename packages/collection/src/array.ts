import {useMethods} from '@huse/methods';

interface ArrayMethods<T> {
    push(item: T): void;
    unshift(item: T): void;
    pop(): void;
    shift(): void;
    slice(start?: number, end?: number): void;
    splice(index: number, deleteCount: number, ...insertions: T[]): void;
    remove(item: T): void;
    removeAt(index: number): void;
    insertAt(index: number, item: T): void;
    concat(item: T | T[]): void;
    replace(from: T, to: T): void;
    replaceAll(from: T, to: T): void;
    replaceAt(index: number, item: T): void;
    filter(predicate: (item: T, index: number) => boolean): void;
    union(array: T[]): void;
    intersect(array: T[]): void;
    difference(array: T[]): void;
    reverse(): void;
    sort(compare?: (x: T, y: T) => number): void;
    clear(): void;
}

const methods = {
    push<T>(state: T[], item: T) {
        state.push(item);
    },
    unshift<T>(state: T[], item: T) {
        state.unshift(item);
    },
    pop<T>(state: T[]) {
        if (state.length !== 0) {
            state.splice(state.length - 1, 1);
        }
    },
    shift<T>(state: T[]) {
        if (state.length !== 0) {
            state.splice(0, 1);
        }
    },
    slice<T>(state: T[], start?: number, end?: number) {
        return state.slice(start, end);
    },
    splice<T>(state: T[], index: number, deleteCount: number, ...insertions: T[]) {
        state.splice(index, deleteCount, ...insertions);
    },
    remove<T>(state: T[], item: T) {
        return state.filter(v => v !== item);
    },
    removeAt<T>(state: T[], index: number) {
        state.splice(index, 1);
    },
    insertAt<T>(state: T[], index: number, item: T) {
        state.splice(index, 0, item);
    },
    concat<T>(state: T[], item: T | T[]) {
        return state.concat(item);
    },
    replace<T>(state: T[], from: T, to: T) {
        const index = state.indexOf(from);
        if (index >= 0) {
            state.splice(index, 1, to);
        }
    },
    replaceAll<T>(state: T[], from: T, to: T) {
        const has = state.includes(from);
        return has ? state.map(v => (v === from ? to : v)) : state;
    },
    replaceAt<T>(state: T[], index: number, item: T) {
        state.splice(index, 1, item);
    },
    filter<T>(state: T[], predicate: (item: T, index: number) => boolean) {
        return state.filter(predicate);
    },
    union<T>(state: T[], array: T[]) {
        return [...new Set([...state, ...array])];
    },
    intersect<T>(state: T[], array: T[]) {
        const coming = new Set(array);
        return [...new Set(state.filter(v => coming.has(v)))];
    },
    difference<T>(state: T[], array: T[]) {
        const coming = new Set(array);
        return state.filter(v => !coming.has(v));
    },
    reverse<T>(state: T[]) {
        return state.slice().reverse();
    },
    sort<T>(state: T[], compare?: (x: T, y: T) => number) {
        return state.slice().sort(compare);
    },
    clear() {
        return [];
    },
};

export default function useArray<T>(initialValue: T[] = []) {
    return useMethods<T[], ArrayMethods<T>>(methods, initialValue);
}
