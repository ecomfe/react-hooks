import {MutableRefObject} from 'react';
import {useDocumentEvent} from '@huse/document-event';

export function useClickOutside(ref: MutableRefObject<HTMLElement>, callback: () => void) {
    const testAndTrigger = (e: MouseEvent | TouchEvent) => {
        if (!ref.current?.contains(e.target as Element)) {
            callback();
        }
    };

    useDocumentEvent('mouseup', testAndTrigger, true);
    useDocumentEvent('touchstart', testAndTrigger, true);
}
