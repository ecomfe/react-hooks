import {ReadyState} from './constants';

export interface Options {
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onMessage?: (event: WebSocketEventMap['message']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
    filter?: (message: WebSocketEventMap['message']) => boolean;
    reconnectOnClose?: (event: WebSocketEventMap['close']) => boolean;
    reconnectOnError?: (event: WebSocketEventMap['error']) => boolean;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

export type MessageType = string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;

export type SendMessage = (message: MessageType) => void;

export type StartWebSocket = () => void;

export type CloseWebSocket = () => void;

export interface ReadyStateState {
    [url: string]: ReadyState;
}
