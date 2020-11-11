import React, {useState} from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.min.css';
import { useDebouncedValue } from '@huse/debounce';

export default () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebouncedValue(value, 200); // debounced update 200ms
    return (
        <>
            <div>
                <Input placeholder='input something...' value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div style={{marginTop: 20}}>
                Current Value:  <span style={{color: 'red'}}>{debouncedValue}</span>
            </div>
        </>
    );
};