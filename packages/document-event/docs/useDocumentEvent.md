---
title: useDocumentEvent
nav:
  title: Hooks
  path: /hook
group:
  title: Document Event
  path: /document-event
order: 2
---

# useDocumentEvent

This hook will register a event listener on `document` on component mount, and unlisten that event on unmount.

```typescript
type EventNames = keyof DocumentEventMap;

type DocumentEventHandler<K extends EventNames> = (e: DocumentEventMap[K]) => any;

function useDocumentEvent<K extends EventNames>(eventName: K, fn: DocumentEventHandler<K>, options?: boolean | AddEventListenerOptions): void
```

The event handler passed to `useDocumentEvent` is not forced to be reference equal, this means you are allowed to use a function expression without `useCallback` to memoize it.

<code src='./demo/useDocumentEvent.tsx'>
