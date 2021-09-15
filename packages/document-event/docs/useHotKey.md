---
title: useHotKey
nav:
  title: Hooks
  path: /hook
group:
  title: Document Event
  path: /document-event
order: 3
---

# useHotKey

This hook will register a keydown or keyup event listener on `document` on component mount, and unlisten that event on unmount.

```typescript
interface Options {
  code?: string;
  key?: string;
  strict?: boolean;
  repeat?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  keydown?: (e: KeyboardEvent) => void;
  keyup?: (e: KeyboardEvent) => void;
}

function useHotKey(options: Options): void
```

Visit [code sandbox](https://codesandbox.io/s/usehotkey-k83fb) to see more
