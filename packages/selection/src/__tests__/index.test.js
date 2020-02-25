import {renderHook, act} from '@testing-library/react-hooks';
import {useSelection} from '../index';

test('default empty', () => {
    const {result} = renderHook(() => useSelection());
    expect(result.current[0]).toEqual([]);
    expect(typeof result.current[1].selectIndex).toBe('function');
});

test('initial value', () => {
    const {result} = renderHook(() => useSelection([1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('single select', () => {
    const {result} = renderHook(() => useSelection());
    act(() => result.current[1].selectIndex(1));
    expect(result.current[0]).toEqual([1]);
    act(() => result.current[1].selectIndex(2, {}));
    expect(result.current[0]).toEqual([2]);
});

test('multiple select', () => {
    const {result} = renderHook(() => useSelection([], {multiple: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {metaKey: true}));
    act(() => result.current[1].selectIndex(5, {ctrlKey: true}));
    expect(result.current[0]).toEqual([1, 3, 5]);
});

test('remove select', () => {
    const {result} = renderHook(() => useSelection([], {multiple: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {metaKey: true}));
    act(() => result.current[1].selectIndex(5, {ctrlKey: true}));
    act(() => result.current[1].selectIndex(3, {ctrlKey: true}));
    expect(result.current[0]).toEqual([1, 5]);
});

test('initial range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([0, 1, 2, 3]);
});

test('range select', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('reverse range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(3));
    act(() => result.current[1].selectIndex(1, {shiftKey: true}));
    expect(result.current[0]).toEqual([3, 1, 2]);
});

test('range cover selected', () => {
    const {result} = renderHook(() => useSelection([], {multiple: true, range: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(2, {ctrlKey: true}));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('expand range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    act(() => result.current[1].selectIndex(5, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3, 4, 5]);
});

test('shrink range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(5, {shiftKey: true}));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('reverse range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(3));
    act(() => result.current[1].selectIndex(5, {shiftKey: true}));
    act(() => result.current[1].selectIndex(1, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('same range', () => {
    const {result} = renderHook(() => useSelection([], {range: true}));
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([1, 2, 3]);
});

test('multiple disabled', () => {
    const {result} = renderHook(() => useSelection());
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {ctrlKey: true}));
    act(() => result.current[1].selectIndex(5, {metaKey: true}));
    expect(result.current[0]).toEqual([5]);
});

test('range disabled', () => {
    const {result} = renderHook(() => useSelection());
    act(() => result.current[1].selectIndex(1));
    act(() => result.current[1].selectIndex(3, {shiftKey: true}));
    expect(result.current[0]).toEqual([3]);
});
