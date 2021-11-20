import {renderHook, act} from '@testing-library/react-hooks';
import {useRequest, useConstantRequest} from '../request';

const timeout = (time: number, value: number) => new Promise<number>(r => setTimeout(() => r(value), time));

test('return valid tuple', () => {
    const api = () => Promise.resolve(1);
    const {result} = renderHook(() => useConstantRequest(api));
    expect(typeof result.current[0]).toBe('object');
    expect(typeof result.current[1]).toBe('function');
});

test('resolve', async () => {
    const api = (value: number) => Promise.resolve(value);
    const {result} = renderHook(() => useRequest(api));
    await act(() => result.current[1](1));
    expect(result.current[0].kind).toBe('hasValue');
    expect(result.current[0].kind === 'hasValue' && result.current[0].data).toBe(1);
});

test('reject', async () => {
    const api = (reason: string) => Promise.reject(new Error(reason));
    const {result} = renderHook(() => useRequest(api, {throwError: false}));
    await act(() => result.current[1]('error'));
    expect(result.current[0].kind).toBe('hasError');
    expect(result.current[0].kind === 'hasError' && result.current[0].error.message).toBe('error');
});

test('initial default value', async () => {
    const api = (value: number) => Promise.resolve(value);
    const {result} = renderHook(() => useRequest(api, {defaultValue: 3}));
    expect(result.current[0].kind).toBe('initial');
    expect(result.current[0].data).toBe(3);
});

test('pending default value', async () => {
    const api = (value: number) => timeout(4, value);
    const {result, waitForNextUpdate} = renderHook(() => useRequest(api, {defaultValue: 3}));
    await act(async () => {
        const pending = result.current[1](1);
        await waitForNextUpdate();
        expect(result.current[0].kind).toBe('pending');
        expect(result.current[0].data).toBe(3);
        return pending;
    });
});

test('request throw error', async () => {
    const api = (reason: string) => Promise.reject(new Error(reason));
    const {result} = renderHook(() => useRequest(api));
    await act(() => result.current[1]('error'));
    expect(result.error?.message).toBe('error');
});

test('constant throw error', async () => {
    const api = () => Promise.reject(new Error('error'));
    const {result} = renderHook(() => useConstantRequest(api));
    await act(() => result.current[1]());
    expect(result.error?.message).toBe('error');
});

test('error state', async () => {
    const api = () => Promise.reject(new Error('error'));
    const {result} = renderHook(() => useConstantRequest(api, {throwError: false}));
    await act(() => result.current[1]());
    expect(result.current[0].kind).toBe('hasError');
    expect(result.current[0].kind === 'hasError' && result.current[0].error.message).toBe('error');
});
