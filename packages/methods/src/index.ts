import {useRef} from 'react';
import {useImmerState, SetImmerState} from '@huse/immer';

export interface Reducers<S> {
    [key: string]: (state: S, ...args: any[]) => S | void;
}

type Strip<T> = T extends (state: any, ...args: infer P) => any ? (...args: P) => void : never;

export type Methods<S, R extends Reducers<S>> = {[K in keyof R]: Strip<R[K]>};

export type MethodsHook<S, R extends Reducers<S>> = [S, Methods<S, R>, SetImmerState<S>];

export function useMethodsExtension<S, R extends Reducers<S>>(reducers: R, setState: SetImmerState<S>): Methods<S, R> {
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

export function useMethods<S, R extends Reducers<S>>(reducers: R, initialState: S | (() => S)): MethodsHook<S, R> {
    const [state, setState] = useImmerState(initialState);
    const boundMethods = useMethodsExtension(reducers, setState);
    return [state, boundMethods, setState];
}
