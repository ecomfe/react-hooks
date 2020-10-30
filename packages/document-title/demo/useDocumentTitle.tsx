import React, {useState} from 'react';
import { Input,Row,Col } from 'antd';
import 'antd/dist/antd.min.css';
import {useDocumentTitle} from '@huse/document-title';

export default () => {
    const [title, setTitle] = useState('');
    useDocumentTitle(title);
    return (
        <>
            <h3> change document.title</h3>
            <Row>
                <Col span={12}>
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                </Col>
                <Col span={12}>
                    
                </Col>
                <p style={{ fontSize: 16, color: 'red', marginTop:10 }}>(Leave this page will reset <code>document.title</code>)</p>
            </Row>
        </>
    );
};