---
title: useInputValue
nav:
  title: Hooks
  path: /hook
group:
  title: Input Value
  path: /input-value
order: 1
---

# input-value

Generates `value` and `onChange` that satisfies input elements.

```shell
npm install @huse/input-value
```

## useInputValue

To get rid of the duplication of `e => setState(e.target.value)`, `useInputValue` returns an object containing both `value` and change event aware `onChange`.

```typescript
interface InputValueState {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}
function useInputValue(initialValue: string = ''): InputValueState;
```

This hook is better used with `{...props}` syntax in JSX.

<code src='./demo/useInputValue.tsx'>