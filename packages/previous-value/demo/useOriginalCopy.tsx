import React, { useReducer, useEffect } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import { useOriginalCopy } from '@huse/previous-value';

export default () => {
    const [effectsCount, runEffect] = useReducer(v => v + 1, 0);
    const forceUpdate = useReducer(v => v + 1, 0)[1];
    // This is not memoized
    const value = {x: 1};
    // The original copy of value if retrieved on each render
    const originalValue = useOriginalCopy(value);
    // originalValue will be reference equal on different render, effect runs only once
    useEffect(
        () => {
            runEffect();
        },
        [originalValue]
    );
    console.log(effectsCount);
    return (
        <div>
            <p style={{marginBottom:30}}>Effect run {effectsCount} times.</p>
            <Button type="primary" onClick={forceUpdate}>Force Update</Button>
        </div>
    );
};