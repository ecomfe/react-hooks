# @huse/user-media

Open a media stream in browser to produce video and audio from client.

## useUserMedia

This hook tries to open a media stream via its `constraints` argument, returning a context indicating current streaming state, see [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to understand its underlying browser capabilities.

```typescript
interface UserMediaHook {
    stream: MediaStream | null;
    recording: boolean;
    error: Error | null;
    start: () => void;
    stop: () => void;
}

function useUserMedia(
    constraints?: MediaStreamConstraints,
    onSuccess?: (stream: MediaStream) => void,
    onError?: (error: Error) => void
): UserMediaHook;
```

By default `useUserMedia` requires both video and audio channels.

**NOTE: On a browser where `getUserMedia` is not implemented, this hooks returns `UserMediaHook` object with a special `error` containing `code` property of `"ERR_METHOD_NOT_IMPLEMENTED"`.**

```jsx
import {useMemo, useCallback, useRef, useEffect} from 'react';
import {useUserMedia} from '@huse/user-media';

const App = () => {
    const videoRef = useRef();

    // Constraints will be deep compared, it's safe to omit a useMemo here
    const constraints = {
        video: true,
        audio: {
            sampleRate: 16000,
            sampleSize: 16,
            channelCount: 1
        }
    };
    // Invokes after media is opened
    const handleSuccess = useCallback(
        stream => {
            const video = videoRef.current;
            if (video) {
                video.srcObject = stream;
            }
        },
        []
    );
    // Invokes if media failes to open
    const handleError = useCallback(
        error => {
            console.error('navigator.getUserMedia error: ', error);
        },
        []
    );
    const {start, stop} = useUserMedia(constraints, handleSuccess, handleError);
    useEffect(
        () => {
            start();
            return stop;
        },
        []
    );

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                width={600}
                height={400}
            />
        </div>
    );
};
```
