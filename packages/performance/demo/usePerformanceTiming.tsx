import React, {useState, useReducer} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {usePerformanceTiming, useLayoutTiming} from '@huse/performance';

interface Timings {
    [flag: string]: number;
    initialRender: number;
    initialLayout: number;
}

export default () => {
    // Don't do this in production!
    const [timing, setTiming] = useState<Timings>({initialRender: 0, initialLayout: 0, userClicked: 0})
    const [userClicked, setClicked] = useReducer(() => true, false);
    usePerformanceTiming(
        setTiming,
        {flags: {userClicked}}
    );
    console.log(timing);
    return (
        <>
            <div style={{marginBottom: 30}}>
                <Button type="primary" onClick={setClicked}>Click to update timing</Button>
            </div>
            <p>
                initialRender: <span style={{ marginLeft: 10 }}>{timing.initialRender || 'N/A'}</span>
            </p>
            <p>
                initialLayout: <span style={{ marginLeft: 10 }}>{timing.initialLayout || 'N/A'}</span>
            </p>
            <p>
                userClicked: <span style={{ color: 'red', marginLeft: 10 }}>{timing.userClicked || 'N/A'}</span>
            </p>
        </>
    );
};