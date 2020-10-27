# effect-ref

Makes a [callback ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs) behaves like effects.

```shell
npm install @huse/effect-ref
```

## useEffectRef

This hook returns a callback function, pass it as `ref` prop to any DOM element to run callback on element mount.

Callback can return a clean-up function like `useEffect`'s callback to clean up side effects.

A native callback ref may receive element argument as `null`, however `useEffectRef` handles this case internally,
only `HTMLElement` node is passed to callback.

```typescript
export type EffectRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type RefCallback<E extends HTMLElement = HTMLElement> = (element: E) => (() => void) | void;

export function useEffectRef<E extends HTMLElement = HTMLElement>(callback: RefCallback<E>): EffectRef<E>;
```

Unlike `useRef` which is not responsive to element change, this hook provides ability to observe any element's mount and unmount.

In case you need to use multiple callback refs on the same DOM element, `useMergedRef` from `@huse/merged-ref` may help.

```jsx
import React, {useState, useCallback, createElement} from 'react';
import {Button, Select} from 'antd';
import 'antd/dist/antd.min.css';
import {useEffectRef} from '@huse/effect-ref';

export default () => {
    const [tag, setTag] = useState('div');
    const [message, setMessage] = useState('');
    const updateMessage = useCallback(
        element => setMessage(`Root element is changed to <${element.nodeName.toLowerCase()}>`),
        []
    );
    const ref = useEffectRef(updateMessage);
    return (
        <>
            Choose a tag:
            <Select value={tag} onChange={setTag}>
                <Select.Option value="div">div</Select.Option>
                <Select.Option value="section">section</Select.Option>
                <Select.Option value="header">header</Select.Option>
                <Select.Option value="footer">footer</Select.Option>
            </Select>
            {createElement(tag, {ref}, <p>{message}</p>)}
        </>
    );
};
```
