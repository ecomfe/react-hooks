import {useRef, useEffect, useState} from 'react';
import hasPassiveEvent from 'has-passive-events';

export interface ScrollPosition {
    x: number;
    y: number;
    left: number;
    top: number;
    scrollLeft: number;
    scrollTop: number;
}

const INITIAL_POSITION: ScrollPosition = {x: 0, y: 0, left: 0, top: 0, scrollLeft: 0, scrollTop: 0};

/* istanbul ignore next */
const EVENT_OPTIONS = hasPassiveEvent ? {passive: true} as AddEventListenerOptions : false;

const getScrollPosition = (element: HTMLElement): ScrollPosition => {
    const {scrollTop, scrollLeft} = element;

    return {
        scrollLeft,
        scrollTop,
        x: scrollLeft,
        y: scrollTop,
        left: scrollLeft,
        top: scrollTop,
    };
};

export function useScrollPosition(element?: HTMLElement | null): ScrollPosition {
    const rafTick = useRef(0);
    const [position, setPosition] = useState(INITIAL_POSITION);
    useEffect(
        () => {
            if (element === null) {
                return;
            }

            const target = element ?? document;
            const targetElement = element ?? document.documentElement;

            setPosition(getScrollPosition(targetElement));

            const syncScroll = () => {
                if (rafTick.current) {
                    return;
                }

                const callback = () => {
                    setPosition(getScrollPosition(targetElement));
                    rafTick.current = 0;
                };
                rafTick.current = requestAnimationFrame(callback);
            };

            target.addEventListener('scroll', syncScroll, EVENT_OPTIONS);

            return () => {
                target.removeEventListener('scroll', syncScroll, EVENT_OPTIONS);
                cancelAnimationFrame(rafTick.current);
            };
        },
        [element]
    );

    return position;
}

export function useScrollTop(element?: HTMLElement | null): number {
    const {scrollTop} = useScrollPosition(element);
    return scrollTop;
}

export function useScrollLeft(element?: HTMLElement | null): number {
    const {scrollLeft} = useScrollPosition(element);
    return scrollLeft;
}
