import {renderHook, act} from '@testing-library/react-hooks';
import useMap from '../map';

const INITIAL_ARRAY = [[1, 2], [3, 4]];

const testFunction = (call, expected) => {
    const {result} = renderHook(() => useMap(INITIAL_ARRAY));
    act(() => call(result.current[1]));
    expect([...result.current[0].entries()]).toEqual(expected);
};

test('valid return type', () => {
    const {result} = renderHook(() => useMap([[1, 2]]));
    const [value, methods] = result.current;
    expect([...value.entries()]).toEqual([[1, 2]]);
    expect(typeof methods.set).toBe('function');
    expect(typeof methods.setAll).toBe('function');
    expect(typeof methods.delete).toBe('function');
    expect(typeof methods.deleteAll).toBe('function');
    expect(typeof methods.clear).toBe('function');
});

test('default initial value', () => {
    const {result} = renderHook(() => useMap());
    expect([...result.current[0].entries()]).toEqual([]);
});

test('set', () => {
    testFunction(m => m.set(5, 6), [[1, 2], [3, 4], [5, 6]]);
});

test('setAll', () => {
    testFunction(m => m.setAll([[5, 6], [7, 8]]), [[1, 2], [3, 4], [5, 6], [7, 8]]);
});

test('delete', () => {
    testFunction(m => m.delete(3), [[1, 2]]);
});

test('delete none', () => {
    testFunction(m => m.delete(5), [[1, 2], [3, 4]]);
});

test('deleteAll', () => {
    testFunction(m => m.deleteAll([1, 3]), []);
});

test('clear', () => {
    testFunction(m => m.clear(), []);
});
