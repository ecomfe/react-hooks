import {RefObject} from 'react';
import {useDocumentEvent} from '@huse/document-event';

export function useClickOutside(ref: RefObject<HTMLElement>, callback: (e: MouseEvent | TouchEvent) => void) {
    const testAndTrigger = (e: MouseEvent | TouchEvent) => {
        if (!ref.current?.contains(e.target as Element)) {
            callback(e);
        }
    };

    useDocumentEvent('mouseup', testAndTrigger, true);
    useDocumentEvent('touchstart', testAndTrigger, true);
}
