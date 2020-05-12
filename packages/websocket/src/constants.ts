export enum ReadyState {
    UNINSTANTIATED = -1,
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

// 默认重启次数限制 10次
export const DEFAULT_RECONNECT_LIMIT = 10;

// 默认重启间隔 5秒
export const DEFAULT_RECONNECT_INTERVAL_MS = 5000;
