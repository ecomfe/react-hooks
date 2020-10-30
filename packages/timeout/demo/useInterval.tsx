import React, {useState} from 'react';
import {Slider} from 'antd';
import 'antd/dist/antd.min.css';
import {useTimeout, useInterval} from '@huse/timeout';

export default () => {
    const [theme, setTheme] = useState('light');
    // Switch theme every 5s
    useInterval(
        () => setTheme(theme => (theme === 'light' ? 'dark' : 'light')),
        5 * 1000
    );
    const style = {
        height: 40,
        lineHeight: '40px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#666' : '#f4f5f6',
    };
    return (
        <>
            <div style={style}>
                Hello World
            </div>
        </>
    );
};