---
title: useOnScreenLazyValue
nav:
  title: Hooks
  path: /hook
group:
  title: Intersection
  path: /intersection
order: 3
---

# useOnScreenLazyValue

Return a value only when element intersects with screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreenLazyValue<T>(value: T, options?: OnScreenOptions): [EffectRef, T | undefined];
```

If element is out of screen when mount, `undefined` will return, once the element intersects with screen, `value` will return.

**Note: even if element is out of screen again after it goes into screen, `value` is still used, it never goes back to `undefined`.**

This can be helpful to implement lazy loading.

```javascript
import {useOnScreenLazyValue} from '@huse/intersection';

const LazyImage = props => {
    const [listenOnScreen, src] = useOnScreenLazyValue(props.src);

    return (
        <img {...props} ref={listenOnScreen} src={src} />
    );
};
```

Passing a `true` as value works as `useOnScreen` but triggers only once:

```javascript
import {useOnScreenLazyValue} from '@huse/intersection';

const App = ({children}) => {
    const [ref, isOnScreen] = useOnScreenLazyValue(true);

    return (
        <div style={{backgroundColor: isOnScreen ? 'blue' : 'transparent'}}>
            {children}
        </div>
    );
};
```