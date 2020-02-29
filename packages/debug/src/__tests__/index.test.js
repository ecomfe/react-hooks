/* eslint-disable no-console */
import {renderHook} from '@testing-library/react-hooks';
import {useRenderTimes, useUpdateCause} from '../index';

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
        const {result, rerender} = renderHook(props => useUpdateCause(props, false), {initialProps: {x: {}}});
        rerender({x: {}});
        expect(result.current).toEqual([{propName: 'x', shallowEquals: true, deepEquals: true}]);
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
        const mockWarn = jest.fn();
        console.warn = mockWarn;
        const {rerender} = renderHook(props => useUpdateCause(props), {initialProps: {x: [[1]]}});
        rerender({x: [[1]]});
        console.warn = warn;
        expect(mockWarn).toHaveBeenCalled();
    });
});
