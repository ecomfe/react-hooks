import React, {useState, useReducer, useCallback} from 'react';
import {useElementResize, useElementSize} from '@huse/element-size';

export default () => {
    const [height, increaseHeight] = useReducer(v => v + 20, 60);
    const [size, setSize] = useState([0, 0]);
    const observeSize = useCallback(
        element => setSize([element.offsetWidth, element.offsetHeight]),
        []
    );
    const ref = useElementResize(observeSize);
    return (
        <div
            ref={ref}
            style={{height, lineHeight: `${height}px`, textAlign: 'center', backgroundColor: '#007bd2', fontSize: 36, color: '#fff'}}
            onClick={increaseHeight}
        >
            {size[0]} x {size[1]} (click to increase height)
        </div>
    );
};