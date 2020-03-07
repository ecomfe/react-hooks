import {SnapshotState} from './interface';

export const versionBack = (currentVersion: number | null, historyLength: number, step: number): number => {
    const versionStart = currentVersion ?? historyLength - 1;
    return Math.max(0, versionStart - step);
};

export const versionForward = (currentVersion: number, historyLength: number, step: number): number | null => {
    const nextVersion = currentVersion + step;
    return nextVersion >= historyLength - 1 ? null : nextVersion;
};

export const isFactory = <T>(init: T | (() => T)): init is (() => T) => typeof init === 'function';

export const isProducer = <T>(next: T | ((value: T) => T)): next is ((value: T) => T) => typeof next === 'function';

export const mergePendingValueToHistory = <T>(history: T[], value: T): T[] => {
    if (history[history.length - 1] === value) {
        return history;
    }

    return [...history.slice(0, -1), value];
};

export const commitValueToHistory = <T>(history: T[], value: T, limit: number) => {
    const nextHistory = history[history.length - 1] === value ? history : [...history, value];
    return nextHistory.length <= limit ? nextHistory : nextHistory.slice(nextHistory.length - limit);
};

export const currentValue = <T>(state: SnapshotState<T>): T => {
    if (state.version === null) {
        return state.pendingValue;
    }

    return state.history[state.version];
};
