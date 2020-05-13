import {renderHook, act} from '@testing-library/react-hooks';
import {useInfiniteScroll} from '../index';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

const values = ({offset}) => Promise.resolve({hasMore: true, results: [offset + 1, offset + 2, offset + 3]});

test('initial empty data source', () => {
    const {result} = renderHook(() => useInfiniteScroll(values));
    expect(result.current.dataSource).toEqual([]);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.loadMore).toBe('function');
});

test('initial items', () => {
    const {result} = renderHook(() => useInfiniteScroll(values, {initialItems: [1, 1, 1]}));
    expect(result.current.dataSource).toEqual([1, 1, 1]);
});

test('initial load', async () => {
    const fetch = jest.fn(values);
    const {result, waitForNextUpdate} = renderHook(() => useInfiniteScroll(fetch, {initialLoad: true}));
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({offset: 0});
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.dataSource).toEqual([1, 2, 3]);
});

test('initial load with loadMore called when loading', async () => {
    const fetch = jest.fn(values);
    const {result, waitForNextUpdate} = renderHook(() => useInfiniteScroll(fetch, {initialLoad: true}));
    await act(() => result.current.loadMore());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({offset: 0});
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.dataSource).toEqual([1, 2, 3]);
});

test('load more', async () => {
    const fetch = jest.fn(values);
    const {result} = renderHook(() => useInfiniteScroll(fetch));
    await act(() => result.current.loadMore());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({offset: 0});
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.dataSource).toEqual([1, 2, 3]);
});

test('no more', async () => {
    const fetch = jest.fn(() => Promise.resolve({hasMore: false, results: []}));
    const {result} = renderHook(() => useInfiniteScroll(fetch));
    await act(() => result.current.loadMore());
    expect(result.current.loading).toBe(false);
    expect(result.current.hasMore).toBe(false);
});

test('loading', async () => {
    const fetch = jest.fn(() => timeout(10).then(() => values({offset: 0})));
    const {result, waitForNextUpdate} = renderHook(() => useInfiniteScroll(fetch));
    await act(async () => {
        const loading = result.current.loadMore();
        await waitForNextUpdate();
        expect(result.current.loading).toBe(true);
        return loading;
    });
});

test('initial loading', async () => {
    const fetch = jest.fn(() => timeout(5).then(() => values({offset: 0})));
    const {result, waitForNextUpdate} = renderHook(() => useInfiniteScroll(fetch, {initialLoad: true}));
    expect(result.current.initialLoading).toBe(true);
    await waitForNextUpdate();
    await act(async () => {
        const loading = result.current.loadMore();
        await waitForNextUpdate();
        expect(result.current.loading).toBe(true);
        expect(result.current.initialLoading).toBe(false);
        return loading;
    });
});

test('empty data source on initial load', async () => {
    const fetch = jest.fn(() => timeout(5).then(() => ({results: [], hasMore: false})));
    const {result, waitForNextUpdate} = renderHook(() => useInfiniteScroll(fetch, {initialLoad: true}));
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.dataSource).toEqual([]);
    expect(result.current.loading).toBe(false);
});
