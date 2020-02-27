import {renderHook, act} from '@testing-library/react-hooks';
import {useDebouncedValue, useDebouncedCallback} from '../index';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

describe('useDebouncedValue', () => {
    test('initial value', () => {
        const {result} = renderHook(() => useDebouncedValue(123, 0));
        expect(result.current).toBe(123);
    });

    test('debounced update', async () => {
        const {result, rerender} = renderHook(props => useDebouncedValue(props.x, 4), {initialProps: {x: 123}});
        rerender({x: 124});
        expect(result.current).toBe(123);
        await act(() => timeout(6));
        expect(result.current).toBe(124);
    });
});

describe('useDebouncedCallback', () => {
    test('debounce execute', async () => {
        const fn = jest.fn();
        const {result} = renderHook(() => useDebouncedCallback(fn, 4));
        result.current(1);
        expect(fn).not.toHaveBeenCalled();
        await act(() => timeout(6));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('cancel on unmount', async () => {
        const fn = jest.fn();
        const {result, unmount} = renderHook(() => useDebouncedCallback(fn, 4));
        result.current(1);
        unmount();
        await timeout(6);
        expect(fn).not.toHaveBeenCalled();
    });
});
