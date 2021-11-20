import {useMemo} from 'react';
import {
    useTakeLatestInternal,
    Options as TakeLatestOptions,
    ConstantOptions as ConstantTakeLatestOptions,
    State as TakeLatestState,
    ConstantState as ConstantTakeLatestState,
} from './internal';

interface RequestOptions<O> {
    defaultValue?: O;
    throwError?: boolean;
}

type CheckDefaultValue<P> = P extends {defaultValue: infer I}
    ? {kind: 'pending' | 'initial', data: I}
    : {kind: 'pending' | 'initial'};

type CheckThrowError<P> = P extends {throwError: false} ? {kind: 'hasError', error: Error} : never;

type StateExtra<O, P> = (CheckDefaultValue<P> | CheckThrowError<P> | {kind: 'hasValue', data: O});

export type ParamRequestOptions<I, O> = TakeLatestOptions<I, O> & RequestOptions<O>;

export type ParamRequestState<I, O, P> = TakeLatestState<I, O> & StateExtra<O, P>;

export type ParamRequestStateHasDefault<I, O> = ParamRequestState<I, O, {defaultValue: O}>;

export type ParamRequestStateHasDefaultNoThrow<I, O> = ParamRequestState<I, O, {throwError: false, defaultValue: O}>;

export type ParamRequestStateNoDefault<I, O> = ParamRequestState<I, O, unknown>;

export type ParamRequestStateNoDefaultNoThrow<I, O> = ParamRequestState<I, O, {throwError: false}>;

type ParamRequestHook<I, O, P> = [ParamRequestState<I, O, P>, (params: I) => Promise<void>];

export function useRequest<I, O, P extends ParamRequestOptions<I, O>>(
    api: (params: I) => Promise<O>,
    options?: P
): ParamRequestHook<I, O, P> {
    const {defaultValue, throwError = true} = options ?? {};
    const [state, request] = useTakeLatestInternal(api, options);
    const response = useMemo(
        (): ParamRequestState<I, O, P> => {
            switch (state.kind) {
                case 'initial':
                case 'pending':
                    return defaultValue === undefined
                        ? state
                        : {
                            kind: state.kind,
                            params: state.params,
                            snapshot: state.snapshot,
                            data: defaultValue,
                        };
                case 'hasValue':
                    return state;
                case 'hasError': {
                    if (throwError) {
                        throw state.error;
                    }
                    return state;
                }
            }
        },
        [defaultValue, state, throwError]
    );

    return [response, request];
}

export type ConstantRequestOptions<O> = ConstantTakeLatestOptions<O> & RequestOptions<O>;

export type ConstantRequestState<O, P> = ConstantTakeLatestState<O> & StateExtra<O, P>;

export type ConstantRequestStateHasDefault<O> = ConstantRequestState<O, {defaultValue: O}>;

export type ConstantRequestStateHasDefaultNoThrow<O> = ConstantRequestState<O, {throwError: false, defaultValue: O}>;

export type ConstantRequestStateNoDefault<O> = ConstantRequestState<O, unknown>;

export type ConstantRequestStateNoDefaultNoThrow<O> = ConstantRequestState<O, {throwError: false}>;

type ConstantRequestHook<O, P> = [ConstantRequestState<O, P>, () => Promise<void>];

export function useConstantRequest<O, P extends ConstantRequestOptions<O>>(
    api: () => Promise<O>,
    options?: P
): ConstantRequestHook<O, P> {
    const {defaultValue, throwError = true} = options ?? {};
    const [state, request] = useTakeLatestInternal(api, options);
    const response = useMemo(
        (): ConstantRequestState<O, P> => {
            switch (state.kind) {
                case 'initial':
                case 'pending':
                    return defaultValue === undefined
                        ? state
                        : {
                            kind: state.kind,
                            snapshot: state.snapshot,
                            data: defaultValue,
                        };
                case 'hasValue':
                    return state;
                case 'hasError': {
                    if (throwError) {
                        throw state.error;
                    }
                    return state;
                }
            }
        },
        [defaultValue, state, throwError]
    );

    return [response, request];
}
