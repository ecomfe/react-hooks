import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useImmerReducer} from '@huse/immer';

export default () => {
    const [state, dispatch] = useImmerReducer(
        (state, action) => {
            switch (action.type) {
                case 'inc':
                    state.value++;
                    break;
                case 'dec':
                    state.value--;
                    break;
                case 'reset':
                    return {value: 0};
                default:
                    return state;
            }
        },
        {value: 0}
    );
    return (
        <>
            <p style={{ fontSize: 16 }}>current value: <span style={{ color: 'red' }}>{state.value}</span></p>
            <div>
                <Button type='primary' style={{marginRight:20}} onClick={() => dispatch({type: 'inc'})}>Increment</Button>
                <Button type='primary' style={{marginRight:20}} onClick={() => dispatch({type: 'dec'})}>Decrement</Button>
                <Button type='primary' style={{marginRight:20}} onClick={() => dispatch({type: 'reset'})}>Reset</Button>
            </div>
        </>
    );
};