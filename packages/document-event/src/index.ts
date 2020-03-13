import {useRef, useEffect} from 'react';

type EventNames = keyof DocumentEventMap;

type DocumentEventHandler<K extends EventNames> = (e: DocumentEventMap[K]) => any;

export function useDocumentEvent<K extends EventNames>(
    eventName: K,
    fn: DocumentEventHandler<K>,
    options?: boolean | AddEventListenerOptions
) {
    const handler = useRef(fn);
    useEffect(
        () => {
            handler.current = fn;
        },
        [fn]
    );
    useEffect(
        () => {
            const trigger: DocumentEventHandler<K> = e => handler.current(e);
            document.addEventListener(eventName, trigger, options);
            return () => document.removeEventListener(eventName, trigger, options);
        },
        [eventName, options]
    );
}
