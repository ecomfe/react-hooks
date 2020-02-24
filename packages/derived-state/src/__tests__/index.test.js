/* eslint-disable react/jsx-no-bind */
import {renderHook, act} from '@testing-library/react-hooks';
import {useDerivedState} from '../index';

test('initial value', () => {
    const {result} = renderHook(() => useDerivedState(123));
    expect(result.current[0]).toBe(123);
    expect(typeof result.current[1]).toBe('function');
});

test('set state', () => {
    const {result} = renderHook(() => useDerivedState(123));
    act(() => result.current[1](456));
    expect(result.current[0]).toBe(456);
});

test('custom derive', () => {
    const derive = jest.fn(x => x + 1);
    const {result} = renderHook(() => useDerivedState(123, derive), {initialProps: {x: 123}});
    expect(result.current[0]).toBe(124);
    expect(derive).toHaveBeenCalledWith(123, undefined);
});

test('update derive', () => {
    const derive = jest.fn(x => x + 1);
    const {result, rerender} = renderHook(props => useDerivedState(props.x, derive), {initialProps: {x: 123}});
    act(() => result.current[1](345));
    rerender({x: 456});
    expect(result.current[0]).toBe(457);
    expect(derive).toHaveBeenCalledWith(456, 345);
});
