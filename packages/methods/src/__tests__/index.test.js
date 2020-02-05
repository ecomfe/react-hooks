import {renderHook, act} from '@testing-library/react-hooks';
import {useMethods} from '../index';

test('valid return type', () => {
    const methods = {
        inc(value) {
            return value + 1;
        },
    };
    const {result} = renderHook(() => useMethods(methods, 0));
    const [state, {inc}] = result.current;
    expect(state).toBe(0);
    expect(typeof inc).toBe('function');
});

test('factory initial value', () => {
    const {result} = renderHook(() => useMethods({}, () => 0));
    const [state] = result.current;
    expect(state).toBe(0);
});

test('method call immutable', () => {
    const methods = {
        inc(value) {
            return value + 1;
        },
    };
    const {result} = renderHook(() => useMethods(methods, 0));
    act(() => result.current[1].inc());
    expect(result.current[0]).toBe(1);
});

test('method call immer', () => {
    const methods = {
        inc(state) {
            state.value++;
        },
    };
    const {result} = renderHook(() => useMethods(methods, {value: 0}));
    act(() => result.current[1].inc());
    expect(result.current[0].value).toBe(1);
});
