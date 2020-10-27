# router

Enpower `react-router-dom` with hooks to interactive with location, state, search params and more.

**NOTE: This packages works only with `v5.x` and `react-router-dom` currently, `react-router-native` and `6.x` version are not supported.**

```shell
npm install @huse/router
```

## useNavigate

A implement of `react-router@6.x`'s `useNavigate` above version `5.x`.

```typescript
interface NavigateOptions<S = LocationState> {
    replace?: boolean;
    state?: S;
}

type Navigate = <S>(to: Location<S> | string, options?: NavigateOptions<S>) => void;

function useNavigate(): Navigate;
```

## useLocationState

Wrap `location.state` to a react state tuple.

```typescript
type UpdateLocationState<T> = (patch: Partial<T>) => void;

function useLocationState<T>(defaultValue: T): [T, UpdateLocationState<T>];
```

Commonly we store invisible but persist state like list selections inside it.

```javascript
import {useLocationState} from '@huse/router';
import {Checkbox} from 'antd';

const App = () => {
    const [{selected}, setSelection] = useLocationState({selected: []});
    const pushSelected = useCallback(
        id => setSelection({selected: [...selected, id]}),
        [selected, setSelection]
    );
    const removeSelected = useCallback(
        id => {
            const index = selected.indexOf(id);
            setSelection({selected: [...selected.slice(0, index), ...selected.slice(index + 1)]});
        },
        [selected, setSelection]
    );
    const items = Array.from({length: 10}, (v, i) => ({id: i, name: `Item ${i}`}));
    const renderItem = ({id, name}) => (
        <tr key={id}>
            <th>
                <Checkbox onChange={e => (e.target.checked ? pushSelected(id) : removeSelected(id))} />
            </th>
            <td>
                {name}
            </td>
        </tr>
    );

    return (
        <table>
            <tbody>
                {items.map(renderItem)}
            </tbody>
        </table>
    );
};
```

## useSearchParams

Parse location search to a `URLSearchParams` object as well as a function to update it.

```typescript
interface SearchQuery {
    [key: string]: string | string[];
}

interface SearchParamsPatch {
    [key: string]: string | number | string[] | number[] | undefined | null;
}

type UpdateSearchParams = <S>(patch: SearchParamsPatch, options?: NavigateOptions<S>) => void;

type SearchParamsHook = [URLSearchParams, UpdateSearchParams];

function useSearchParams(defaults?: SearchQuery): SearchParamsHook;
```

This returns a `[params, updateParams]` tuple so that you can both get and update search.

```javascript
import {useSearchParams} from '@huse/router';
import {Select} from 'antd';

const SearchFilter = () => {
    const [params, updateParams] = useSearchParams({priority: 'normal'});
    const setPriority = useCallback(
        value => updateParams({priority: value}),
        [updateParams]
    );

    return (
        <div>
            <Select value={params.get('priority')} onChange={setPriority}>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="normal">Normal</Select.Option>
                <Select.Option value="high">High</Select.Option>
            </Select>
        </div>
    );
};
```

## useSearchParam

Like `useSearchParams` but get a single param without update function.

```typescript
function useSearchParam(key: string): string | null
```

## useSearchParamAll

Like `useSearchParams` but get a single param as array.

```typescript
function useSearchParamAll(key: string): string[]
```

## useUpdateSearchParams

Get a function to update search params via any object.

```typescript
interface SearchParamsPatch {
    [key: string]: string | number | string[] | number[] | undefined | null;
}

type UpdateSearchParams = <S>(patch: SearchParamsPatch, options?: NavigateOptions<S>) => void;

function useUpdateSearchParams(): UpdateSearchParams;
```

`URLSearchParams#toString` is used to stringify search params to search string.

## useSearchParamState

Wrap a single search params as a react state.

```typescript
function useSearchParamState(key: string, options?: NavigateOptions): [string | null, (value: string) => void];
```

When a state is stored in search params, using this hooks works just like `useState`.

```jsx
import React, {useCallback} from 'react';
import {Checkbox, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {MemoryRouter, useLocation} from 'react-router-dom';
import {useLocationState, useSearchParamState} from '@huse/router';

export default () => {
    const App = () => {
        const location = useLocation();
        const [page, setPage] = useSearchParamState('page');
        const pageIndex = parseInt(page || '0', 10);
        const nextPage = useCallback(
            () => setPage((pageIndex + 1).toString()),
            [pageIndex, setPage]
        );
        const start = pageIndex * 10 + 1;
        const items = Array.from({length: 10}, (v, i) => ({id: start + i, name: `Item ${start + i}`}));
        return (
            <>
                <p>{location.pathname}{location.search}</p>
                <ul>
                    {items.map(i => <li key={i.id}>{i.name}</li>)}
                </ul>
                <Button onClick={nextPage}>More Items</Button>
            </>
        );
    };
    return (
        <MemoryRouter initialEntries={['/list']}>
            <App />
        </MemoryRouter>
    );
};
```
