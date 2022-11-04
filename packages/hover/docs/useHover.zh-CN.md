---
title: useHover
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Hover
  path: /hover
order: 2
---

# useHover

当前元素被hover状态时,该Hook会返回一组鼠标事件的props值。

```typescript
interface HoverOptions {
    delay?: number;
}

interface HoverCallbacks {
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
}

function useHover(options: HoverOptions = {}): [boolean, HoverCallbacks]
```

`delay` 参数默认为`0`, 数字小于或等于0的hover状态会在鼠标移入(enter)和移出(leave)时立即改变。

<code src='./demo/useHover.tsx'>

注意, 当你给 `delay`参数传了个正数时,`onEnter` 和 `onLeave`的回调都是已经防抖过的,
一旦你想立即执行这些回调不想被防抖, 请你自己重新处理一下回调函数:

<code src='./demo/useHover2.tsx'>
