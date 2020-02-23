# @huse/script

加载远程脚本的hook。

## useScript

返回`[loaded, errored]`的结构，其中`loaded`表示脚本是否已经完成加载，一但加载（网络）完毕，无论执行结果是否异常都会为`true`，即可以通过以下方式判断状态：

- 加载中：`[false, false]`
- 执行成功：`[true, false]`
- 执行失败：`[false, true]`

大部分情况只需要第一个`boolean`值即可。

```javascript
import {useScript} from '@huse/script';

const [loaded, errored] = useScript(src);
```

每一个`src`仅会加载一次，**即便加载失败也不再重试**。`src`不会做任何处理，即`/script.js`和`http://example.org/script.js`（假设当前为`example.org`）会加载2次相同的脚本。

当`src`为`undefined`时则不加载任何脚本，返回`[true, false]`。

## useScriptSuspense

形同`useScript`，但可以与`Suspense`配合使用。

`useScriptSuspense`仅返回一个`boolean`值，表示是否执行成功（加载中状态由`Suspense`接管）。

```javascript
import {useScriptSuspense} from '@huse/script';

const Demo = () => {
    const success = useScriptSuspense('/sdk.js');

    return (
        <div>
            {sdk.uid()}
        </div>
    );
};

<Suspense fallback={<div>Loading ... </div>}>
    <Demo />
</Suspense>
```
