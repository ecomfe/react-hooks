import {useCallback, useEffect} from 'react';
import {useMethods} from '@huse/methods';

export interface FetchRequest {
    offset: number;
}

export interface FetchResponse<T> {
    hasMore: boolean;
    results: T[];
}

export type FetchDataSource<T> = (request: FetchRequest) => Promise<FetchResponse<T>>;

export interface InfiniteScrollOptions<T> {
    initialItems?: T[];
    initialLoad?: boolean;
}

export interface InfiniteScrollHook<T> {
    hasMore: boolean;
    loading: boolean;
    dataSource: T[];
    loadMore(): void;
}

interface Context<T> {
    pendingCount: number;
    dataSource: T[];
    hasMore: boolean;
}

const createContextReducers = <T>() => {
    return {
        requestStart(state: Context<T>) {
            state.pendingCount++;
        },
        requestEnd(state: Context<T>, response: FetchResponse<T>) {
            state.pendingCount--;
            state.dataSource.push(...response.results);
            state.hasMore = response.hasMore;
        },
    };
};

export function useInfiniteScroll<T>(
    fetch: FetchDataSource<T>,
    options: InfiniteScrollOptions<T> = {}
): InfiniteScrollHook<T> {
    const {initialLoad = false, initialItems = []} = options;
    const [{pendingCount, dataSource, hasMore}, {requestStart, requestEnd}] = useMethods(
        createContextReducers<T>(),
        {pendingCount: 0, dataSource: initialItems, hasMore: true}
    );
    const loadMore = useCallback(
        async () => {
            requestStart();
            const response = await fetch({offset: dataSource.length});
            requestEnd(response);
        },
        [requestStart, fetch, dataSource.length, requestEnd]
    );
    useEffect(
        () => {
            if (initialLoad && !dataSource.length && !pendingCount) {
                loadMore();
            }
        },
        [initialLoad, dataSource.length, loadMore, pendingCount]
    );

    return {
        dataSource,
        loadMore,
        hasMore,
        loading: !!pendingCount,
    };
}
