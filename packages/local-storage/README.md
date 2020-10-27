# local-storage

Accesses, observes and updates `localStorage`.

```shell
npm install @huse/local-storage
```

## useLocalStorage

Retrieve value from `localStorage` by key, also returns a function to update it.

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

Any update to value from other tabs or frames will be observed via `storage` event and sync to state.

```jsx
import React, {useState, useCallback} from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useLocalStorage} from '@huse/local-storage';

export default () => {
    const [storageValue, setValueToStorage] = useLocalStorage('memo', '');
    const [value, setValue] = useState(storageValue);
    const commitValue = useCallback(
        () => setValueToStorage(value),
        [setValueToStorage, value]
    );
    return (
        <>
            <Input value={value} onChange={e => setValue(e.target.value)} />
            <Button onClick={commitValue}>Save Value</Button>
        </>
    );
};
```
