# number

Hooks to manage and mutate number types.

```shell
npm install @huse/number
```

## useCounter

Manages number as a counter which can increment and decrement.

```typescript
interface CounterOptions {
    min?: number; // Min value of counter
    max?: number; // Max value of counter
    step?: number; // Step on each increment or decrement call, default to 1
}

function useCounter(initialValue: number, options?: CounterOptions): CounterMethods;
```

This is a wrap of `useMethods` in `@huse/methods` and contains methods below:

```typescript
{
    increment(): void; // plus step
    inc(): void;
    decrement(): void; // subtract step
    dec(): void;
    reset(value?: number): void; // reset to value, defaults to 0
}
```

`inc` is an alias to `increment` and `dec` is an alias to `decrement`.

```jsx
import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useCounter} from '@huse/number';

export default () => {
    const [value, {increment, decrement, reset}] = useCounter(3);
    console.log(value);
    return (
        <>
            <Button onClick={decrement}>-1</Button>
            <span style={{padding: '0 10px'}}>{value}</span>
            <Button onClick={increment}>+1</Button>
            <Button onClick={() => reset()}>Reset</Button>
        </>
    );
};
```
