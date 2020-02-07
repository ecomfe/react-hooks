/* eslint-disable react/jsx-no-bind */
import {useRef} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {useClickOutside} from '../index';

const Foo = ({onOutside}) => {
    const ref = useRef();
    useClickOutside(ref, onOutside);
    return <span ref={ref} id="root" />;
};

test('click inside', () => {
    const counter = {value: 1};
    const {baseElement} = render(<Foo onOutside={() => counter.value++} />);
    fireEvent.mouseUp(baseElement.querySelector('#root'));
    expect(counter.value).toBe(1);
});

test('click outside', () => {
    const counter = {value: 1};
    render(<Foo onOutside={() => counter.value++} />);
    fireEvent.mouseUp(document.body);
    expect(counter.value).toBe(2);
});
