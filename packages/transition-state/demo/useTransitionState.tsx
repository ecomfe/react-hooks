import React, {useCallback} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useTransitionState} from '@huse/transition-state';

export default () => {
    // Save data to server, mocked
    const saveData = () => new Promise(resolve => setTimeout(resolve, 20));
    const [message, setMessage] = useTransitionState('', 4 * 1000);
    const submit = useCallback(
        () => {
            // Will change back to "Submit" after 4 seconds
            saveData().then(() => setMessage('Saved!'));
        },
        [setMessage, saveData]
    );
    return (
        <>
            <Button style={{ marginRight: 30 }} type='primary' onClick={submit}>Submit Message</Button>
            <span style={{color: '#0b8235', transition: 'all .1s ease-in', opacity: message ? 1 : 0}}>
                {message}
            </span>
        </>
    );
};