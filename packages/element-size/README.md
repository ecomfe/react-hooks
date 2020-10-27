# element-size

Hooks related to observing element size.

```shell
npm install @huse/element-size
```

## useElementResize

Trigger a callback when element resizes.

```typescript
type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementResize(callback: (element: HTMLElement) => void): ElementResizeCallback;
```

To ensure all element changes are captured even with the change of element type (like from `<div>` to `<span>`),
`useElementResize` returns a callback ref, you are required to pass it via `ref` prop to an DOM element.

**Note: `useElementResize` does not trigger callback on initial mount.**

```jsx
import React, {useState, useReducer, useCallback} from 'react';
import {useElementResize, useElementSize} from '@huse/element-size';

export default () => {
    const [height, increaseHeight] = useReducer(v => v + 20, 60);
    const [size, setSize] = useState([0, 0]);
    const observeSize = useCallback(
        element => setSize([element.offsetWidth, element.offsetHeight]),
        []
    );
    const ref = useElementResize(observeSize);
    return (
        <div
            ref={ref}
            style={{height, lineHeight: `${height}px`, textAlign: 'center', backgroundColor: '#007bd2', fontSize: 36, color: '#fff'}}
            onClick={increaseHeight}
        >
            {size[0]} x {size[1]} (click to increase height)
        </div>
    );
};
```


## useElementSize

Observes and returns the offset size of an element.


```typescript
export interface Size {
    width: number; // offsetWidth
    height: number; // offsetHeight
}

type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementSize(): [ElementResizeCallback, Size | undefined];
```

The initial size is `undefined` and will be updated on mount any anytime element is resized.

```jsx
import React, {useState, useReducer, useCallback} from 'react';
import {useElementResize, useElementSize} from '@huse/element-size';

export default () => {
    const [ref, size] = useElementSize();
    return (
        <div
            ref={ref}
            style={{height: 60, lineHeight: '60px', textAlign: 'center', backgroundColor: '#007bd2', fontSize: 36, color: '#fff'}}
        >
            {size && `${size.width} x ${size.height}`}
        </div>
    );
};
```
