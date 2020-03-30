import {renderHook, act} from '@testing-library/react-hooks';
import {useOptimisticState, useOptimisticTask} from '../index';

const immediate = () => new Promise(resolve => setImmediate(resolve));

describe('useOptimisticState', () => {
    test('valid return', () => {
        const {result} = renderHook(() => useOptimisticState(1));
        expect(result.current[0]).toBe(1);
        expect(typeof result.current[1]).toBe('function');
    });

    test('sync set state', () => {
        const {result} = renderHook(() => useOptimisticState(1));
        act(() => result.current[1](2));
        expect(result.current[0]).toBe(2);
    });

    test('sync reduce state', () => {
        const {result} = renderHook(() => useOptimisticState(1));
        act(() => result.current[1](v => v + 1));
        expect(result.current[0]).toBe(2);
    });

    test('async state', async () => {
        const {result, waitForNextUpdate} = renderHook(() => useOptimisticState(1));
        act(() => result.current[1](immediate().then(() => 2), 3));
        expect(result.current[0]).toBe(3);
        await waitForNextUpdate();
        expect(result.current[0]).toBe(2);
    });

    test('optimistic state pass to reducer', async () => {
        const {result, waitForNextUpdate} = renderHook(() => useOptimisticState(1));
        const next = jest.fn(() => 4);
        act(() => result.current[1](immediate().then(() => 2), 3));
        expect(result.current[0]).toBe(3);
        act(() => result.current[1](next));
        expect(result.current[0]).toBe(4);
        expect(next).toHaveBeenCalledWith(3);
        await waitForNextUpdate();
        expect(result.current[0]).toBe(2);
    });

    test('rollbacked state pass to async reducer', async () => {
        const {result, waitForNextUpdate} = renderHook(() => useOptimisticState(1));
        const next = jest.fn(() => 2);
        act(() => result.current[1](immediate().then(() => next), 3));
        expect(result.current[0]).toBe(3);
        await waitForNextUpdate();
        expect(result.current[0]).toBe(2);
        expect(next).toHaveBeenCalledWith(1);
    });
});

describe('useOptimisticTask', () => {
    test('async call', async () => {
        const task = v => immediate().then(() => v);
        const optimistic = v => v + 1;
        const {result, waitForNextUpdate} = renderHook(() => useOptimisticTask(task, optimistic, 0));
        await act(async () => {
            const run = result.current[1];
            run(1);
            await waitForNextUpdate();
            expect(result.current[0]).toBe(2);
            await waitForNextUpdate();
            expect(result.current[0]).toBe(1);
        });
    });
});
