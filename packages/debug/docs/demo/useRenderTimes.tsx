import React, {useState} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useRenderTimes, useChangeTimes, useUpdateCause} from '@huse/debug';

export default () => {
    const [value, setValue] = useState(0);
    const renderTimes = useRenderTimes();
    return (
        <>
            <Button  type="primary" onClick={() => setValue(value => value - 1)}>-1</Button>
            <Button danger>{value}<span style={{ color: '#999', padding: '0 10px' }}>(rendered {renderTimes} times)</span></Button>
            <Button  type="primary" onClick={() => setValue(value => value + 1)}>+1</Button>
        </>
    );
};