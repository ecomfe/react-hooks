import {renderHook} from '@testing-library/react-hooks';
import {useMergedRef} from '../index';

test('return a callback ref', () => {
    const {result} = renderHook(() => useMergedRef([]));
    expect(typeof result.current).toBe('function');
});

test('single mutation ref', () => {
    const ref = {current: null};
    const {result} = renderHook(() => useMergedRef([ref]));
    result.current(1);
    expect(ref.current).toBe(1);
});

test('single callback ref', () => {
    const ref = jest.fn();
    const {result} = renderHook(() => useMergedRef([ref]));
    result.current(1);
    expect(ref).toHaveBeenCalledWith(1);
});

test('null ref', () => {
    const {result} = renderHook(() => useMergedRef([null]));
    expect(() => result.current(1)).not.toThrow();
});

test('undefined ref', () => {
    const {result} = renderHook(() => useMergedRef([undefined]));
    expect(() => result.current(1)).not.toThrow();
});

test('multiple ref combination', () => {
    const mutationRef = {current: null};
    const callbackRef = jest.fn();
    const {result} = renderHook(() => useMergedRef([mutationRef, null, undefined, callbackRef]));
    result.current(1);
    expect(mutationRef.current).toBe(1);
    expect(callbackRef).toHaveBeenCalledWith(1);
});

test('callback reference identity', () => {
    const ref = {current: null};
    const {result, rerender} = renderHook(props => useMergedRef([props.innerRef]), {initialProps: {innerRef: ref}});
    const old = result.current;
    rerender({innerRef: ref});
    expect(old).toBe(result.current);
});

test('change ref', () => {
    const ref = {current: null};
    const {result, rerender} = renderHook(props => useMergedRef([props.innerRef]), {initialProps: {innerRef: ref}});
    const old = result.current;
    rerender({innerRef: [null]});
    expect(old).not.toBe(result.current);
});

test('change length', () => {
    const ref = {current: null};
    const {result, rerender} = renderHook(props => useMergedRef([props.innerRef]), {initialProps: {innerRef: ref}});
    const old = result.current;
    rerender({innerRef: []});
    expect(old).not.toBe(result.current);
});
