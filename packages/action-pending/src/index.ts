import {useCallback} from 'react';
import {useCounter} from '@huse/number';

type AsyncFunction = (...args: any[]) => Promise<any>;

export function useActionPending<A extends AsyncFunction>(action: A): [A, number] {
    const [pendingCount, {inc, dec}] = useCounter();
    const actionWithPending = useCallback(
        (...args: Parameters<A>) => {
            inc();
            const pending = action(...args);
            pending.then(dec, dec);
            return pending;
        },
        [action, dec, inc]
    );
    return [actionWithPending as A, pendingCount];
}
