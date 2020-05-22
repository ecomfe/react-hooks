import {useLocation} from 'react-router-dom';
import {useMemo, useCallback, useRef} from 'react';
import {useNavigate, NavigateOptions} from './navigate';

export interface SearchQuery {
    [key: string]: string | string[];
}

export interface SearchParamsPatch {
    [key: string]: string | number | string[] | number[] | undefined | null;
}

export type UpdateSearchParams = <S>(patch: SearchParamsPatch, options?: NavigateOptions<S>) => void;

export type SearchParamsHook = [URLSearchParams, UpdateSearchParams];

export function useSearchParams(defaults?: SearchQuery): SearchParamsHook {
    const defaultsRef = useRef(defaults);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useMemo(
        () => {
            const params = new URLSearchParams(location.search);
            const defaults = defaultsRef.current;

            if (defaults) {
                const defaultEntries = Object.entries(defaults).filter(([key]) => !params.has(key));
                for (const [key, value] of defaultEntries) {
                    ([] as string[]).concat(value).forEach(v => params.append(key, v));
                }
            }

            return params;
        },
        [location.search]
    );
    const update = useCallback<UpdateSearchParams>(
        (patch, navigateOptions): void => {
            const params = new URLSearchParams(location.search);
            for (const [key, value] of Object.entries(patch)) {
                if (value == null) {
                    params.delete(key);
                }
                else if (Array.isArray(value)) {
                    params.delete(key);
                    value.forEach((v: number | string) => params.append(key, String(v)));
                }
                else {
                    params.set(key, String(value));
                }
            }

            const newLocation = {
                ...location,
                search: params.toString(),
            };
            navigate(newLocation, navigateOptions);
        },
        [location, navigate]
    );

    return [params, update];
}

export function useSearchParam(key: string): string | null {
    const [params] = useSearchParams();
    return params.get(key);
}

export function useSearchParamAll(key: string): string[] {
    const [params] = useSearchParams();
    return params.getAll(key);
}

export function useUpdateSearchParams(): UpdateSearchParams {
    const hook = useSearchParams();
    return hook[1];
}

export type SearchParamStateHook = [string | null, (value: string) => void];

export function useSearchParamState(key: string, options: NavigateOptions = {}): SearchParamStateHook {
    const value = useSearchParam(key);
    const update = useUpdateSearchParams();
    const setValue = useCallback(
        (value: string) => update({[key]: value}, {replace: options.replace}),
        [key, options.replace, update]
    );

    return [value, setValue];
}
