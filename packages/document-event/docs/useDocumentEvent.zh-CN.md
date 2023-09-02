---
title: useDocumentEvent
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Document Event
  path: /document-event
order: 2
---

# useDocumentEvent

这个hook会在组件挂载的时, 在`document`上注册一个事件监听, 会在组件销毁的时候取消监听。

```typescript
type EventNames = keyof DocumentEventMap;

type DocumentEventHandler<K extends EventNames> = (e: DocumentEventMap[K]) => any;

function useDocumentEvent<K extends EventNames>(eventName: K, fn: DocumentEventHandler<K>, options?: boolean | AddEventListenerOptions): void
```

传给`useDocumentEvent`的事件处理函数不会被认为引用相等，意味着你可以直接使用函数表达式, 不需要`useCallback`来缓存它。

<code src='./demo/useDocumentEvent.tsx'>
