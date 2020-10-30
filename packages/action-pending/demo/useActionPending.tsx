import React from 'react';
import { Button, Spin } from 'antd';
import 'antd/dist/antd.min.css';
import './useActionPending.less';
import { useActionPending } from '@huse/action-pending';

export default () => {
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    const [waitTime, pendingCount] = useActionPending(wait);
    return (
        <>
            <div className='btns'>
                <Button type="primary" onClick={() => waitTime(2000)}>Wait 2s</Button>
                <Button type="primary" onClick={() => waitTime(4000)}>Wait 4s</Button>
                <Button type="primary" onClick={() => waitTime(6000)}>Wait 6s</Button>
                <Button type="primary" onClick={() => waitTime(8000)}>Wait 8s</Button>
            </div>
            {!!pendingCount && <div style={{color:'red'}}><Spin /> {pendingCount} timeouts in the queue</div>}
        </>
    );
};