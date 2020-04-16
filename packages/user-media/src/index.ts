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

function adapterGetUserMedia(constraints: MediaStreamConstraints): Promise<any> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // 如果有其他getUserMedia实现的话，就获得它
    const getUserMedia = (navigator as any).webkitGetUserMedia
        ? (navigator as any).webkitGetUserMedia : (navigator as any).mozGetUserMedia;
    if (getUserMedia) {
        return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
    // 浏览器没有任何getUserMedia方法
    const error = new Error('getUserMedia is not implemented in this browser');
    (error as any).code = 'ERR_METHOD_NOT_IMPLEMENTED';
    return Promise.reject(error);
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

    // 停止
    const stop = useCallback(() => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            setRecording(false);
            streamRef.current = null;
        }
    }, []);

    // 开启
    const start = useCallback(async () => {
        try {
            // 开启录制时试图关掉上一次流
            stop();
            // 调起getUserMedia参数
            const constraintsParams = originalConstraints ? originalConstraints : DEFAULT_CONSTRAINTS;
            const stream = await adapterGetUserMedia(constraintsParams);
            handleSuccess(stream);
        }
        catch (error) {
            onError && onError(error);
        }
    }, [stop, originalConstraints, handleSuccess, onError]);

    useEffect(() => {
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
