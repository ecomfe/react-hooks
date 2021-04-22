import {useRef, useEffect, useState, MutableRefObject} from 'react';
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

type Target = MutableRefObject<HTMLElement> | HTMLElement | null;

function getTargetNode(target?: Target): HTMLElement | Document {
    if (!target) {
        return document;
    }
    if ('current' in target) {
        return target.current;
    }
    return target;
}

export function useScrollPosition(target?: Target): ScrollPosition {
    const rafTick = useRef(0);
    const [position, setPosition] = useState(INITIAL_POSITION);
    useEffect(
        () => {
            if (target === null) {
                return;
            }
            const targetNode = getTargetNode(target);
            const targetElement = targetNode === document ? document.documentElement : targetNode as HTMLElement;
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

            targetNode.addEventListener('scroll', syncScroll, EVENT_OPTIONS);

            return () => {
                targetNode.removeEventListener('scroll', syncScroll, EVENT_OPTIONS);
                cancelAnimationFrame(rafTick.current);
            };
        },
        [target]
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
