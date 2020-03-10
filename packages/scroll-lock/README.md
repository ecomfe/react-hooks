# @huse/scroll-lock

Lock and unlock scroll conditionally.

## useScrollLock

Pass a `boolean` value to lock scroll on document.

```typescript
function useScrollLock(lock: boolean): void
```

When `lock` is `true` scroll will be locked, `overflow` style will be reverted when `lock` becomes `false` or component is unmounted.

If an other modification of `overflow` style happens after scroll lock, `useScrollLock` will not revert the style.

```jsx
import {useState} from 'react';
import {Button, Modal} from 'antd';
import {useScrollLock} from '@huse/scroll-lock';

const App = () => {
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
}
```
