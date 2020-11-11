import React from 'react';
import {useWindowSize} from '@huse/window-size';

export default () => {
    const size = useWindowSize();
    return (
        <>
            <p>Outer: <span style={{ color: 'red' }}>{size.outerWidth} x {size.outerHeight}</span></p>
            <p>Inner: <span style={{ color: 'red' }}>{size.innerWidth} x {size.innerHeight}</span></p>
            <p>Resize window to update</p>
        </>
    );
};