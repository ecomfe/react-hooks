import React, {useState, useCallback} from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useLocalStorage} from '@huse/local-storage';

export default () => {
    const [storageValue, setValueToStorage] = useLocalStorage('memo', '');
    const [value, setValue] = useState(storageValue);
    const commitValue = useCallback(
        () => setValueToStorage(value),
        [setValueToStorage, value]
    );
    return (
        <>
            <Input value={value} onChange={e => setValue(e.target.value)} />
            <Button type="primary" style={{marginTop: 30}} onClick={commitValue}>Save localStorage Value in Your browser</Button>
        </>
    );
};