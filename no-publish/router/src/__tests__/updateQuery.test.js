/* eslint-disable react/jsx-no-bind */
import {render, fireEvent} from '@testing-library/react';
import stringify from 'fast-json-stable-stringify';
import {useQuery} from '../query';
import {useUpdateQuery} from '../updateQuery';
import {Root} from './tree';

const QueryDisplay = ({options}) => {
    const query = useQuery(options);
    return <span title="result">{stringify(query)}</span>;
};

const QueryUpdate = ({patch, parseOptions, updateOptions}) => {
    const query = useQuery(parseOptions);
    const update = useUpdateQuery(query, updateOptions);
    return <span title="update" onClick={() => update(patch)} />;
};

describe('updateQuery', () => {
    test('simple query', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <QueryDisplay />
                <QueryUpdate patch={{foo: 'alice'}} />
            </Root>
        );
        fireEvent.click(getByTitle('update'));
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'alice', x: '1'}));
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(2);
        expect(onChange.mock.results[0].value.location.search).toBe('?foo=alice&x=1');
    });

    test('replace mode', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <QueryDisplay />
                <QueryUpdate patch={{foo: 'alice'}} updateOptions={{replace: true}} />
            </Root>
        );
        fireEvent.click(getByTitle('update'));
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(1);
        expect(onChange.mock.results[0].value.location.search).toBe('?foo=alice&x=1');
    });

    test('stringify options', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1">
                <QueryDisplay />
                <QueryUpdate patch={{x: [1, 2, 3]}} updateOptions={{arrayFormat: 'comma'}} />
            </Root>
        );
        fireEvent.click(getByTitle('update'));
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'bar', x: '1,2,3'}));
    });

    test('filter empty', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1">
                <QueryDisplay />
                <QueryUpdate patch={{x: null}} updateOptions={{filterEmpty: true}} />
            </Root>
        );
        fireEvent.click(getByTitle('update'));
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'bar'}));
    });
});
