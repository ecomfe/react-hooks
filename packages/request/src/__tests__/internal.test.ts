import {renderHook, act} from '@testing-library/react-hooks';
import {useTakeLatestInternal} from '../internal';

const timeout = <T>(time: number, value: T) => new Promise(r => setTimeout(() => r(value), time));

test('return valid tuple', () => {
    const api = () => Promise.resolve(1);
    const {result} = renderHook(() => useTakeLatestInternal(api));
    expect(typeof result.current[0]).toBe('object');
    expect(typeof result.current[1]).toBe('function');
});

test('default state to initial', () => {
    const api = () => Promise.resolve(1);
    const {result} = renderHook(() => useTakeLatestInternal(api));
    expect(result.current[0].kind).toBe('initial');
});

test('can trigger request', async () => {
    const api = jest.fn((value: number) => Promise.resolve(value));
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => result.current[1](1));
    expect(api).toHaveBeenCalledTimes(1);
    expect(api).toHaveBeenCalledWith(1);
    expect(result.current[0].kind).toBe('hasValue');
    const response = result.current[0] as any;
    expect(response.data).toBe(1);
    expect(response.params).toBe(1);
});

test('use latest params', async () => {
    const api = jest.fn((value: number) => Promise.resolve(value));
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => Promise.all([result.current[1](1), result.current[1](2)]).then(() => {}));
    expect(api).toHaveBeenCalledTimes(2);
    expect(result.current[0].kind).toBe('hasValue');
    const response = result.current[0] as any;
    expect(response.params).toEqual(2);
    expect(response.data).toBe(2);
});

test('reject', async () => {
    const api = () => Promise.reject(new Error('error'));
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => result.current[1]());
    expect(result.current[0].kind).toBe('hasError');
    const response = result.current[0] as any;
    expect(response.error.message).toBe('error');
});

test('pending to resolve snapshot', async () => {
    const api = (value: number) => Promise.resolve(value);
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => result.current[1](1));
    await act(() => result.current[1](2));
    expect(result.current[0].snapshot).toBe(1);
});

test('pending to reject snapshot', async () => {
    const api = (value: number) => (value > 1 ? Promise.reject(new Error('error')) : Promise.resolve(value));
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => result.current[1](1));
    await act(() => result.current[1](2));
    expect(result.current[0].snapshot).toBe(1);
});

test('race condition', async () => {
    const api = async (value: number) => timeout(value * 4, value);
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => Promise.all([result.current[1](2), result.current[1](1)]).then(() => {}));
    expect(result.current[0].kind).toBe('hasValue');
    const response = result.current[0] as any;
    expect(response.data).toBe(1);
});

test('reject race condition', async () => {
    const api = async (value: number) => {
        await timeout(value * 4, value);
        if (value > 1) {
            throw new Error('error');
        }
        return value;
    };
    const {result} = renderHook(() => useTakeLatestInternal(api));
    await act(() => Promise.all([result.current[1](2), result.current[1](1)]).then(() => {}));
    expect(result.current[0].kind).toBe('hasValue');
});

test('accept callback', async () => {
    const api = (value: number) => Promise.resolve(value + 1);
    const accept = jest.fn();
    const {result} = renderHook(() => useTakeLatestInternal(api, {onAccept: accept}));
    await act(() => result.current[1](1));
    expect(accept).toHaveBeenCalled();
    expect(accept.mock.calls[0][0]).toBe(2);
    expect(accept.mock.calls[0][1]).toBe(1);
});
