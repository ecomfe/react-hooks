import {renderHook, act} from '@testing-library/react-hooks';
import {useActionPending} from '../index';

test('return async function', () => {
    const {result} = renderHook(() => useActionPending(x => Promise.resolve(x + 1)));
    expect(typeof result.current[0]).toBe('function');
    expect(typeof result.current[1]).toBe('number');
});

test('correct resolve', async () => {
    const {result} = renderHook(() => useActionPending(x => Promise.resolve(x + 1)));
    let value = 0;
    await act(() => result.current[0](1).then(v => (value = v)));
    expect(value).toBe(2);
});

test('decrement pending on finish', async () => {
    const {result} = renderHook(() => useActionPending(x => Promise.resolve(x + 1)));
    await act(() => result.current[0](1));
    expect(result.current[1]).toBe(0);
});


