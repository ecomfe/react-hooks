import {renderHook, act} from '@testing-library/react-hooks';
import {useResponse, useConstantResponse} from '../response';

test('initial state to pending', async () => {
    const api = () => Promise.resolve(1);
    const {result, waitForNextUpdate} = renderHook(() => useConstantResponse(api));
    expect(result.current[0].kind).toBe('pending');
    await waitForNextUpdate();
});

test('initial state to pending with defualt value', async () => {
    const api = () => Promise.resolve(1);
    const {result, waitForNextUpdate} = renderHook(() => useConstantResponse(api, {defaultValue: 1}));
    expect(result.current[0].kind).toBe('pending');
    expect(result.current[0].data).toBe(1);
    await waitForNextUpdate();
});

test('initial request', async () => {
    const api = (value: number) => Promise.resolve(value);
    const {result, waitForNextUpdate} = renderHook(() => useResponse(api, 1));
    await waitForNextUpdate();
    expect(result.current[0].kind).toBe('hasValue');
    expect(result.current[0].kind === 'hasValue' && result.current[0].data).toBe(1);
});

test('refresh', async () => {
    let value = 1;
    const api = (input: number) => Promise.resolve(input + value++);
    const {result, waitForNextUpdate} = renderHook(() => useResponse(api, 1));
    await waitForNextUpdate();
    await act(() => result.current[1].refresh());
    expect(result.current[0].kind === 'hasValue' && result.current[0].data).toBe(3);
});

test('constant refresh', async () => {
    let value = 1;
    const api = () => Promise.resolve(value++);
    const {result, waitForNextUpdate} = renderHook(() => useConstantResponse(api));
    await waitForNextUpdate();
    await act(() => result.current[1].refresh());
    expect(result.current[0].kind === 'hasValue' && result.current[0].data).toBe(2);
});

test('error state', async () => {
    const api = (reason: string) => Promise.reject(new Error(reason));
    const {result, waitForNextUpdate} = renderHook(() => useResponse(api, 'error', {throwError: false}));
    await waitForNextUpdate();
    expect(result.current[0].kind).toBe('hasError');
    expect(result.current[0].kind === 'hasError' && result.current[0].error.message).toBe('error');
});

test('params reference change with same content', async () => {
    const api = ({value}: {value: number}) => Promise.resolve(value);
    const {result, rerender, waitForNextUpdate} = renderHook(
        props => useResponse(api, props),
        {initialProps: {value: 1}}
    );
    await waitForNextUpdate();
    rerender({value: 1});
    expect(result.current[0].kind).toBe('hasValue');
    expect(result.current[0].kind === 'hasValue' && result.current[0].data).toBe(1);
});
