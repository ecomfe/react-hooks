# @huse/click-outside

注册在指定元素外部的点击，常用于关闭对话框等场景。

```javascript
import {useRef, useState} from 'react';
import {useClickOutside} from '@huse/click-outside';

const ref = useRef();
const [modalOpen, setModalOpen] = useState(false);
useClickOutside(ref, () => setModalOpen(false));

return (
    <Modal visible={modalOpen}>
        Modal Content
    </Modal>
);
```
