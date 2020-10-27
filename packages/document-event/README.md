# document-event

Register event listeners on `document`.

```shell
npm install @huse/document-event
```

## useDocumentEvent

This hook will register a event listener on `document` on component mount, and unlisten that event on unmount.

```typescript
type EventNames = keyof DocumentEventMap;

type DocumentEventHandler<K extends EventNames> = (e: DocumentEventMap[K]) => any;

function useDocumentEvent<K extends EventNames>(eventName: K, fn: DocumentEventHandler<K>, options?: boolean | AddEventListenerOptions): void
```

The event handler passed to `useDocumentEvent` is not forced to be reference equal, this means you are allowed to use a function expression without `useCallback` to memoize it.

```jsx
import React, {useReducer} from 'react';
import {useDocumentEvent} from '@huse/document-event';

export default () => {
    const [down, addDown] = useReducer(v => v + 1, 0);
    const [up, addUp] = useReducer(v => v + 1, 0);
    const [key, addKey] = useReducer(v => v + 1, 0);
    useDocumentEvent('mousedown', addDown);
    useDocumentEvent('mouseup', addUp);
    useDocumentEvent('keypress', addKey);
    return (
        <>
            <p>Mouse Down: {down} times</p>
            <p>Mouse Up: {up} times</p>
            <p>Key Press: {key} times</p>
        </>
    );
};
```
