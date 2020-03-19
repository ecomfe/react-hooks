import {useState, useCallback} from 'react';
import {useEffectRef, EffectRef} from '@huse/effect-ref';

export type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;

export function useOnScreenCallback(
    callback: (e: IntersectionObserverEntry) => void,
    {rootMargin, threshold}: OnScreenOptions = {}
): EffectRef {
    const observe = useCallback(
        (element: HTMLElement) => {
            if (!element || typeof IntersectionObserver === 'undefined') {
                return;
            }

            const observer = new IntersectionObserver(
                ([entry]) => callback(entry),
                {rootMargin, threshold}
            );
            observer.observe(element);

            return () => {
                observer.unobserve(element);
            };
        },
        [callback, rootMargin, threshold]
    );
    const observeOnScreen = useEffectRef(observe);

    return observeOnScreen;
}

export function useOnScreen(options?: OnScreenOptions): [EffectRef, boolean] {
    const [isIntersecting, setIntersecting] = useState(() => typeof IntersectionObserver === 'undefined');
    const callback = useCallback(
        (entry: IntersectionObserverEntry) => setIntersecting(entry.isIntersecting),
        []
    );
    const ref = useOnScreenCallback(callback, options);

    return [ref, isIntersecting];
}

export function useOnScreenLazyValue<T>(value: T, options?: OnScreenOptions): [EffectRef, T | undefined] {
    const [intersected, setIntersected] = useState(() => typeof IntersectionObserver === 'undefined');
    const callback = useCallback(
        (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                setIntersected(true);
            }
        },
        []
    );
    const ref = useOnScreenCallback(callback, options);

    return [ref, intersected ? value : undefined];
}
