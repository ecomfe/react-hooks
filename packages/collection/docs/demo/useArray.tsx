import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import './useArray.less'
import { useArray } from '@huse/collection';

const getRandomColor = function () {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};
export default () => {
    const [array, methods] = useArray(() => Array.from({length: 3}, () => Math.random()));
    const renderItem = (value, i) => (
        <div key={i} className='item-style' style={{backgroundColor: getRandomColor()}}>
            #{i}: {value}
        </div>
    );
    return (
        <>
            <div className='click-btn'>
                <Button onClick={() => methods.push(Math.random())}>Add Item</Button>
            </div>
            {array.map(renderItem)}
        </>
    );
};