/* eslint-disable react/jsx-no-bind */
import {render, fireEvent} from '@testing-library/react';
import {useQuery} from '../query';
import {useQueryState} from '../queryState';
import {Root} from './tree';

const QueryState = ({name, newValue, parseOptions, updateOptions}) => {
    const query = useQuery(parseOptions);
    const [value, setValue] = useQueryState(query, name, updateOptions);
    return <span title="query" onClick={() => setValue(newValue)}>{value}</span>;
};


describe('updateQuery', () => {
    test('get value', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1">
                <QueryState name="foo" />
            </Root>
        );
        const label = getByTitle('query');
        expect(label.textContent).toBe('bar');
    });

    test('set value', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <QueryState name="foo" newValue="alice" />
            </Root>
        );
        const label = getByTitle('query');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(2);
        expect(label.textContent).toBe('alice');
    });

    test('replace mode', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <QueryState name="foo" newValue="alice" updateOptions={{replace: true}} />
            </Root>
        );
        const label = getByTitle('query');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(1);
    });
});
