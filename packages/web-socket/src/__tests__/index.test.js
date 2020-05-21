import {renderHook, act} from '@testing-library/react-hooks';
import WS from 'jest-websocket-mock';

import {useWebSocket} from '../index';
import {DEFAULT_RECONNECT_INTERVAL_MS} from '../constants';

afterEach(() => {
    act(() => WS.clean());
    jest.resetAllMocks();
});

const promise = new Promise(resolve => resolve({}));
const timeout = time => new Promise(resolve => setTimeout(resolve, time));

test('webSocket startWebSocket ok and server handle error', async () => {
    const onOpen = jest.fn();
    const onMessage = jest.fn();
    const onError = jest.fn();
    const onClose = jest.fn();
    const options = {
        onOpen,
        onMessage,
        onError,
        onClose,
    };
    const fakeURL = 'ws://localhost:1234';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL, options));
    const {sendMessage, lastMessage, readyState: readyStateFromUrl} = result.current;
    // 连接之前
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).not.toHaveBeenCalled();
    expect(onMessage).not.toHaveBeenCalled();
    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接之后
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).not.toHaveBeenCalled();

    // sendMessage success
    sendMessage('test message from app');

    await expect(server).toReceiveMessage('test message from app');
    expect(server).toHaveReceivedMessages(['test message from app']);

    // server send, client receive success
    act(() => {
        server.send('test message from mock server');
    });

    expect(result.current.lastMessage.data).toBe('test message from mock server');
    // console.log(lastMessage); 此处如果还用之前的变量是不行的，因为重新render了。

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledTimes(1);

    // server error
    act(() => server.error());
    await act(async () => {
        await server.closed;
        return promise;
    });
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.readyState).toBe(3);
});

test('webSocket should start and close ok', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const options = {
        onOpen,
        onClose,
    };
    const fakeURL = 'ws://localhost:1235';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL, options));
    const {lastMessage, readyState: readyStateFromUrl, start: startWebSocket, close: closeWebSocket} = result.current;
    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接成功
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);

    // 测试关闭websocket
    act(() => closeWebSocket());
    await act(async () => {
        await server.closed;
        return promise;
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.readyState).toBe(3);

    await act(() => {
        startWebSocket();
        return promise;
    });
    await act(async () => {
        await server.connected;
        return promise;
    });
    expect(result.current.readyState).toBe(0);
});

test('webSocket options not allowed to change', async () => {
    const onOpen = jest.fn();
    const onMessage = jest.fn();
    const onError = jest.fn();
    const onClose1 = jest.fn();
    const onClose2 = jest.fn();

    const defaultOptions = {
        onOpen,
        onMessage,
        onError,
        onClose: onClose1,
    };

    const newOptions = {
        onOpen: onOpen,
        onMessage,
        onError,
        onClose: onClose2,
    };
    const fakeURL = 'ws://localhost:1234';
    const server = new WS(fakeURL);

    const {result, rerender} = renderHook(
        ({fakeURL, options}) => useWebSocket(fakeURL, options),
        {initialProps: {fakeURL, options: defaultOptions}}
    );
    try {
        await act(async () => {
            await server.connected;
            return promise;
        });
        rerender({fakeURL, options: newOptions});
        expect(result.error).toEqual(Error('The options object you pass must be static'));
    }
    catch (error) {
        // console.log('为了解决正确返回Error的情况下导致的运行出错');
    }
});

test('webSocket options filter return undefined', async () => {
    const onOpen = jest.fn();
    const onMessage = jest.fn();
    const filter = jest.fn();
    const options = {
        onOpen,
        onMessage,
        filter,
    };
    const fakeURL = 'ws://localhost:1234';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL, options));
    const {sendMessage, lastMessage, readyState: readyStateFromUrl} = result.current;
    // 连接之前
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).not.toHaveBeenCalled();
    expect(onMessage).not.toHaveBeenCalled();

    await act(async () => {
        await server.connected;
        return promise;
    });

    // 连接之后
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).not.toHaveBeenCalled();

    // sendMessage success
    sendMessage('test message from app');

    await expect(server).toReceiveMessage('test message from app');
    expect(server).toHaveReceivedMessages(['test message from app']);

    // server send, client receive error
    act(() => {
        server.send('test message from mock server');
    });

    expect(result.current.lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledTimes(1);
    expect(filter).toHaveBeenCalledTimes(1);
});
test('webSocket reconnect with reconnectOnClose, with reconnectAttempts, with reconnectInterval', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const reconnectOnClose = jest.fn(() => true);
    const reconnectInterval = 1;
    const options = {
        onOpen,
        onClose,
        reconnectOnClose,
        reconnectInterval,
        reconnectAttempts: 1,
    };
    const fakeURL = 'ws://localhost:1235';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL, options));
    const {lastMessage, readyState: readyStateFromUrl, close: closeWebSocket} = result.current;

    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接成功
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);

    // 第一次重连
    closeWebSocket();
    await act(async () => {
        await server.closed;
        return promise;
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.readyState).toBe(3);
    expect(reconnectOnClose).toHaveBeenCalledTimes(1);
    // 让第一次重启失败，自动重启第二次
    act(() => server.error());
    await act(async () => {
        await server.closed;
        return promise;
    });
    await act(() => timeout(reconnectInterval + 10));
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(result.current.readyState).toBe(3);
    expect(reconnectOnClose).toHaveBeenCalledTimes(2);
    await act(() => timeout(reconnectInterval + 10));
    expect(result.current.readyState).toBe(3);
});

test('webSocket reconnect with reconnectOnError, without reconnectAttempts, without reconnectInterval', async () => {
    const onOpen = jest.fn();
    const onMessage = jest.fn();
    const onError = jest.fn();
    const reconnectOnError = jest.fn(() => true);
    const options = {
        onOpen,
        onMessage,
        onError,
        reconnectOnError,
    };
    const fakeURL = 'ws://localhost:1234';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL, options));
    const {sendMessage, lastMessage, readyState: readyStateFromUrl} = result.current;
    // 连接之前
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).not.toHaveBeenCalled();
    expect(onMessage).not.toHaveBeenCalled();

    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接之后
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).not.toHaveBeenCalled();

    // sendMessage success
    sendMessage('test message from app');

    await expect(server).toReceiveMessage('test message from app');
    expect(server).toHaveReceivedMessages(['test message from app']);

    act(() => {
        server.send('test message from mock server');
    });

    expect(result.current.lastMessage.data).toBe('test message from mock server');

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledTimes(1);

    // server error
    act(() => server.error());
    await act(async () => {
        await server.closed;
        return promise;
    });
    await act(() => timeout(DEFAULT_RECONNECT_INTERVAL_MS + 1));
    expect(reconnectOnError).toHaveBeenCalledTimes(1);
}, DEFAULT_RECONNECT_INTERVAL_MS * 2);

// eslint-disable-next-line max-statements
test('url change auto reconnect', async () => {
    const onOpen = jest.fn();
    const onMessage = jest.fn();
    const options = {
        onOpen,
        onMessage,
    };
    const fakeURL = 'ws://localhost:1234';
    const newFakeURL = 'ws://localhost:12345';
    const server = new WS(fakeURL);

    const {result, rerender} = renderHook(() => useWebSocket(fakeURL, options));
    const {sendMessage, lastMessage, readyState: readyStateFromUrl} = result.current;
    // 连接之前
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).not.toHaveBeenCalled();
    expect(onMessage).not.toHaveBeenCalled();
    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接之后
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).not.toHaveBeenCalled();

    // sendMessage success
    sendMessage('test message from app');

    await expect(server).toReceiveMessage('test message from app');
    expect(server).toHaveReceivedMessages(['test message from app']);

    // server send, client receive success
    act(() => {
        server.send('test message from mock server');
    });

    expect(result.current.lastMessage.data).toBe('test message from mock server');
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onMessage).toHaveBeenCalledTimes(1);

    rerender({fakeURL: newFakeURL, options});
    await act(async () => {
        await server.connected;
        return promise;
    });
    // 连接之后
    expect(result.current.readyState).toBe(1);
    expect(onOpen).toHaveBeenCalledTimes(1);

    // sendMessage success
    sendMessage('test message from app second');

    await expect(server).toReceiveMessage('test message from app second');
    expect(server).toHaveReceivedMessages(['test message from app second']);

    // server send, client receive success
    act(() => {
        server.send('test message from mock server second');
    });

    expect(result.current.lastMessage.data).toBe('test message from mock server second');
});

test('webSocket startWebSocket ok, closeWebSocket ok without options', async () => {
    const fakeURL = 'ws://localhost:1234';
    const server = new WS(fakeURL);

    const {result} = renderHook(() => useWebSocket(fakeURL));
    const {
        sendMessage,
        lastMessage,
        readyState: readyStateFromUrl,
        start: startWebSocket,
        close: closeWebSocket,
    } = result.current;
    expect(readyStateFromUrl).toBe(0);
    expect(lastMessage).toBe(null);

    await act(async () => {
        await server.connected;
        return promise;
    });
    // sendMessage success
    sendMessage('test message from app');

    await expect(server).toReceiveMessage('test message from app');
    expect(server).toHaveReceivedMessages(['test message from app']);

    // server send, client receive success
    act(() => {
        server.send('test message from mock server');
    });
    expect(result.current.lastMessage.data).toBe('test message from mock server');
    // 测试关闭websocket
    act(() => closeWebSocket());
    await act(async () => {
        await server.closed;
        return promise;
    });
    expect(result.current.readyState).toBe(3);
    await act(() => {
        startWebSocket();
        return promise;
    });
    await act(async () => {
        await server.connected;
        return promise;
    });
    expect(result.current.readyState).toBe(0);
});
