# @huse/click-outside

Listen for clicks in document and trigger a callback when it happens outside an element.

## useClickOutside

By passing a `ref` object containing an element, `callback` will be triggered when a click happens outside that element.

```typescript
function useClickOutside(ref: RefObject<HTMLElement>, callback: (e: MouseEvent | TouchEvent) => void)
```

This hook often used in cases where a modal or a dropdown should hide when clicked outside.

It also works in a touch device, `touchstart` will be used.

```jsx
import {useRef, useState} from 'react';
import {useClickOutside} from '@huse/click-outside';

const App = () => {
    const ref = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    useClickOutside(ref, () => setModalOpen(false));

    return (
        <Modal visible={modalOpen}>
            Modal Content
        </Modal>
    );
};
```
