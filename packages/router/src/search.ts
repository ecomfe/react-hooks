import {useLocation} from 'react-router-dom';
import {useMemo, useCallback} from 'react';
import {useNavigate} from './navigate';

export function useSearchParams(): URLSearchParams {
    const location = useLocation();
    const params = useMemo(
        () => new URLSearchParams(location.search),
        [location.search]
    );

    return params;
}

export function useSearchParam(key: string): string | null {
    const params = useSearchParams();
    return params.get(key);
}

export function useSearchParamAll(key: string): string[] {
    const params = useSearchParams();
    return params.getAll(key);
}

export interface SearchParamsPatch {
    [key: string]: string | number | string[] | number[] | undefined | null;
}

export interface SearchQuery {
    [key: string]: string | string[];
}

export interface UpdateSearchParamsOptions {
    replace?: boolean;
    stringify?(query: SearchQuery): string;
}

export type UpdateSearchParams = <S>(patch: S) => void;

const stringifySearchParams = (params: URLSearchParams, stringify: UpdateSearchParamsOptions['stringify']): string => {
    if (!stringify) {
        return params.toString();
    }

    const query = [...params.keys()].reduce(
        (query, key) => {
            const values = params.getAll(key);
            query[key] = values.length > 1 ? values : values[0];
            return query;
        },
        {} as SearchQuery
    );
    return stringify(query);
};

export function useUpdateSearchParams(options: UpdateSearchParamsOptions = {replace: false}): UpdateSearchParams {
    // We are going to modify search params, therefore we cannot use a memoized object from `useSearchParams`.
    const location = useLocation();
    const navigate = useNavigate();
    const update = useCallback<UpdateSearchParams>(
        patch => {
            const params = new URLSearchParams(location.search);
            for (const [key, value] of Object.entries(patch)) {
                if (value === undefined) {
                    params.delete(key);
                }
                else if (Array.isArray(value)) {
                    params.delete(key);
                    value.forEach(v => params.append(key, v));
                }
                else {
                    params.set(key, value);
                }
            }

            const newSearch = stringifySearchParams(params, options.stringify);
            const newLocation = {
                ...location,
                search: newSearch,
            };
            navigate(newLocation, {replace: options.replace});
        },
        [location, navigate, options.replace, options.stringify]
    );

    return update;
}

export function useSearchParamState(
    key: string,
    options: UpdateSearchParamsOptions = {replace: false}
): [string | null, (value: string) => void] {
    const value = useSearchParam(key);
    const update = useUpdateSearchParams(options);
    const setValue = useCallback(
        (value: string) => update({[key]: value}),
        [key, update]
    );

    return [value, setValue];
}
