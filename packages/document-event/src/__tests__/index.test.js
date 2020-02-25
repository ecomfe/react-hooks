/* eslint-disable no-empty-function, react/jsx-no-bind */
import {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {useDocumentEvent} from '../index';

const Foo = ({onClick, onAnotherClick, capture}) => {
    const [useAnother, setUseAnother] = useState(false);
    useDocumentEvent('click', useAnother ? onAnotherClick : onClick, capture);
    return <span id="switch" onClick={() => setUseAnother(v => !v)} />;
};

test('trigger single event', () => {
    const counter = {value: 1};
    const {baseElement} = render(<Foo onClick={() => counter.value++} />);
    fireEvent.click(baseElement.parentElement);
    expect(counter.value).toBe(2);
});

test('change handler', () => {
    const counter = {value: 1};
    const {baseElement, container} = render(<Foo onClick={() => {}} onAnotherClick={() => counter.value++} />);
    fireEvent.click(container.querySelector('#switch'));
    fireEvent.click(baseElement.parentElement);
    expect(counter.value).toBe(2);
});

test('remove on unmount', () => {
    const counter = {value: 1};
    const {baseElement, unmount} = render(<Foo onClick={() => counter.value++} />);
    unmount();
    fireEvent.click(baseElement.parentElement);
    expect(counter.value).toBe(1);
});

test('with options', () => {
    const counter = {value: 1};
    const {baseElement, unmount} = render(<Foo capture onClick={() => counter.value++} />);
    unmount();
    fireEvent.click(baseElement.parentElement);
    expect(counter.value).toBe(1);
});
