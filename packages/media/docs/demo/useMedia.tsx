import React from 'react';
import {useMedia, usePreferDarkMode} from '@huse/media';

export default () => {
    const isMobile = useMedia('only screen and (min-device-width : 320px) and (max-device-width : 480px)');
    const isPad = useMedia('only screen and (min-device-width : 768px) and (max-device-width : 1024px)');
    const isDesktop = useMedia('only screen and (min-width : 1224px)');
    const deviceType = (() => {
        if (isMobile) {
            return 'Mobile';
        }
        if (isPad) {
            return 'Pad';
        }
        if (isDesktop) {
            return 'Desktop';
        }
        return 'Others';
    })();
    return (
        <p>
            Your device: <span style={{ color: 'red' }}>{deviceType}</span>
        </p>
    );
};