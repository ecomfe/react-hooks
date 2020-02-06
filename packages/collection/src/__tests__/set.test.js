import {renderHook, act} from '@testing-library/react-hooks';
import useSet from '../set';

const INITIAL_ARRAY = [1, 2, 3, 4, 1, 2, 3, 4];

const testFunction = (call, expected) => {
    const {result} = renderHook(() => useSet(INITIAL_ARRAY));
    act(() => call(result.current[1]));
    expect([...result.current[0]]).toEqual(expected);
};

test('valid return type', () => {
    const {result} = renderHook(() => useSet([1, 2, 3]));
    const [value, methods] = result.current;
    expect([...value]).toEqual([1, 2, 3]);
    expect(typeof methods.add).toBe('function');
    expect(typeof methods.addAll).toBe('function');
    expect(typeof methods.delete).toBe('function');
    expect(typeof methods.deleteAll).toBe('function');
    expect(typeof methods.clear).toBe('function');
});

test('default initial value', () => {
    const {result} = renderHook(() => useSet());
    expect([...result.current[0]]).toEqual([]);
});

test('add', () => {
    testFunction(m => m.add(5), [1, 2, 3, 4, 5]);
});

test('add existed', () => {
    testFunction(m => m.add(3), [1, 2, 3, 4]);
});

test('addAll', () => {
    testFunction(m => m.addAll([5, 6]), [1, 2, 3, 4, 5, 6]);
});

test('delete', () => {
    testFunction(m => m.delete(3), [1, 2, 4]);
});

test('delete none', () => {
    testFunction(m => m.delete(5), [1, 2, 3, 4]);
});

test('deleteAll', () => {
    testFunction(m => m.deleteAll([2, 3]), [1, 4]);
});

test('clear', () => {
    testFunction(m => m.clear(), []);
});
