import React, {useCallback} from 'react';
import {Spin} from 'antd';
import 'antd/dist/antd.min.css';
import {usePoll} from '@huse/poll';

export default () => {
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1500)),
        []
    );
    const options = {
        minInterval: 5 * 1000,
        maxInterval: 20 * 1000,
        maxIdleTime: 30 * 1000,
        stopOnInactive: true,
    };
    const [value, pendingCount] = usePoll(generateRandom, options);
    return (
        <>
            <div style={{marginBottom: 30}}>
                <span style={{ color: 'red', marginRight: 30}}>{value}</span>
                {!!pendingCount && <Spin />}
            </div>
            <p>Poll will slow down when you keep inactive for 30s.</p>
            <p>Poll will stop when you switch to another app.</p>
        </>
    );
};