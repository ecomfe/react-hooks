import {renderHook, act} from '@testing-library/react-hooks';
import {useLocalStorage} from '../index';

describe('with localStorage', () => {
    afterEach(() => window.localStorage.clear());

    test('use initial value', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        expect(result.current[0]).toBe('bar');
    });

    test('existing value', () => {
        window.localStorage.setItem('foo', JSON.stringify('foo'));
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        expect(result.current[0]).toBe('foo');
    });

    test('fallback on parse error', () => {
        window.localStorage.setItem('foo', 'invalid json');
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        expect(result.current[0]).toBe('bar');
    });

    test('listen on change', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        const event = new StorageEvent('storage', {key: 'foo', oldValue: '"bar"', newValue: '"foo"'});
        // eslint-disable-next-line no-void
        act(() => void window.dispatchEvent(event));
        expect(result.current[0]).toBe('foo');
    });

    test('fallback on change value parse error', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        const event = new StorageEvent('storage', {key: 'foo', oldValue: '"bar"', newValue: 'invalid json'});
        // eslint-disable-next-line no-void
        act(() => void window.dispatchEvent(event));
        expect(result.current[0]).toBe('bar');
    });

    test('fallback on change with null new value', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        const event = new StorageEvent('storage', {key: 'foo', oldValue: '"bar"', newValue: null});
        // eslint-disable-next-line no-void
        act(() => void window.dispatchEvent(event));
        expect(result.current[0]).toBe('bar');
    });

    test('ignore unexpected change key', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        const event = new StorageEvent('storage', {key: 'bar', oldValue: '"bar"', newValue: '"foo"'});
        // eslint-disable-next-line no-void
        act(() => void window.dispatchEvent(event));
        expect(result.current[0]).toBe('bar');
    });

    test('set new value', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        act(() => result.current[1]('foo'));
        expect(result.current[0]).toBe('foo');
    });
});

describe('without lodalStorage', () => {
    const storage = window.localStorage;

    beforeAll(() => Object.defineProperty(window, 'localStorage', {value: undefined}));

    afterAll(() => Object.defineProperty(window, 'localStorage', {value: storage}));

    test('use initial value', () => {
        const {result} = renderHook(() => useLocalStorage('foo', 'bar'));
        expect(result.current[0]).toBe('bar');
    });
});
