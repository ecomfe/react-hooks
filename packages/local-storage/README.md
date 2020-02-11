# @huse/local-storage

访问及设置`localStorage`。会监听`storage`事件并同步更新值。

```javascript
import {useLocalStorage} from '@huse/document-title';

const [value, setValueToStorage] = useLocalStorage(key, initialValue);
setValueToStorage(newValue); // will trigger storage event to other tabs
// will update when value is changed from other tabs
return (
    <div>{value}</div>
);
```
