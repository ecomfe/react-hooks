---
title: useSlot
nav:
  title: Hooks
  path: /hook
group:
  title: Slot
  path: /slot
order: 2
---

# useSlot

Use this hook to get Slot component which is used as placeholder for external content injection.

```typescript
type Slot = React.FC | React.ReactNode;

type SlotProps<T extends string> = {
    $slots?: {[key in T]?: Slot};
    [key: `render${Capitalize<T>}`]?: Slot;
};

interface UseSlotOptions<T extends string, P> {
    mapProps?: (props: P) => ({[key in T]: ({} | undefined)} | undefined);
    getSlotPropName?: (name: string) => string;
}

function useSlot<N extends string, P extends SlotProps<N>, S = Record<string, any>>(props: P, options: UseSlotOptions<N, P> = {})
```



<code src='./demo/useSlot.tsx'>
