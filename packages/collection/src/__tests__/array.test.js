import {renderHook, act} from '@testing-library/react-hooks';
import useArray from '../array';

const INITIAL_ARRAY = [1, 2, 3, 4, 1, 2, 3, 4];

const testFunction = (call, expected) => {
    const {result} = renderHook(() => useArray(INITIAL_ARRAY));
    act(() => call(result.current[1]));
    expect(result.current[0]).toEqual(expected);
};

test('valid return type', () => {
    const {result} = renderHook(() => useArray([1, 2, 3]));
    const [value, methods] = result.current;
    expect(value).toEqual([1, 2, 3]);
    expect(typeof methods.push).toBe('function');
    expect(typeof methods.unshift).toBe('function');
    expect(typeof methods.pop).toBe('function');
    expect(typeof methods.shift).toBe('function');
    expect(typeof methods.slice).toBe('function');
    expect(typeof methods.splice).toBe('function');
    expect(typeof methods.remove).toBe('function');
    expect(typeof methods.removeAt).toBe('function');
    expect(typeof methods.insertAt).toBe('function');
    expect(typeof methods.concat).toBe('function');
    expect(typeof methods.replace).toBe('function');
    expect(typeof methods.replaceAll).toBe('function');
    expect(typeof methods.replaceAt).toBe('function');
    expect(typeof methods.filter).toBe('function');
    expect(typeof methods.union).toBe('function');
    expect(typeof methods.intersect).toBe('function');
    expect(typeof methods.difference).toBe('function');
    expect(typeof methods.reverse).toBe('function');
    expect(typeof methods.sort).toBe('function');
    expect(typeof methods.clear).toBe('function');
});

test('default initial value', () => {
    const {result} = renderHook(() => useArray());
    expect(result.current[0]).toEqual([]);
});

test('push', () => {
    testFunction(m => m.push(5), [...INITIAL_ARRAY, 5]);
});

test('unshift', () => {
    testFunction(m => m.unshift(5), [5, ...INITIAL_ARRAY]);
});

test('pop', () => {
    testFunction(m => m.pop(), INITIAL_ARRAY.slice(0, -1));
});

test('pop empty', () => {
    const {result} = renderHook(() => useArray([]));
    act(() => result.current[1].pop());
    expect(result.current[0]).toEqual([]);
});

test('shift', () => {
    testFunction(m => m.shift(), INITIAL_ARRAY.slice(1));
});

test('shift empty', () => {
    const {result} = renderHook(() => useArray([]));
    act(() => result.current[1].shift());
    expect(result.current[0]).toEqual([]);
});

test('slice', () => {
    testFunction(m => m.slice(1, 2), [2]);
    testFunction(m => m.slice(4, -1), [1, 2, 3]);
    testFunction(m => m.slice(5), [2, 3, 4]);
});

test('splice', () => {
    testFunction(m => m.splice(1, 2), [1, 4, 1, 2, 3, 4]);
    testFunction(m => m.splice(1, 2, 5, 6), [1, 5, 6, 4, 1, 2, 3, 4]);
});

test('remove', () => {
    testFunction(m => m.remove(2), [1, 3, 4, 1, 3, 4]);
});

test('removeAt', () => {
    testFunction(m => m.removeAt(2), [1, 2, 4, 1, 2, 3, 4]);
});

test('insertAt', () => {
    testFunction(m => m.insertAt(1, 5), [1, 5, 2, 3, 4, 1, 2, 3, 4]);
});

test('concat', () => {
    testFunction(m => m.concat(5), INITIAL_ARRAY.concat(5));
    testFunction(m => m.concat([5, 6]), INITIAL_ARRAY.concat([5, 6]));
});

test('replace', () => {
    testFunction(m => m.replace(2, 5), [1, 5, 3, 4, 1, 2, 3, 4]);
    testFunction(m => m.replace(5, 6), INITIAL_ARRAY);
});

test('replaceAll', () => {
    testFunction(m => m.replaceAll(2, 5), [1, 5, 3, 4, 1, 5, 3, 4]);
    testFunction(m => m.replaceAll(5, 6), INITIAL_ARRAY);
});

test('replaceAt', () => {
    testFunction(m => m.replaceAt(2, 5), [1, 2, 5, 4, 1, 2, 3, 4]);
});

test('filter', () => {
    testFunction(m => m.filter(i => i % 2 === 0), [2, 4, 2, 4]);
});

test('union', () => {
    testFunction(m => m.union([2, 5]), [1, 2, 3, 4, 5]);
});

test('intersect', () => {
    testFunction(m => m.intersect([2, 5]), [2]);
});

test('difference', () => {
    testFunction(m => m.difference([2, 5]), [1, 3, 4, 1, 3, 4]);
});

test('reverse', () => {
    testFunction(m => m.reverse(), [4, 3, 2, 1, 4, 3, 2, 1]);
});

test('sort', () => {
    testFunction(m => m.sort((x, y) => y - x), [4, 4, 3, 3, 2, 2, 1, 1]);
});

test('clear', () => {
    testFunction(m => m.clear(), []);
});
