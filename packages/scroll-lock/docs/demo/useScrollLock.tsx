import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.min.css';
import {useScrollLock} from '@huse/scroll-lock';

export default () => {
    const [modalOpen, setModalOpen] = useState(false);
    useScrollLock(modalOpen);
    return (
        <>
            <Button type='primary' onClick={() => setModalOpen(true)}>Open Modal</Button>
            {
                modalOpen && (
                    <Modal
                        visible
                        title="Notification"
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    >
                        This is a modal
                    </Modal>
                )
            }
        </>
    );
};