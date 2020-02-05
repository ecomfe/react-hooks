import {useRef} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {useForceUpdate} from '../index';

test('valid return type', () => {
    const {result} = renderHook(() => useForceUpdate());
    expect(typeof result.current).toBe('function');
});

test('will force update', () => {
    const Foo = () => {
        const times = useRef(0);
        times.current++;
        const forceUpdate = useForceUpdate();

        return <div onClick={forceUpdate}>{times.current}</div>;
    };

    const {container} = render(<Foo />);
    const root = container.querySelector('div');
    fireEvent.click(root);
    expect(root.textContent).toBe('2');
});
