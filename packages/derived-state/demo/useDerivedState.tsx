import React, { useState } from 'react';
import { Row , Col,Button, Input } from 'antd';
import 'antd/dist/antd.min.css';
import './useDerivedState.less'
import { useDerivedState } from '@huse/derived-state';

export default () => {
    const [name, setName] = useState('');
    const [commitedName, commitName] = useState('');
    const [welcome, setWelcome] = useDerivedState(commitedName, name => `Hello ${name}:`);
    return (
        <>
            <Row>
                <Col span={12}>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder='Input Your Name'/>
                </Col>
                <Col span={12}>
                    <Button disabled={!name} onClick={() => commitName(name)}>OK</Button>
                </Col>
                <p className='memo-tips'>{commitedName && '(Tips:Change name and click OK will reset memo area)'}</p>
            </Row>
            {
                commitedName && (
                    <div className="memo-box">
                        <h4>Write a memo</h4>
                        <Input.TextArea rows={4} value={welcome} onChange={e => setWelcome(e.target.value)} /> 
                    </div>
                )
            }
        </>
    );
};