import React, {useRef} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useForceUpdate} from '@huse/update';

export default () => {
    const renderTimes = useRef(0);
    const forceUpdate = useForceUpdate();
    renderTimes.current++;
    return (
        <div>
            <p>Rendered <span style={{color: 'red',fontSize: 20}}> {renderTimes.current} </span> times</p>
            <Button type='primary' onClick={forceUpdate}>Update</Button>
        </div>
    );
};