---
title: useSnapshotState
nav:
  title: Hooks
  path: /hook
group:
  title: Snapshot
  path: /snapshot
order: 1
---

# snapshot

Provides hook to manage value history and work with undo and redo features.

```shell
npm install @huse/snapshot
```

## useSnapshotState

Creates a state with version history and provides `undo` and `redo` functions to traverse the history.

```typescript
export interface SnapshotOptions {
    // debounce time to commit value to history, defaults to no debounce
    delay?: number;
    // max history length, defaults to Infinity
    limit?: number;
}

interface Snapshot {
    backLength: number;
    forwardLength: number;
    canUndo: boolean;
    canRedo: boolean;
    undo(): void;
    redo(): void;
}

export type SnapshotHook<T> = [T, Dispatch<SetStateAction<T>>, Snapshot];

function useSnapshotState<T>(init: T | (() => T), options: SnapshotOptions = {}): SnapshotHook<T>
```

<code src='./demo/useSnapshotState.tsx'>

By passing a `delay` option `useSnapshotState` will behave as debounced,
that is only commit value to history when it is not changed after a certain time.

<code src='./demo/useSnapshotState2.tsx'>
