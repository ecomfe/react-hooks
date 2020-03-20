/* eslint-disable prefer-promise-reject-errors */
import {renderHook, act} from '@testing-library/react-hooks';
import {useRequestCallback, useRequest} from '../index';

describe('useRequestCallback', () => {
    test('valid return', () => {
        const {result} = renderHook(() => useRequestCallback(() => Promise.resolve(1), {}));
        expect(typeof result.current[0]).toBe('function');
        expect(typeof result.current[1]).toBe('object');
    });

    test('initial pending is false', () => {
        const {result} = renderHook(() => useRequestCallback(() => Promise.resolve(1), {}));
        expect(result.current[1].pending).toBe(false);
        expect(result.current[1].pendingCount).toBe(undefined);
        expect(result.current[1].data).toBe(undefined);
        expect(result.current[1].error).toBe(undefined);
    });

    test('can trigger request', async () => {
        const api = jest.fn(() => Promise.resolve(1));
        const args = {x: 1};
        const {result, waitForNextUpdate} = renderHook(() => useRequestCallback(api, args));
        act(() => result.current[0]());
        expect(result.current[1].pending).toBe(true);
        expect(result.current[1].pendingCount).toBe(1);
        await waitForNextUpdate();
        expect(api).toHaveBeenCalledTimes(1);
        expect(api).toHaveBeenCalledWith(args);
        expect(result.current[1].pending).toBe(false);
        expect(result.current[1].pendingCount).toBe(0);
        expect(result.current[1].data).toBe(1);
    });
});

describe('useRequest', () => {
    test('simple request', async () => {
        const fetch = jest.fn(() => Promise.resolve(123));
        const {result, waitForNextUpdate} = renderHook(() => useRequest(fetch, 1));
        expect(result.current.pendingCount).toBe(1);
        expect(result.current.pending).toBe(true);
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeUndefined();
        expect(result.current.nextData).toBeUndefined();
        expect(result.current.nextError).toBeUndefined();
        await waitForNextUpdate();
        expect(result.current.pendingCount).toBe(0);
        expect(result.current.pending).toBe(false);
        expect(result.current.data).toBe(123);
        expect(result.current.error).toBeUndefined();
        expect(result.current.nextData).toBeUndefined();
        expect(result.current.nextError).toBeUndefined();
    });

    test('error request', async () => {
        const fetch = jest.fn(() => Promise.reject(123));
        const {result, waitForNextUpdate} = renderHook(() => useRequest(fetch, 1));
        await waitForNextUpdate();
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBe(123);
    });

    test('invalid strategy', () => {
        const fetch = () => Promise.resolve(123);
        const {result} = renderHook(() => useRequest(fetch, 1, {strategy: 'invalid'}));
        expect(result.error).toBeDefined();
    });

    test('multiple key', async () => {
        const fetch = jest.fn(props => Promise.resolve(props.x + 1));
        const {result, waitForNextUpdate, rerender} = renderHook(
            props => useRequest(fetch, props, 1),
            {initialProps: {x: 1}}
        );
        rerender({x: 2});
        await waitForNextUpdate();
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(result.current.data).toBe(3);
    });

    test('idempotent', async () => {
        const fetch = jest.fn(props => Promise.resolve(props.x + 1));
        const {waitForNextUpdate, rerender} = renderHook(
            props => useRequest(fetch, props, {idempotent: true}),
            {initialProps: {x: 1}}
        );
        rerender({x: 1});
        await waitForNextUpdate();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('idempotent with different key', async () => {
        const fetch = jest.fn(props => Promise.resolve(props.x + 1));
        const {waitForNextUpdate, rerender} = renderHook(
            props => useRequest(fetch, props, {idempotent: true}),
            {initialProps: {x: 1}}
        );
        rerender({x: 2});
        await waitForNextUpdate();
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    test('wait accept', async () => {
        const fetch = jest.fn(props => Promise.resolve(props.x + Math.random()));
        const {result, waitForNextUpdate, rerender} = renderHook(
            props => useRequest(fetch, props, {strategy: 'waitAccept'}),
            {initialProps: {x: 1}}
        );
        await waitForNextUpdate();
        rerender({x: 2});
        await waitForNextUpdate();
        rerender({x: 1});
        await waitForNextUpdate();
        const nextData = result.current.nextData;
        expect(typeof nextData).toBe('number');
        act(() => result.current.accept());
        expect(result.current.nextData).toBeUndefined();
        expect(result.current.data).toBe(nextData);
    });

    test('different tasks', async () => {
        const task1 = jest.fn(x => Promise.resolve(x + 1));
        const task2 = jest.fn(x => Promise.resolve(x + 2));
        const {result, waitForNextUpdate, rerender} = renderHook(
            props => useRequest(props.task, props.x, {strategy: 'keepEarliest'}),
            {initialProps: {x: 1, task: task1}}
        );
        await waitForNextUpdate();
        expect(result.current.data).toBe(2);
        rerender({task: task2, x: 1});
        await waitForNextUpdate();
        expect(result.current.data).toBe(3);
    });
});
