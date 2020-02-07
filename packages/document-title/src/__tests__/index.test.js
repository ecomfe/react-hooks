/* eslint-disable react/jsx-no-bind */
import {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {useDocumentTitle} from '../index';

const Foo = ({titleX, titleY}) => {
    const [useY, setUseY] = useState(false);
    useDocumentTitle(useY ? titleY : titleX);
    return <span id="switch" onClick={() => setUseY(v => !v)} />;
};

test('initial title', () => {
    render(<Foo titleX="foo" />);
    expect(document.title).toBe('foo');
});

test('change title', () => {
    const {container} = render(<Foo titleX="foo" titleY="bar" />);
    fireEvent.click(container.querySelector('#switch'));
    expect(document.title).toBe('bar');
});

test('revert on unmount', () => {
    const {unmount} = render(<Foo titleX="foo" />);
    unmount();
    expect(document.title).toBe('');
});
