import React, {useReducer, useCallback} from 'react';
import {useHover} from '@huse/hover';

export default () => {
    const [isHover, hoverCallbacks] = useHover({delay: 2000});
    const [hoverTimes, increaseHoverTimes] = useReducer(v => v + 1, 0);
    const enter = useCallback(
        e => {
            increaseHoverTimes();
            hoverCallbacks.onMouseEnter(e);
        },
        []
    );
    return (
        <div {...hoverCallbacks} onMouseEnter={enter}>
            Hovered
            <span style={{ color: 'red' }}> {hoverTimes} </span> times
            <span style={{ color: 'red' }}> {isHover && '(hovered)'} </span>
        </div>
    );
};