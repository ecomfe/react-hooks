import {useMemo} from 'react';
import {useImmerState, SetImmerState} from '@huse/immer';

type Reducer<S, M> = (state: S, ...args: any[]) => S | void;

type Reducers<S, M> = {[K in keyof M]: Reducer<S, M>};

export function useMethodsExtension<S, M>(methods: Reducers<S, M>, setState: SetImmerState<S>): M {
    const boundMethods = useMemo(
        () => Object.keys(methods).reduce(
            (boundMethods, name) => {
                const fn = methods[name] as Reducer<S, M>;
                boundMethods[name] = (...args: any[]) => setState((state: S) => fn(state, ...args));
                return boundMethods;
            },
            {}
        ),
        [methods, setState]
    );
    return boundMethods as M;
}

export function useMethods<S, M>(methods: Reducers<S, M>, initialState: S | (() => S)): [S, M] {
    const [state, setState] = useImmerState(initialState);
    const boundMethods = useMethodsExtension(methods, setState);
    return [state, boundMethods];
}
