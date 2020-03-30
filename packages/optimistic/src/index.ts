import {useReducer, useCallback, Reducer, useRef, useEffect} from 'react';
import {OptimisticState, NextState, SetState, Factory, ReduceHint, AsyncWorkFlow} from './interface';
import {initialize, consumeOptimistic, consumeReduce} from './manager';

function reduceInvert<T>(state: T, reduce: NextState<T>): T {
    return reduce(state);
}

type InvertReducer<T> = Reducer<OptimisticState<T>, NextState<OptimisticState<T>>>;

export function useOptimisticFactory<S, P, R = S>(factory: Factory<S, P, R>, initial: S): [S, (paylod: P) => void] {
    const [state, execute] = useReducer<InvertReducer<S>>(reduceInvert, initialize(initial));
    const factoryRef = useRef(factory);
    useEffect(
        () => {
            factoryRef.current = factory;
        },
        [factory]
    );
    const dispatch = useCallback(
        (payload: P): void => {
            const reduce = factoryRef.current(payload);

            if (typeof reduce === 'function') {
                consumeReduce(execute, reduce);
                return;
            }

            const [reduceAsync, reduceOptimistic] = reduce;
            consumeOptimistic(execute, reduceAsync, reduceOptimistic);
        },
        []
    );
    return [state.hostState, dispatch];
}

function identity<T>(input: T): T {
    return input;
}

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
    return value && typeof (value as any).then === 'function';
}

function isReducer<T>(input: T | NextState<T>): input is NextState<T> {
    return typeof input === 'function';
}

function wrapToReduce<T>(input: T | NextState<T>): NextState<T> {
    return isReducer(input) ? input : () => input;
}

type StateLike<T> = T | NextState<T>;

type StateReduceHint<T> = ReduceHint<T, StateLike<T>>;

export function useOptimisticState<S>(initialState: S): [S, SetState<S>] {
    const [state, dispatch] = useOptimisticFactory<S, StateReduceHint<S>, StateLike<S>>(identity, initialState);
    const setState = useCallback<SetState<S>>(
        (x: StateLike<S> | Promise<S> | Promise<NextState<S>>, y?: StateLike<S>) => {
            if (!isPromise(x)) {
                dispatch(wrapToReduce(x));
                return;
            }

            const run: AsyncWorkFlow<S, StateLike<S>> = function* run() {
                const result = yield x;
                const next = wrapToReduce(result);
                yield next;
            };
            const hint: StateReduceHint<S> = [run, wrapToReduce(y as StateLike<S>)];
            dispatch(hint);
        },
        [dispatch]
    );
    return [state, setState];
}

export function useOptimisticTask<S, A>(task: (arg: A) => Promise<S>, optimisticTask: (arg: A) => S, initialState: S) {
    const [state, setState] = useOptimisticState<S>(initialState);
    const run = useCallback(
        (arg: A) => {
            const promise = task(arg);
            const optimistic = optimisticTask(arg);
            setState(promise, optimistic);
        },
        [setState, task, optimisticTask]
    );
    return [state, run];
}

export {
    Factory as OptimisticFactory,
    SetState as OptimisticSetState,
};
