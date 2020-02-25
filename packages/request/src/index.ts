import {useEffect, useReducer, useCallback} from 'react';
import {useOriginalDeepCopy} from '@huse/previous-value';
import {
    QueryStrategy,
    QuerySet,
    acceptLatest,
    createStrategy,
    keepEarliest,
    keepEarliestSuccess,
    waitAccept,
    findQuery,
} from 'query-shape';

export type ResponseStrategy = 'acceptLatest' | 'keepEarliest' | 'keepEarliestSuccess' | 'waitAccept';

export type Request<K, O> = (key: K) => Promise<O>;

export interface RequestOptions {
    strategy?: ResponseStrategy;
    idempotent?: boolean;
}

export interface RequestResult<O = void, E = Error> {
    pending: boolean;
    accept: () => void;
    pendingCount?: number;
    data?: O;
    error?: E;
    nextData?: O;
    nextError?: E;
}

type Action<K, O, E> = {type: 'fetch', payload: K}
    | {type: 'receive', payload: {key: K, data: O}}
    | {type: 'error', payload: {key: K, error: E}}
    | {type: 'accept', payload: K};

const builtInStrategies: {[K in ResponseStrategy]: QueryStrategy} = {
    acceptLatest: createStrategy(acceptLatest),
    keepEarliest: createStrategy(keepEarliest),
    keepEarliestSuccess: createStrategy(keepEarliestSuccess),
    waitAccept: createStrategy(waitAccept),
};

export function useRequest<K, O, E>(task: Request<K, O>, params: K, options?: RequestOptions): RequestResult<O, E> {
    const {strategy = 'acceptLatest', idempotent = false} = options || {};

    if (!builtInStrategies.hasOwnProperty(strategy)) {
        throw new Error(`Strategy named ${strategy} is not supported in useRequest`);
    }

    const {initialize, fetch, receive, error, accept} = builtInStrategies[strategy];
    const [querySet, dispatch] = useReducer(
        (state: QuerySet<K, O, E>, action: Action<K, O, E>) => {
            switch (action.type) {
                case 'fetch':
                    return fetch(state, action.payload);
                case 'receive':
                    return receive(state, action.payload.key, action.payload.data);
                case 'error':
                    return error(state, action.payload.key, action.payload.error);
                case 'accept':
                    return accept(state, action.payload);
                /* istanbul ignore next */
                default:
                    return state;
            }
        },
        null,
        initialize
    );
    const key = useOriginalDeepCopy(params);
    const previousQuery = findQuery(querySet, key);
    const skipEffect = idempotent && previousQuery;
    useEffect(
        () => {
            if (skipEffect) {
                return;
            }
            dispatch({type: 'fetch', payload: key});

            task(key).then(
                data => dispatch({type: 'receive', payload: {key, data}}),
                error => dispatch({type: 'error', payload: {key, error}})
            );
        },
        [key, skipEffect, task]
    );
    const query = findQuery(querySet, key);
    const acceptCurrentKey = useCallback(
        () => dispatch({type: 'accept', payload: key}),
        [key]
    );

    if (!query) {
        return {
            accept: acceptCurrentKey,
            pending: true,
        };
    }

    return {
        accept: acceptCurrentKey,
        pendingCount: query.pendingMutex,
        pending: query.pendingMutex > 0,
        data: query.response?.data ?? undefined,
        error: query.response?.error ?? undefined,
        nextData: query.nextResponse?.data ?? undefined,
        nextError: query.nextResponse?.error ?? undefined,
    };
}
