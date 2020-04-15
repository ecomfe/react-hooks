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
const onSuccess = jest.fn();
const onError = jest.fn();

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
        mockNavigator('hasUserMedia');
        renderHook(() => useUserMedia(constraints, onSuccess, onError));
        expect(typeof global.navigator.mediaDevices.getUserMedia).toBe('function');
    });
    test('webkitGetUserMedia', () => {
        mockNavigator('webkitGetUserMedia');
        renderHook(() => useUserMedia(constraints, onSuccess, onError));
        expect(typeof global.navigator.mediaDevices.getUserMedia).toBe('function');
    });
    test('noMediaDevices', () => {
        mockNavigator('noMediaDevices');
        renderHook(() => useUserMedia(constraints, onSuccess, onError));
        expect(typeof global.navigator.mediaDevices.getUserMedia).toBe('function');
    });
});

// start
describe('start success, stop success', () => {
    test('hasUserMedia', async () => {
        mockNavigator('hasUserMedia');
        const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording} = result.current;
        expect(stopRecording).toBe(false);
    });
    test('webkitGetUserMedia', async () => {
        mockNavigator('webkitGetUserMedia');
        const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording} = result.current;
        expect(stopRecording).toBe(false);
    });
    test('no constraints', async () => {
        mockNavigator('webkitGetUserMedia');
        const {result} = renderHook(() => useUserMedia(undefined, onSuccess, onError));
        const {start, stop} = result.current;
        await act(() => start());
        const {stream, recording} = result.current;
        expect(onSuccess).toHaveBeenCalled();
        expect(typeof stream).toBe('object');
        expect(recording).toBe(true);
        act(() => stop());
        const {recording: stopRecording} = result.current;
        expect(stopRecording).toBe(false);
    });
});

test('start error, stop error', async () => {
    mockNavigator('noMediaDevices');
    const {result} = renderHook(() => useUserMedia(constraints, onSuccess, onError));
    const {start, stop} = result.current;
    await act(() => start());
    act(() => stop());
    expect(onError).toHaveBeenCalled();
});
