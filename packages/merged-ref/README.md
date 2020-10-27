# merged-ref

Merge multiple refs into one.

```shell
npm install @huse/merged-ref
```

## useMergedRef

In react, refs can be a mutation container typed `Ref<T>`, or a callback typed `CallbackRef<T>`.
In case you need to use multiple refs on a single element like, this hook helps you to merge them into a single `CallbackRef<T>`.

```typescript
type RefLike<T> = Ref<T> | null | undefined;

function useMergedRef<T>(refs: Array<RefLike<T>>): RefCallback<T>
```

In the ecosystem of react, many custom hooks return callback ref, in order to serve multiple functions on the same element,
`useMergedRef` is introduced.

```jsx
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {useMergedRef} from '@huse/merged-ref';

export default () => {
    const [size, setSize] = useState([0, 0]);
    // callback ref
    const observeSize = useCallback(
        element => element && setSize([element.offsetWidth, element.offsetHeight]),
        []
    );
    // mutation ref
    const elementRef = useRef(null);
    useEffect(
        () => {
            if (elementRef.current) {
                elementRef.current.animate(
                    [{opacity: '1'}, {opacity: '.4'}, {opacity: '1'}],
                    {duration: 800, iterations: 4}
                );
            }
        },
        []
    );
    const ref = useMergedRef([observeSize, elementRef]);
    return (
        <div
            ref={ref}
            style={{height: 60, lineHeight: '60px', textAlign: 'center', backgroundColor: '#007bd2', fontSize: 36, color: '#fff'}}
        >
            {size[0]} x {size[1]}
        </div>
    );
};
```
