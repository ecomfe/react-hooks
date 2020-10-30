import React from 'react';
import {Button,Row, Col} from 'antd';
import 'antd/dist/antd.min.css';
import {useCounter} from '@huse/number';

export default () => {
    const [value, {increment, decrement, reset}] = useCounter(3);
    console.log(value);
    return (
        <Row>
            <Col span={2}>
                <Button type="primary" onClick={decrement}>-1</Button>
            </Col>
            <Col span={4}>
                <Button danger style={{padding: '0 50px'}}> {value} </Button>
            </Col>
            <Col span={2}>
                <Button type="primary" onClick={increment}>+1</Button>
            </Col>
            <Col span={1}>
                <Button type="primary" onClick={() => reset()}>Reset</Button>
            </Col>
        </Row>
    );
};