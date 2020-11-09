import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useUserMedia} from '@huse/user-media';

export default () => {
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
    return (
        <>
            <div>
                <Button type="primary" onClick={start}>Start Record</Button>
                <p style={{marginTop: 10,color: 'red' }}>(Tips: This only works locally, video and audio will not be sent anywhere)</p>
            </div>
            <div>
                <video
                    ref={videoRef}
                    autoPlay
                    width={600}
                    height={400}
                />
            </div>
        </>
    );
};