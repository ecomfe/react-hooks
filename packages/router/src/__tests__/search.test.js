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
        expect(result.current[0] instanceof URLSearchParams).toBe(true);
        expect(typeof result.current[1]).toBe('function');
        expect(result.current[0].get('x')).toBe('1');
        expect(result.current[0].get('y')).toBe('2');
    });

    test('update on location change', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useSearchParams(), {wrapper: wrapper(history)});
        act(() => history.push('/foo?y=2'));
        expect(result.current[0].get('x')).toBe(null);
        expect(result.current[0].get('y')).toBe('2');
    });

    test('default override', () => {
        const {result} = renderHook(() => useSearchParams({y: 2}), {wrapper: wrapper('/foo?x=1')});
        expect(result.current[0].get('y')).toBe('2');
    });

    test('default exists on search', () => {
        const {result} = renderHook(() => useSearchParams({x: 2}), {wrapper: wrapper('/foo?x=1')});
        expect(result.current[0].get('x')).toBe('1');
    });

    test('default array', () => {
        const {result} = renderHook(() => useSearchParams({x: [1, 2]}), {wrapper: wrapper('/foo')});
        expect(result.current[0].getAll('x')).toEqual(['1', '2']);
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

    test('null', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({x: null}));
        expect(history.entries[1].search).toBe('');
    });

    test('replace', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useUpdateSearchParams(), {wrapper: wrapper(history)});
        act(() => result.current({x: 2}, {replace: true}));
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
