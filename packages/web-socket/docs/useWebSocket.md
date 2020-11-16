---
title: useWebSocket
nav:
  title: Hooks
  path: /hook
group:
  title: Web Socket
  path: /web-socket
order: 2
---

# useWebSocket

Create a web socket connecting to specified url.

**NOTE: Changing `options` during component's life time is not supported currently, in order to make `options` constant, use a `useMemo` to initialize it.**

```typescript
enum ReadyState {
    UNINSTANTIATED = -1,
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
}

type MessageType = string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;

type SendMessage = (message: MessageType) => void;

type StartWebSocket = () => void;

type CloseWebSocket = () => void;

interface WebSocketHook {
    sendMessage: SendMessage;
    lastMessage: WebSocketEventMap['message'] | null;
    readyState: ReadyState;
    start: StartWebSocket;
    close: CloseWebSocket;
}

interface Options {
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onMessage?: (event: WebSocketEventMap['message']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
    filter?: (message: WebSocketEventMap['message']) => boolean; // Filter message
    reconnectOnClose?: (event: WebSocketEventMap['close']) => boolean; // Return `true` to reconnect
    reconnectOnError?: (event: WebSocketEventMap['error']) => boolean; // Return `true` to reconnect
    reconnectInterval?: number; // Interval between reconnects in milliseconds
    reconnectAttempts?: number;
}

Socket is started automatically, you can still close and start it via `start` and `close` function.

```jsx
import React, {useState, useReducer, useEffect, useCallback, useMemo} from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useWebSocket} from '@huse/web-socket';

export default () => {
    const readyStateMap = [
        'Connecting',
        'Connected',
        'Closing',
        'Closed'
    ];
    const url = 'wss://echo.websocket.org';
    const [messageHistory, pushMessageHistory] = useReducer(
        (history, data) => [...history, data],
        []
    );
    const [message, setMessage] = useState('');
    const options = useMemo(
        () => {
            return {
                onOpen: event => console.log(event),
                onClose: event => console.log(event),
                onMessage: event => console.log(event),
                onError: event => console.log(event),
            };
        },
        []
    );
    const {sendMessage, lastMessage, readyState, start, close} = useWebSocket(url, options);
    const handleSendMessage = useCallback(
        () => {
            sendMessage(message);
        },
        [message, sendMessage]
    );
    const handleMessageChange = useCallback(e => setMessage(e.target.value), []);
    useEffect(
        () => {
            if (lastMessage !== null) {
                pushMessageHistory(lastMessage.data);
            }
        },
        [lastMessage]
    );
    return (
        <>
            <div>
                <Input style={{width: 400}} value={message} onChange={handleMessageChange} />
            </div>
            <div>
                <Button onClick={handleSendMessage}>Send</Button>
                <Button onClick={start}>Restart</Button>
                <Button onClick={close}>Close</Button>
            </div>
            <div>
                Message History: {messageHistory.join(',')}
            </div>
            <div>
                Current Status: {readyState} - {readyState >=0 && readyStateMap[readyState]}
            </div>
        </>
    );
};
```

By default `useWebSocket` doesn't attempt to reconnect on error or close, `reconnectOnClose` and `reconnectOnError` options are used to determine whether a reconnection should take place.

Take `reconnectOnClose` as an example, a web socket can close because of user's intentional behavior, or due to unexpected disconnect from server, we need to check it from `CloseEvent`, return `ture` to tell web socket should reconnect.

Also `reconnectInterval` controls the interval between reconnections in milliseconds, defualt to 5000, `reconnectAttempts` controls the maximum reconnect attempts, default to 10.

```javascript
const options = useMemo(
    () => {
        return {
            reconnectOnClose(closeEvent) {
                // Judge closeEvent to return a boolean
                return true;
            },
            reconnectInterval: 3000,
            reconnectAttempts: 20,
        };
    },
    []
};
const {sendMessage, lastMessage, readyState} = useWebSocket('wss://echo.websocket.org', options);
```
