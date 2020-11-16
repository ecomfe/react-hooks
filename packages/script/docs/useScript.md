---
title: useScript
nav:
  title: Hooks
  path: /hook
group:
  title: Script
  path: /script
order: 2
---

# useScript

Given a URL of an external script, `useScript` automatically loads it into document.

```typescript
function useScript(src?: string): [boolean, boolean];
```

The returned tuple is `[loaded, errored]` with three combinations indicating different status:

- Loading：`[false, false]`
- Success：`[true, false]`
- Fail：`[false, true]`

In most case the first `boolean` is meaningful enough.

```javascript
import {useScript} from '@huse/script';

const App = () => {
    const [loaded, errored] = useScript('/sdk.js');

    if (errored) {
        return <div style={{color: 'red'}}>SDK failed to load</div>
    }

    if (!loaded) {
        return <div>Loading SDK...</div>;
    }

    return (
        <div>
            {sdk.uid()}
        </div>
    );
};
```

Each URL is loaded only once globally **even it is failed**, URL is neither normalized nor converted to absolute,
this means `http://example.org/script.js` and `/script.js` under `exmampe.org` are considered two different scripts and loaded twice.

If `src` is `undefined`, no script is loaded and the result is always `[true, false]`.