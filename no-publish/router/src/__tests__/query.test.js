import {render} from '@testing-library/react';
import stringify from 'fast-json-stable-stringify';
import {useQuery} from '../query';
import {Root} from './tree';

const QueryDisplay = ({options}) => {
    const query = useQuery(options);
    return <span title="result">{stringify(query)}</span>;
};

describe('query', () => {
    test('parse search', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1">
                <QueryDisplay />
            </Root>
        );
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'bar', x: '1'}));
    });

    test('parse number', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1">
                <QueryDisplay options={{parseNumbers: true}} />
            </Root>
        );
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'bar', x: 1}));
    });

    test('parse boolean', () => {
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=true">
                <QueryDisplay options={{parseBooleans: true}} />
            </Root>
        );
        const label = getByTitle('result');
        expect(label.textContent).toBe(stringify({foo: 'bar', x: true}));
    });
});
