# @huse/window-size

Read and observe the size of viewport.

## useWindowSize

Retrieve current window size, both inner and outer.

```typescript
interface WindowSize {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
}

function useWindowSize(): WindowSize;
```

State will update when window resizes.

```jsx
import {useWindowSize} from '@huse/document-window-size';

const App = () => {
    const size = useWindowSize();

    return (
        <>
            <p>Outer: {size.outerWidth} x {size.outerHeight}</p>
            <p>Inner: {size.innerWidth} x {size.innerHeight}</p>
            <p>Resize window to update</p>
        </>
    );
};
```
