import {useEffect, useRef} from 'react';

export function useScrollLock(lock: boolean): void {
    const previousOverflowRef = useRef('');
    useEffect(
        () => {
            if (!lock) {
                return;
            }

            /* istanbul ignore next */
            if (typeof document === 'undefined') {
                return;
            }

            previousOverflowRef.current = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                // Do not reset if other scripts modify style.
                if (document.body.style.overflow === 'hidden') {
                    document.body.style.overflow = previousOverflowRef.current;
                }
            };
        },
        [lock]
    );
}
