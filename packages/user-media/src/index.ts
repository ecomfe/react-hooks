import {useState, useEffect, useCallback, useRef} from 'react';
import {useOriginalCopy} from '@huse/previous-value';

export interface UserMediaResult {
    stream: MediaStream | null;
    recording: boolean;
    start: () => void;
    stop: () => void;
}

// 默认是最简单的配置，摄像头和语音都打开
const DEFAULT_CONSTRAINTS = {
    video: true,
    audio: true,
};

// 兼容getUserMedia接口 参考: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
function adapterUserMedia(): void {
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
        (navigator as any).mediaDevices = {};
    }

    // 一些浏览器部分支持mediaDevices。我们不能直接给对象设置getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = constraints => {
            // 首先，如果有getUserMedia的话，就获得它
            const getUserMedia = (navigator as any).webkitGetUserMedia
                ? (navigator as any).webkitGetUserMedia : (navigator as any).mozGetUserMedia;

            // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            // 否则，为老的navigator.getUserMedia方法包裹一个Promise
            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
}

export function useUserMedia(
    constraints?: MediaStreamConstraints,
    onSuccess?: (stream: MediaStream) => void,
    onError?: (error: Error) => void
): UserMediaResult {
    const [recording, setRecording] = useState<boolean>(false);

    const originalConstraints = useOriginalCopy(constraints);

    // 流对象
    const streamRef = useRef<MediaStream | null>(null);

    // 开启成功
    const handleSuccess = useCallback((stream: MediaStream) => {
        streamRef.current = stream;
        setRecording(true);
        onSuccess && onSuccess(stream);
    }, [onSuccess]);

    // 开启
    const start = useCallback(async () => {
        // 调起getUserMedia参数
        const constraintsParams = originalConstraints ? originalConstraints : DEFAULT_CONSTRAINTS;
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraintsParams);
            handleSuccess(stream);
        }
        catch (error) {
            onError && onError(error);
        }
    }, [originalConstraints, handleSuccess, onError]);

    // 停止
    const stop = useCallback(() => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            setRecording(false);
        }
    }, []);

    useEffect(() => {
        // 浏览器接口兼容
        adapterUserMedia();

        // 这里自动帮用户兜底，关掉开启的流
        return () => {
            stop();
        };
    }, [stop]);

    return {
        stream: streamRef.current,
        recording,
        start,
        stop,
    };
}
