---
title: useControl
nav:
  title: Hooks
  path: /hook
group:
  title: Control
  path: /control
order: 3
---

# useControl

Take control of given component which exposes its methods to ref by `useControlSource` or `useImperativeHandle`.
So you can encapsulate all related codes into component and update inner states from outside. You may take advantage of it to improve components' maintainability and reduce unnecessary refresh of parent elements.

```typescript
interface ControlMethods {[key: string]: (...args: any[]) => any}
type ProxyMethods<T> = {readonly $get: (property: string) => any} & Omit<T, '$get'>;
type ControlRef<T> = React.MutableRefObject<T>;

function useControl<P, M = ControlMethods>(
    CompIn: React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<M>> | null
): [React.FunctionComponent<React.PropsWithoutRef<P>> | null, ProxyMethods<M>];

function useControlSource<T, M = ControlMethods>(
    ref: ControlRef<M>,
    deriveMethods: (setData: React.Dispatch<React.SetStateAction<T>>) => M,
    initialData: T
): [T, M];
```

<code src="./demo/useControl.tsx">
