import React from 'react';
import {Input, Form} from 'antd';
import 'antd/dist/antd.min.css';
import {useInputValue} from '@huse/input-value';

export default () => {
    const name = useInputValue('');
    const age = useInputValue(10);
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
    };
    return (
        <>
            <Form {...layout}>
                <Form.Item label="Username" name="username">
                    <Input {...name} />
                </Form.Item>
                <Form.Item label="Age" name="age">
                    <Input type="number" {...age} />
                </Form.Item>
            </Form>
        </>
    );
};