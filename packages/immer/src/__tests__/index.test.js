/* eslint-disable no-void */
import {renderHook, act} from '@testing-library/react-hooks';
import {useImmerReducer, useImmerState} from '../index';

describe('useImmerReducer', () => {
    test('valid return value', () => {
        const initial = {x: 1};
        const {result} = renderHook(() => useImmerReducer(s => s, initial));
        const [state, dispatch] = result.current;
        expect(state).toBe(initial);
        expect(typeof dispatch).toBe('function');
    });

    test('initializer arg', () => {
        const initializer = jest.fn(x => ({x}));
        const {result} = renderHook(() => useImmerReducer(s => s, 3, initializer));
        const [state] = result.current;
        expect(state).toEqual({x: 3});
    });

    test('reducer', () => {
        const {result} = renderHook(() => useImmerReducer((state, value) => void (state.x = value), {x: 1}));
        act(() => result.current[1](4));
        expect(result.current[0]).toEqual({x: 4});
    });
});

describe('useImmerState', () => {
    test('valid return value', () => {
        const initial = {x: 1};
        const {result} = renderHook(() => useImmerState(initial));
        const [state, setValue] = result.current;
        expect(state).toBe(initial);
        expect(typeof setValue).toBe('function');
    });

    test('update value', () => {
        const {result} = renderHook(() => useImmerState({x: 1}));
        act(() => result.current[1]({x: 2}));
        expect(result.current[0]).toEqual({x: 2});
    });

    test('produce value', () => {
        const {result} = renderHook(() => useImmerState({x: 1}));
        act(() => result.current[1](s => ({x: s.x + 1})));
        expect(result.current[0]).toEqual({x: 2});
    });
});
