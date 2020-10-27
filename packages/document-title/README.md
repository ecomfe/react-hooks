# document-title

Change `document.title` to given value.

```shell
npm install @huse/document-title
```

## useDocumentTitle

This hook updates `document.title` to custom value and will revert the change on component unmount.

```typescript
function useDocumentTitle(title: string): void;
```

Since it reverts `document.title` to previous value, it should be safe to have multiple components using this hook simultaneously.

```jsx
import React, {useState} from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useDocumentTitle} from '@huse/document-title';

export default () => {
    const [title, setTitle] = useState('');
    useDocumentTitle(title);
    return (
        <>
            Change <code>document.title</code>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
            (Leave this page will reset <code>document.title</code>)
        </>
    );
};
```
