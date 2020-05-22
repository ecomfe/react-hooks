import {renderHook, act} from '@testing-library/react-hooks';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {useNavigate, useLocationState} from '../navigate';

const wrapper = history => props => <Router history={history} {...props} />;

describe('useNavigate', () => {
    test('valid return', () => {
        const history = createMemoryHistory();
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        expect(typeof result.current).toBe('function');
    });

    test('push', () => {
        const history = createMemoryHistory({initialEntries: ['/foo']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current('/bar'));
        expect(history.length).toBe(2);
        expect(history.entries[1].pathname).toBe('/bar');
    });

    test('replace', () => {
        const history = createMemoryHistory({initialEntries: ['/foo']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current('/bar', {replace: true}));
        expect(history.length).toBe(1);
        expect(history.entries[0].pathname).toBe('/bar');
    });

    test('with state', () => {
        const history = createMemoryHistory({initialEntries: ['/foo']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current('/bar', {state: {x: 1}}));
        expect(history.entries[1].state).toEqual({x: 1});
    });

    test('location object', () => {
        const history = createMemoryHistory({initialEntries: ['/foo']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current({pathname: '/bar'}));
        expect(history.entries[1].pathname).toBe('/bar');
    });

    test('with search and hash', () => {
        const history = createMemoryHistory({initialEntries: ['/foo']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current('/bar?x=1#y=2'));
        expect(history.entries[1].pathname).toBe('/bar');
        expect(history.entries[1].search).toBe('?x=1');
        expect(history.entries[1].hash).toBe('#y=2');
    });

    test('only search', () => {
        const history = createMemoryHistory({initialEntries: ['/foo?x=1']});
        const {result} = renderHook(() => useNavigate(), {wrapper: wrapper(history)});
        act(() => result.current('?x=2'));
        expect(history.entries[1].pathname).toBe('/foo');
        expect(history.entries[1].search).toBe('?x=2');
    });
});

describe('useLocationState', () => {
    test('valid return', () => {
        const history = createMemoryHistory();
        history.replace('/', {x: 1});
        const {result} = renderHook(() => useLocationState(), {wrapper: wrapper(history)});
        expect(result.current[0]).toEqual({x: 1});
        expect(typeof result.current[1]).toBe('function');
    });

    test('default value', () => {
        const history = createMemoryHistory();
        const {result} = renderHook(() => useLocationState({x: 1}), {wrapper: wrapper(history)});
        expect(result.current[0]).toEqual({x: 1});
        expect(typeof result.current[1]).toBe('function');
    });

    test('update state', () => {
        const history = createMemoryHistory();
        history.replace('/', {x: 1, y: 2});
        const {result} = renderHook(() => useLocationState(), {wrapper: wrapper(history)});
        act(() => result.current[1]({x: 3}));
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/');
        expect(result.current[0]).toEqual({x: 3, y: 2});
    });
});
