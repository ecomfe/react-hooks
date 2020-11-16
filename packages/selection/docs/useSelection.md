---
title: useSelection
nav:
  title: Hooks
  path: /hook
group:
  title: Selection
  path: /selection
order: 2
---

# useSelection

This hook provides fundamental capabilities to select single, multiple or a range of items in a list.

```typescript
interface SelectionOptions {
    multiple?: boolean; // allow multiple selection using CMD or CTRL
    range?: boolean; // allow range selection using SHIFT
}

interface ClickContext {
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

interface SelectionMethods {
    selectIndex(index: number, e?: ClickContext): void;
}

type SelectionHook = [number[], SelectionMethods];

function useSelection(initialSelection: number[] = [], options?: SelectionOptions): SelectionHook;
```

`useSelection` is an index based interface where the content of list is not important.
The returned number array contains a set of selected zero-based item index.

The `selectIndex` function in `SelectionMethods` accepts an zero-based index and a `ClickContext`,
usually `MouseEvent` instance are compatible with `ClickContext` so you can directly pass an event object to it.

<code src='./demo/useSelection.tsx'>
