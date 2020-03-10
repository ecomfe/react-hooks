# @huse/snapshot

Provides hook to manage value history and work with undo and redo features.

## useSnapshotState

Creates a state with version history and provides `undo` and `redo` function to traverse the history.

```typescript
export interface SnapshotOptions {
    // debounce time to commit value to history, defaults to no debounce
    delay?: number;
    // max history length, defaults to Infinity
    limit?: number;
}

interface Snapshot {
    backLength: number;
    forwardLength: number;
    canUndo: boolean;
    canRedo: boolean;
    undo(): void;
    redo(): void;
}

export type SnapshotHook<T> = [T, Dispatch<SetStateAction<T>>, Snapshot];

function useSnapshotState<T>(init: T | (() => T), options: SnapshotOptions = {}): SnapshotHook<T>
```

A combination of `canUndo` and `undo` is a convenient solution to enable undo stack.

```jsx
const Game = () => {
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
            outline: '1px solid #1d73e8',
            width: 80,
            height: 80,
            backgroundColor: matrix[i] ? '#1d73e8' : ''
        };
    };
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{marginBottom: 20}}>
                    <Button onClick={undo} disabled={!canUndo}>Undo</Button>
                    click cell to draw
                    <Button onClick={redo} disabled={!canRedo}>Redo</Button>
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
```

By passing a `delay` option `useSnapshotState` will behave as debounced,
that is only commit value to history when it is not changed after a certain time.

```jsx
const Editor = () => {
    // save to history after 200ms
    const [content, setContent, {undo, redo, canUndo, canRedo}] = useSnapshotState('', {delay: 200});
    return (
        <>
            <div>
                <div style={{marginBottom: 20}}>
                    <Button onClick={undo} disabled={!canUndo}>Undo</Button>
                    <Button onClick={redo} disabled={!canRedo}>Redo</Button>
                </div>
                <div>
                    <Input.TextArea rows={6} value={content} onChange={e => setContent(e.target.value)} />
                </div>
            </div>
        </>
    );
};
```
