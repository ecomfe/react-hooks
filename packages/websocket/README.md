# @huse/websocket

提供WebSocket连接的一种hooks封装

## useWebSocket

这个hook接收url和options两个输入项，options输入项可包含一些状态的回调和重启机制配置，url是一个必填字符串，options是可选参数，返回一个数组具体见如下定义说明。

**注意: 当前options选项是不支持改变的，所以在定义的时候必须用useMemo包裹**

```typescript
type WebSocketHook = [
    sendMessage: (message: MessageType) => void, // 发送消息的方法
    lastMessage: WebSocketEventMap['message'] | null, // 最新一条返回的消息
    readyState: ReadyState, // 当前WebSocket状态
    startWebSocket: () => void, // 启动WebSocket的方法
    closeWebSocket: () => void // 关闭WebSocket的方法
];

interface Options {
    onOpen?: (event: WebSocketEventMap['open']) => void; // 启动后的回调方法
    onClose?: (event: WebSocketEventMap['close']) => void; // 关闭后的回调方法
    onMessage?: (event: WebSocketEventMap['message']) => void; // 收到消息后的回调方法
    onError?: (event: WebSocketEventMap['error']) => void; // 出现错误后的回调方法
    filter?: (message: WebSocketEventMap['message']) => boolean; // 过滤消息的方法
    reconnectOnClose?: (event: WebSocketEventMap['close']) => boolean; // 是否在关闭之后自动重连的判断方法
    reconnectOnError?: (event: WebSocketEventMap['error']) => boolean; // 是否在出现错误之后自动重连的判断方法
    reconnectInterval?: number; // 重连间隔，毫秒
    reconnectAttempts?: number; // 重连次数
}

function useWebSocket(
    url: string, // websocket服务地址
    options: Options = {} // 可选配置项
): WebSocketHook;
```

基本用法

```jsx
const {useState, useEffect, useCallback, useMemo} = React;
import {Input, Button} from 'antd';

const readyStateMap = [
    '连接中',
    '已连接',
    '关闭中',
    '已关闭'
];

const App = () => {
    const url = 'wss://echo.websocket.org';
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState('');

    const options = useMemo(() => ({
        onOpen: event => console.log(event),
        onClose: event => console.log(event),
        onMessage: event => console.log(event),
        onError: event => console.log(event),
    }), []);
    const [sendMessage, lastMessage, readyState, startWebSocket, closeWebSocket]
        = useWebSocket(url, options);

    const handleSendMessage = useCallback(
        () => {
            sendMessage(message);
        },
        [message, sendMessage]
    );

    const handleMessageChange = useCallback(e => setMessage(e.target.value), []);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory(prev => [...prev, lastMessage.data]);
        }
    }, [lastMessage]);

    return (
        <div>
            <div>
                <Input style={{width: 400}} value={message} onChange={handleMessageChange} />
            </div>
            <div>
                <Button onClick={handleSendMessage}>发送消息</Button>
                <Button onClick={startWebSocket}>重启WebSocket</Button>
                <Button onClick={closeWebSocket}>关闭WebSocket</Button>
            </div>
            <div>
                接受到的所有消息: {messageHistory.join(',')}
            </div>
            <div>
                当前WebSocket状态: {readyState} - {readyState >=0 && readyStateMap[readyState]}
            </div>
        </div>
    );
};
```

重连机制

默认情况下，`getWebSocket`不提供自动重连功能。只有当options中设置了`reconnectOnClose`或`reconnectOnError`判断回调方法，他们分别用来在websocket被关闭或出现错误时进行自动重连。拿`reconnectOnClose`来说，因为流关闭有可能是用户正常断开，也有可能是服务器异常断开情况，所以需要用户根据参数`CloseEvent`进行判断，返回一个布尔值，当返回true的时候则自动进行重连。类似的`reconnectOnError`方法可以根据ErrorEvent来进行自定义设置重连机制。options参数提供reconnectInterval配置项来设置重连间隔（默认是5000ms），提供reconnectAttempts配置项来设置最大重连次数（默认是10次）。可以参考如下例子：

```jsx
const options = useMemo(() => ({
    reconnectOnClose: closeEvent => {
        // 实际情况应该根据closeEvent来做判断，当前直接返回true用来测试自动重连功能
        return true
    },
    reconnectInterval: 3000,
    reconnectAttempts: 20,
}), []);
const [sendMessage, lastMessage, readyState] = useWebSocket('wss://echo.websocket.org', options);
```
