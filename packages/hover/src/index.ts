import {useCallback, useRef, MouseEvent} from 'react';
import {useSwitch} from '@huse/boolean';

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
    const tick = useRef<any>(-1);
    const enter = useCallback(
        (e: MouseEvent) => {
            clearTimeout(tick.current);

            if (inHover) {
                return;
            }

            const trigger = () => {
                enterHover();
                onEnter && onEnter(e);
            };

            if (delay) {
                tick.current = setTimeout(trigger, delay);
            }
            else {
                trigger();
            }
        },
        [delay, enterHover, inHover, onEnter]
    );
    const leave = useCallback(
        (e: MouseEvent) => {
            clearTimeout(tick.current);

            if (!inHover) {
                return;
            }

            const trigger = () => {
                leaveHover();
                onLeave && onLeave(e);
            };

            if (delay) {
                tick.current = setTimeout(trigger, delay);
            }
            else {
                trigger();
            }
        },
        [delay, inHover, leaveHover, onLeave]
    );

    return [
        inHover,
        {
            onMouseEnter: enter,
            onMouseLeave: leave,
        },
    ];
}
