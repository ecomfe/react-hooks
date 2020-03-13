import {renderHook, act} from '@testing-library/react-hooks';
import {useTransitionState} from '../index';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

test('default value', () => {
    const {result} = renderHook(() => useTransitionState(123));
    expect(result.current[0]).toBe(123);
});

test('update value', () => {
    const {result} = renderHook(() => useTransitionState(123));
    act(() => result.current[1](456));
    expect(result.current[0]).toBe(456);
});

test('back to default after default duration', async () => {
    const {result} = renderHook(() => useTransitionState(123, 4));
    act(() => result.current[1](456));
    await act(() => timeout(5));
    expect(result.current[0]).toBe(123);
});

test('custom duration', async () => {
    const {result} = renderHook(() => useTransitionState(123, 4));
    act(() => result.current[1](456, 20));
    await act(() => timeout(5));
    expect(result.current[0]).toBe(456);
    await act(() => timeout(20));
    expect(result.current[0]).toBe(123);
});

test('custom duration revert', async () => {
    const {result} = renderHook(() => useTransitionState(123, 4));
    act(() => result.current[1](456, 10));
    act(() => result.current[1](789));
    await act(() => timeout(5));
    expect(result.current[0]).toBe(123);
});

test('negative duration', async () => {
    const {result} = renderHook(() => useTransitionState(123, -1));
    act(() => result.current[1](456, 10));
    await act(() => timeout(4));
    expect(result.current[0]).toBe(456);
});
