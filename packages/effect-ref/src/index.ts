import {useRef, useCallback} from 'react';

export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;

const noop = () => undefined;

export function useEffectRef<E extends HTMLElement = HTMLElement>(callback: RefCallback<E>): EffectRef<E> {
    const disposeRef = useRef<(() => void)>(noop);
    const effect = useCallback(
        (element: E | null) => {
            disposeRef.current && disposeRef.current();

            if (element) {
                const dispose = callback(element);
                dispose && (disposeRef.current = dispose);
            }
        },
        [callback]
    );

    return effect;
}
