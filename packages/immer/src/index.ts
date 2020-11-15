import {useState, useReducer, Reducer, Dispatch, useCallback} from 'react';
import {produce} from 'immer';

/**
 * @deprecated Use official use-immer package
 */
export type ImmerReducer<S = any, A = any> = (state: S, action: A) => S | void;

/**
 * @deprecated Use official use-immer package
 */
export function useImmerReducer<S = any, A = any>(
    reducer: ImmerReducer<S, A>,
    initialState: S,
    initializer?: () => S
): [S, Dispatch<A>] {
    return useReducer<Reducer<S, A>>(
        (state, action) => {
            // @ts-ignore
            const newState = produce(state, draft => reducer(draft, action)) as S;
            return newState;
        },
        initialState,
        // @ts-ignore
        initializer
    );
}

/**
 * @deprecated Use official use-immer package
 */
export type ImmerStateProducer<S> = (state: S) => S | void;

const isProducer = <S>(value: S | ImmerStateProducer<S>): value is ImmerStateProducer<S> => {
    return typeof value === 'function';
};

/**
 * @deprecated Use official use-immer package
 */
export type SetImmerState<S> = (next: S | ImmerStateProducer<S>) => void;

/**
 * @deprecated Use official use-immer package
 */
export type ImmerState<S> = [S, SetImmerState<S>];

/**
 * @deprecated Use official use-immer package
 */
export function useImmerState<S = any>(initialState: S | (() => S)): ImmerState<S> {
    const [state, setState] = useState(initialState);
    const produceState = useCallback(
        (next: S | ImmerStateProducer<S>) => {
            if (isProducer(next)) {
                // @ts-ignore
                return setState(state => produce(state, next));
            }
            return setState(next);
        },
        []
    );
    return [state, produceState];
}
