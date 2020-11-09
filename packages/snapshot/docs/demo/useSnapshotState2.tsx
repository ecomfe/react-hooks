import React from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useSnapshotState} from '@huse/snapshot';

export default () => {
    // save to history after 2s
    const [content, setContent, {undo, redo, canUndo, canRedo}] = useSnapshotState('', {delay: 2000});
    return (
        <>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <Button style={{ marginRight: 15 }} type='primary' onClick={undo} disabled={!canUndo}>Undo</Button>
                    <Button type='primary' onClick={redo} disabled={!canRedo}>Redo</Button>
                </div>
                <div>
                    <Input.TextArea placeholder='input something...' rows={6} value={content} onChange={e => setContent(e.target.value)} />
                </div>
            </div>
        </>
    );
};