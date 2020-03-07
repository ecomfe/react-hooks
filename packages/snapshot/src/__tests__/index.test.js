import {renderHook, act} from '@testing-library/react-hooks';
import {useSnapshotState} from '../index';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

test('initial state', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    expect(result.current[0]).toBe(123);
});

test('factory init', () => {
    const {result} = renderHook(() => useSnapshotState(() => 123));
    expect(result.current[0]).toBe(123);
});

test('set state', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    act(() => result.current[1](456));
    expect(result.current[0]).toBe(456);
});

test('undo', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    act(() => result.current[1](456));
    act(() => result.current[2].undo());
    expect(result.current[0]).toBe(123);
});

test('redo', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    act(() => result.current[1](456));
    act(() => result.current[2].undo());
    act(() => result.current[2].redo());
    expect(result.current[0]).toBe(456);
});

test('undo out of range', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    act(() => result.current[1](456));
    act(() => result.current[2].undo());
    act(() => result.current[2].undo());
    expect(result.current[0]).toBe(123);
});

test('redo out of range', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    act(() => result.current[1](456));
    act(() => result.current[2].undo());
    act(() => result.current[2].redo());
    act(() => result.current[2].redo());
    expect(result.current[0]).toBe(456);
});

test('can undo', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    expect(result.current[2].canUndo).toBe(false);
    act(() => result.current[1](456));
    expect(result.current[2].canUndo).toBe(true);
    act(() => result.current[2].undo());
    expect(result.current[2].canUndo).toBe(false);
});

test('back length', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    expect(result.current[2].backLength).toBe(0);
    act(() => result.current[1](456));
    expect(result.current[2].backLength).toBe(1);
    act(() => result.current[1](789));
    expect(result.current[2].backLength).toBe(2);
    act(() => result.current[2].undo());
    expect(result.current[2].backLength).toBe(1);
});

test('forward length', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    expect(result.current[2].forwardLength).toBe(0);
    act(() => result.current[1](456));
    act(() => result.current[1](789));
    act(() => result.current[2].undo());
    expect(result.current[2].forwardLength).toBe(1);
    act(() => result.current[2].undo());
    expect(result.current[2].forwardLength).toBe(2);
    act(() => result.current[2].redo());
    expect(result.current[2].forwardLength).toBe(1);
});

test('can redo', () => {
    const {result} = renderHook(() => useSnapshotState(123));
    expect(result.current[2].canRedo).toBe(false);
    act(() => result.current[1](456));
    expect(result.current[2].canRedo).toBe(false);
    act(() => result.current[2].undo());
    expect(result.current[2].canRedo).toBe(true);
    act(() => result.current[2].redo());
    expect(result.current[2].canRedo).toBe(false);
});

test('update after undo', () => {
    const {result} = renderHook(() => useSnapshotState(1)); // 1
    act(() => result.current[1](2)); // 1, 2
    act(() => result.current[1](3)); // 1, 2, 3
    act(() => result.current[2].undo()); // 1, 2
    act(() => result.current[1](4)); // 1, 2, 4
    expect(result.current[2].canRedo).toBe(false);
    expect(result.current[0]).toBe(4);
    act(() => result.current[2].undo()); // 1, 2
    expect(result.current[0]).toBe(2);
});

test('function updater', () => {
    const {result} = renderHook(() => useSnapshotState(1));
    const next = jest.fn(() => 3);
    act(() => result.current[1](next));
    expect(next).toHaveBeenCalledWith(1);
    expect(result.current[0]).toBe(3);
});

test('function updater after undo', () => {
    const {result} = renderHook(() => useSnapshotState(1));
    act(() => result.current[1](2));
    act(() => result.current[2].undo());
    const next = jest.fn(() => 3);
    act(() => result.current[1](next));
    expect(next).toHaveBeenCalledWith(1);
    expect(result.current[0]).toBe(3);
});

test('same value update', () => {
    const {result} = renderHook(() => useSnapshotState(1));
    act(() => result.current[1](1));
    expect(result.current[2].canUndo).toBe(false);
    expect(result.current[2].canRedo).toBe(false);
    expect(result.current[2].backLength).toBe(0);
    expect(result.current[2].forwardLength).toBe(0);
});

test('debounce', async () => {
    const {result} = renderHook(() => useSnapshotState(1, {delay: 4}));
    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    expect(result.current[2].canUndo).toBe(false);
    await act(() => timeout(5));
    expect(result.current[2].backLength).toBe(1);
});

test('undo to replace latest history when debouncing', async () => {
    const {result} = renderHook(() => useSnapshotState(1, {delay: 4}));
    act(() => result.current[1](2));
    await act(() => timeout(5));
    act(() => result.current[1](3));
    act(() => result.current[2].undo()); // should latest history (2) with pending value (3)
    act(() => result.current[2].undo());
    expect(result.current[0]).toBe(1);
    expect(result.current[2].forwardLength).toBe(1);
    act(() => result.current[2].redo());
    expect(result.current[0]).toBe(3);
});

test('cancel debounced commit on undo', async () => {
    const {result} = renderHook(() => useSnapshotState(1, {delay: 4}));
    act(() => result.current[1](2));
    await act(() => timeout(5));
    act(() => result.current[1](3));
    act(() => result.current[2].undo());
    await act(() => timeout(5));
    expect(result.current[2].forwardLength).toBe(1);
});

test('limit length', () => {
    const {result} = renderHook(() => useSnapshotState(1, {limit: 3}));
    act(() => result.current[1](2));
    act(() => result.current[1](3));
    act(() => result.current[1](4));
    expect(result.current[2].backLength).toBe(2);
});

test('limit length to 1', () => {
    const {result} = renderHook(() => useSnapshotState(1, {limit: 1}));
    act(() => result.current[1](2));
    act(() => result.current[1](3));
    expect(result.current[2].backLength).toBe(0);
});

test('non positive limit length', () => {
    const {result} = renderHook(() => useSnapshotState(1, {limit: 0}));
    expect(result.error).toBeDefined();
});
