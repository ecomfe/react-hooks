# @huse/methods

将一系列状态更新的函数与状态绑定，并返回可调用的函数，可以使用`immer`更新状态。

```javascript
const arrayMethods = {
    push(state, value) {
        // 可以直接操作，immer负责更新
        state.push(value);
    },
    // 也可以有多个参数
    splice(state, index, count, ...inserts) {
        state.splice(index, count, ...inserts);
    },
    empty() {
        // 可以返回新对象重置状态
        return [];
    },
};

// 返回与arrayMethods相同的函数
const [list, {push, splice, empty}] = useMethods(arrayMethods, []);

// 调用的时候不需要当前state参数
push(123);
```
