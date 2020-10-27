# scroll-position

Provides a set of hooks to observe element or window scroll position.

```shell
npm install @huse/scroll-position
```

## useScrollPosition

Observe and returns scroll position of an element or window.

```typescript
interface ScrollPosition {
    x: number;
    y: number;
    left: number;
    top: number;
    scrollLeft: number;
    scrollTop: number;
}

function useScrollPosition(element?: HTMLElement | null): ScrollPosition
```

**Note there are different behaviors when `element` is either `null` or `undefined`, commonly `useRef`'s initial value is `null`.**
When `documentElement` is the observe target, simple `useScrollPosition()` without argument.

In order to satisfy different developers, the returned `ScrollPosition` has a set of different key pairs,
all `x`, `left`, `scrollLeft` have same value while `y`, `top`, `scrollTop` have same value.

```jsx
import React, {useRef} from 'react';
import {useScrollPosition} from '@huse/scroll-position';

export default () => {
    const ref = useRef(null);
    const position = useScrollPosition(ref.current);
    const gradient = 'radial-gradient(circle at 10% 20%, rgb(6, 123, 239) 14.2%, rgb(219, 115, 249) 89.5%)';
    return (
        <>
            <p>Scroll in the color block</p>
            <div ref={ref} style={{height: 200, width: 400, border: '1px solid #ccc', overflow: 'scroll'}}>
                <div style={{background: gradient, height: 600, width: 800}} />
            </div>
            <p>scrollTop: {position.y}</p>
            <p>scrollLeft: {position.x}</p>
        </>
    )
};
```

## useScrollLeft

`useScrollLeft` is a short hook to get the `left` value of `useScrollPosition`.

## useScrollTop

`useScrollTop` is a short hook to get the `top` value of `useScrollPosition`.
