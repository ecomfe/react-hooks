import {useCallback} from 'react';
import {useHistory} from 'react-router';
import {stringify, StringifyOptions} from 'query-string';
import {QueryValue} from './query';

export interface UpdateQueryOptions extends StringifyOptions {
    replace?: boolean;
    filterEmpty?: boolean;
}

export type UpdateQuery<T extends {[K in keyof T]: QueryValue}> = (patch: Partial<T>) => void;

const filterUnwantedQueryValue = <T>(patch: T): Partial<T> => {
    const entries = Object.entries(patch);
    return entries.reduce(
        (output, [key, value]) => {
            if (value == null || value === '') {
                return output;
            }
            return {...output, [key]: value};
        },
        {}
    );
};

export function useUpdateQuery<T extends {[K in keyof T]: QueryValue}>(
    query: T,
    updateOptions: UpdateQueryOptions = {}
): UpdateQuery<T> {
    const history = useHistory();
    const updateQuery = useCallback(
        (patch: Partial<T>): void => {
            const {replace, filterEmpty, ...stringifyOptions} = updateOptions;
            const newQuery = {...query, ...patch};
            const queryToUpdate = filterEmpty ? filterUnwantedQueryValue(newQuery) : newQuery;
            const newSearch = stringify(queryToUpdate, stringifyOptions);
            if (replace) {
                history.replace({search: newSearch});
            }
            else {
                history.push({search: newSearch});
            }
        },
        [history, query, updateOptions]
    );
    return updateQuery;
}
