import React, {useReducer, useCallback} from 'react';
import {useHover} from '@huse/hover';

export default () => {
    const [hoverTimes, enter] = useReducer(v => v + 1, 0);
    const [isHover, hoverCallbacks] = useHover({onEnter: enter});
    return (
        <div {...hoverCallbacks}>
            Hovered
            <span style={{ color: 'red' }}>{hoverTimes}</span> times
            <span style={{ color: 'red' }}>{isHover && '(hovered)'}</span>
        </div>
    );
};