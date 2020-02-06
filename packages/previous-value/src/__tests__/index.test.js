/* eslint-disable react/jsx-no-bind */
import {useState, useReducer} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {usePreviousValue, usePreviousEquals, useOriginalCopy, useOriginalDeepCopy} from '../index';

const useForceUpdate = () => useReducer(i => i + 1)[1];

describe('usePreviousValue', () => {
    const Foo = () => {
        const [value, setValue] = useState(1);
        const previousValue = usePreviousValue(value);

        return (
            <>
                <span id="previous">{previousValue || 'undefined'}</span>
                <span id="current">{value}</span>
                <span id="inc" onClick={() => setValue(i => i + 1)}>Increment</span>
            </>
        );
    };

    test('initial undefined', () => {
        const {container} = render(<Foo />);
        expect(container.querySelector('#previous').textContent).toBe('undefined');
        expect(container.querySelector('#current').textContent).toBe('1');
    });

    test('cache previous', () => {
        const {container} = render(<Foo />);
        fireEvent.click(container.querySelector('#inc'));
        expect(container.querySelector('#previous').textContent).toBe('1');
        expect(container.querySelector('#current').textContent).toBe('2');
    });
});

describe('usePreviousEquals', () => {
    const Foo = ({customEquals}) => {
        const [value, setValue] = useState(1);
        const update = useForceUpdate();
        const equals = usePreviousEquals(value, customEquals);

        return (
            <>
                <span id="equals">{equals.toString()}</span>
                <span id="inc" onClick={() => setValue(i => i + 1)}>Increment</span>
                <span id="update" onClick={update}>Increment</span>
            </>
        );
    };

    test('initial false', () => {
        const {container} = render(<Foo />);
        expect(container.querySelector('#equals').textContent).toBe('false');
    });

    test('false after change', () => {
        const {container} = render(<Foo />);
        fireEvent.click(container.querySelector('#inc'));
        expect(container.querySelector('#equals').textContent).toBe('false');
    });

    test('true when unchanged', () => {
        const {container} = render(<Foo />);
        fireEvent.click(container.querySelector('#update'));
        expect(container.querySelector('#equals').textContent).toBe('true');
    });

    test('custom equals', () => {
        const {container} = render(<Foo customEquals={() => true} />);
        fireEvent.click(container.querySelector('#inc'));
        expect(container.querySelector('#equals').textContent).toBe('true');
    });
});

describe('useOriginalCopy', () => {
    const Foo = ({customEquals}) => {
        const [value, setValue] = useState({foo: 1});
        const original = useOriginalCopy(value, customEquals);
        const previous = usePreviousValue(value);

        return (
            <>
                <span id="value">{original.foo}</span>
                <span id="equals">{(original === previous).toString()}</span>
                <span id="inc" onClick={() => setValue(i => ({foo: i.foo + 1}))}>Increment</span>
                <span id="same" onClick={() => setValue(i => ({foo: i.foo}))}>Increment</span>
            </>
        );
    };

    test('initial value', () => {
        const {container} = render(<Foo />);
        expect(container.querySelector('#value').textContent).toBe('1');
    });

    test('keep change', () => {
        const {container} = render(<Foo />);
        fireEvent.click(container.querySelector('#inc'));
        expect(container.querySelector('#value').textContent).toBe('2');
    });

    test('original reference when content equals', () => {
        const {container} = render(<Foo />);
        fireEvent.click(container.querySelector('#same'));
        expect(container.querySelector('#equals').textContent).toBe('true');
    });

    test('custom equals', () => {
        const {container} = render(<Foo customEquals={() => false} />);
        fireEvent.click(container.querySelector('#same'));
        expect(container.querySelector('#equals').textContent).toBe('false');
    });
});

describe('useOriginalDeepCopy', () => {
    const Foo = () => {
        const [value, setValue] = useState({foo: {bar: 1}});
        const original = useOriginalDeepCopy(value);
        const previous = usePreviousValue(value);

        return (
            <>
                <span id="value">{original.foo.bar}</span>
                <span id="equals">{(original === previous).toString()}</span>
                <span id="same" onClick={() => setValue(i => ({foo: {bar: i.foo.bar}}))}>Increment</span>
            </>
        );
    };

    test('original reference when deep equal', () => {
        const {container} = render(<Foo customEquals={() => false} />);
        fireEvent.click(container.querySelector('#same'));
        expect(container.querySelector('#equals').textContent).toBe('true');
    });
});
