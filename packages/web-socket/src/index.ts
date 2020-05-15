import {MutableRefObject, useEffect, useRef, useState, useCallback} from 'react';
import {useOriginalDeepCopy, usePreviousValue} from '@huse/previous-value';

import {
    Options,
    SendMessage,
    StartWebSocket,
    CloseWebSocket,
    MessageType,
    ReadyStateState,
} from './types';
import {ReadyState} from './constants';
import {attachListeners} from './attachListeners';

export {Options, MessageType, SendMessage, StartWebSocket, CloseWebSocket};

export type WebSocketHook = [
    SendMessage,
    WebSocketEventMap['message'] | null,
    ReadyState,
    StartWebSocket,
    CloseWebSocket
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useWebSocket(url: string, options: Options = {}): WebSocketHook {
    const originalOptions = useOriginalDeepCopy(options);
    const previousOptions = usePreviousValue(originalOptions);

    const [lastMessage, setLastMessage] = useState<WebSocketEventMap['message'] | null>(null); // 最新一条消息
    const [readyState, setReadyState] = useState<ReadyStateState>({}); // 每个url的readyState

    const webSocketRef = useRef<WebSocket>(null); // 当前最新的websocket对象
    const reconnetRef = useRef<() => void>(noop); // 重启方法
    const reconnectCount = useRef(0); // 重启次数

    const setUrlReadyState = useCallback(
        (url: string, currentReadyState: ReadyState) => {
            setReadyState(prev => ({
                ...prev,
                [url]: currentReadyState,
            }));
        },
        []
    );

    // 发送消息
    const sendMessage = useCallback(
        (message: MessageType) => {
            /* istanbul ignore else */
            if (webSocketRef.current?.readyState === ReadyState.OPEN) {
                webSocketRef.current.send(message);
            }
        },
        []
    );

    // 开启WebSocket
    const startWebSocket = useCallback(
        () => {
            // 先修改状态
            setUrlReadyState(url, ReadyState.CONNECTING);
            // 创建WebSocket
            (webSocketRef as MutableRefObject<WebSocket>).current = new WebSocket(url);
            // 绑定事件
            const removeListeners = attachListeners(
                webSocketRef.current as WebSocket,
                url,
                {
                    setLastMessage,
                    setUrlReadyState,
                },
                originalOptions,
                reconnetRef.current,
                reconnectCount
            );
            return removeListeners;
        },
        [url, setUrlReadyState, originalOptions]
    );

    // 关闭WebSocket
    const closeWebSocket = useCallback(() => webSocketRef.current?.close(), []);

    // 当url改变时自动开启WebSocket
    useEffect(
        () => {
            // url改变时重连次数清0
            reconnectCount.current = 0;

            let removeListeners = noop;
            // 重连方法
            reconnetRef.current = () => {
                // 先关闭上一次的连接
                removeListeners();
                startWebSocket();
            };
            // 自动开启
            removeListeners = startWebSocket();
            return removeListeners;
        },
        [startWebSocket]
    );

    // 当前options参数不允许改变
    useEffect(
        () => {
            /* istanbul ignore else */
            if (previousOptions) {
                throw new Error('The options must be static');
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [originalOptions]
    );

    const readyStateFromUrl = readyState[url] ?? ReadyState.UNINSTANTIATED;
    return [
        sendMessage,
        lastMessage,
        readyStateFromUrl,
        startWebSocket,
        closeWebSocket,
    ];
}
