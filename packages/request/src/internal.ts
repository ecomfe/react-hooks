import {useCallback, useRef, useState} from 'react';
import {useIntendedLazyCallback} from '@huse/intended-lazy';
import stringify from 'fast-json-stable-stringify';

const noop = () => {};

export interface ResponseSnapshotBase<O> {
    snapshot: O | undefined;
}

export interface ResponseParamsBase<I> {
    params?: I;
}

export interface Pending {
    kind: 'pending';
}

export interface Resolved<O> {
    kind: 'hasValue';
    data: O;
}

export interface Rejected {
    kind: 'hasError';
    error: Error;
}

export interface Initial {
    kind: 'initial';
}

type ResponseState<O> = Initial | Pending | Resolved<O> | Rejected;

export type State<I, O> = ResponseSnapshotBase<O> & ResponseParamsBase<I> & ResponseState<O>;

export type ConstantState<O> = ResponseSnapshotBase<O> & ResponseState<O>;

export interface Options<I, O> {
    onAccept?: (result: O, params: I) => void;
}

export interface ConstantOptions<O> {
    onAccept?: (result: O) => void;
}

type StateAny = State<any, any>;

// ---
type Async = (params: any) => Promise<any>;
type ProgressAsync = (params?: any) => Promise<void>;
// ---

const pendingTo = (params: unknown) => (state: StateAny): StateAny => {
    if (state.kind === 'initial') {
        return {
            params,
            kind: 'pending',
            snapshot: undefined,
        };
    }

    return {
        params,
        kind: 'pending',
        snapshot: state.kind === 'hasValue' ? state.data : state.snapshot,
    };
};

const resolveTo = (params: unknown, data: unknown) => (state: StateAny): StateAny => {
    /* istanbul ignore if */
    if (state.kind !== 'pending') {
        throw new Error(`Invalid state ${state.kind} on resolve`);
    }

    return {
        params,
        data,
        kind: 'hasValue',
        snapshot: state.snapshot,
    };
};

const rejectTo = (params: unknown, error: Error) => (state: StateAny): StateAny => {
    /* istanbul ignore if */
    if (state.kind !== 'pending') {
        throw new Error(`Invalid state ${state.kind} on reject`);
    }

    return {
        params,
        error,
        kind: 'hasError',
        snapshot: state.snapshot,
    };
};

export const useTakeLatestInternal = (task: Async, options?: Options<any, any>): [StateAny, ProgressAsync] => {
    const [state, setState] = useState<StateAny>({kind: 'initial', snapshot: undefined});
    const latestKey = useRef<string | null>(null);
    const accept = useIntendedLazyCallback(options?.onAccept ?? noop);
    const wrapped = useCallback(
        async (params: unknown) => {
            const key = stringify(params);
            latestKey.current = key;
            setState(pendingTo(params));
            try {
                const result = await task(params);
                if (latestKey.current === key) {
                    setState(resolveTo(params, result));
                    accept(result, params);
                }
            }
            catch (ex) {
                if (latestKey.current === key) {
                    /* istanbul ignore next */
                    const error = ex instanceof Error ? ex : new Error(`${ex}`);
                    setState(rejectTo(params, error));
                }
            }
        },
        [accept, task]
    );
    return [state, wrapped];
};
