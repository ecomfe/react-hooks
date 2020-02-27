import {useRef, useCallback} from 'react';

export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;

export function useEffectRef<E extends HTMLElement = HTMLElement>(callback: RefCallback<E>): EffectRef<E> {
    const elementRef = useRef<HTMLElement>();
    const disposeRef = useRef<(() => void) | undefined>(undefined);
    const effect = useCallback(
        (element: E | null) => {
            const previousElement = elementRef.current;

            if (previousElement) {
                disposeRef.current && disposeRef.current();
            }

            if (element) {
                const dispose = callback(element);
                dispose && (disposeRef.current = dispose);
                elementRef.current = element;
            }
        },
        [callback]
    );

    return effect;
}
