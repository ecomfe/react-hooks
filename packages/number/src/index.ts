import {useMethods} from '@huse/methods';

const reducers = {
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
    return useMethods(reducers, initialValue);
}
