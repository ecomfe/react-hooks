import {renderHook} from '@testing-library/react-hooks';
import {useScrollPosition, useScrollLeft, useScrollTop} from '../index';

describe('useScrollPosition', () => {
    test('default position on null element', () => {
        const {result} = renderHook(() => useScrollPosition(null));
        expect(result.current).toEqual({x: 0, y: 0, left: 0, top: 0, scrollLeft: 0, scrollTop: 0});
    });

    test('element scroll position', () => {
        const div = document.createElement('div');
        div.scrollTop = 10;
        div.scrollLeft = 125;
        const {result} = renderHook(() => useScrollPosition(div));
        expect(result.current.x).toBe(125);
        expect(result.current.y).toBe(10);
    });

    test('scroll change', async () => {
        const div = document.createElement('div');
        const {result, waitForNextUpdate} = renderHook(() => useScrollPosition(div));
        div.scrollTop = 20;
        div.scrollLeft = 30;
        expect(result.current.x).toBe(0);
        expect(result.current.y).toBe(0);
        div.dispatchEvent(new Event('scroll'));
        await waitForNextUpdate();
        expect(result.current.x).toBe(30);
        expect(result.current.y).toBe(20);
    });

    test('window scroll position', () => {
        document.documentElement.scrollTop = 10;
        document.documentElement.scrollLeft = 125;
        const {result} = renderHook(() => useScrollPosition());
        expect(result.current.x).toBe(125);
        expect(result.current.y).toBe(10);
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
    });

    test('window scroll change', async () => {
        const {result, waitForNextUpdate} = renderHook(() => useScrollPosition());
        expect(result.current.x).toBe(0);
        expect(result.current.y).toBe(0);
        document.documentElement.scrollTop = 20;
        document.documentElement.scrollLeft = 30;
        document.dispatchEvent(new Event('scroll'));
        await waitForNextUpdate();
        expect(result.current.x).toBe(30);
        expect(result.current.y).toBe(20);
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
    });

    test('change element', () => {
        const div = document.createElement('div');
        const span = document.createElement('div');
        span.scrollTop = 20;
        span.scrollLeft = 30;
        const {result, rerender} = renderHook(
            props => useScrollPosition(props.element),
            {initialProps: {element: div}}
        );
        expect(result.current.x).toBe(0);
        expect(result.current.y).toBe(0);
        rerender({element: span});
        expect(result.current.x).toBe(30);
        expect(result.current.y).toBe(20);
    });

    test('merge consequence scroll', async () => {
        const div = document.createElement('div');
        const {result, waitForNextUpdate} = renderHook(() => useScrollPosition(div));
        div.scrollTop = 20;
        div.scrollLeft = 30;
        div.dispatchEvent(new Event('scroll'));
        div.scrollTop = 40;
        div.scrollLeft = 50;
        div.dispatchEvent(new Event('scroll'));
        await waitForNextUpdate();
        expect(result.current.x).toBe(50);
        expect(result.current.y).toBe(40);
    });
});

describe('useScrollTop', () => {
    test('return scroll top', () => {
        const div = document.createElement('div');
        div.scrollTop = 10;
        const {result} = renderHook(() => useScrollTop(div));
        expect(result.current).toBe(10);
    });
});

describe('useScrollLeft', () => {
    test('return scroll left', () => {
        const div = document.createElement('div');
        div.scrollLeft = 10;
        const {result} = renderHook(() => useScrollLeft(div));
        expect(result.current).toBe(10);
    });
});
