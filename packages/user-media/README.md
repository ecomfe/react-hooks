# @huse/user-media

web客户端获取音视频媒体的hook

## useUserMedia

通过传入`constraint`和成功/失败的回调方法，`useUserMedia`支持在web客户端获取用户音视频流

```typescript
interface UserMediaHook {
    stream: MediaStream | null;
    recording: boolean;
    start: () => void;
    stop: () => void;
}

function useUserMedia(
    constraints?: MediaStreamConstraints,
    onSuccess?: (stream: MediaStream) => void,
    onError?: (error: Error) => void
): UserMediaHook;
```

示例：实时录制用户音视频并展示在播放器上

```jsx
import {useMemo, useCallback, useRef, useEffect} from 'react';
import {useUserMedia} from '@huse/user-media';

const App = () => {
    const videoRef = useRef();

    // 自定义getUserMedia参数
    const constraints = useMemo(() => ({
        video: true,
        audio: {
            sampleRate: 16000,
            sampleSize: 16,
            channelCount: 1
        }
    }), []);
    // 开启录制成功后的回调
    const handleSuccess = useCallback(stream => {
        const video = videoRef.current;
        if (video) {
            video.srcObject = stream;
        }
    }, []);
    // 开启录制失败后的回调
    const handleError = useCallback(error => {
        console.error('navigator.getUserMedia error: ', error);
    }, []);
    const {start, stop} = useUserMedia(constraints, handleSuccess, handleError);

    useEffect(() => {
        // 开启录制
        start();
        return () => {
            // 停止录制
            stop();
        };
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                width="600"
                height="400"
            />
        </div>
    );
};
```
