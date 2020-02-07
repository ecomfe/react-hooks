import {useMemo} from 'react';
import {useLocation} from 'react-router';
import {parse, ParseOptions} from 'query-string';

export type QueryValue = string | boolean | number | string[] | boolean[] | number[] | null | undefined;

export function useQuery<T extends {[K in keyof T]: QueryValue}>(options?: ParseOptions): T {
    const {search} = useLocation();
    const query = useMemo(
        () => parse(search, options),
        [search, options]
    );
    return query as T;
}
