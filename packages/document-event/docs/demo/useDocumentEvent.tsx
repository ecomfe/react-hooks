import React, { useReducer } from 'react';
import { useDocumentEvent } from '@huse/document-event';

export default () => {
    const [down, addDown] = useReducer(v => v + 1, 0);
    const [up, addUp] = useReducer(v => v + 1, 0);
    const [key, addKey] = useReducer(v => v + 1, 0);
    useDocumentEvent('mousedown', addDown);
    useDocumentEvent('mouseup', addUp);
    useDocumentEvent('keypress', addKey);
    return (
        <>
            <p>
                <h3>Mouse Down:</h3>
                <span style={{ color: 'red' }}> {down} times</span>
            </p>
            <p>
                <h3>Mouse Up:</h3>
                <span style={{ color: 'red' }}> {up} times</span>
            </p>
            <p>
                <h3>Key Press:</h3>
                <span style={{ color: 'red' }}> {key} times</span>
            </p>
        </>
    );
};