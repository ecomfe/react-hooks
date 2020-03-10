# @huse/hover

Provides a hook to observe whether element is in hover state.

## useHover

This hooks returns a set of props to handle mouse events in order to report whether element is currently in hover state.

```typescript
interface HoverOptions {
    delay?: number;
}

interface HoverCallbacks {
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
}

function useHover(options?: HoverOptions, onEnter?: (event: MouseEvent) => void, onLeave?: (event: MouseEvent) => void): [boolean, HoverCallbacks]
```

The `delay` options is default to `0`, with a value less than or equals to 0 hover state will change immediately on mouse enter and leave.

```jsx
import {useHover} from '@huse/hover';

const App = () => {
    const [hoverTimes, enter] = useReducer(v => v + 1, 0);
    const [isHover, hoverCallbacks] = useHover({onEnter: enter});
    return (
        <div {...hoverCallbacks} style={{color: isHover ? 'red' : 'black'}}>
            Hovered {hoverTimes} times
        </div>
    );
}
```

Note that when `delay` is a positive value, `onEnter` and `onLeave` callbacks are also debounced,
once you want these callbacks to execute immediately without debouncing, compose callbacks yourself:

```jsx
import {useReducer, useCallback} from 'react';
import {useHover} from '@huse/hover';

const App = () => {
    const [isHover, hoverHandles] = useHover({delay: 2000});
    const [hoverTimes, increaseHoverTimes] = useReducer(v => v + 1, 0);
    const enter = useCallback(
        e => {
            increaseHoverTimes();
            hoverHandles.onMouseEnter(e);
        },
        []
    );
    return (
        <div {...hoverHandles} onMouseEnter={enter} style={{color: isHover ? 'red' : 'black'}}>
            Hovered {hoverTimes} times
        </div>
    );
}
