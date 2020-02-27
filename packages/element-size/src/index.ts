import {useState, useCallback} from 'react';
import {addListener, removeListener} from 'resize-detector';
import {useEffectRef} from '@huse/effect-ref';

export interface Size {
    width: number;
    height: number;
}

export type ElementResizeCallback = (element: HTMLElement | null) => void;

export function useElementResize(callback: (element: HTMLElement) => void): ElementResizeCallback {
    const update = useCallback(
        (element: HTMLElement) => {
            const notifyResize = (element: HTMLElement) => callback(element);
            addListener(element, notifyResize);

            return () => {
                removeListener(element, notifyResize);
            };
        },
        [callback]
    );
    const ref = useEffectRef(update);

    return ref;
}

export function useElementSize(): [ElementResizeCallback, Size | undefined] {
    const [size, setSize] = useState<Size | undefined>();
    const updateSize = useCallback(
        (element: HTMLElement) => {
            const size = {
                width: element.offsetWidth,
                height: element.offsetHeight,
            };
            setSize(size);
        },
        []
    );
    const resize = useElementResize(updateSize);
    const observeElementSize = useCallback(
        (element: HTMLElement | null) => {
            resize(element);

            if (element) {
                updateSize(element);
            }
        },
        [resize, updateSize]
    );
    return [observeElementSize, size];
}
