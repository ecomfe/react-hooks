import {MutableRefObject, useEffect, useRef, useState, useCallback} from 'react';
import {useOriginalDeepCopy} from '@huse/previous-value';

import {
    Options,
    SendMessage,
    StartWebSocket,
    CloseWebSocket,
    ReadyStateState,
    MessageType,
} from './types';
import {ReadyState} from './constants';
import {attachListeners} from './attachListeners';

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

    const [lastMessage, setLastMessage] = useState<WebSocketEventMap['message'] | null>(null); // 最新一条消息
    const [readyState, setReadyState] = useState<ReadyStateState>({}); // 每个url的readyState

    const webSocketRef = useRef<WebSocket>(null); // 当前最新的websocket对象
    const staticOptionsCheck = useRef(false); // options静态检查标记
    const reconnetRef = useRef<() => void>(noop); // 重启方法
    const reconnectCount = useRef(0); // 重启次数

    const sendMessage = useCallback(
        (message: MessageType) => {
            /* istanbul ignore else */
            if (webSocketRef.current?.readyState === ReadyState.OPEN) {
                webSocketRef.current.send(message);
            }
        },
        []
    );

    const startWebSocket = useCallback(
        () => {
            // 先修改状态
            setReadyState(prev => ({
                ...prev,
                [url]: ReadyState.CONNECTING,
            }));
            // 创建websocket
            (webSocketRef as MutableRefObject<WebSocket>).current = new WebSocket(url);
            // 绑定事件
            const removeListeners = attachListeners(
                webSocketRef.current as WebSocket,
                url,
                {
                    setLastMessage,
                    setReadyState,
                },
                originalOptions,
                reconnetRef.current,
                reconnectCount
            );
            return removeListeners;
        },
        [url, originalOptions]
    );

    // 关闭websocket
    const closeWebSocket = useCallback(
        () => {
            /* istanbul ignore else */
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        },
        []
    );

    // url变化自动开启webSocket
    useEffect(
        () => {
            let removeListeners: (() => void) | null = null;
            reconnetRef.current = () => {
                removeListeners && removeListeners();
                startWebSocket();
            };
            removeListeners = startWebSocket();
            return removeListeners;
        },
        [startWebSocket]
    );

    // options参数不允许变动
    useEffect(
        () => {
            /* istanbul ignore else */
            if (staticOptionsCheck.current) {
                throw new Error('The options must be static');
            }
            staticOptionsCheck.current = true;
        },
        [originalOptions]
    );

    const readyStateFromUrl = typeof readyState[url] === 'number' ? readyState[url] : ReadyState.UNINSTANTIATED;
    return [
        sendMessage,
        lastMessage,
        readyStateFromUrl,
        startWebSocket,
        closeWebSocket,
    ];
}
