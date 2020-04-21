import {renderHook, act} from '@testing-library/react-hooks';

import {useUserMedia} from '../index';

// 自定义getUserMedia参数
const constraints = {
    video: true,
    audio: {
        sampleRate: 16000,
        sampleSize: 16,
        channelCount: 1,
    },
};

// mockNavigator
const mockNavigator = type => {
    global.navigator = {};
    if (type === 'noMediaDevices') {
        global.navigator.mediaDevices = undefined;
        global.navigator.webkitGetUserMedia = undefined;
    }
    else if (type === 'hasUserMedia') {
        global.navigator.mediaDevices = {
            getUserMedia: () => new Promise(resolve => {
                resolve({
                    getTracks: () => ([
                        {stop: () => ('停止...')},
                    ]),
                });
            }),
        };
    }
    else if (type === 'webkitGetUserMedia') {
        global.navigator.mediaDevices = undefined;
        global.navigator.webkitGetUserMedia = (__, callback) => {
            callback({
                getTracks: () => ([
                    {stop: () => ('停止...')},
                ]),
            });
        };
    }
};

// 测试 adapterUserMedia
describe('adapterUserMedia', () => {
    test('hasUserMedia', () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        mockNavigator('hasUserMedia');
        renderHook(() => useUserMedia(constraints, onSuccess, onError));
        expect(typeof global.navigator.mediaDevices.getUserMedia).toBe('function');
    });

    test('webkitGetUserMedia', () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        mockNavigator('webkitGetUserMedia');
        renderHook(() => useUserMedia(constraints, onSuccess, onError));
        expect(typeof global.navigator.webkitGetUserMedia).toBe('function');
    });
});

// start
describe('start success, stop success', () => {
    test('hasUserMedia', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        mockNavigator('hasUserMedia');
        const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording, stream: closeStream} = result.current;
        expect(stopRecording).toBe(false);
        expect(closeStream).toBe(null);
    });

    test('webkitGetUserMedia', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        mockNavigator('webkitGetUserMedia');
        const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording, stream: closeStream} = result.current;
        expect(stopRecording).toBe(false);
        expect(closeStream).toBe(null);
    });

    test('no constraints', async () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        mockNavigator('hasUserMedia');
        const {result} = renderHook(() => useUserMedia(undefined, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording, stream: closeStream} = result.current;
        expect(stopRecording).toBe(false);
        expect(closeStream).toBe(null);
    });
});

test('start error, stop error', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    mockNavigator('noMediaDevices');
    const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
    const {start, stop} = result.current;
    await act(() => start());
    act(() => stop());
    expect(onError).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
});
