/* eslint-disable no-console */
import {renderHook, act} from '@testing-library/react-hooks';
import {useDebouncedValue, useDebouncedCallback, useDebouncedEffect} from '../index';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

describe('useDebouncedEffect', () => {
    test('mount', async () => {
        const callback = jest.fn();
        renderHook(() => useDebouncedEffect(callback, 1, 4));
        await act(() => timeout(5));
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('update', async () => {
        const callback = jest.fn();
        const {rerender} = renderHook(
            props => useDebouncedEffect(callback, props.value, 4),
            {initialProps: {value: 1}}
        );
        rerender({value: 2});
        await act(() => timeout(5));
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('change callback on update', async () => {
        const mount = jest.fn();
        const update = jest.fn();
        const {rerender} = renderHook(
            props => useDebouncedEffect(props.callback, props.value, 4),
            {initialProps: {callback: mount, value: 1}}
        );
        await act(() => timeout(5));
        rerender({callback: update, value: 2});
        await act(() => timeout(5));
        expect(mount).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledTimes(1);
    });

    test('unmount', async () => {
        const callback = jest.fn();
        const {unmount} = renderHook(() => useDebouncedEffect(callback, 1, 4));
        unmount();
        await timeout(5);
        expect(callback).not.toHaveBeenCalled();
    });

    test('cleanup on value change', async () => {
        const cleanup = jest.fn();
        const {rerender} = renderHook(
            props => useDebouncedEffect(() => cleanup, props.value, 4),
            {initialProps: {value: 1}}
        );
        await act(() => timeout(5));
        rerender({value: 2});
        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('cleanup on unmount', async () => {
        const cleanup = jest.fn();
        const {unmount} = renderHook(
            props => useDebouncedEffect(() => cleanup, props.value, 4),
            {initialProps: {value: 1}}
        );
        await act(() => timeout(5));
        unmount();
        expect(cleanup).toHaveBeenCalledTimes(1);
    });

    test('invalid clean-up function', async () => {
        const warn = console.warn;
        console.warn = jest.fn();
        const callback = jest.fn(() => 123);
        const {unmount} = renderHook(() => useDebouncedEffect(callback, 1, 4));
        await act(() => timeout(5));
        expect(unmount).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
        console.warn = warn;
    });
});

describe('useDebouncedValue', () => {
    test('initial value', () => {
        const {result} = renderHook(() => useDebouncedValue(123, 0));
        expect(result.current).toBe(123);
    });

    test('debounced update', async () => {
        const {result, rerender} = renderHook(props => useDebouncedValue(props.x, 4), {initialProps: {x: 123}});
        rerender({x: 124});
        expect(result.current).toBe(123);
        await act(() => timeout(5));
        expect(result.current).toBe(124);
    });

    test('no debounce', () => {
        const {result, rerender} = renderHook(props => useDebouncedValue(props.x, 0), {initialProps: {x: 123}});
        rerender({x: 124});
        expect(result.current).toBe(124);
    });
});

describe('useDebouncedCallback', () => {
    test('debounce execute', async () => {
        const fn = jest.fn();
        const {result} = renderHook(() => useDebouncedCallback(fn, 4));
        result.current(1);
        expect(fn).not.toHaveBeenCalled();
        await act(() => timeout(5));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('cancel on unmount', async () => {
        const fn = jest.fn();
        const {result, unmount} = renderHook(() => useDebouncedCallback(fn, 4));
        result.current(1);
        unmount();
        await timeout(5);
        expect(fn).not.toHaveBeenCalled();
    });

    test('no debounce', () => {
        const fn = jest.fn();
        const {result} = renderHook(() => useDebouncedCallback(fn, 0));
        result.current(1);
        expect(fn).toHaveBeenCalled();
    });
});
