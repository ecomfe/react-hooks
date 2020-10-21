import {useRef} from 'react';
import {useImmer} from 'use-immer';
import {ImmerReducers, Methods} from './interface';

// TODO: There are some type casts here to resolve this issue: https://github.com/immerjs/immer/issues/689

type Updater<S> = (update: (current: S) => void | S) => void;

export type MethodsHook<S, R extends ImmerReducers<S>> = [S, Methods<S, R>, Updater<S>];

export function useMethodsExtension<S, R extends ImmerReducers<S>>(
    reducers: R,
    setState: Updater<S>
): Methods<S, R> {
    const methodsRef = useRef<Methods<S, R> | undefined>(undefined);

    if (!methodsRef.current) {
        methodsRef.current = Object.keys(reducers).reduce(
            (methods, key) => {
                const fn = reducers[key];
                const bound = (...args: any[]) => setState(s => fn(s as any, ...args));
                Object.assign(methods, {[key]: bound});
                return methods;
            },
            {} as Methods<S, R>
        );
    }

    return methodsRef.current;
}

export function useMethods<S, R extends ImmerReducers<S>>(reducers: R, initialState: S | (() => S)): MethodsHook<S, R> {
    const [state, setState] = useImmer(initialState);
    const boundMethods = useMethodsExtension(reducers, setState as Updater<S>);
    return [state, boundMethods, setState as Updater<S>];
}
