import {renderHook, act} from '@testing-library/react-hooks';
import {useInputValue} from '../index';

test('has value and onChange', () => {
    const {result} = renderHook(() => useInputValue(''));
    expect(typeof result.current.value).toBe('string');
    expect(typeof result.current.onChange).toBe('function');
});

test('default initial value is undefined', () => {
    const {result} = renderHook(() => useInputValue());
    expect(result.current.value).toBe(undefined);
});

test('specified initial value', () => {
    const initialValue = 'foo';
    const {result} = renderHook(() => useInputValue(initialValue));
    expect(result.current.value).toBe(initialValue);
});

test('change value via onChange', () => {
    const {result} = renderHook(() => useInputValue());
    const newValue = 'bar';
    act(() => result.current.onChange({target: {value: newValue}}));
    expect(result.current.value).toBe(newValue);
});

test('target not in change value', () => {
    const {result} = renderHook(() => useInputValue());
    act(() => result.current.onChange('foo'));
    expect(result.current.value).toBe('foo');
});
