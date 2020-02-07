/* eslint-disable no-void */
import {renderHook, act} from '@testing-library/react-hooks';
import {useWindowSize} from '../index';

test('initial size', () => {
    const {result} = renderHook(() => useWindowSize());
    expect(typeof result.current.innerWidth).toBe('number');
    expect(typeof result.current.innerHeight).toBe('number');
    expect(typeof result.current.outerWidth).toBe('number');
    expect(typeof result.current.outerWidth).toBe('number');
});

test('notify size change', () => {
    const {result} = renderHook(() => useWindowSize());
    global.innerWidth = 1000;
    act(() => void window.dispatchEvent(new Event('resize')));
    expect(result.current.innerWidth).toBe(1000);
});
