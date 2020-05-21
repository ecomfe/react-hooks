import {MutableRefObject, useEffect, useRef, useState, useCallback} from 'react';
import {useOriginalDeepCopy, usePreviousValue} from '@huse/previous-value';

import {
    Options,
    SendMessage,
    StartWebSocket,
    CloseWebSocket,
    MessageType,
    ReadyStateState,
} from './interface';
import {ReadyState} from './constants';
import {attachListeners} from './attachListeners';

export {Options, MessageType, SendMessage, StartWebSocket, CloseWebSocket};

export interface WebSocketHook {
    sendMessage: SendMessage;
    lastMessage: WebSocketEventMap['message'] | null;
    readyState: ReadyState;
    start: StartWebSocket;
    close: CloseWebSocket;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useWebSocket(url: string, options: Options = {}): WebSocketHook {
    const originalOptions = useOriginalDeepCopy(options);
    const previousOptions = usePreviousValue(originalOptions);
    const [lastMessage, setLastMessage] = useState<WebSocketEventMap['message'] | null>(null);
    const [readyState, setReadyState] = useState<ReadyStateState>({}); // Manages ready state by url.
    const webSocketRef = useRef<WebSocket>(null); // Latest web socket instance.
    const reconnetRef = useRef<() => void>(noop); // Recunnect function.
    const reconnectCount = useRef(0);
    const setUrlReadyState = useCallback(
        (url: string, currentReadyState: ReadyState) => {
            setReadyState(prev => ({...prev, [url]: currentReadyState}));
        },
        []
    );
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
            // Move to connecting state
            setUrlReadyState(url, ReadyState.CONNECTING);
            // Create web socket instance.
            (webSocketRef as MutableRefObject<WebSocket>).current = new WebSocket(url);
            // Bind all events.
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
    const closeWebSocket = useCallback(() => webSocketRef.current?.close(), []);
    // Close previous socket and open a new one when url changes.
    useEffect(
        () => {
            // Reset reconnect count on change.
            reconnectCount.current = 0;
            let removeListeners = noop;
            reconnetRef.current = () => {
                // Close the previous one first.
                removeListeners();
                startWebSocket();
            };
            // Auto start the latest socket.
            removeListeners = startWebSocket();
            return removeListeners;
        },
        [startWebSocket]
    );
    // Check to see whether options change during component's life time.
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

    const readyStateFromURL = readyState[url] ?? ReadyState.UNINSTANTIATED;
    return {
        sendMessage,
        lastMessage,
        readyState: readyStateFromURL,
        start: startWebSocket,
        close: closeWebSocket,
    };
}
