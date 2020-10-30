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
    // Polls every 10s
    const [value, pendingCount] = usePoll(generateRandom, 10 * 1000);
    return (
        <div>
            <span style={{ color: 'red', marginRight: 30 }}>{value}</span>
            {!!pendingCount && <Spin />}
        </div>
    );
};