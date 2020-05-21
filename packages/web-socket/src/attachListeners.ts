import {MutableRefObject} from 'react';

import {ReadyState, DEFAULT_RECONNECT_LIMIT, DEFAULT_RECONNECT_INTERVAL_MS} from './constants';
import {Options} from './interface';

export interface Setters {
    setLastMessage: (message: WebSocketEventMap['message']) => void;
    setUrlReadyState: (url: string, currentReadyState: ReadyState) => void;
}

export const attachListeners = (
    webSocketInstance: WebSocket,
    url: string,
    setters: Setters,
    options: Options,
    reconnect: () => void,
    reconnectCount: MutableRefObject<number>
) => {
    const {setLastMessage, setUrlReadyState} = setters;

    let reconnectTimeout: NodeJS.Timeout | null = null;
    const restart = () => {
        const reconnectLimit = options.reconnectAttempts ?? DEFAULT_RECONNECT_LIMIT;
        const reconnectInterval = options.reconnectInterval ?? DEFAULT_RECONNECT_INTERVAL_MS;
        if (reconnectCount.current < reconnectLimit) {
            reconnectTimeout && clearTimeout(reconnectTimeout);
            reconnectTimeout = setTimeout(() => {
                reconnectCount.current++;
                reconnect();
            }, reconnectInterval);
        }
    };

    webSocketInstance.onopen = (event: WebSocketEventMap['open']) => {
        options.onOpen && options.onOpen(event);
        setUrlReadyState(url, ReadyState.OPEN);
        // Reset reconnect count on success.
        reconnectCount.current = 0;
    };

    webSocketInstance.onmessage = (message: WebSocketEventMap['message']) => {
        options.onMessage && options.onMessage(message);
        if (typeof options.filter === 'function' && !options.filter(message)) {
            return;
        }
        setLastMessage(message);
    };

    webSocketInstance.onclose = (event: WebSocketEventMap['close']) => {
        options.onClose && options.onClose(event);
        setUrlReadyState(url, ReadyState.CLOSED);

        if (typeof options.reconnectOnClose === 'function' && options.reconnectOnClose(event)) {
            restart();
        }
    };

    webSocketInstance.onerror = (event: WebSocketEventMap['error']) => {
        options.onError && options.onError(event);

        if (typeof options.reconnectOnError === 'function' && options.reconnectOnError(event)) {
            restart();
        }
    };

    return () => {
        setUrlReadyState(url, ReadyState.CLOSING);
        webSocketInstance.close();

        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
    };
};
