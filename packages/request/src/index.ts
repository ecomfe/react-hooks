import {useEffect, useCallback, useRef} from 'react';
import {useForceUpdate} from '@huse/update';
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
    pendingCount?: number;
    data?: O;
    error?: E;
    nextData?: O;
    nextError?: E;
    accept(): void;
}

const builtInStrategies: {[K in ResponseStrategy]: QueryStrategy} = {
    acceptLatest: createStrategy(acceptLatest),
    keepEarliest: createStrategy(keepEarliest),
    keepEarliestSuccess: createStrategy(keepEarliestSuccess),
    waitAccept: createStrategy(waitAccept),
};

export function useRequestCallback<K, O = void, E = Error>(
    task: Request<K, O>,
    params: K,
    options?: RequestOptions
): [() => void, RequestResult<O, E>] {
    const {strategy = 'acceptLatest', idempotent = false} = options || {};

    if (!builtInStrategies.hasOwnProperty(strategy)) {
        throw new Error(`Strategy named ${strategy} is not supported in useRequest`);
    }

    const implement = builtInStrategies[strategy];
    const querySets = useRef(new WeakMap<typeof task, QuerySet<K, O, E>>());
    const forceUpdate = useForceUpdate();
    const fetch = useCallback(
        (key: K) => {
            const querySet = querySets.current.get(task) as QuerySet<K, O, E>;
            querySets.current.set(task, implement.fetch(querySet, key));
            forceUpdate();
        },
        [forceUpdate, implement, task]
    );
    const receive = useCallback(
        (key: K, data: O) => {
            const querySet = querySets.current.get(task) as QuerySet<K, O, E>;
            querySets.current.set(task, implement.receive(querySet, key, data));
            forceUpdate();
        },
        [forceUpdate, implement, task]
    );
    const error = useCallback(
        (key: K, error: E) => {
            const querySet = querySets.current.get(task) as QuerySet<K, O, E>;
            querySets.current.set(task, implement.error(querySet, key, error));
            forceUpdate();
        },
        [forceUpdate, implement, task]
    );
    const key = useOriginalDeepCopy(params);
    const querySet = querySets.current.get(task);
    const query = querySet && findQuery(querySet, key);
    const skipEffect = idempotent && !!query;
    const request = useCallback(
        () => {
            if (skipEffect) {
                return;
            }

            if (!querySets.current.has(task)) {
                querySets.current.set(task, implement.initialize());
            }

            fetch(key);

            task(key).then(
                data => receive(key, data),
                ex => error(key, ex)
            );
        },
        [error, fetch, implement, key, receive, skipEffect, task]
    );
    const acceptCurrentKey = useCallback(
        () => {
            const querySet = querySets.current.get(task) as QuerySet<K, O, E>;
            querySets.current.set(task, implement.accept(querySet, key));
            forceUpdate();
        },
        [forceUpdate, implement, key, task]
    );

    if (!query) {
        return [
            request,
            {
                accept: acceptCurrentKey,
                pending: false,
            },
        ];
    }

    return [
        request,
        {
            accept: acceptCurrentKey,
            pendingCount: query.pendingMutex,
            pending: query.pendingMutex > 0,
            data: query.response?.data ?? undefined,
            error: query.response?.error ?? undefined,
            nextData: query.nextResponse?.data ?? undefined,
            nextError: query.nextResponse?.error ?? undefined,
        },
    ];
}

export function useRequest<K, O = void, E = Error>(
    task: Request<K, O>,
    params: K,
    options?: RequestOptions
): RequestResult<O, E> {
    const [request, result] = useRequestCallback<K, O, E>(task, params, options);
    // Since `useRequestCallback` triggers request manually, its initial `pending` is `false`,
    // however in `useRequest` we need initial `pending` to be `true`.
    const resultFixedForEffect: RequestResult<O, E> = {
        ...result,
        pending: result.pendingCount === undefined ? true : result.pending,
    };
    useEffect(
        () => {
            request();
        },
        [request]
    );

    return resultFixedForEffect;
}
