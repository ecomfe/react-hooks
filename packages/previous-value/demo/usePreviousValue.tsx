import React, {useReducer} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {usePreviousValue} from '@huse/previous-value';

export default () => {
    const [value, increment] = useReducer(v => v + 1, 0);
    const previousValue = usePreviousValue(value);
    return (
        <div>
            <p>Result: <span style={{ color: 'red'}}>{previousValue === undefined ? value : `${previousValue} -> ${value}`}</span></p>
            <Button type='primary' onClick={increment}>Click +1</Button>
        </div>
    );
};