import {renderHook, act} from '@testing-library/react-hooks';
import {useBoolean, useSwitch, useToggle} from '../index';

test('valid return type', () => {
    const {result} = renderHook(() => useBoolean());
    const [value, methods] = result.current;
    expect(value).toBe(false);
    expect(typeof methods.on).toBe('function');
    expect(typeof methods.off).toBe('function');
    expect(typeof methods.toggle).toBe('function');
});

test('initial value', () => {
    const {result} = renderHook(() => useBoolean(true));
    const [value] = result.current;
    expect(value).toBe(true);
});

test('on', () => {
    const {result} = renderHook(() => useBoolean(false));
    act(() => result.current[1].on());
    const [value] = result.current;
    expect(value).toBe(true);
});

test('off', () => {
    const {result} = renderHook(() => useBoolean(true));
    act(() => result.current[1].off());
    const [value] = result.current;
    expect(value).toBe(false);
});

test('toggle', () => {
    const {result} = renderHook(() => useBoolean(false));
    act(() => result.current[1].toggle());
    const [value] = result.current;
    expect(value).toBe(true);
});

test('switch methods', () => {
    const {result} = renderHook(() => useSwitch(false));
    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
    expect(typeof result.current[3]).toBe('function');
});

test('switch on', () => {
    const {result} = renderHook(() => useSwitch(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
});

test('switch off', () => {
    const {result} = renderHook(() => useSwitch(true));
    act(() => result.current[2]());
    expect(result.current[0]).toBe(false);
});

test('switch toggle', () => {
    const {result} = renderHook(() => useSwitch(false));
    act(() => result.current[3]());
    expect(result.current[0]).toBe(true);
});

test('toggle hook', () => {
    const {result} = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
});
