---
title: useInfiniteScroll
nav:
  title: Hooks
  path: /hook
group:
  title: Infinite Scroll
  path: /infinite-scroll
order: 1
---

# infinite-scroll

Provides hooks to work with scroll-to-load cases.

```shell
npm install @huse/infinite-scroll
```

## useInfiniteScroll

Given an async fetch function, this hook returns a set of properties to help integrate common infinite scroll solution.

```typescript
function useInfiniteScroll<T>(fetch: FetchDataSource<T>, options: InfiniteScrollOptions<T> = {}): InfiniteScrollHook<T>
```

The return object contains properties:

```typescript
interface InfiniteScrollHook<T> {
    // Whether there are more items to load
    hasMore: boolean;
    // Whether it is in a loading state currently
    loading: boolean;
    // Whether it is performing the initial data loading, only works when initialLoad option is set
    initialLoading: boolean;
    // Loaded items, will be appended on each load
    dataSource: T[];
    // A function to load more items on scroll
    loadMore(): void;
}
```

Also this hook accepts an option object like:

```typescript
interface InfiniteScrollOptions<T> {
    // The initial items, default to empty array
    initialValues?: T[];
    // Whether to load the first page on mount
    initialLoad?: boolean;
}
```

The `fetch` function provided to `useInfiniteScroll` accepts an object containing a zero based `offset` property which indicates the start index of next page. If you have a function requires `pageIndex` to work, `offset / pageSize` points to `pageIndex`.

This is a working example to integrate `useInfiniteScroll` with [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component):

```javascript
import InfiniteScroll from 'react-infinite-scroll-component';
import {useInfiniteScroll} from '@huse/infinite-scroll';

const fetchRemoteDataSource = async ({offset}) => {
    // Fetch and return one page of items...
};

const ScrollList = () => {
    // react-infinite-scroll-component requires {initialLoad: true} to work
    const {dataSource, loadMore, hasMore, initialLoading} = useInfiniteScroll(fetchRemoteDataSource, {initialLoad: true});

    const renderItem = item => {
        // Render item to react node
    };

    if (initialLoading) {
        return <Loading />;
    }

    return (
        <InfiniteScroll
            dataLength={dataSource.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<div>Loading ...</div>}
        >
            {dataSource.map(renderItem)}
        </InfiniteScroll>
    );
};
```
