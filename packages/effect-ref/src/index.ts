import {useRef, useCallback} from 'react';

export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useEffectRef<E extends HTMLElement = HTMLElement>(callback: RefCallback<E>): EffectRef<E> {
    const disposeRef = useRef<(() => void)>(noop);
    const effect = useCallback(
        (element: E | null) => {
            disposeRef.current();
            // To ensure every dispose function is called only once.
            disposeRef.current = noop;

            if (element) {
                const dispose = callback(element);

                if (typeof dispose === 'function') {
                    disposeRef.current = dispose;
                }
                // Have an extra type check to work with javascript.
                else if (dispose !== undefined) {
                    // eslint-disable-next-line no-console
                    console.warn('Effect ref callback must return undefined or a dispose function');
                }
            }
        },
        [callback]
    );

    return effect;
}
