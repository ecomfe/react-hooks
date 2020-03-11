# @huse/document-title

Change `document.title` to given value.

## useDocumentTitle

This hook updates `document.title` to custom value and will revert the change on component unmount.

```typescript
function useDocumentTitle(title: string): void;
```

Since it reverts `document.title` to previous value, it should be safe to have multiple components using this hook simultaneously.

```jsx
import {useDocumentTitle} from '@huse/document-title';

const App = () => {
    useDocumentTitle('my title');

    return (
        // ...
    );
};
```
