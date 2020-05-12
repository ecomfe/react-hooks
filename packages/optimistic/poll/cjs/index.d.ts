export interface PollOptions {
    minInterval: number;
    maxInterval?: number;
    maxIdleTime?: number;
    stopOnInactive?: boolean;
}
export declare type PollHook<S> = [S | undefined, number];
export declare function usePoll<S>(fetch: () => Promise<S>, options: number | PollOptions): PollHook<S>;
