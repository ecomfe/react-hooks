# @huse/router

## useQuery

获取路由上的`location.search`部分经过解析后的对象，解析由[query-string](https://www.npmjs.com/package/query-string)模块完成。

```ts
import {ParseOptions} from 'query-string';

type QueryValue = string | boolean | number | string[] | boolean[] | number[] | null | undefined;

function useQuery<T extends {[K in keyof T]: QueryValue}>(options?: ParseOptions): T;
```

从强类型的考虑，`useQuery`返回一个泛型，推荐将`search`部分的内容声明对应的接口类型。

## useUpdateQuery

返回一个用于更新search的函数：

```ts
import {StringifyOptions} from 'query-string';

interface UpdateQueryOptions extends StringifyOptions {
    replace?: boolean; // 为true时不额外增加历史记录
    filterEmpty?: boolean; // 为true时会移除更新的对象中所有null、undefined及空字符串的值
}

type UpdateQuery<T extends {[K in keyof T]: QueryValue}> = (patch: Partial<T>) => void;

function useUpdateQuery<T>(query: T, updateOptions: UpdateQueryOptions = {}): UpdateQuery<T>;
```

返回的函数可接受需要更新的部分参数后跳转URL：

```tsx
interface ListQuery {
    page?: number;
    keyword: string;
}

const query = useQuery<ListQuery>();
const updateQuery = useUpdateQuery(query);

<span onClick={() => updateQuery({keyword: 'foo'})}>Search foo</span>
```

函数接受[stringify函数的所有配置](https://www.npmjs.com/package/query-string#stringifyobject-options)，且配置中增加`replace`属性，为`true`则跳转时不增加额外的历史记录。

## useQueryState

这是一个`useQuery`和`useUpdateQuery`的整合，用来将query中的某个值变成一个类似本地状态的对象。

```ts
const [pageIndex, setPageIndex] = useQueryState('page');
// setPageIndex会更新query
```

返回的更新状态的函数（如`setPageIndex`）接受`options`对象，与`useUpdateQuery`一致。

## useNavigate

使用指定的URL模板，返回一个用于跳转的函数：

```ts
type Visit<T> = (params: T) => void;

interface NavigateOptions {
    replace?: boolean;
}

function useNavigate<T>(to: string | URITemplate, options: NavigateOptions = {}): Visit<T>;
```

返回的函数在接收用于填充URL模板中的占位符的数据后，会自动修改URL，如：

```tsx
const gotoChildForm = useNavigate('/parents/{id}/children/new');

<span onClick={() => gotoChildForm({id: props.id})}>Goto Child</span>
```
