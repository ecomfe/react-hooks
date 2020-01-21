import {useMemo} from 'react';
import {useImmerState} from '@huse/immer';

export interface Methods<T> {
    [key: string]: (current: T, ...args: any[]) => T | void;
}

export type BoundMethods<M> = {[K in keyof M]: (...args: any[]) => void};

export type MethodsState<S, M> = [S, BoundMethods<M>];

export function useMethods<S = any, M = Methods<S>>(methods: M, initialState: S): MethodsState<S, M> {
    const [state, setState] = useImmerState(initialState);
    const boundMethods = useMemo(
        () => Object.keys(methods).reduce(
            (boundMethods, name) => {
                const fn = methods[name] as (state: S, ...args: any[]) => S | void;
                boundMethods[name] = (...args: any[]) => setState((state: S) => fn(state, ...args));
                return boundMethods;
            },
            {} as BoundMethods<M>
        ),
        [methods, setState]
    );
    return [state, boundMethods];
}
