import {useEffect, useState, useRef, useCallback} from 'react';
import {create, AttentionContext, AttentionState} from 'user-attention';
import {useActionPending} from '@huse/action-pending';
import {useStableInterval} from '@huse/timeout';

export interface PollOptions {
    minInterval: number;
    maxInterval?: number;
    maxIdleTime?: number;
    stopOnInactive?: boolean;
}

export type PollHook<S> = [S | undefined, number];

const resolveOptions = (options: number | PollOptions) => {
    if (typeof options === 'number') {
        return {
            minInterval: options,
            maxInterval: options,
            maxIdleTime: 0,
            stopOnInactive: false,
        };
    }

    return {
        minInterval: options.minInterval,
        maxInterval: options.maxInterval || options.minInterval,
        maxIdleTime: options.maxIdleTime || 30 * 1000,
        stopOnInactive: options.stopOnInactive || false,
    };
};

export function usePoll<S>(fetch: () => Promise<S>, options: number | PollOptions): PollHook<S> {
    const {minInterval, maxInterval, maxIdleTime, stopOnInactive} = resolveOptions(options);
    const attention = useRef<AttentionContext | null>(null);
    const lastAttentionState = useRef<AttentionState>('active');
    const lastPollTime = useRef(Date.now());
    const [poll, pendingCount] = useActionPending(fetch);
    const [response, setResponse] = useState<S | undefined>();
    const pollAndStore = useCallback(
        () => {
            lastPollTime.current = Date.now();
            poll().then(setResponse);
        },
        [poll]
    );
    useEffect(
        () => {
            const context = create({maxIdleTime});
            attention.current = context;
            return () => {
                context.dispose();
                attention.current = null;
            };
        },
        [maxIdleTime]
    );
    useEffect(
        () => pollAndStore(),
        [pollAndStore]
    );
    useStableInterval(
        () => {
            if (!attention.current) {
                pollAndStore();
                return;
            }

            const userAttentionState = attention.current.getState();

            if (stopOnInactive && userAttentionState === 'inactive') {
                return;
            }

            const now = Date.now();
            const timeEllapsedSinceLastPoll = now - lastPollTime.current;
            const minTimeAllowedToPoll = userAttentionState === 'active' ? minInterval : maxInterval - minInterval;
            if (timeEllapsedSinceLastPoll >= minTimeAllowedToPoll) {
                pollAndStore();
            }
        },
        minInterval
    );
    useEffect(
        () => {
            if (!attention.current) {
                return;
            }

            const {subscribe, getState} = attention.current;
            const detectActive = () => {
                const previousState = lastAttentionState.current;
                const currentState = getState();
                lastAttentionState.current = currentState;

                if (stopOnInactive
                    && previousState === 'inactive'
                    && currentState === 'active'
                    && Date.now() - lastPollTime.current >= minInterval
                ) {
                    pollAndStore();
                }
            };
            return subscribe(detectActive);
        },
        [minInterval, pollAndStore, stopOnInactive]
    );

    return [response, pendingCount];
}
