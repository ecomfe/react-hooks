---
title: useBoolean
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Boolean
  path: /boolean
order: 2
---

# useBoolean

`useBoolean` 返回一个 `[value, methods]` 的元组类型, in which methods are listed as:

```typescript
interface BooleanMethods {
    // Change value to true
    on(): void;
    // Change value to false
    off(): void;
    // Toggle current value, can force update if a boolean argument is provided
    toggle(value: unknown): void;
}
```
<code src="./demo/useBoolean.tsx">