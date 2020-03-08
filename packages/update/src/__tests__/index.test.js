import {renderHook, act} from '@testing-library/react-hooks';
import {useForceUpdate} from '../index';

test('valid return type', () => {
    const {result} = renderHook(() => useForceUpdate());
    expect(typeof result.current).toBe('function');
});

test('will force update', () => {
    const init = jest.fn(() => useForceUpdate());
    const {result} = renderHook(init);
    expect(init).toHaveBeenCalledTimes(1);
    act(() => result.current());
    expect(init).toHaveBeenCalledTimes(2);
});
