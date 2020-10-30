import React, {useState} from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.min.css';
import { useDebouncedEffect } from '@huse/debounce';

export default () => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    useDebouncedEffect(
        () => {
            value && setMessage(`Value updated to ${value}`);
        },
        value,
        200
    );
    return (
        <>
            <div>
                <Input placeholder='input something...' value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div style={{marginTop: 20, color: 'red'}}>{message}</div>
        </>
    );
};