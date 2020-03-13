# @huse/local-storage

Accesses, observes and updates `localStorage`.

## useLocalStorage

Retrieve value from `localStorage` by key, also returns a function to update it.

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

Any update to value from other tabs or frames will be observed via `storage` event and sync to state.

```jsx
import {useState, useCallback} from 'react';
import {Input, Button} from 'antd';
import {useLocalStorage} from '@huse/local-storage';

const App = () => {
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
            (value preserves after refresh)
        </>
    );
};
```
