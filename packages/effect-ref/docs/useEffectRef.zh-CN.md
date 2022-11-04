---
title: useEffectRef
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Effect Ref
  path: /effect-ref
order: 2
---

# useEffectRef

这个hook返回一个回调函数，把它作为`ref`的prop传递给任何DOM元素，以便在元素挂载的时候上运行回调。

Callback函数会返回一个清理函数，就像`useEffect`的回调，可以用来清理副作用。

一个原生的callback ref函数在接受元素的参数位置可能会是`null`, 
但在`useEffectRef`内部已经处理了这种情况, 
只有`HTMLElement`节点会被传给callback函数

```typescript
export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;

export function useEffectRef<E extends HTMLElement = HTMLElement>(callback: RefCallback<E>): EffectRef<E>;
```

不像`useRef`对元素的变化没有反应，当前的hook提供了观察任何元素的挂载和卸载的能力。

如果你需要在同一个DOM元素上使用多个callback refs, `@huse/merged-ref`中的`useMergedRef`比较适合你。

<code src='./demo/useEffectRef.tsx'>
