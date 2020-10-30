import React from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import {useOnLine} from '@huse/network';

export default () => {
    const isOnLine = useOnLine();
    return (
        <>
            {isOnLine ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            <span style={{ marginLeft: 10}}>You are currently</span>
            {
                isOnLine
                    ? <strong style={{ color: 'green' }}> ONLINE </strong>
                    : <strong style={{ color: 'red' }}> OFFLINE </strong> 
            }
            
        </>
    )
};