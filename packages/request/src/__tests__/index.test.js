/* eslint-disable prefer-promise-reject-errors */
import {renderHook, act} from '@testing-library/react-hooks';
import {useRequest} from '../index';

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