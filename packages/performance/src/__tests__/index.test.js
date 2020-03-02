import {renderHook} from '@testing-library/react-hooks';
import {usePerformanceTiming, useLayoutTiming} from '../index';

describe('usePerformanceTiming', () => {
    test('callback on mount', () => {
        const callback = jest.fn();
        renderHook(() => usePerformanceTiming(callback));
        expect(callback).toHaveBeenCalledTimes(1);
        const timings = callback.mock.calls[0][0];
        expect(typeof timings.initialRender).toBe('number');
        expect(typeof timings.initialLayout).toBe('number');
        expect(timings.initialLayout).toBeGreaterThan(timings.initialRender);
    });

    test('custom flags', () => {
        const callback = jest.fn();
        const {rerender} = renderHook(
            props => usePerformanceTiming(callback, {flags: props}),
            {initialProps: {foo: false, bar: false}}
        );
        const initialTimings = callback.mock.calls[0][0];
        expect(initialTimings.foo).toBeUndefined();
        expect(initialTimings.bar).toBeUndefined();
        rerender({foo: true, bar: false});
        expect(callback).toHaveBeenCalledTimes(2);
        const fooTimings = callback.mock.calls[1][0];
        expect(typeof fooTimings.foo).toBe('number');
        expect(fooTimings.bar).toBeUndefined();
        rerender({foo: true, bar: true});
        expect(callback).toHaveBeenCalledTimes(3);
        const barTimings = callback.mock.calls[2][0];
        expect(typeof barTimings.foo).toBe('number');
        expect(typeof barTimings.bar).toBe('number');
        rerender({foo: false, bar: false});
        expect(callback).toHaveBeenCalledTimes(3);
    });

    test('dynamic callback', () => {
        const oldCallback = jest.fn();
        const newCallback = jest.fn();
        const {rerender} = renderHook(
            props => usePerformanceTiming(props.callback, {flags: {foo: props.foo}}),
            {initialProps: {callback: oldCallback, foo: false}}
        );
        rerender({callback: newCallback, foo: true});
        expect(newCallback).toHaveBeenCalledTimes(1);
    });
});

describe('useLayoutTiming', () => {
    test('default layout', () => {
        const callback = jest.fn();
        renderHook(() => useLayoutTiming(callback));
        expect(callback).toHaveBeenCalledTimes(1);
        const timing = callback.mock.calls[0][0];
        expect(typeof timing.start).toBe('number');
        expect(typeof timing.end).toBe('number');
        expect(typeof timing.ellapsed).toBe('number');
    });

    test('custom meaningful', () => {
        const callback = jest.fn();
        const {rerender} = renderHook(
            props => useLayoutTiming(callback, props.meaningful),
            {initialProps: {meaningful: false}}
        );
        expect(callback).not.toHaveBeenCalled();
        rerender({meaningful: true});
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('dynamic callback', () => {
        const oldCallback = jest.fn();
        const newCallback = jest.fn();
        const {rerender} = renderHook(
            props => useLayoutTiming(props.callback, props.meaningful),
            {initialProps: {callback: oldCallback, meaningful: false}}
        );
        rerender({callback: newCallback, meaningful: true});
        expect(oldCallback).not.toHaveBeenCalled();
        expect(newCallback).toHaveBeenCalledTimes(1);
    });
});
