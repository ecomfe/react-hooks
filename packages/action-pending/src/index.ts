import {useCallback, useEffect, useRef} from 'react';
import {useCounter} from '@huse/number';

type AsyncFunction = (...args: any[]) => Promise<any>;

export function useActionPending<A extends AsyncFunction>(action: A): [A, number] {
    const unmounted = useRef(false);
    const [pendingCount, {inc, dec}] = useCounter();
    const actionWithPending = useCallback(
        (...args: Parameters<A>) => {
            inc();
            const pending = action(...args);
            const safeDec = () => {
                if (!unmounted.current) {
                    dec();
                }
            };
            pending.then(safeDec, safeDec);
            return pending;
        },
        [action, dec, inc]
    );
    useEffect(
        () => {
            unmounted.current = false;
            return () => {
                unmounted.current = true;
            };
        },
        []
    );
    return [actionWithPending as A, pendingCount];
}
