import React, {useState} from 'react';
import {Button, Switch, Row, Col} from 'antd';
import 'antd/dist/antd.min.css';
import {useMethods, useMethodsExtension} from '@huse/methods';

export default () => {
    const userMethods = {
        asAdmin(user) {
            user.role = 'admin';
            user.history.push('change to admin');
        },
        asUser(user) {
            user.role = 'uesr';
            user.history.push('change to user');
        },
        enable(user) {
            user.enabled = true;
            user.history.push('disabled');
        },
        disable(user) {
            user.enabled = false;
            user.history.push('enabled');
        },
    };
    const [user, methods] = useMethods(
        userMethods,
        {role: 'user', enabled: true, history: []}
    );
    return (
        <>
            <Row>
                <Col span={2}>
                    Admin: <Switch checked={user.role === 'admin'} onChange={user.role === 'admin' ? methods.asUser : methods.asAdmin} />
                </Col>
                <Col span={2}>
                    Enabled: <Switch checked={user.enabled} onChange={user.enabled ? methods.disable : methods.enable} />
                </Col>
            </Row>
            <h3 style={{marginTop: 30}}>Mutation history:</h3>
            <ul>
                {user.history.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </>
    );
};