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
pnpm install
npm run doc:dev
```

打开 `http://localhost:3000` 去查阅关于hooks的介绍

### 所有的 hooks 列表

| Hook | 说明 |
| ---- | ----------- |
| [`useActionPending`](../../zh-CN/hook/action-pending/use-action-pending) | 可以在异步函数中返回一个异步任务的数量 |
| [`useBoolean`](../../zh-CN/hook/boolean/use-boolean) | 用来控制 boolean 状态的Hook |
| [`useSwitch`](../../zh-CN/hook/boolean/use-switch) | 更优雅的管理 boolean 状态的Hook |
| [`useToggle`](../../zh-CN/hook/boolean/use-toggle) | 简单的切换 boolean 状态的Hook |
| [`useClickOutside`](../../zh-CN/hook/click-outside/use-click-outside) | 在特定元素外点击时触发回调 |
| [`useArray`](../../zh-CN/hook/collection/use-array) | 用来控制 array 状态的方法 |
| [`useSet`](../../zh-CN/hook/collection/use-set) | 管理 `Set` 类型状态的 Hook |
| [`useMap`](../../zh-CN/hook/collection/use-map) | 管理 `Map` 类型状态的 Hook |
| [`useDebouncedEffect`](../../zh-CN/hook/debounce/use-debounced-effect) | 为effect任务增加防抖能力 |
| [`useDebouncedValue`](../../zh-CN/hook/debounce/use-debounced-value) | 为value值改变增加防抖能力 |
| [`useDebouncedCallback`](../../zh-CN/hook/debounce/use-debounced-callback) | 为callback函数增加防抖能力 |
| [`useRenderTimes`](../../zh-CN/hook/debug/use-render-times) | 返回组件渲染的次数 |
| [`useChangeTimes`](../../zh-CN/hook/debug/use-change-times) | 返回value值改变的次数 |
| [`useUpdateCause`](../../zh-CN/hook/debug/use-update-cause) | 观测组件更新的原因 |
| [`useDerivedState`](../../zh-CN/hook/derived-state/use-derived-state) | 从外部props更新state值, 类getDerivedStateFromProps |
| [`useDocumentEvent`](../../zh-CN/hook/document-event/use-document-event) | 为 `document` 新增监听事件 |
| [`useDocumentTitle`](../../zh-CN/hook/document-title/use-document-title) | 修改 `document.title` 的值 |
| [`useEffectRef`](../../zh-CN/hook/effect-ref/use-effect-ref) | 很多功能基于ref,此函数具备自动清理副作用的能力 |
| [`useElementResize`](../../zh-CN/hook/element-size/use-element-resize) | 当元素resize改变时会返回callback回调 |
| [`useElementSize`](../../zh-CN/hook/element-size/use-element-size) | 返回元素的尺寸 |
| [`useHover`](../../zh-CN/hook/hover/use-hover) | 监听元素的鼠标移入(enter)和移出(leave)事件 |
| [`useImmerReducer`](../../zh-CN/hook/immer/use-immer-reducer) | 支持immer的`useReducer` **(已废弃)** |
| [`useImmerState`](../../zh-CN/hook/immer/use-immer-state) | 支持immer的`useState` **(已废弃)** |
| [`useInfiniteScroll`](../../zh-CN/hook/infinite-scroll/use-infinite-scroll) | 监听无限滚动的Hook, 封装了多个方法以供使用 |
| [`useInputValue`](../../zh-CN/hook/input-value/use-input-value) | 将value值和对应change方法绑定到input元素上 |
| [`useOnScreenCallback`](../../zh-CN/hook/intersection/use-on-screen-callback) | 当元素进入可视区域触发回调 |
| [`useOnScreen`](../../zh-CN/hook/intersection/use-on-screen) | 当元素进入可视区域返回一个boolean值 |
| [`useOnScreenLazyValue`](../../zh-CN/hook/intersection/use-on-screen-lazy-value) | 只有当元素进入可视区域时才Lazy的初始化一个值 |
| [`useLocalStorage`](../../zh-CN/hook/local-storage/use-local-storage) | 访问和更新localstorage |
| [`useMedia`](../../zh-CN/hook/media/use-media) | 返回一个boolean值, 检查是否有匹配的媒体查询 |
| [`usePreferDarkMode`](../../zh-CN/hook/media/use-prefer-dark-mode) | 返回一个boolean值, 检查用户是否喜欢暗黑主题 |
| [`useMergedRef`](../../zh-CN/hook/merged-ref/use-merged-ref) | 合并多个ref为一个 |
| [`useMethodsNative`](../../zh-CN/hook/methods/use-methods-native) | state的包裹函数 |
| [`useMethodsExtensionNative`](../../zh-CN/hook/methods/use-methods-extension-native) | `setState` 的包裹函数 |
| [`useMethods`](../../zh-CN/hook/methods/use-methods) | 支持immer的 `useMethodsNative`  |
| [`useMethodsExtension`](../../zh-CN/hook/methods/use-methods-extension) | 支持immer的 `useMethodsNative` |
| [`useOnLine`](../../zh-CN/hook/network/use-on-line) | 返回当前用户是在线还是离线 |
| [`useCounter`](../../zh-CN/hook/number/use-counter) | 管理计数器的Hook, 控制数字的增和减 |
| [`useOptimisticFactory`](../../zh-CN/hook/optimistic/use-optimistic-factory) | 创建optimistic state的基础Hook |
| [`useOptimisticState`](../../zh-CN/hook/optimistic/use-optimistic-state) | 创建Optimistic state |
| [`useOptimisticTask`](../../zh-CN/hook/optimistic/use-optimistic-task) | 包裹异步任务以获取optimistic的结果 |
| [`usePerformanceTiming`](../../zh-CN/hook/performance/use-performance-timing) | 收集performance的数据返回一个callback |
| [`useLayoutTiming`](../../zh-CN/hook/performance/use-layout-timing) | 收集一个组件的渲染布局的时间节点信息 |
| [`usePoll`](../../zh-CN/hook/poll/use-poll) | 定时触发一个异步函数并管理其响应 |
| [`usePreviousValue`](../../zh-CN/hook/previous-value/use-previous-value) | 获取一个值的前一个版本 |
| [`usePreviousEquals`](../../zh-CN/hook/previous-value/use-previous-equals) | 返回一个值是否等于上一次渲染时的值 |
| [`useOriginalCopy`](../../zh-CN/hook/previous-value/use-original-copy) | 当对象的内容相同时,返回一个相同引用类型的值(浅拷贝) |
| [`useOriginalDeepCopy`](../../zh-CN/hook/previous-value/use-original-deep-copy) | `useOriginalCopy` 的深拷贝模式 |
| [`useRequestCallback`](../../zh-CN/hook/request/use-request-callback) | 触发请求函数返回它的data, error 和 pending 状态 |
| [`useRequest`](../../zh-CN/hook/request/use-request) | 当 params 改变时触发请求函数返回它的data, error 和 pending 状态 |
| [`useNavigate`](../../zh-CN/hook/router/use-navigate) | 获得一个导航到任何地点的功能 |
| [`useLocationState`](../../zh-CN/hook/router/use-location-state) | 将地点的信息包裹进一个react的状态 |
| [`useSearchParams`](../../zh-CN/hook/router/use-search-params) | 一个解析search字符串参数到 `URLSearchParams`并更新搜索的函数 |
| [`useSearchParam`](../../zh-CN/hook/router/use-search-param) | 获取搜索的参数 |
| [`useSearchParamAll`](../../zh-CN/hook/router/use-search-param-all) | 获取一个搜索参数的数组 |
| [`useUpdateSearchParams`](../../zh-CN/hook/router/use-update-search-params) | 获取一个方法更新搜索的参数 |
| [`useSearchParamState`](../../zh-CN/hook/router/use-search-param-state) | 包裹搜索参数在一个react状态里 |
| [`useScript`](../../zh-CN/hook/script/use-script) | 加载一个外部的script脚本 |
| [`useScriptSuspense`](../../zh-CN/hook/script/use-script-suspense) | 使用suspense加载一个外部的script脚本  |
| [`useScrollIntoView`](../../zh-CN/hook/scroll-into-view/use-scroll-into-view) | 将元素滑动到可视区域 |
| [`useScrollLock`](../../zh-CN/hook/scroll-lock/use-scroll-lock) | 锁定document的滚动 |
| [`useScrollPosition`](../../zh-CN/hook/scroll-position/use-scroll-position) | 获取当前滚动的top值和left值 |
| [`useScrollTop`](../../zh-CN/hook/scroll-position/use-scroll-top) | 获取当前滚动的top值 |
| [`useScrollLeft`](../../zh-CN/hook/scroll-position/use-scroll-left) | 获取当前滚动的left值 |
| [`useSelection`](../../zh-CN/hook/selection/use-selection) | 管理当前选中状态下的列表工作，包括多选和范围选择 |
| [`useSnapshotState`](../../zh-CN/hook/snapshot/use-snapshot-state) | 获取一个支持撤销和重做的状态 |
| [`useTimeout`](../../zh-CN/hook/timeout/use-timeout) | 在指定时间后触发回调 |
| [`useInterval`](../../zh-CN/hook/timeout/use-interval) | 定时触发回调 |
| [`useStableInterval`](../../zh-CN/hook/timeout/use-stable-interval) | `useInterval` 但是计算函数执行的时间，包括同步和异步的时间 |
| [`useTransitionState`](../../zh-CN/hook/transition-state/use-transition-state) | 一个状态，在更新时恢复初始值 |
| [`useForceUpdate`](../../zh-CN/hook/update/use-force-update) | 强制更新一个组件 |
| [`useUserMedia`](../../zh-CN/hook/user-media/use-user-media) | 在浏览器中打开视频和音频流 |
| [`useWebSocket`](../../zh-CN/hook/web-socket/use-web-socket) | 在指定页面创建一个 websocket连接 |
| [`useWindowSize`](../../zh-CN/hook/window-size/use-window-size) | 获取当前window的尺寸 |
