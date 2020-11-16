---
order: 1
nav:
  title: 指南
  order: 1
---

# 快速上手

这是收集了常用的react hooks，用于支持百度内部的开发，我们欢迎社区所有人参与共建。

## 说明

你可以直接打开[这里](https://ecomfe.github.io/react-hooks)来访问我们的文档，
或者把代码下载到本地查看，然后执行以下代码

```
yarn
yarn doc:dev
```

打开 `http://localhost:3000` 去查阅关于hooks的介绍

### 所有的 hooks 列表

| Hook | 说明 |
| ---- | ----------- |
| [`useActionPending`](#/hook/action-pending/use-action-pending) | Add a pending indicator to any async function |
| [`useBoolean`](#/hook/boolean/use-boolean) | Methods to control a boolean state |
| [`useSwitch`](#/hook/boolean/use-switch) | More convenient way to use boolean state |
| [`useToggle`](#/hook/boolean/use-toggle) | Simply toggle boolean state |
| [`useClickOutside`](#/hook/click-outside/use-click-outside) | Trigger callback when clicks outside a specific element |
| [`useArray`](#/hook/collection/use-array) | Methods to control array state |
| [`useSet`](#/hook/collection/use-set) | Methods to control `Set` state |
| [`useMap`](#/hook/collection/use-map) | Methods to control `Map` state |
| [`useDebouncedEffect`](#/hook/debounce/use-debounced-effect) | Debounce an effect on value change |
| [`useDebouncedValue`](#/hook/debounce/use-debounced-value) | Debounce a value change |
| [`useDebouncedCallback`](#/hook/debounce/use-debounced-callback) | Debounce a callback function |
| [`useRenderTimes`](#/hook/debug/use-render-times) | Return times of component rendered |
| [`useChangeTimes`](#/hook/debug/use-change-times) | Return times of a value changed |
| [`useUpdateCause`](#/hook/debug/use-update-cause) | Observe the cause of component update |
| [`useDerivedState`](#/hook/derived-state/use-derived-state) | Derive a state from external prop |
| [`useDocumentEvent`](#/hook/document-event/use-document-event) | Add listeners to `document`'s event |
| [`useDocumentTitle`](#/hook/document-title/use-document-title) | Change `document.title` |
| [`useEffectRef`](#/hook/effect-ref/use-effect-ref) | More reliable function based ref with clean-up ability |
| [`useElementResize`](#/hook/element-size/use-element-resize) | Trigger callback when element resize |
| [`useElementSize`](#/hook/element-size/use-element-size) | Return element's size |
| [`useHover`](#/hook/hover/use-hover) | Observe mouse enter and leave to element |
| [`useImmerReducer`](#/hook/immer/use-immer-reducer) | A `useReducer` with immer support **(deprecated)** |
| [`useImmerState`](#/hook/immer/use-immer-state) | A `useState` with immer support **(deprecated)** |
| [`useInfiniteScroll`](#/hook/infinite-scroll/use-infinite-scroll) | Encapsulate methods and props to implement infinite scroll |
| [`useInputValue`](#/hook/input-value/use-input-value) | Bound a value and it's change handler to input element |
| [`useOnScreenCallback`](#/hook/intersection/use-on-screen-callback) | Trigger callback when element intersects with viewport |
| [`useOnScreen`](#/hook/intersection/use-on-screen) | Return whether element intesects with viewport |
| [`useOnScreenLazyValue`](#/hook/intersection/use-on-screen-lazy-value) | Lazy initialize a value when it intersects with viewport |
| [`useLocalStorage`](#/hook/local-storage/use-local-storage) | Visit and update local storage |
| [`useMedia`](#/hook/media/use-media) | Return whether a media query is currently matched |
| [`usePreferDarkMode`](#/hook/media/use-prefer-dark-mode) | Return whether user prefers dark color scheme |
| [`useMergedRef`](#/hook/merged-ref/use-merged-ref) | Merge multiple ref into a single one |
| [`useMethodsNative`](#/hook/methods/use-methods-native) | Wrap methods around a state |
| [`useMethodsExtensionNative`](#/hook/methods/use-methods-extension-native) | Wrap methods around a `setState` function |
| [`useMethods`](#/hook/methods/use-methods) | `useMethodsNative` with immer support |
| [`useMethodsExtension`](#/hook/methods/use-methods-extension) | `useMethodsNative` with immer support |
| [`useOnLine`](#/hook/network/use-on-line) | Return user is current online of offline |
| [`useCounter`](#/hook/number/use-counter) | Methods to control a number state with increment and decrement |
| [`useOptimisticFactory`](#/hook/optimistic/use-optimistic-factory) | Infrastructure hook to create optimistic state |
| [`useOptimisticState`](#/hook/optimistic/use-optimistic-state) | Optimistic state |
| [`useOptimisticTask`](#/hook/optimistic/use-optimistic-task) | Wrap async task to have optimistic result |
| [`usePerformanceTiming`](#/hook/performance/use-performance-timing) | Collect performance data and send to callback |
| [`useLayoutTiming`](#/hook/performance/use-layout-timing) | Collect timings of a component's layout |
| [`usePoll`](#/hook/poll/use-poll) | Periodically trigger an async function and manage its response |
| [`usePreviousValue`](#/hook/previous-value/use-previous-value) | Get previous version of a value |
| [`usePreviousEquals`](#/hook/previous-value/use-previous-equals) | Return whether a value is equals to that on previous render |
| [`useOriginalCopy`](#/hook/previous-value/use-original-copy) | Track back a value to get a reference equals copy when content are identical |
| [`useOriginalDeepCopy`](#/hook/previous-value/use-original-deep-copy) | `useOriginalCopy` with deep equal support |
| [`useRequestCallback`](#/hook/request/use-request-callback) | Return a function to trigger request with its data, error and pending state |
| [`useRequest`](#/hook/request/use-request) | Trigger request on params change and return its data, error and pending state |
| [`useNavigate`](#/hook/router/use-navigate) | Get a function to navigate to any location |
| [`useLocationState`](#/hook/router/use-location-state) | Wrap location's state into a react state |
| [`useSearchParams`](#/hook/router/use-search-params) | Parse search string to `URLSearchParams` as well as a function to update search |
| [`useSearchParam`](#/hook/router/use-search-param) | Get a single search param |
| [`useSearchParamAll`](#/hook/router/use-search-param-all) | Get a single search param as array |
| [`useUpdateSearchParams`](#/hook/router/use-update-search-params) | Get a function to update search params |
| [`useSearchParamState`](#/hook/router/use-search-param-state) | Wrap a single search param into a react state |
| [`useScript`](#/hook/script/use-script) | Load an external script |
| [`useScriptSuspense`](#/hook/script/use-script-suspense) | Load an external script with suspense |
| [`useScrollIntoView`](#/hook/scroll-into-view/use-scroll-into-view) | Scroll an element into viewport |
| [`useScrollLock`](#/hook/scroll-lock/use-scroll-lock) | Lock scroll of document |
| [`useScrollPosition`](#/hook/scroll-position/use-scroll-position) | Get current scroll top and left |
| [`useScrollTop`](#/hook/scroll-position/use-scroll-top) | Get current scroll top |
| [`useScrollLeft`](#/hook/scroll-position/use-scroll-left) | Get current scroll left |
| [`useSelection`](#/hook/selection/use-selection) | Manage state to work with list selection, including multiple and range selection |
| [`useSnapshotState`](#/hook/snapshot/use-snapshot-state) | Get a state with undo and redo support |
| [`useTimeout`](#/hook/timeout/use-timeout) | Trigger callback after specified time |
| [`useInterval`](#/hook/timeout/use-interval) | Trigger callback periodically |
| [`useStableInterval`](#/hook/timeout/use-stable-interval) | `useInterval` but counts ellapsed time of function execution, both sync and async |
| [`useTransitionState`](#/hook/transition-state/use-transition-state) | A state which will revert back to its initial value when updated |
| [`useForceUpdate`](#/hook/update/use-force-update) | Force update a component |
| [`useUserMedia`](#/hook/user-media/use-user-media) | Open video and audio streams in browser |
| [`useWebSocket`](#/hook/web-socket/use-web-socket) | Create a web socket connecting to specified url |
| [`useWindowSize`](#/hook/window-size/use-window-size) | Get the size of window |