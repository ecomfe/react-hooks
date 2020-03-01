import {useArray} from '@huse/collection';
import {useActionPending} from '@huse/action-pending';
import {useState, useCallback, useEffect} from 'react';

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

export function useInfiniteScroll<T>(
    fetch: FetchDataSource<T>,
    options: InfiniteScrollOptions<T> = {}
): InfiniteScrollHook<T> {
    const {initialLoad = false, initialItems = []} = options;
    const [dataSource, {concat}] = useArray<T>(initialItems);
    const [hasMore, setHasMore] = useState(true);
    const fetchNext = useCallback(
        async () => {
            const {hasMore, results} = await fetch({offset: dataSource.length});
            setHasMore(hasMore);
            concat(results);
        },
        [fetch, dataSource.length, concat]
    );
    const [loadMore, pending] = useActionPending(fetchNext);
    useEffect(
        () => {
            if (initialLoad && !dataSource.length && !pending) {
                loadMore();
            }
        },
        [initialLoad, dataSource.length, loadMore, pending]
    );

    return {
        dataSource,
        loadMore,
        hasMore,
        loading: !!pending,
    };
}
