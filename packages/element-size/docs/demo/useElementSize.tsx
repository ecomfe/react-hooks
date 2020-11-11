import React, {useState, useReducer, useCallback} from 'react';
import {useElementResize, useElementSize} from '@huse/element-size';

export default () => {
    const [ref, size] = useElementSize();
    return (
        <div
            ref={ref}
            style={{height: 60, lineHeight: '60px', textAlign: 'center', backgroundColor: '#007bd2', fontSize: 36, color: '#fff'}}
        >
            {size && `${size.width} x ${size.height}`}
        </div>
    );
};