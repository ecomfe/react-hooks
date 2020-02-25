import {useEffect, useState} from 'react';

const matchMedia = (query: string) => {
    const watcher = window.matchMedia(query);
    return {
        watcher,
        matches: watcher.matches,
    };
};

export function useMedia(query: string): boolean {
    const [matched, setMatched] = useState(() => matchMedia(query).matches);
    useEffect(
        () => {
            const {watcher} = matchMedia(query);
            const onChange = () => setMatched(!!watcher.matches);
            watcher.addListener(onChange);
            return () => watcher.removeListener(onChange);
        },
        [query]
    );
    return matched;
}

export function usePreferDarkMode(): boolean {
    return useMedia('(prefers-color-scheme: dark)');
}
