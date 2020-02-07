import {useRef, useLayoutEffect} from 'react';

type DocumentEventHandler<K extends keyof DocumentEventMap> = (e: DocumentEventMap[K]) => any;

export function useDocumentEvent<K extends keyof DocumentEventMap>(eventName: K, fn: DocumentEventHandler<K>) {
    const handler = useRef(fn);
    handler.current = fn;
    useLayoutEffect(
        () => {
            const trigger: DocumentEventHandler<K> = e => handler.current(e);
            document.addEventListener(eventName, trigger);
            return () => document.removeEventListener(eventName, trigger);
        },
        [eventName]
    );
}
