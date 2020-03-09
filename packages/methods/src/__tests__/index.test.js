import {useState} from 'react';
import {renderHook, act} from '@testing-library/react-hooks';
import {useMethods, useMethodsExtension, useMethodsNative, useMethodsExtensionNative} from '../index';

describe('useMethods', () => {
    test('valid return type', () => {
        const methods = {
            inc(value) {
                return value + 1;
            },
        };
        const {result} = renderHook(() => useMethods(methods, 0));
        const [state, {inc}, setState] = result.current;
        expect(state).toBe(0);
        expect(typeof inc).toBe('function');
        expect(typeof setState).toBe('function');
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

    test('set state', () => {
        const {result} = renderHook(() => useMethods({}, {value: 0}));
        act(() => result.current[2]({value: 1}));
        expect(result.current[0].value).toBe(1);
    });
});

describe('useMethodsExtension', () => {
    test('with builtin state', () => {
        const {result: state} = renderHook(() => useState({foo: 1}));
        const methods = {
            inc(state, value) {
                return {
                    ...state,
                    foo: state.foo + value,
                };
            },
        };
        const {result: extension} = renderHook(() => useMethodsExtension(methods, state.current[1]));
        act(() => extension.current.inc(3));
        expect(state.current[0]).toEqual({foo: 4});
    });
});

describe('useMethodsNative', () => {
    test('valid return type', () => {
        const methods = {
            inc(value) {
                return value + 1;
            },
        };
        const {result} = renderHook(() => useMethodsNative(methods, 0));
        const [state, {inc}, setState] = result.current;
        expect(state).toBe(0);
        expect(typeof inc).toBe('function');
        expect(typeof setState).toBe('function');
    });

    test('factory initial value', () => {
        const {result} = renderHook(() => useMethodsNative({}, () => 0));
        const [state] = result.current;
        expect(state).toBe(0);
    });

    test('method call', () => {
        const methods = {
            inc(value) {
                return value + 1;
            },
        };
        const {result} = renderHook(() => useMethodsNative(methods, 0));
        act(() => result.current[1].inc());
        expect(result.current[0]).toBe(1);
    });

    test('set state', () => {
        const {result} = renderHook(() => useMethodsNative({}, {value: 0}));
        act(() => result.current[2]({value: 1}));
        expect(result.current[0].value).toBe(1);
    });
});

describe('useMethodsExtensionNative', () => {
    test('with builtin state', () => {
        const {result: state} = renderHook(() => useState({foo: 1}));
        const methods = {
            inc(state, value) {
                return {
                    ...state,
                    foo: state.foo + value,
                };
            },
        };
        const {result: extension} = renderHook(() => useMethodsExtensionNative(methods, state.current[1]));
        act(() => extension.current.inc(3));
        expect(state.current[0]).toEqual({foo: 4});
    });
});
