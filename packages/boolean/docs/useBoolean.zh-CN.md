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

`useBoolean` 返回一个 `[value, methods]` 的元组类型, 具体方法如下:

```typescript
interface BooleanMethods {
    // 修改值为 true
    on(): void;
    // 修改值为 false 
    off(): void;
    // 切换当前值，当传递一个布尔值会触发更新
    toggle(value: unknown): void;
}
```
<code src="./demo/useBoolean.tsx">