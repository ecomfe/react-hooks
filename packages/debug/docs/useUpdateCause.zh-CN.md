---
title: useUpdateCause
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debug
  path: /debug
order: 4
---

# useUpdateCause

返回一个数组,主要关于导致组件更新的原因。

```typescript
function useUpdateCause<T extends {}>(props: T, print: boolean = true): UpdateCause[]
```

每个数组对象的结构如下:

```typescript
export interface UpdateCause {
    propName: string; // 改变的属性名
    shallowEquals: boolean; // 前一个值和当前值是不是浅比较相等
    deepEquals: boolean; // 前一个值和当前值是不是深比较相等
}
```

这个hook可以帮助检测由“数据内容相同但引用不同”的props引起的组件重复渲染问题,
[useOriginalCopy from @huse/previous-value](https://github.com/ecomfe/react-hooks/tree/master/packages/previous-value#useoriginalcopy) 可以进一步帮助消除这些不必要的渲染。

默认情况下，这个hook会将原因打印出来，具体示例如下:

```text
-----------------------------------------------------------------------
| (index) | previousValue | currentValue | shallowEquals | deepEquals |
-----------------------------------------------------------------------
|   foo   |    [Object]   |   [Object]   |     true      |    true    |
|   bar   |      1234     |     5678     |     true      |    true    |
-----------------------------------------------------------------------
```

将第二个参数设置为 `false` 可以阻止它在控制台中打印:

```javascript
import {useUpdateCause} from '@huse/debug';

const App = props => {
    const [message, setMessage] = useState('');
    // 比较props, 在控制台打印
    useUpdateCause(props);
    // 只比较部分props的值和自定义的值，不在控制台打印
    const causes = useUpdateCause({message, foo: props.foo, bar: props.bar});
    console.log(causes);

    return (
        // ...
    );
}
```