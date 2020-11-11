import React from 'react';
import {useMedia, usePreferDarkMode} from '@huse/media';

export default () => {
    const darkMode = usePreferDarkMode();
    const backgroundColor = darkMode ? '#222' : '#fff';
    const color = darkMode ? '#f5f6f7' : '#666';
    return (
        <div style={{color, backgroundColor, height: 60, lineHeight: '60px', textAlign: 'center', fontSize: 30}}>
            Good {darkMode ? 'Evening' : 'Morning'}
        </div>
    );
};