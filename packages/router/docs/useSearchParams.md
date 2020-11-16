---
title: useSearchParams
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 4
---

# useSearchParams

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