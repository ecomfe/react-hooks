import React, { useState, useReducer } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import { useLayoutTiming } from '@huse/performance';

export default () => {
    const [timing, setTiming] = useState();
    const [userClicked, setClicked] = useReducer(() => true, false);
    useLayoutTiming(setTiming, userClicked);
    return (
        <>
            <div style={{marginBottom: 30}}>
                <Button type="primary" onClick={setClicked}>Won't be meaningful until you click here</Button>
            </div>
            {timing && <p style={{color: 'red'}}>{timing.end} (end) - {timing.start} (start) = {timing.ellapsed} (ellapsed)</p>}
        </>
    );
};