# @huse/intersection

Provides hooks to observe intersection between element and viewport.

## useOnScreen

Returns a boolean indicating whether element is currently on screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreen({rootMargin, threshold}: OnScreenOptions = {}): [EffectRef, boolean];
```

This hook only checks intersection between element and the root element (`documentElement` in browser).

**Note: `useOnScreen` requires `IntersectionObserver` to work, without `IntersectionObserver` it supposes the element is always on screen.**

```jsx
import {useOnScreen} from '@huse/intersection';

const LazyView = ({children}) => {
    const [ref, isOnScreen] = useOnScreen(ref, {rootMargin: '10px', threshold: '30%'});

    return (
        <div ref={ref}>
            {isOnScreen && children()}
        </div>
    );
};
```
