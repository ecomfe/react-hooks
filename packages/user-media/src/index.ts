import {useEffect, useCallback, useRef, useReducer} from 'react';
import {useOriginalDeepCopy} from '@huse/previous-value';

export interface UserMediaHook {
    stream: MediaStream | null;
    recording: boolean;
    error: Error | null;
    start: () => void;
    stop: () => void;
}

// 默认是最简单的配置，摄像头和语音都打开
const DEFAULT_CONSTRAINTS = {
    video: true,
    audio: true,
};

function adapterGetUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    if (navigator.mediaDevices?.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // Use prefixed version of legacy `getUserMedia` method
    const getUserMedia = (navigator as any).webkitGetUserMedia ?? (navigator as any).mozGetUserMedia;
    if (getUserMedia) {
        return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
    // Not implemented in browser
    const error = new Error('getUserMedia is not implemented in this browser');
    (error as any).code = 'ERR_METHOD_NOT_IMPLEMENTED';
    return Promise.reject(error);
}

interface MediaResult {
    recording: boolean;
    error: Error | null;
}

type MediaAction = {type: 'success'} | {type: 'stop'} | {type: 'error', payload: Error};

const reduceMediaResult = (state: MediaResult, action: MediaAction): MediaResult => {
    switch (action.type) {
        case 'success':
            return {
                recording: true,
                error: null,
            };
        case 'stop':
            return {
                recording: false,
                error: null,
            };
        case 'error':
            return {
                recording: false,
                error: action.payload,
            };
        /* istanbul ignore next */
        default:
            return state;
    }
};

export function useUserMedia(
    constraints?: MediaStreamConstraints,
    onSuccess?: (stream: MediaStream) => void,
    onError?: (error: Error) => void
): UserMediaHook {
    const [{recording, error}, dispatch] = useReducer(reduceMediaResult, {recording: false, error: null});
    const originalConstraints = useOriginalDeepCopy(constraints);
    // In order to make `stop` function always reference identical, we have to manage stream in a mutable ref.
    const streamRef = useRef<MediaStream | null>(null);
    const stop = useCallback(
        () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach(track => track.stop());
                dispatch({type: 'stop'});
                streamRef.current = null;
            }
        },
        []
    );
    const start = useCallback(
        async () => {
            try {
                // Stop previous stream before a new stream is started
                stop();
                const constraintsParams = originalConstraints ?? DEFAULT_CONSTRAINTS;
                const stream = await adapterGetUserMedia(constraintsParams);
                streamRef.current = stream;
                dispatch({type: 'success'});
                onSuccess && onSuccess(stream);
            }
            catch (error) {
                dispatch({type: 'error', payload: error});
                onError && onError(error);
            }
        },
        [stop, originalConstraints, onSuccess, onError]
    );
    // Force stop stream when component unmounts to prevent memory leak
    useEffect(() => stop, [stop]);

    return {
        recording,
        error,
        start,
        stop,
        stream: streamRef.current,
    };
}
