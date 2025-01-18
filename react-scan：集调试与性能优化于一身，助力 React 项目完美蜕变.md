一款能够自动检测和突出显示 React 应用中导致性能问题的组件的工具——React Scan。

![demo](https://github.com/user-attachments/assets/0b5b12a4-2c5c-42ee-9716-d49210d88fe3)


## 背景

在 React 开发过程中，性能问题是开发者经常需要面对的挑战。虽然已经有一些工具可用于性能调试，但这些工具在实际使用中存在各种局限性，无法很好地满足开发者的需求。

1. **`<Profiler />` 的问题**
   - **需要大量手动更改**：使用 `<Profiler />` 时，开发者需要对代码进行大量的手动修改，这增加了开发的复杂性和工作量。例如，需要在代码中合适的位置插入 `<Profiler />` 组件，并且要处理其相关的回调函数等。

```jsx
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>;

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // 对渲染时间进行汇总或记录...
}
```

2. **`Why Did You Render?` 的问题**
   - **缺乏简单视觉线索**：`Why Did You Render?` 这个工具在帮助开发者理解组件为何重新渲染方面，缺少简单直观的视觉提示。开发者可能需要花费更多的时间去分析日志或调试信息，才能找出性能问题的根源。

```tsx
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

//...
const BigListPureComponent = props => (
  <div>
    //some heavy component you want to ensure doesn't happen if its not necessary
  </div>
)
BigListPureComponent.whyDidYouRender = true
```

![image](https://github.com/user-attachments/assets/d2721685-e9bc-4179-92c9-e036090cdc1e)


3. **`React Devtools` 的问题**

- **缺乏简单、便携和编程式 API**：`React Devtools` 没有提供一个简单、可移植且可编程的 API，这使得开发者在进行自动化性能测试或集成到特定工作流程中时遇到困难。
- **渲染批次处理导致延迟**：`React Devtools` 会对渲染进行批次处理，当组件渲染速度过快时，它会出现延迟，可能每秒只显示一次渲染结果，这不利于开发者实时观察组件的渲染情况。
- **滚动或调整大小时框位置不更新**：在使用 `React Devtools` 的高亮功能时，当用户进行滚动或调整窗口大小等操作时，高亮框的位置不会相应更新，影响了开发者对组件位置和布局的判断。
- **缺少渲染计数**：`React Devtools` 没有提供组件渲染次数的统计信息，开发者难以直观地了解哪些组件渲染频繁，从而无法快速定位性能瓶颈。
- **难以区分不良/缓慢渲染**：开发者无法直接从 `React Devtools` 中得知哪些渲染是不良或缓慢的，需要进一步检查才能确定，这增加了调试的时间和难度。

`react-scan` 正是为了解决这些问题而诞生，它具有无需代码更改、精准高亮问题组件、多种使用方式等特点，能够更方便地帮助开发者检测和优化 React 应用的性能。

## 核心构成

1. **监控模块**
   - 包含一系列用于监控 React 组件性能的函数和工具。例如在 `react-scan/packages/scan/src/core/monitor/performance.ts` 文件中，有多个函数用于处理性能相关的逻辑，像 `initPerformanceMonitoring` 函数用于初始化性能监控，`setupPerformanceListener` 函数用于设置性能监听器等。
2. **过滤模块**
   - 提供对组件路径进行过滤的功能，通过定义一些过滤规则来决定哪些组件应该被包含在性能分析路径中。如 `PathFilters` 接口定义了多种过滤选项（`skipProviders`、`skipHocs` 等），`shouldIncludeInPath` 函数根据这些过滤选项和预定义的正则表达式模式来判断组件名是否应该被包含在路径中。
3. **工具函数模块**
   - 包含一些辅助函数，如 `getDisplayName` 用于获取组件的显示名称，`getCleanComponentName` 用于清理组件名称，`isMinified` 用于判断组件名称是否被压缩等。这些工具函数在性能检测过程中被广泛使用，帮助处理组件相关的信息。

## 检测能力实现原理

- **创建监测实例**：

  - 使用 `createInstrumentation` 创建一个监测实例 `instrumentation`，这个实例会监听 React 组件的各种生命周期事件，如 `onActive`、`onCommitStart`、`onError`、`onRender`、`onCommitFinish` 等。

- **初始化 UI 相关内容**：

  - 在 `onActive` 回调中，会检查是否已经存在 `react-scan-root` 元素，如果不存在则进行后续操作。
  - 创建音频上下文，用于在需要时播放声音提示。
  - 初始化根容器和 `ReactScanOverlay`，并启动刷新轮廓的定时器 `startFlushOutlineInterval`。
  - 可以创建工具栏 `createToolbar` 等 UI 元素。

- **监测渲染事件**：
  - 在 `onRender` 回调中，会对组件的渲染进行监测。首先会根据一些条件（如是否暂停、tab 是否激活等）判断是否需要进行后续处理。
  - 如果需要处理，会更新纤维渲染数据 `updateFiberRenderData`，并根据选项决定是否记录日志 `log`。
  - 对于复合纤维（`isCompositeFiber`），会根据条件报告渲染情况 `reportRender`。
  - 还会更新计划中的轮廓 `updateScheduledOutlines`，并根据选项决定是否播放声音提示 `playGeigerClickSound`。

```
export const startMonitoring = () => {
  flushInterval = setInterval(() => {
    try {
      void flush();
    } catch {
    }
  }, 2000);

  globalThis.__REACT_SCAN__ = {
    ReactScanInternals,
  };

  // 创建一个监测工具实例，传入相关的配置
  const instrumentation = createInstrumentation('monitoring', {
    // 提交开始时的回调函数
    onCommitStart() {
      ReactScanInternals.options.value.onCommitStart?.();
    },
    // 验证节点的回调函数，这里总是返回 true
    isValidFiber() {
      return true;
    },
    // 渲染时的回调函数
    onRender(fiber, renders) {
      updateFiberRenderData(fiber, renders);

      if (isCompositeFiber(fiber)) {
        aggregateComponentRenderToInteraction(fiber, renders);
      }
      ReactScanInternals.options.value.onRender?.(fiber, renders);
    },
    onCommitFinish() {
      ReactScanInternals.options.value.onCommitFinish?.();
    },
    trackChanges: false,
    forceAlwaysTrackRenders: true,
  });

  ReactScanInternals.instrumentation = instrumentation;
};
```

## 安装

方式一，直接引用 CDN：

```html
<!-- import this BEFORE any scripts -->
<script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
```

方式二，npm 安装：

```
npm install react-scan
```

```js
import { scan } from "react-scan"; // import this BEFORE react
import React from "react";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true,
  });
}
```

![image](https://github.com/user-attachments/assets/e77f6924-f1a7-4a95-951c-b4bbd5b9ca7a)


## RN 使用

两者实现不一样。

```
npm install @shopify/react-native-skia@^1.5.10 react-native-reanimated react-scan@native
```

```js
import { ReactScan } from "react-scan/native";

// For Expo, in _layout.tsx:
export default function Layout() {
  return (
    <ReactScan
      options={{
        enabled: true,
        log: true,
        animationWhenFlashing: false,
      }}
    >
      <Stack>{/* Your app content */}</Stack>
    </ReactScan>
  );
}

// For vanilla React Native, wrap your root component similarly
```

![390571294-5ade9c41-5cbc-41cf-acca-6bb81d314b0c](https://github.com/user-attachments/assets/09891b79-72b9-4cd5-b1c5-675bdff06a9c)
