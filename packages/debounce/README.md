# debounce

Provides hooks to debounce value changes, effects or callbacks.

```shell
npm install @huse/debounce
```

## useDebouncedValue

Derive a given value and debounce its update by a given delay.

```typescript
function useDebouncedValue<T>(value: T, wait: number): T
```

Returned value will not update unless the input value stops change longer than `wait`.

```jsx
import React, {useState} from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useDebouncedValue, useDebouncedEffect, useDebouncedCallback} from '@huse/debounce';

export default () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebouncedValue(value, 200); // debounced update 200ms
    return (
        <>
            <div>
                <Input value={value} onChange={e => setValue(e.target.value)} />
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

```jsx
import React, {useState} from 'react';
import {Button, Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useDebouncedValue, useDebouncedEffect, useDebouncedCallback} from '@huse/debounce';

export default () => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    useDebouncedEffect(
        () => {
            value && setMessage(`Value updated to ${value}`);
        },
        value,
        200
    );
    return (
        <>
            <div>
                <Input value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div>
                {message}
            </div>
        </>
    );
};
```

## useDebouncedCallback

Simply wrap a callback to a debounced one.

```typescript
function useDebouncedCallback<C extends Function>(callback: C, wait: number): C
```

Note all queued invocation will be canceled when component unmounts and when either `callback` r=or `wait` is changed.

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
