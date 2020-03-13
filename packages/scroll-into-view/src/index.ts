import {useEffect, RefObject, useRef} from 'react';

export function useScrollIntoView(
    ref: RefObject<HTMLElement>,
    active: boolean = true,
    options: boolean | ScrollIntoViewOptions = {behavior: 'smooth'}
): void {
    const scrollOptions = useRef(options);
    useEffect(
        () => {
            scrollOptions.current = options;
        },
        [options]
    );
    useEffect(
        () => {
            if (ref.current && active) {
                ref.current.scrollIntoView(scrollOptions.current);
            }
        },
        [ref, active]
    );
}
