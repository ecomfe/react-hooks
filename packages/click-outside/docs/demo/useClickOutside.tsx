import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import { useClickOutside } from '@huse/click-outside';

export default () => {
    const ref = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    useClickOutside(ref, () => setModalOpen(false));
    const maskStyle = {
        position: 'fixed',
        zIndex: 999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .4)'
    };
    const modalStyle = {
        position: 'fixed',
        zIndex: 1000,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        border: '3px solid #ccc',
        padding: 40,
    };
    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            {
                modalOpen && (
                    <div style={maskStyle}>
                        <div ref={ref} style={modalStyle}>
                            <h2>Hello</h2>
                            <p>Click elsewhere to close this modal</p>
                        </div>
                    </div>
                )
            }
        </>
    );
};