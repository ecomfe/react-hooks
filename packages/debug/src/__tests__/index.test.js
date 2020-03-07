/* eslint-disable no-console */
import {renderHook} from '@testing-library/react-hooks';
import {useRenderTimes, useChangeTimes, useUpdateCause} from '../index';

describe('useRenderTimes', () => {
    test('initial to 1', () => {
        const {result} = renderHook(() => useRenderTimes());
        expect(result.current).toBe(1);
    });

    test('increase each render', () => {
        const {result, rerender} = renderHook(() => useRenderTimes());
        rerender();
        expect(result.current).toBe(2);
    });
});

describe('useChangeTimes', () => {
    test('initial to 0', () => {
        const {result} = renderHook(() => useChangeTimes(123));
        expect(result.current).toBe(0);
    });

    test('keep same when no change', () => {
        const {result, rerender} = renderHook(props => useChangeTimes(props.value), {initialProps: {value: 123}});
        rerender({value: 123});
        expect(result.current).toBe(0);
    });

    test('increment on change', () => {
        const {result, rerender} = renderHook(props => useChangeTimes(props.value), {initialProps: {value: 123}});
        rerender({value: 456});
        expect(result.current).toBe(1);
    });

    test('undefined initial value', () => {
        const {result} = renderHook(props => useChangeTimes(props.value), {initialProps: {value: undefined}});
        expect(result.current).toBe(0);
    });
});

describe('useUpdateCause', () => {
    test('empty on mount', () => {
        const {result} = renderHook(() => useUpdateCause({x: 1}, false));
        expect(result.current).toEqual([]);
    });

    test('empty when props identical', () => {
        const {result, rerender} = renderHook(() => useUpdateCause({x: 1}, false));
        rerender();
        expect(result.current).toEqual([]);
    });

    test('report change', () => {
        const {result, rerender} = renderHook(props => useUpdateCause(props, false), {initialProps: {x: 1}});
        rerender({x: 2});
        expect(result.current[0].propName).toBe('x');
        expect(result.current[0].previousValue).toBe(1);
        expect(result.current[0].currentValue).toBe(2);
    });

    test('report shallow equal', () => {
        const {result, rerender} = renderHook(props => useUpdateCause(props, false), {initialProps: {x: [1, 2, 3]}});
        rerender({x: [1, 2, 3]});
        expect(result.current[0].shallowEquals).toBe(true);
    });

    test('report deep equal', () => {
        const {result, rerender} = renderHook(props => useUpdateCause(props, false), {initialProps: {x: [[1]]}});
        rerender({x: [[1]]});
        expect(result.current[0].shallowEquals).toBe(false);
        expect(result.current[0].deepEquals).toBe(true);
    });

    test('print on console', () => {
        const warn = console.warn;
        const table = console.table;
        const mockWarn = jest.fn();
        const mockTable = jest.fn();
        console.warn = mockWarn;
        console.table = mockTable;
        const {rerender} = renderHook(props => useUpdateCause(props), {initialProps: {x: [[1]]}});
        rerender({x: [[1]]});
        console.warn = warn;
        console.table = table;
        expect(mockWarn).toHaveBeenCalled();
    });
});
