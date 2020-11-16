---
title: useScriptSuspense
nav:
  title: Hooks
  path: /hook
group:
  title: Script
  path: /script
order: 3
---

# useScriptSuspense

The suspense version of `useScript`, it returns a single `boolean` value indicating whether script loads successfully.

```typescript
function useScriptSuspense(src?: string): boolean
```

A component using `useScriptSuspense` must reside inside a `<Suspense>`.

```javascript
import {useScriptSuspense} from '@huse/script';

const Demo = () => {
    const success = useScriptSuspense('/sdk.js');

    return (
        <div>
            {sdk.uid()}
        </div>
    );
};

const App = () => (
    <Suspense fallback={<div>Loading ... </div>}>
        <Demo />
    </Suspense>
);
```