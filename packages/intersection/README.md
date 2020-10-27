# intersection

Provides hooks to observe intersection between element and viewport.

```shell
npm install @huse/intersection
```

## useOnScreen

Returns a boolean indicating whether element is currently on screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreen({rootMargin, threshold}: OnScreenOptions = {}): [EffectRef, boolean];
```

This hook only checks intersection between element and the root element (`documentElement` in browser).

**Note: `useOnScreen` requires `IntersectionObserver` to work, without `IntersectionObserver` it supposes the element is always on screen.**

```jsx
import React from 'react';
import {useOnScreen} from '@huse/intersection';

export default () => {
    const [ref, isOnScreen] = useOnScreen(ref, {rootMargin: '10px', threshold: '30%'});
    return (
        <>
            <p>Visual port is currently {isOnScreen ? 'on' : 'out of'} screen</p>
            <div ref={ref} style={{marginTop: 600, padding: 40, backgroundColor: '#007bd2', fontSize: 30, color: '#fff'}}>
                This is visual port
            </div>
        </>
    );
};
```

## useOnScreenLazyValue

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

## useOnScreenCallback

This is a fundamental hook which triggers a callback when element intersects with screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreenCallback(callback: (entry: IntersectionObserverEntry) => void, options?: OnScreenOptions): EffectRef;
```

`callback` is triggered whenever element is into or out of screen.

Most of the time `useOnScreen` and `useOnScreenValue` are enough, this hooks leaves the ability to extend custom logics with screen intersection.

