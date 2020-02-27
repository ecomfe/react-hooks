import {useState, useCallback} from 'react';
import {useEffectRef, EffectRef} from '@huse/effect-ref';

export type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;

export function useOnScreen({rootMargin, threshold}: OnScreenOptions = {}): [EffectRef, boolean] {
    const [isIntersecting, setIntersecting] = useState(() => typeof IntersectionObserver === 'undefined');
    const observe = useCallback(
        (element: HTMLElement) => {
            if (!element || typeof IntersectionObserver === 'undefined') {
                return;
            }

            const observer = new IntersectionObserver(
                ([entry]) => setIntersecting(entry.isIntersecting),
                {rootMargin, threshold}
            );
            observer.observe(element);

            return () => {
                observer.unobserve(element);
            };
        },
        [rootMargin, threshold]
    );
    const observeOnScreen = useEffectRef(observe);

    return [observeOnScreen, isIntersecting];
}
