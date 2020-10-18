import {useMethods} from '@huse/methods';

export interface CounterOptions {
    min?: number;
    max?: number;
    step?: number;
}

export function useCounter(initialValue: number = 0, options: CounterOptions = {}) {
    const {min = -Infinity, max = Infinity, step = 1} = options;
    return useMethods(
        {
            increment(state: number) {
                return Math.min(max, state + step);
            },
            decrement(state: number) {
                return Math.max(min, state - step);
            },
            inc(state: number) {
                return Math.min(max, state + step);
            },
            dec(state: number) {
                return Math.max(min, state - step);
            },
            reset(state: number, value: number = 0) {
                return value;
            },
        },
        initialValue
    );
}
