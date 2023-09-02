---
title: useClickOutside
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Click Outside
  path: /click-outside
order: 2
---

# useClickOutside

通过传递一个包含一个元素的`ref`对象, 当点击发生在该元素之外时`callback`将被触发。

```typescript
function useClickOutside(ref: RefObject<HTMLElement>, callback: (e: MouseEvent | TouchEvent) => void)
```

这个Hook一般用在模态框或者下拉菜单，在点击外部区域时应该隐藏的情况。

也可以在触摸设备使用，内部原理是监听 `touchstart` 事件。

<code src="./demo/useClickOutside.tsx">
