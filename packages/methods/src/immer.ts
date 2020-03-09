import {useRef} from 'react';
import {useImmerState, SetImmerState} from '@huse/immer';
import {ImmerReducers, Methods} from './interface';

export type MethodsHook<S, R extends ImmerReducers<S>> = [S, Methods<S, R>, SetImmerState<S>];

export function useMethodsExtension<S, R extends ImmerReducers<S>>(
    reducers: R,
    setState: SetImmerState<S>
): Methods<S, R> {
    const methodsRef = useRef<Methods<S, R> | undefined>(undefined);

    if (!methodsRef.current) {
        methodsRef.current = Object.keys(reducers).reduce(
            (methods, key) => {
                const fn = reducers[key];
                const bound = (...args: any[]) => setState(s => fn(s, ...args));
                Object.assign(methods, {[key]: bound});
                return methods;
            },
            {} as Methods<S, R>
        );
    }

    return methodsRef.current;
}

export function useMethods<S, R extends ImmerReducers<S>>(reducers: R, initialState: S | (() => S)): MethodsHook<S, R> {
    const [state, setState] = useImmerState(initialState);
    const boundMethods = useMethodsExtension(reducers, setState);
    return [state, boundMethods, setState];
}
