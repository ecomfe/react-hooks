import {useCallback} from 'react';
import {useSwitch} from '@huse/boolean';
import {useDebouncedCallback} from '@huse/debounce';

export interface HoverOptions {
    delay?: number;
    onEnter?(event: MouseEvent): void;
    onLeave?(event: MouseEvent): void;
}

export interface HoverCallbacks {
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
}

export function useHover({delay = 0, onEnter, onLeave}: HoverOptions = {}): [boolean, HoverCallbacks] {
    const [inHover, enterHover, leaveHover] = useSwitch();
    const enter = useCallback(
        (e: MouseEvent) => {
            enterHover();
            onEnter && onEnter(e);
        },
        [enterHover, onEnter]
    );
    const leave = useCallback(
        (e: MouseEvent) => {
            leaveHover();
            onLeave && onLeave(e);
        },
        [leaveHover, onLeave]
    );
    const debouncedEnter = useDebouncedCallback(enter, delay);
    const debouncedLeave = useDebouncedCallback(leave, delay);

    return [
        inHover,
        {
            onMouseEnter: debouncedEnter,
            onMouseLeave: debouncedLeave,
        },
    ];
}
