import {renderHook, act} from '@testing-library/react-hooks';
import {useCounter} from '../index';

describe('useCounter', () => {
    test('valid return type', () => {
        const {result} = renderHook(() => useCounter(1));
        const [value, methods] = result.current;
        expect(value).toBe(1);
        expect(typeof methods.increment).toBe('function');
        expect(typeof methods.decrement).toBe('function');
        expect(typeof methods.inc).toBe('function');
        expect(typeof methods.dec).toBe('function');
        expect(typeof methods.reset).toBe('function');
    });

    test('initial value', () => {
        const {result} = renderHook(() => useCounter());
        const [value] = result.current;
        expect(value).toBe(0);
    });

    test('increment', () => {
        const {result} = renderHook(() => useCounter(0));
        act(() => result.current[1].increment());
        expect(result.current[0]).toBe(1);
        act(() => result.current[1].inc());
        expect(result.current[0]).toBe(2);
    });

    test('decrement', () => {
        const {result} = renderHook(() => useCounter(0));
        act(() => result.current[1].decrement());
        expect(result.current[0]).toBe(-1);
        act(() => result.current[1].dec());
        expect(result.current[0]).toBe(-2);
    });

    test('reset', () => {
        const {result} = renderHook(() => useCounter(0));
        act(() => result.current[1].reset(3));
        expect(result.current[0]).toBe(3);
        act(() => result.current[1].reset());
        expect(result.current[0]).toBe(0);
    });
});
