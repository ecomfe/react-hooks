import {useReducer, useCallback, Dispatch, SetStateAction} from 'react';
import {useDebouncedEffect} from '@huse/debounce';
import {
    versionBack,
    versionForward,
    isFactory,
    isProducer,
    currentValue,
    commitValueToHistory,
    mergePendingValueToHistory,
} from './utils';
import {SnapshotState} from './interface';

export interface SnapshotOptions {
    delay?: number;
    limit?: number;
}

export interface Snapshot {
    backLength: number;
    forwardLength: number;
    canUndo: boolean;
    canRedo: boolean;
    undo(): void;
    redo(): void;
}

export type SnapshotHook<T> = [T, Dispatch<SetStateAction<T>>, Snapshot];

type Action<T> = {type: 'undo'} | {type: 'redo'} | {type: 'commit'} | {type: 'update', payload: T | ((value: T) => T)};

const updateValue = <T>(state: SnapshotState<T>, value: T, options: Required<SnapshotOptions>): SnapshotState<T> => {
    if (state.pendingValue === value) {
        return state;
    }

    // If it is not the latest version, flush history on any input and clear undo stack
    if (state.version !== null) {
        return {
            pendingValue: value,
            version: null,
            history: [...state.history.slice(0, state.version + 1), value],
        };
    }

    return {
        pendingValue: value,
        version: state.version,
        history: options.delay <= 0 ? commitValueToHistory(state.history, value, options.limit) : state.history,
    };
};

const commitValue = <T>(state: SnapshotState<T>, options: Required<SnapshotOptions>): SnapshotState<T> => {
    const nextHistory = commitValueToHistory(state.history, state.pendingValue, options.limit);
    return state.history === nextHistory
        ? state
        : {pendingValue: state.pendingValue, version: state.version, history: nextHistory};
};

export function useSnapshotState<T>(init: T | (() => T), options: SnapshotOptions = {}): SnapshotHook<T> {
    const {delay = 0, limit = Infinity} = options;

    if (limit <= 0) {
        throw new Error('Non-positive history length limit in useSnapshotState');
    }

    const [{pendingValue, history, version}, dispatch] = useReducer(
        (state: SnapshotState<T>, action: Action<T>): SnapshotState<T> => {
            const {pendingValue, history, version} = state;
            switch (action.type) {
                case 'update': {
                    const next = action.payload;
                    const nextValue = isProducer(next) ? next(currentValue(state)) : next;
                    return updateValue(state, nextValue, {delay, limit});
                }
                case 'commit':
                    return commitValue(state, {delay, limit});
                case 'undo': {
                    if (version === 0 || history.length === 1) {
                        return state;
                    }

                    const nextVersion = versionBack(version, history.length, 1);
                    return {
                        pendingValue,
                        history: version === null ? mergePendingValueToHistory(history, pendingValue) : history,
                        version: nextVersion,
                    };
                }
                case 'redo': {
                    if (version === null) {
                        return state;
                    }

                    // When redo is available, nothing can commit to history
                    const nextVersion = versionForward(version, history.length, 1);
                    return {
                        pendingValue,
                        history,
                        version: nextVersion,
                    };
                }
                /* istanbul ignore next */
                default:
                    return state;
            }
        },
        null,
        () => {
            const value = isFactory(init) ? init() : init;
            const state: SnapshotState<T> = {
                pendingValue: value,
                history: [value],
                version: null,
            };
            return state;
        }
    );
    useDebouncedEffect(() => dispatch({type: 'commit'}), pendingValue, delay);
    const undo = useCallback(
        () => dispatch({type: 'undo'}),
        [dispatch]
    );
    const redo = useCallback(
        () => dispatch({type: 'redo'}),
        [dispatch]
    );
    const setValue = useCallback(
        (next: T | ((state: T) => T)) => dispatch({type: 'update', payload: next}),
        []
    );
    const backLength = version ?? history.length - 1;
    const forwardLength = version === null ? 0 : history.length - 1 - version;

    return [
        version === null ? pendingValue : history[version],
        setValue,
        {
            undo,
            redo,
            backLength,
            forwardLength,
            canUndo: backLength > 0,
            canRedo: forwardLength > 0,
        },
    ];
}
