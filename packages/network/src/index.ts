import {useEffect} from 'react';
import {useSwitch} from '@huse/boolean';

export function useOnLine(): boolean {
    const [onLine, goOnLine, goOffLine] = useSwitch(navigator.onLine ?? true);
    useEffect(
        () => {
            window.addEventListener('online', goOnLine);
            window.addEventListener('offline', goOffLine);

            return () => {
                window.removeEventListener('online', goOnLine);
                window.removeEventListener('offline', goOffLine);
            };
        },
        [goOnLine, goOffLine]
    );

    return onLine;
}
