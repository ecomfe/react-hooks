import {useCallback, useEffect, useMemo} from 'react';
import {useOriginalDeepCopy} from '@huse/previous-value';
import {
    useRequest,
    useConstantRequest,
    ParamRequestOptions,
    ConstantRequestOptions,
    ParamRequestState,
    ConstantRequestState,
} from './request';

export interface RequestController {
    refresh: () => Promise<void>;
}

type RequireParams<T, I> = T extends any ? Omit<T, 'params'> & {params: I} : never;

export type ParamResponseState<I, O, P> = RequireParams<Exclude<ParamRequestState<I, O, P>, {kind: 'initial'}>, I>;

export type ParamResponseStateHasDefault<I, O> = ParamResponseState<I, O, {defaultValue: O}>;

export type ParamResponseStateHasDefaultNoThrow<I, O> = ParamResponseState<I, O, {throwError: false, defaultValue: O}>;

export type ParamResponseStateNoDefault<I, O> = ParamResponseState<I, O, unknown>;

export type ParamResponseStateNoDefaultNoThrow<I, O> = ParamResponseState<I, O, {throwError: false}>;

type ParamResponseHook<I, O, P> = [ParamResponseState<I, O, P>, RequestController];

export function useResponse<I, O, P extends ParamRequestOptions<I, O>>(
    api: (params: I) => Promise<O>,
    params: I,
    options?: P
): ParamResponseHook<I, O, P> {
    const [response, request] = useRequest(api, options);
    const originalParams = useOriginalDeepCopy(params);
    const refresh = useCallback(
        () => request(originalParams),
        [originalParams, request]
    );
    const initialExcluded = useMemo(
        (): ParamResponseState<I, O, P> => {
            if (response.kind === 'initial') {
                return {
                    kind: 'pending',
                    params: response.params,
                    snapshot: undefined,
                    data: (response as any).data,
                } as any;
            }
            return response as any;
        },
        [response]
    );
    useEffect(
        () => {
            request(originalParams);
        },
        [originalParams, request]
    );
    return [initialExcluded, {refresh}];
}

export type ConstantResponseState<O, P> = Exclude<ConstantRequestState<O, P>, {kind: 'initial'}>;

export type ConstantResponseStateHasDefault<O> = ConstantResponseState<O, {defaultValue: O}>;

export type ConstantResponseStateHasDefaultNoThrow<O> = ConstantResponseState<O, {throwError: false, defaultValue: O}>;

export type ConstantResponseStateNoDefault<O> = ConstantResponseState<O, unknown>;

export type ConstantResponseStateNoDefaultNoThrow<O> = ConstantResponseState<O, {throwError: false}>;

type ConstantResponseHook<O, P> = [ConstantResponseState<O, P>, RequestController];

export function useConstantResponse<O, P extends ConstantRequestOptions<O>>(
    api: () => Promise<O>,
    options?: P
): ConstantResponseHook<O, P> {
    const [response, request] = useConstantRequest(api, options);
    const initialExcluded = useMemo(
        (): ConstantResponseState<O, P> => {
            if (response.kind === 'initial') {
                return {
                    kind: 'pending',
                    snapshot: undefined,
                    data: (response as any).data,
                } as any;
            }
            return response as any;
        },
        [response]
    );
    useEffect(
        () => {
            request();
        },
        [request]
    );
    return [initialExcluded, {refresh: request}];
}
