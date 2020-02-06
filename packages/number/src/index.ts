import {useMethods} from '@huse/methods';

interface CounterMethods {
    increment(): void;
    decrement(): void;
    inc(): void;
    dec(): void;
    reset(value?: number): void;
}

const methods = {
    increment(state: number) {
        return state + 1;
    },
    decrement(state: number) {
        return state - 1;
    },
    inc(state: number) {
        return state + 1;
    },
    dec(state: number) {
        return state - 1;
    },
    reset(state: number, value: number = 0) {
        return value;
    },
};

export function useCounter(initialValue: number = 0) {
    return useMethods<number, CounterMethods>(methods, initialValue);
}
