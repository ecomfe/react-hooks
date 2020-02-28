/* eslint-disable no-console, react/jsx-no-bind */
import {render} from '@testing-library/react';
import {useEffectRef} from '../index';

const Foo = ({onRef}) => {
    const ref = useEffectRef(onRef);
    return <div ref={ref} />;
};

test('call on mount', () => {
    const callback = jest.fn();
    render(<Foo onRef={callback} />);
    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0] instanceof HTMLElement).toBe(true);
});

test('dispose on unmount', () => {
    const dispose = jest.fn();
    const callback = () => dispose;
    const {unmount} = render(<Foo onRef={callback} />);
    unmount();
    expect(dispose).toHaveBeenCalled();
});

test('dispose calls only once', () => {
    const dispose = jest.fn();
    const callback1 = () => dispose;
    const callback2 = () => undefined;
    const callback3 = () => undefined;
    const {unmount, rerender} = render(<Foo onRef={callback1} />);
    rerender(<Foo onRef={callback2} />);
    rerender(<Foo onRef={callback3} />);
    unmount();
    expect(dispose).toHaveBeenCalledTimes(1);
});


test('warn on invalid return', () => {
    const callback = jest.fn(() => 123);
    const warn = jest.fn();
    const nativeWarn = console.warn;
    console.warn = warn;
    render(<Foo onRef={callback} />);
    console.warn = nativeWarn;
    expect(warn).toHaveBeenCalled();
});
