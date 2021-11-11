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

```typescript
interface ControlMethods {
    [key: string]: (...args: any[]) => any;
}
interface ProxyMethods extends ControlMethods {
    $get: (property: string) => any;
}

function useControl(
    CompIn: React.ForwardRefExoticComponent<ControlMethods> | null
): [React.FunctionComponent | null, ProxyMethods];

function useControlSource<T>(
    ref: React.MutableRefObject<ControlMethods>,
    initialData: T | null | undefined,
    deriveMethods: (setData: React.Dispatch<React.SetStateAction<T | null | undefined>>) => ControlMethods
)
```

<code src="./demo/useControl.tsx">
