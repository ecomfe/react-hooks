# @huse/debounce

提供延迟状态或回调的hook。

## useDebouncedValue

```javascript
import {useState} from 'react';
import {useDebouncedValue} from '@huse/debounce';

const App = () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebouncedValue(value, 10); // debounced update 10ms

    return (
        <>
            <div>
                <input value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div>
                Current Value: {debouncedValue}
            </div>
        </>
    );
};
```

## useDebouncedEffect

Runs a callback when a value changed with a delay, effect will be canceled if value is changed again within delay.

```typescript
function useDebouncedEffect<T>(callback: () => void | (() => void), value: T, wait: number): void
```

Unlike `useEffect`, `useDebouncedEffect` accepts only one dependency value.

Still `callback` can return a clean-up function, this function is called **immediately when value changes without delay**.

```javascript
import {useState} from 'react';
import {useDebouncedEffect} from '@huse/debounce';

const App = () => {
    const [value, setValue] = useState('');
    useDebouncedEffect(
        () => {
            saveValueToServer(value);
        },
        value,
        200
    );

    return (
        <>
            <div>
                <input value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div>
                Current Value: {debouncedValue}
            </div>
        </>
    );
};
```

## useDebouncedCallback

```javascript
import {useState} from 'react';
import {useDebouncedCallback} from '@huse/debounce';

const [list, setList] = useState([]);

// invokes after 200ms wait
const search = useDebouncedCallback(
    async e => {
        const items = await findByKeyword(e.target.value);
        setList(items);
    },
    200
);
```

在组件销毁后，函数不会再被执行。
