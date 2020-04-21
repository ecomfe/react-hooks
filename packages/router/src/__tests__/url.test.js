import {resolve} from '../url';

describe('resolve', () => {
    test('to absolute', () => {
        const destination = resolve('/foo/bar', '/bar');
        expect(destination).toBe('/bar');
    });

    test('parent', () => {
        const destination = resolve('/foo/bar', '..');
        expect(destination).toBe('/foo');
    });

    test('parent relative', () => {
        const destination = resolve('/foo/bar', '../alice');
        expect(destination).toBe('/foo/alice');
    });

    test('current relative', () => {
        const destination = resolve('/foo/bar', './alice');
        expect(destination).toBe('/foo/bar/alice');
    });

    test('plain relative', () => {
        const destination = resolve('/foo/bar', 'alice');
        expect(destination).toBe('/foo/bar/alice');
    });

    test('trailing slash', () => {
        const destination = resolve('/foo/bar/', './alice/');
        expect(destination).toBe('/foo/bar/alice');
    });

    test('empty to', () => {
        const destination = resolve('/foo/bar/', '');
        expect(destination).toBe('/foo/bar');
    });

    test('up to root', () => {
        const destination = resolve('/foo/bar/', '../../../..');
        expect(destination).toBe('/');
    });
});
