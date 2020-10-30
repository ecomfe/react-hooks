---
title: boolean
nav:
  title: Hooks
  path: /hook
---

# boolean

Provides hooks to work with `boolean` primitive type.

```shell
npm install @huse/boolean
```

## useBoolean

`useBoolean` returns a `[value, methods]` tuple, in which methods are listed as:

```typescript
interface BooleanMethods {
    // Change value to true
    on(): void;
    // Change value to false
    off(): void;
    // Toggle current value
    toggle(): void;
}
```
<code src="./demo/useBoolean.tsx">


## useSwitch

`useSwitch` returns a `[value, on, off, toggle]` tuple, this is simple a wrapper hook around `useBoolean` and expand all methods into tuple.

## useToggle

`useToggle` returns a `[value, toggle]` tuple.
