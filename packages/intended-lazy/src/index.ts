import {useImperativeHandle, useRef} from 'react';

export function useIntendedLazyValue<T>(value: T): () => T {
    const ref = useRef(value);
    useImperativeHandle(ref, () => value);
    const stableGet = useRef(() => ref.current);
    return stableGet.current;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function useIntendedLazyCallback<T extends Function>(fn: T): T {
    const ref = useRef(fn);
    useImperativeHandle(ref, () => fn);
    const stableCallback = useRef((...args: any[]) => ref.current(...args));
    return stableCallback.current as unknown as T;
}
