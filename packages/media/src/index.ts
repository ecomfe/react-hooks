import {useEffect, useState} from 'react';

export function useMedia(query: string, initialMatched: boolean = false) {
    const [matched, setMatched] = useState(initialMatched);
    useEffect(
        () => {
            const watcher = window.matchMedia(query);
            const onChange = () => setMatched(!!watcher.matches);
            watcher.addListener(onChange);
            return () => watcher.removeListener(onChange);
        },
        [query]
    );
    return matched;
}
