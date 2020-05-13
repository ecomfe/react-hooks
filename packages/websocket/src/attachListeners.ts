import {MutableRefObject} from 'react';

import {ReadyState, DEFAULT_RECONNECT_LIMIT, DEFAULT_RECONNECT_INTERVAL_MS} from './constants';
import {ReadyStateState, Options} from './types';

export interface Setters {
    setLastMessage: (message: WebSocketEventMap['message']) => void;
    setReadyState: (callback: (prev: ReadyStateState) => ReadyStateState) => void;
}

export const attachListeners = (
    webSocketInstance: WebSocket,
    url: string,
    setters: Setters,
    options: Options,
    reconnect: () => void,
    reconnectCount: MutableRefObject<number>
) => {
    const {setLastMessage, setReadyState} = setters;

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
        setReadyState(prev => ({
            ...prev,
            [url]: ReadyState.OPEN,
        }));
        // 成功启动后将重启次数清零
        reconnectCount.current = 0;
    };

    webSocketInstance.onmessage = (message: WebSocketEventMap['message']) => {
        options.onMessage && options.onMessage(message);
        // 支持通过options.filter来过滤一些消息
        if (typeof options.filter === 'function' && !options.filter(message)) {
            return;
        }
        // 最新的消息
        setLastMessage(message);
    };

    webSocketInstance.onclose = (event: WebSocketEventMap['close']) => {
        options.onClose && options.onClose(event);
        setReadyState(prev => ({
            ...prev,
            [url]: ReadyState.CLOSED,
        }));

        // 关闭后的自定义重启判断
        if (typeof options.reconnectOnClose === 'function' && options.reconnectOnClose(event)) {
            restart();
        }
    };

    webSocketInstance.onerror = (event: WebSocketEventMap['error']) => {
        options.onError && options.onError(event);

        // 出错后的自定义重启判断
        if (typeof options.reconnectOnError === 'function' && options.reconnectOnError(event)) {
            restart();
        }
    };

    // 返回关闭流的操作
    return () => {
        setReadyState(prev => ({
            ...prev,
            [url]: ReadyState.CLOSING,
        }));
        webSocketInstance.close();
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
    };
};
