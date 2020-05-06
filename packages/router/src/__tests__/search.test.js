import {renderHook, act} from '@testing-library/react-hooks';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {
    useSearchParams,
    useSearchParam,
    useSearchParamAll,
    useUpdateSearchParams,
    useSearchParamState,
} from '../search';

const wrapper = historyOrURL => {
    const history = typeof historyOrURL === 'string'
        ? createMemoryHistory({initialEntries: [historyOrURL]})
        : historyOrURL;

    return props => <Router history={history} {...props} />;
};

describe('useSearchParams', () => {
    test('valid return', () => {
        const {result} = renderHook(() => useSearchParams(), {wrapper: wrapper('/foo?x=1&y=2')});
        expect(result.current instanceof URLSearchParams).toBe(true);
        expect(result.current.get('x')).toBe('1');
        expect(result.current.get('y')).toBe('2');
    });

    test('update on location change', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useSearchParams(), {wrapper: wrapper(history)});
        act(() => history.push('/foo?y=2'));
        expect(result.current.get('x')).toBe(null);
        expect(result.current.get('y')).toBe('2');
    });
});

describe('useSearchParam', () => {
    test('has value', () => {
        const {result} = renderHook(() => useSearchParam('x'), {wrapper: wrapper('/foo?x=1')});
        expect(result.current).toBe('1');
    });

    test('no value', () => {
        const {result} = renderHook(() => useSearchParam('y'), {wrapper: wrapper('/foo?x=1')});
        expect(result.current).toBe(null);
    });
});

describe('useSearchParamAll', () => {
    test('single value', () => {
        const {result} = renderHook(() => useSearchParamAll('x'), {wrapper: wrapper('/foo?x=1')});
        expect(result.current).toEqual(['1']);
    });

    test('multiple values', () => {
        const {result} = renderHook(() => useSearchParamAll('x'), {wrapper: wrapper('/foo?x=1&x=2')});
        expect(result.current).toEqual(['1', '2']);
    });

    test('no value', () => {
        const {result} = renderHook(() => useSearchParamAll('y'), {wrapper: wrapper('/foo?x=1')});
        expect(result.current).toEqual([]);
    });
});

describe('useUpdateSearchParams', () => {
    test('valid return', () => {
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper('/foo?x=1')});
        expect(typeof result.current).toBe('function');
    });

    test('update', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({x: 2}));
        expect(history.length).toBe(2);
        expect(history.entries[1].search).toBe('?x=2');
    });

    test('append', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({y: 2}));
        expect(history.entries[1].search).toBe('?x=1&y=2');
    });

    test('delete', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({x: undefined}));
        expect(history.entries[1].search).toBe('');
    });

    test('array', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({x: [1, 2]}));
        expect(history.entries[1].search).toBe('?x=1&x=2');
    });

    test('custom stringify', () => {
        const stringify = jest.fn(() => 'foo');
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams({stringify}), {wrapper: wrapper(history)});
        act(() => result.current({y: '2', z: ['1', '2']}));
        expect(stringify.mock.calls[0][0]).toEqual({x: '1', y: '2', z: ['1', '2']});
        expect(history.entries[1].search).toBe('?foo');
    });

    test('replace', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams({replace: true}), {wrapper: wrapper(history)});
        act(() => result.current({x: 2}));
        expect(history.length).toBe(1);
        expect(history.entries[0].search).toBe('?x=2');
    });
});

describe('useSearchParamState', () => {
    test('valid return', () => {
        const {result} = renderHook(() => useSearchParamState('x'), {wrapper: wrapper('/foo?x=1')});
        expect(result.current[0]).toBe('1');
        expect(typeof result.current[1]).toBe('function');
    });

    test('update', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useSearchParamState('x'), {wrapper: wrapper(history)});
        act(() => result.current[1]('2'));
        expect(history.length).toBe(2);
        expect(history.entries[1].search).toBe('?x=2');
        expect(result.current[0]).toBe('2');
    });

    test('replace', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useSearchParamState('x', {replace: true}), {wrapper: wrapper(history)});
        act(() => result.current[1]('2'));
        expect(history.length).toBe(1);
        expect(history.entries[0].search).toBe('?x=2');
        expect(result.current[0]).toBe('2');
    });
});
