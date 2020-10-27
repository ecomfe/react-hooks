# hover

Provides a hook to observe whether element is in hover state.

```shell
npm install @huse/hover
```

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

function useHover(options: HoverOptions = {}): [boolean, HoverCallbacks]
```

The `delay` options is default to `0`, with a value less than or equals to 0 hover state will change immediately on mouse enter and leave.

```jsx
import React, {useReducer, useCallback} from 'react';
import {useHover} from '@huse/hover';

export default () => {
    const [hoverTimes, enter] = useReducer(v => v + 1, 0);
    const [isHover, hoverCallbacks] = useHover({onEnter: enter});
    return (
        <div {...hoverCallbacks}>
            Hovered {hoverTimes} times {isHover && '(hovered)' }
        </div>
    );
};
```

Note that when `delay` is a positive value, `onEnter` and `onLeave` callbacks are also debounced,
once you want these callbacks to execute immediately without debouncing, compose callbacks yourself:

```jsx
import React, {useReducer, useCallback} from 'react';
import {useHover} from '@huse/hover';

export default () => {
    const [isHover, hoverCallbacks] = useHover({delay: 2000});
    const [hoverTimes, increaseHoverTimes] = useReducer(v => v + 1, 0);
    const enter = useCallback(
        e => {
            increaseHoverTimes();
            hoverCallbacks.onMouseEnter(e);
        },
        []
    );
    return (
        <div {...hoverCallbacks} onMouseEnter={enter}>
            Hovered {hoverTimes} times {isHover && '(hovered)' }
        </div>
    );
};
```
