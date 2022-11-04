---
title: useInputValue
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Input Value
  path: /input-value
order: 2
---

# useInputValue

为了摆脱`e => setState(e.target.value)`这种冗余的写法,`useInputValue`返回一个同时包含`value` 和`onChange`改变事件函数的对象。

```typescript
interface InputValueState {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}
function useInputValue(initialValue: string = ''): InputValueState;
```

这个hook最好和JSX中的`{...props}`语法一起使用。

<code src='./demo/useInputValue.tsx'>