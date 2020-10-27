# scroll-lock

Lock and unlock scroll conditionally.

```shell
npm install @huse/scroll-lock
```

## useScrollLock

Pass a `boolean` value to lock scroll on document.

```typescript
function useScrollLock(lock: boolean): void
```

When `lock` is `true` scroll will be locked, `overflow` style will be reverted when `lock` becomes `false` or component is unmounted.

If an other modification of `overflow` style happens after scroll lock, `useScrollLock` will not revert the style.

```jsx
import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.min.css';
import {useScrollLock} from '@huse/scroll-lock';

export default () => {
    const [modalOpen, setModalOpen] = useState(false);
    useScrollLock(modalOpen);
    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            {
                modalOpen && (
                    <Modal
                        visible
                        title="Notification"
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    >
                        This is a modal
                    </Modal>
                )
            }
        </>
    );
};
```
