# input-value

Generates `value` and `onChange` that satisfies input elements.

```shell
npm install @huse/input-value
```

## useInputValue

To get rid of the duplication of `e => setState(e.target.value)`, `useInputValue` returns an object containing both `value` and change event aware `onChange`.

```typescript
interface InputValueState {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}
function useInputValue(initialValue: string = ''): InputValueState;
```

This hook is better used with `{...props}` syntax in JSX.

```jsx
import React from 'react';
import {Input} from 'antd';
import 'antd/dist/antd.min.css';
import {useInputValue} from '@huse/input-value';

export default () => {
    const name = useInputValue('');
    const age = useInputValue(10);
    return (
        <>
            <div>
                <label>Username: <Input {...name} /></label>
            </div>
            <div>
                <label>Age: <Input type="number" {...age} /></label>
            </div>
        </>
    );
};
```
