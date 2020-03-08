import {renderHook} from '@testing-library/react-hooks';
import {usePreviousValue, usePreviousEquals, useOriginalCopy, useOriginalDeepCopy} from '../index';

describe('usePreviousValue', () => {
    test('initial undefined', () => {
        const {result} = renderHook(() => usePreviousValue(1));
        expect(result.current).toBe(undefined);
    });

    test('cache previous', () => {
        const {result, rerender} = renderHook(props => usePreviousValue(props.value), {initialProps: {value: 1}});
        rerender({value: 2});
        expect(result.current).toBe(1);
    });
});

describe('usePreviousEquals', () => {
    test('initial false', () => {
        const {result} = renderHook(() => usePreviousEquals(1));
        expect(result.current).toBe(false);
    });

    test('false after change', () => {
        const {result, rerender} = renderHook(props => usePreviousEquals(props.value), {initialProps: {value: 1}});
        rerender({value: 2});
        expect(result.current).toBe(false);
    });

    test('true when unchanged', () => {
        const {result, rerender} = renderHook(props => usePreviousEquals(props.value), {initialProps: {value: 1}});
        rerender({value: 1});
        expect(result.current).toBe(true);
    });

    test('custom equals', () => {
        const {result, rerender} = renderHook(
            props => usePreviousEquals(props.value, () => true),
            {initialProps: {value: 1}}
        );
        rerender({value: 2});
        expect(result.current).toBe(true);
    });
});

describe('useOriginalCopy', () => {
    test('initial value', () => {
        const props = {value: 1};
        const {result} = renderHook(() => useOriginalCopy(props));
        expect(result.current).toBe(props);
    });

    test('keep change', () => {
        const {result, rerender} = renderHook(props => useOriginalCopy(props), {initialProps: {value: 1}});
        const props = {value: 2};
        rerender(props);
        expect(result.current).toBe(props);
    });

    test('original reference when content equals', () => {
        const props = {value: 1};
        const {result, rerender} = renderHook(props => useOriginalCopy(props), {initialProps: props});
        rerender({value: 1});
        expect(result.current).toBe(props);
    });

    test('custom equals', () => {
        const {result, rerender} = renderHook(
            props => useOriginalCopy(props, () => false),
            {initialProps: {value: 1}}
        );
        const props = {value: 1};
        rerender(props);
        expect(result.current).toBe(props);
    });
});

describe('useOriginalDeepCopy', () => {
    test('original reference when deep equal', () => {
        const props = {value: {foo: 1}};
        const {result, rerender} = renderHook(props => useOriginalDeepCopy(props), {initialProps: props});
        rerender({value: {foo: 1}});
        expect(result.current).toBe(props);
    });
});
