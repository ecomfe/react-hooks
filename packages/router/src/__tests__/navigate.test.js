/* eslint-disable react/jsx-no-bind */
import {render, fireEvent} from '@testing-library/react';
import URITemplate from 'uri-templates';
import {useNavigate} from '../navigate';
import {Root} from './tree';

const Navigate = ({template, options, params}) => {
    const navigate = useNavigate(template, options);
    return <span title="navigate" onClick={() => navigate(params)} />;
};

describe('updateQuery', () => {
    test('string url', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <Navigate template="/bar" />
            </Root>
        );
        const label = getByTitle('navigate');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(2);
        expect(onChange.mock.results[0].value.location.pathname).toBe('/bar');
    });

    test('template url', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <Navigate template="/bar/{foo}" params={{foo: 123}} />
            </Root>
        );
        const label = getByTitle('navigate');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(2);
        expect(onChange.mock.results[0].value.location.pathname).toBe('/bar/123');
    });

    test('template instance', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <Navigate template={new URITemplate('/bar/{foo}')} params={{foo: 123}} />
            </Root>
        );
        const label = getByTitle('navigate');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(2);
        expect(onChange.mock.results[0].value.location.pathname).toBe('/bar/123');
    });

    test('replace mode', () => {
        const onChange = jest.fn(v => v);
        const {getByTitle} = render(
            <Root url="/?foo=bar&x=1" onChange={onChange}>
                <Navigate template="/bar" options={{replace: true}} />
            </Root>
        );
        const label = getByTitle('navigate');
        fireEvent.click(label);
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.results[0].value.length).toBe(1);
        expect(onChange.mock.results[0].value.location.pathname).toBe('/bar');
    });
});
