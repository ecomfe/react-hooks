import {useLayoutEffect} from 'react';

export function useDocumentTitle(title: string) {
    useLayoutEffect(
        () => {
            const previous = document.title;
            document.title = title;
            return () => {
                document.title = previous;
            };
        },
        [title]
    );
}
