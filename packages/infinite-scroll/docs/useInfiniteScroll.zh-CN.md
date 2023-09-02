---
title: useInfiniteScroll
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Infinite Scroll
  path: /infinite-scroll
order: 2
---

# useInfiniteScroll

传递一个async fetch函数, 该hook会返回一系列属性, 提供一套常见的无限滚动解决方案。

```typescript
function useInfiniteScroll<T>(fetch: FetchDataSource<T>, options: InfiniteScrollOptions<T> = {}): InfiniteScrollHook<T>
```

返回的对象中包含了以下属性:

```typescript
interface InfiniteScrollHook<T> {
    // 是否有更多项需要加载
    hasMore: boolean;
    // 目前是否处于loading状态
    loading: boolean;
    // 是否执行初始数据的加载，只有在设置了initialLoad选项时才起作用
    initialLoading: boolean;
    // 加载的数据, 会在每次加载时被加上
    dataSource: T[];
    // 一个在滚动中加载更多项的函数
    loadMore(): void;
}
```

该hook接收一个options配置项, 具体如下:

```typescript
interface InfiniteScrollOptions<T> {
    // 初始值, 默认是一个空数组
    initialValues?: T[];
    // 是否在mount挂载时加载首页
    initialLoad?: boolean;
}
```

`useInfiniteScroll`中的`fetch`函数接收一个对象, 其中`offset`属性默认0, 表示下一页的起始索引。
如果你有一个函数需要`pageIndex`来工作，`offset / pageSize`都指向`pageIndex`

这是一个使用`useInfiniteScroll`的实战例子[react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component):


```javascript
import InfiniteScroll from 'react-infinite-scroll-component';
import {useInfiniteScroll} from '@huse/infinite-scroll';

const fetchRemoteDataSource = async ({offset}) => {
    // 请求并返回一个页面的数据项...
};

const ScrollList = () => {
    // react-infinite-scroll-component 需要 {initialLoad: true} 才能工作
    const {dataSource, loadMore, hasMore, initialLoading} = useInfiniteScroll(fetchRemoteDataSource, {initialLoad: true});

    const renderItem = item => {
        // 渲染当前项为react节点
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
