# @huse/request

调用异步请求型函数，维护请求与响应的关系。

请求型函数是指“输入到输出的异步映射”的函数，常见好获取远程数据等。

## useRequest

```javascript
import {useRequest} from '@huse/request';

const api = id => fetch(`/users/${id}`).then(r => r.json());

const App = ({user}) => {
    const result = useRequest(api, {id: user.id});

    if (result.pending) {
        return <Loading />;
    }

    return (
        <div>
            {result.data.username}
        </div>
    );
};
```

`useRequest`的返回结构如下：

```typescript
interface RequestResult<O = void, E = Error> {
    pending: boolean; // 是否正在请求中
    accept: () => void; // 接受后续响应，具体参考下文
    pendingCount?: number; // 请求中的个数
    data?: O; // 响应成功里的数据
    error?: E; // 响应失败时的异常
    nextData?: O; // 后续响应数据
    nextError?: E; // 后续响应异常
}
```

需要注意的是，当传递给`useRequest`的函数引用变化时，会被重新调用，因此在必要的时候用`useCallback`保持引用。

### 使用后续响应

`useRequest`接受一个`options`参数（第3个参数），结构如下：

```typescript
type ResponseStrategy = 'acceptLatest' | 'keepEarliest' | 'keepEarliestSuccess' | 'waitAccept';

interface RequestOptions {
    strategy?: ResponseStrategy;
    idempotent?: boolean;
}
```

`idempotent`表示函数是否幂等，幂等的函数在参数相同时不会重新调用。

各种策略如下：

1. `acceptLatest`：新的响应总是覆盖原有响应。
2. `keepEarliest`：始终使用最早一次的响应，后续响应全部丢弃。
2. `keepEarliestSuccess`：始终使用最早一次的成功响应，后续响应全部丢弃。
2. `waitAccept`：将响应放入`nextData`或`nextError`，等待合并。

当策略为`waitAccept`时，新的响应会放入`nextData`或`nextError`中，并不会直接覆盖`data`及`error`。开发者可以通过一定的判断在界面上提示“是否接受新数据”等，在用户确认后调用`result.accept()`将`nextData`覆盖`data`继续渲染。
