# @huse/previous-value

用于保留某个值的上一次更新副本并进行相关操作的hook。

## usePreviousValue

获取某个值的上一次副本。

```javascript
import {usePreviousValue} from '@huse/previous-value';

const previousValue = usePreviousValue(props.foo);

return (
    <div>
        Changed from {previousValue} to {props.foo}
    </div>
);
```

## usePreviousEquals

判断当前值是否与上一次值相同，默认使用浅比较，可自定义判断函数。

```javascript
import {usePreviousEquals} from '@huse/previous-value';

const changed = !usePreviousEquals(props.foo, deepEquals);

return (
    <div>
        {changed && <Alert type="warn">有变化</AlerT>}
    </div>
);
```

## useOriginalCopy

获取与当前值相等的最原始副本，默认采用浅比较，可自定义判断函数。

这个hook可用于将“内容相等，但引用不相等”的值变为引用相等的值，可有效用于各类`useCallback`和`useEffect`等处。

```javascript
import {useOriginalCopy} from '@huse/previous-value';

const foo = useOriginalCopy(props.foo, deepEquals);
useEffect(
    () => {
        fetch('/api/foo', foo);
    },
    [foo]
);
```

## useOriginalDeepCopy

采用深比较版本的`useOriginalCopy`。

```javascript
import {useOriginalDeepCopy} from '@huse/previous-value';

const foo = useOriginalDeepCopy(props.foo);
useEffect(
    () => {
        fetch('/api/foo', foo);
    },
    [foo]
);
```
