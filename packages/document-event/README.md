# @huse/document-event

Register event listeners on `document`.

## useDocumentEvent

This hook will register a event listener on `document` on component mount, and unlisten that event on unmount.

```typescript
type EventNames = keyof DocumentEventMap;

type DocumentEventHandler<K extends EventNames> = (e: DocumentEventMap[K]) => any;

function useDocumentEvent<K extends EventNames>(eventName: K, fn: DocumentEventHandler<K>, options?: boolean | AddEventListenerOptions): void
```

The event handler passed to `useDocumentEvent` is not forced to be reference equal, this means you are allowed to use a function expression without `useCallback` to memoize it.

```jsx
import {useDocumentEvent} from '@huse/document-event';

const App = () => {
    const [count, setCount] = useState(0);
    // function expression is safe, no useCallback is required
    useDocumentEvent('click', () => setCount(c => c + 1)));

    return (
        <div>
            Clicked {count} times!
        </div>
    );
};
```
