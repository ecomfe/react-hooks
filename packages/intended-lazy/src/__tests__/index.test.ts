import {renderHook} from '@testing-library/react-hooks';
import {useIntendedLazyCallback, useIntendedLazyValue} from '../index';

test('value works lazy', () => {
    const readerStack = [] as Array<() => number>;
    const {result, rerender} = renderHook(
        props => {
            const reader = useIntendedLazyValue(props.value);
            readerStack.push(reader);
            return reader;
        },
        {
            initialProps: {
                value: 1,
            },
        }
    );
    expect(result.current()).toBe(1);
    rerender({value: 2});
    expect(readerStack[0] === readerStack[1]);
    // Second rerender to make new callback committed
    rerender({value: 2});
    expect(result.current()).toBe(2);
});

test('callback workds with args', () => {
    const callbackStack = [] as Array<(i: number) => number>;
    const {result, rerender} = renderHook(
        props => {
            callbackStack.push(props.fn);
            return useIntendedLazyCallback(props.fn);
        },
        {
            initialProps: {
                fn: (i: number) => i + 1,
            },
        }
    );
    expect(result.current(1)).toBe(2);
    rerender({fn: (i: number) => i + 2});
    expect(callbackStack[0] === callbackStack[1]);
    // Second rerender to make new callback committed
    rerender({fn: (i: number) => i + 2});
    expect(result.current(1)).toBe(3);
});
