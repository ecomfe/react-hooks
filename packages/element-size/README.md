# @huse/element-size

Hooks related to observing element size.

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
import {useElementResize} from '@huse/element-size';

const App = () => {
    const ref = useRef(null);
    const onResize = useCallback(
        () => console.log('Resized'),
        []
    );
    useElementResize(onResize);

    return (
        <div ref={ref}>
            Hello World
        </div>
    );
}
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
import {useElementSize} from '@huse/element-size';

const [observeSize, size] = useElementSize();

return (
    <div ref={observeSize}>
        {size & `${size.width} x ${size.height}`}
    </div>
);
```
