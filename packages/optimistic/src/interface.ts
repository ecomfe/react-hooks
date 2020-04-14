/* istanbul ignore file */
export type NextState<T> = (state: T) => T;

export type AsyncWorkFlow<S, R = S> = () => Generator<NextState<S> | Promise<R>, void, R>;

export interface ReducerEntry<T> {
    readonly transactionID?: number;
    readonly next: NextState<T>;
}

export interface OptimisticState<T> {
    readonly optimistic: boolean;
    readonly archive: T | {};
    readonly queue: Array<ReducerEntry<T>>;
    readonly hostState: T;
}

export type Execute<T> = (next: NextState<OptimisticState<T>>) => void;

export type ReduceHint<S, R = S> = NextState<S> | [AsyncWorkFlow<S, R>, NextState<S>];

export type Factory<S, P, R = S> = (payload: P) => ReduceHint<S, R>;

export interface SetState<T> {
    (input: T | NextState<T>): void;
    (setAsync: Promise<T> | Promise<NextState<T>>, setSync: T | NextState<T>): void;
}
