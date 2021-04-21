import React from 'react';
import {useOnScreen} from '@huse/intersection';
import './useOnScreen.less';

export default () => {
    const [ref, isOnScreen] = useOnScreen({rootMargin: '10px', threshold: 0.3});
    return (
        <>
            <h1>Scroll Your Web 👇</h1>
            <p>
                <span className='tips'>Visual port is currently 👉 </span>
                <span className='change-tips'>{isOnScreen ? 'on' : 'out of'} screen</span> 
            </p>
            <div className='visual-port' ref={ref}>
                This is visual port
            </div>
        </>
    );
};