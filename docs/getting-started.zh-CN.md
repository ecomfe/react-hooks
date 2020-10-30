---
order: 1
nav:
  title: 指南
  order: 1
---

# 使用@huse/hooks须知

这是收集了常用的react hooks，用于支持百度内部的开发，我们欢迎社区所有人参与共建。

## 项目结构

项目基于`yarn`来构建基本的工作环境，每一个hook都在`packages`目录文件夹下，使用`xx-xx`破折号分割, 没有使用`use`前缀，


包名要确保是这种格式的`@huse/foo-bar`


要注意每一个包的导出和命名规范 , 使用时如下示例:

```js
import {useInputValue} from '@huse/input-value';
```
我们推荐你使用单元测试，可以把单元测试文件放在`src/__tests__`文件夹下，以`.test.js`来结尾命名，我们强烈建议你的单测覆盖率要达到100%。

## 说明

我们现在还没法在线上发布文档，因为`docz build`会失败，你能在每个hook的文件夹下找到`README.md`查看，或者把代码下载到本地查看，然后执行以下代码

```
yarn
yarn doc:dev
```

打开 `http://localhost:3000` 去查阅关于hooks的介绍

### 所有的 hooks 列表

| Hook | 说明 |
| ---- | ----------- |
| useActionPending | Add a pending indicator to any async function |
| useBoolean | Methods to control a boolean state |
| useSwitch | More convenient way to use boolean state |
| useToggle | Simply toggle boolean state |
| useClickOutside | Trigger callback when clicks outside a specific element |
| useArray | Methods to control array state |
| useSet | Methods to control `Set` state |
| useMap | Methods to control `Map` state |
| useDebouncedEffect | Debounce an effect on value change |
| useDebouncedValue | Debounce a value change |
| useDebouncedCallback | Debounce a callback function |
| useRenderTimes | Return times of component rendered |
| useChangeTimes | Return times of a value changed |
| useUpdateCause | Observe the cause of component update |
| useDerivedState | Derive a state from external prop |
| useDocumentEvent | Add listeners to `document`'s event |
| useDocumentTitle | Change `document.title` |
| useEffectRef | More reliable function based ref with clean-up ability |
| useElementResize | Trigger callback when element resize |
| useElementSize | Return element's size |
| useHover | Observe mouse enter and leave to element |
| useImmerReducer | A `useReducer` with immer support **(deprecated)** |
| useImmerState | A `useState` with immer support **(deprecated)** |
| useInfiniteScroll | Encapsulate methods and props to implement infinite scroll |
| useInputValue | Bound a value and it's change handler to input element |
| useOnScreenCallback | Trigger callback when element intersects with viewport |
| useOnScreen | Return whether element intesects with viewport |
| useOnScreenLazyValue | Lazy initialize a value when it intersects with viewport |
| useLocalStorage | Visit and update local storage |
| useMedia | Return whether a media query is currently matched |
| usePreferDarkMode | Return whether user prefers dark color scheme |
| useMergedRef | Merge multiple ref into a single one |
| useMethodsNative | Wrap methods around a state |
| useMethodsExtensionNative | Wrap methods around a `setState` function |
| useMethods | `useMethodsNative` with immer support |
| useMethodsExtension | `useMethodsNative` with immer support |
| useOnLine | Return user is current online of offline |
| useCounter | Methods to control a number state with increment and decrement |
| usePerformanceTiming | Collect performance data and send to callback |
| useLayoutTiming | Collect timings of a component's layout |
| usePoll | Periodically trigger an async function and manage its response |
| usePreviousValue | Get previous version of a value |
| usePreviousEquals | Return whether a value is equals to that on previous render |
| useOriginalCopy | Track back a value to get a reference equals copy when content are identical |
| useOriginalDeepCopy | `useOriginalCopy` with deep equal support |
| useRequestCallback | Return a function to trigger request with its data, error and pending state |
| useRequest | Trigger request on params change and return its data, error and pending state |
| useScript | Load an external script |
| useScriptSuspense | Load an external script with suspense |
| useScrollIntoView | Scroll an element into viewport |
| useScrollLock | Lock scroll of document |
| useScrollPosition | Get current scroll top and left |
| useScrollTop | Get current scroll top |
| useScrollLeft | Get current scroll left |
| useSelection | Manage state to work with list selection, including multiple and range selection |
| useSnapshotState | Get a state with undo and redo support |
| useTimeout | Trigger callback after specified time |
| useInterval | Trigger callback periodically |
| useStableInterval | `useInterval` but counts ellapsed time of function execution, both sync and async |
| useTransitionState | A state which will revert back to its initial value when updated |
| useForceUpdate | Force update a component |
| useWindowSize | Get the size of window |
| useOptimisticFactory | Infrastructure hook to create optimistic state |
| useOptimisticState | Optimistic state |
| useOptimisticTask | Wrap async task to have optimistic result |
| useUserMedia | Open video and audio streams in browser |
| useNavigate | Get a function to navigate to any location |
| useLocationState | Wrap location's state into a react state |
| useSearchParams | Parse search string to `URLSearchParams` as well as a function to update search |
| useSearchParam | Get a single search param |
| useSearchParamAll | Get a single search param as array |
| useUpdateSearchParams | Get a function to update search params |
| useSearchParamState | Wrap a single search param into a react state |
| useWebSocket | Create a web socket connecting to specified url |