export enum ReadyState {
    UNINSTANTIATED = -1,
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
}

export const DEFAULT_RECONNECT_LIMIT = 10;

export const DEFAULT_RECONNECT_INTERVAL_MS = 5000;
