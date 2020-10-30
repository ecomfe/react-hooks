import React, {useState, useCallback} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useSnapshotState} from '@huse/snapshot';

export default () => {
    // A 3x3 matrix
    const [matrix, setMatrix, {undo, redo, canUndo, canRedo}] = useSnapshotState(() => Array(9).fill(false));
    const toggleCell = useCallback(
        i => {
            const toggle = matrix => [
                ...matrix.slice(0, i),
                !matrix[i],
                ...matrix.slice(i + 1),
            ];
            setMatrix(toggle);
        },
        []
    );
    const cellStyle = i => {
        const selected = matrix[i];
        return {
            outline: '1px solid #9ad3bc',
            width: 80,
            height: 80,
            backgroundColor: matrix[i] ? '#f5b461' : ''
        };
    };
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>click cell to draw</h3>
                <div style={{ marginBottom: 20 }}>
                    <Button style={{ marginRight: 15 }} type='primary' onClick={undo} disabled={!canUndo}>Undo</Button>
                    <Button type='primary' onClick={redo} disabled={!canRedo}>Redo</Button>
                </div>
                <div style={{width: 240, height: 240, display: 'flex', flexWrap: 'wrap'}}>
                    <div style={cellStyle(0)} onClick={() => toggleCell(0)} />
                    <div style={cellStyle(1)} onClick={() => toggleCell(1)} />
                    <div style={cellStyle(2)} onClick={() => toggleCell(2)} />
                    <div style={cellStyle(3)} onClick={() => toggleCell(3)} />
                    <div style={cellStyle(4)} onClick={() => toggleCell(4)} />
                    <div style={cellStyle(5)} onClick={() => toggleCell(5)} />
                    <div style={cellStyle(6)} onClick={() => toggleCell(6)} />
                    <div style={cellStyle(7)} onClick={() => toggleCell(7)} />
                    <div style={cellStyle(8)} onClick={() => toggleCell(8)} />
                </div>
            </div>
        </>
    );
};