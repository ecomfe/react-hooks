import {useCallback} from 'react';
import {QueryValue} from './query';
import {useUpdateQuery, UpdateQueryOptions} from './updateQuery';

export type QueryState<T extends QueryValue> = [T, (value: T) => void];

export function useQueryState<T extends {[K in keyof T]: QueryValue}, K extends keyof T>(
    query: T,
    key: K,
    options?: UpdateQueryOptions
): QueryState<T[K]> {
    const value = query[key];
    const updateQuery = useUpdateQuery(query, options);
    const setQuery = useCallback(
        (value: T[K]): void => {
            const patch = {[key]: value};
            updateQuery(patch as any);
        },
        [key, updateQuery]
    );
    return [value, setQuery];
}
