# @huse/boolean

对`boolean`类型的封闭。

## useBoolean

```jsx
import {useBoolean} from '@huse/boolean';

const [value, {on, off, toggle}] = useBoolean(true);

on(); // set value to true
off(); // set value to false
toggle(); // revert value
```

## useSwitch

简单地将`useBoolean`的方法展开后返回。

```jsx
import {useBoolean} from '@huse/boolean';

const [value, on, off, toggle] = useSwitch(true);
```

## useToggle

仅支持`toggle`：

```jsx
import {useBoolean} from '@huse/boolean';

const [value, toggle] = useToggle(true);
```
