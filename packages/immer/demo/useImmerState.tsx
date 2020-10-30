import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useImmerState} from '@huse/immer';

export default () => {
    const [state, setState] = useImmerState({value: 1});
    return (
        <>
            <p style={{ fontSize: 16 }}>current value: <span style={{ color: 'red' }}>{state.value}</span></p>
            <div>
                {/* mutate state */}
                <Button type='primary' style={{marginRight:20}} onClick={() => setState(s => void s.value++)}>Increment</Button>
                {/* return a new state */}
                <Button type='primary' style={{marginRight:20}} onClick={() => setState(s => ({value: s.value - 1}))}>Decrement</Button>
                {/* set to a new state */}
                <Button type='primary' style={{marginRight:20}} onClick={() => setState({value: 0})}>Reset</Button>
            </div>
        </>
    );
};