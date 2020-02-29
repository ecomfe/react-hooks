/* eslint-disable no-void */
import {renderHook, act} from '@testing-library/react-hooks';
// eslint-disable-next-line import/no-unresolved
import {useOnLine} from '../index';

describe('useOnLine', () => {
    const mockNavigator = onLine => {
        global.navigator = {onLine};
    };

    test('initial online', () => {
        mockNavigator(true);
        const {result} = renderHook(() => useOnLine());
        expect(result.current).toBe(true);
        delete global.navigator;
    });

    test('initial offline', () => {
        mockNavigator(false);
        const {result} = renderHook(() => useOnLine());
        expect(result.current).toBe(false);
        delete global.navigator;
    });

    test('not supported', () => {
        mockNavigator(undefined);
        const {result} = renderHook(() => useOnLine());
        expect(result.current).toBe(true);
        delete global.navigator;
    });

    test('switch offline', () => {
        mockNavigator(true);
        const {result} = renderHook(() => useOnLine());
        navigator.onLine = false;
        act(() => void window.dispatchEvent(new Event('offline')));
        expect(result.current).toBe(false);
        delete global.navigator;
    });

    test('switch online', () => {
        mockNavigator(false);
        const {result} = renderHook(() => useOnLine());
        navigator.onLine = true;
        act(() => void window.dispatchEvent(new Event('online')));
        expect(result.current).toBe(true);
        delete global.navigator;
    });
});
