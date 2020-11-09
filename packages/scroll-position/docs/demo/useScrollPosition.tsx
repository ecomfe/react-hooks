import React, {useRef} from 'react';
import {useScrollPosition} from '@huse/scroll-position';

export default () => {
    const ref = useRef(null);
    const position = useScrollPosition(ref.current);
    const gradient = 'radial-gradient(circle at 10% 20%, rgb(6, 123, 239) 14.2%, rgb(219, 115, 249) 89.5%)';
    console.log('position---->', position);
    return (
        <>
            <p>Scroll in the color block</p>
            <div ref={ref} style={{height: 200, width: 400, border: '1px solid #ccc', overflow: 'scroll'}}>
                <div style={{background: gradient, height: 600, width: 800}} />
            </div>
            <p>scrollTop: {position.y}</p>
            <p>scrollLeft: {position.x}</p>
        </>
    )
};