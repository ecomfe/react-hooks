import {useLayoutEffect, RefObject} from 'react';

export function useScrollIntoView(ref: RefObject<HTMLElement>, active: boolean): void {
    useLayoutEffect(
        () => {
            if (ref.current && active) {
                ref.current.scrollIntoView({behavior: 'smooth'});
            }
        },
        [ref, active]
    );
}
