/* eslint-disable no-empty-function, react/jsx-no-bind */
import {forwardRef, useEffect} from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {useControl, useControlSource} from '../index';


const Foo = forwardRef(({title}, ref) => {
    const [i, {increase}] = useControlSource(ref, 0, setState => ({
        increase: () => setState(v => v + 1),
        decrease: () => setState(v => v - 1),
    }));
    return <div data-title={title} onClick={increase}>{i}</div>;
});

const Bar = ({c = Foo, setFn}) => {
    const [Comp, {decrease, $get}] = useControl(c);
    useEffect(
        () => {
            setFn({decrease, $get});
        },
        [setFn, decrease, $get]
    );
    return Comp ? <Comp title="test" /> : null;
};

test('expose and trigger methods', () => {
    const fns = {};
    const {container} = render(<Bar setFn={o => Object.assign(fns, o)} />);
    const el = container.querySelector('div');
    expect(el.innerHTML).toBe('0');
    fireEvent.click(el);
    expect(el.innerHTML).toBe('1');
    act(() => fns.decrease());
    expect(el.innerHTML).toBe('0');
    expect(typeof fns.$get('increase')).toBe('function');
    expect(fns.$get('abc')).toBe(undefined);
});

test('component not exist', () => {
    const {container} = render(<Bar c={null} setFn={() => {}} />);
    expect(container.querySelector('div')).toBe(null);
});
