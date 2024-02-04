![image](https://github.com/lecepin/blog/assets/11046969/f9ab791f-c827-470c-98ed-097d97b6ec6b)


## 1. Zustand

`Zustand` 是一个轻量级的状态管理库，用于 JavaScript 应用程序，特别是在 React 生态系统中。它提供了一个简单、可扩展的解决方案来中心化和管理应用程序的状态。

与其他状态管理解决方案（如 Redux 或 MobX）相比，`Zustand` 旨在提供更简洁的 API 和更少的样板代码。它允许你创建一个全局状态存储，并且可以在应用程序的任何地方访问和更新这个状态，而不需要像 Redux 那样编写大量的 action creators 和 reducers。

`Zustand` 的主要特点包括：

1. 简洁的 API：创建 store 和访问 state 都非常直观。
2. React hooks：`Zustand` 与 React hooks 完美整合，使得在 React 组件中使用状态变得非常简单。
3. 不可变更新：通过 Immer 库支持，`Zustand` 允许你以一种直观的方式更新复杂的状态对象。
4. 中间件支持：可以使用中间件来添加额外的功能，例如日志记录、持久化等。
5. 没有“单一真相来源”的限制：与 Redux 不同，`Zustand` 允许你创建多个独立的 store。

`Zustand` 是在 React 社区内广受欢迎的解决方案之一，适用于那些想要更简单状态管理工具的开发者。

## 2. 诞生背景

`Zustand` 是一个为 React 应用程序设计的简洁且实用的状态管理库。它的诞生背景和主要解决的问题如下：

### 背景

随着 React 应用程序的增长和复杂性的提升，开发者开始寻找更简单、更易于维护的状态管理解决方案。在 `Zustand` 出现之前，许多 React 项目使用 Redux 作为其主要的状态管理工具。Redux 有很多优点，比如可预测性、中心化状态和时间旅行调试功能，但是它也有一些缺点，比如：

- 重度依赖样板代码（action、reducer、selector 等）
- 学习曲线陡峭
- 对于小到中型的项目来说可能过于复杂

因此，社区开始探索其他的状态管理解决方案，目的是减少样板代码、简化开发流程，并提供与 React 更自然的集成。

### 解决的问题

`Zustand` 主要旨在解决以下问题：

1. **简化状态管理**：提供一个更直观的 API，通过避免 Redux 那样的冗余样板代码，使得状态管理更加简洁和直接。

2. **更好的开发体验**：通过使用 React Hooks，`Zustand` 使得在函数组件中访问和更新状态变得容易。

3. **无拘无束**：`Zustand` 允许创建多个独立的 store，不强制要求"单一真相来源"，给予开发者更多的灵活性。

4. **性能优化**：`Zustand` 允许组件仅订阅状态的一部分，从而减少不必要的渲染和提高性能。

5. **简单的状态共享**：不需要复杂的上下文或提供者，状态可以跨组件和文件轻松共享。

6. **中间件和增强功能**：支持中间件，使得开发者可以轻松添加日志记录、持久化存储等增强功能。

7. **适应现代 React 功能**：考虑到了 React 的新特性，如 Concurrent Mode 和 Suspense，从而确保在现代 React 特性下的稳定性。

总之，`Zustand` 应运而生，旨在为开发者提供一个轻便、简单且功能强大的状态管理库，让状态管理变得更加易于使用和维护。

## 3. React 陷阱

在 React 应用程序中，有几个常见的问题可能会给开发者带来挑战：

1. **Zombie Child Problem (僵尸子组件问题)**: 这个问题发生在 React 的异步渲染环境中，尤其是在使用 Concurrent Mode 时。当一个 React 组件的状态更新后，子组件可能会在一个渲染周期中引用旧的父组件状态。这意味着子组件表现得好像它们“僵死”在了一个过时的状态上，与当前的应用程序状态不同步。

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <Child count={count} />
    </>
  );
}

function Child({ count }) {
  const [childCount, setChildCount] = useState(count);

  useEffect(() => {
    // 假设这个 effect 是基于某种条件或异步操作触发的，我们这里直接模拟
    setChildCount(count);
  }, [count]); // 依赖于父组件的 count

  return <div>Child Count: {childCount}</div>;
}
```

在 Concurrent Mode 下，如果 `Parent` 组件多次快速更新，而 `Child` 组件的 `useEffect` 更新延迟或者因为某些原因未能及时执行，`Child` 组件可能会显示一个过时的 count 值。

2. **React Concurrency (React 并发问题)**:React 16.8 引入了 Concurrent Mode，它带来了新的并发功能，可以让 React 在渲染过程中中断和恢复工作。这种能力提高了应用的响应性和性能，但同时也引入了复杂性，因为开发者需要确保他们的状态管理能够适应可能出现的中断和重新开始的渲染。

```jsx
function MyComponent() {
  const [value, setValue] = useState(0);

  // 假设 performAsyncOperation 是一个异步操作
  async function performAsyncOperation() {
    // 这个操作可能被中断，如果在完成之前有其他更高优先级的渲染任务发生
    const result = await someAsyncOperation();
    setValue(result);
  }

  useEffect(() => {
    performAsyncOperation();
  }, []);

  return <div>{value}</div>;
}
```

在这个场景中，`someAsyncOperation` 可能被中断，如果 React 在此期间开始了一个新的渲染任务，这可能会引起复杂的状态问题。

3. **Context Loss Between Mixed Renderers (混合渲染器之间的上下文丢失问题)**:当你在同一个应用程序中混合使用不同类型的渲染器（例如，同时使用 ReactDOM 和 React Native 或者 SSR 与客户端渲染）时，可能会遇到上下文丢失的问题。这是因为 React 的上下文机制是按渲染器实例进行隔离的。如果状态管理库不正确地处理这些情况，可能会导致跨不同渲染器的组件状态不一致。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import SomeLibrary from "some-library";

const MyContext = React.createContext();

function App() {
  return (
    <MyContext.Provider value={{ someValue: "value" }}>
      <SomeLibraryComponent />
    </MyContext.Provider>
  );
}

function SomeLibraryComponent() {
  // 假设 SomeLibrary 使用了不同的渲染器或者以某种方式改变了渲染上下文
  const contextValue = useContext(MyContext);
  // 这里可能无法获取到期望的上下文，因为 SomeLibrary 可能已经切换了上下文环境
  return <div>{contextValue.someValue}</div>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

在这个示例中，如果 `SomeLibraryComponent` 不正确地处理上下文，那么它可能无法访问到由 `MyContext.Provider` 提供的值。

解决这些问题通常涉及到深入的 React 知识和对状态管理库的细致设计。例如，`Zustand` 在其实现中考虑到了这些潜在问题，并提供了一套机制来避免它们，以确保状态的一致性和应用的稳定性。

## 4. Zustand VS 其他状态库

下面是一个表格形式来对比 Zustand 和其他几个状态管理库的关键方面：

### Zustand vs Redux

| 特性       | Zustand                | Redux                                                         |
| ---------- | ---------------------- | ------------------------------------------------------------- |
| 状态模型   | 不可变状态             | 不可变状态                                                    |
| Context    | 不需要                 | 需要使用 Provider                                             |
| API        | 简洁                   | 标准 Redux 需要 action、reducer；Redux Toolkit 提供简化的 API |
| 代码样板   | 较少                   | 较多（尽管 Redux Toolkit 有所简化）                           |
| 渲染优化   | 手动使用选择器         | 手动使用选择器（Redux Toolkit 中 selector 的使用更为普遍）    |
| 状态更新   | 直接通过 store 函数    | 通过 dispatch 和 reducer                                      |
| 中间件支持 | 有支持                 | 有支持，中间件生态丰富                                        |
| 其他       | 无需包装应用，易于集成 | 广泛的社区和生态系统支持，适合大型应用                        |

### Zustand vs Valtio

| 特性       | Zustand                           | Valtio                                                    |
| ---------- | --------------------------------- | --------------------------------------------------------- |
| 状态模型   | 不可变状态                        | 可变状态                                                  |
| Context    | 不需要                            | 不需要                                                    |
| API        | 简洁                              | 直接修改状态                                              |
| 代码样板   | 较少                              | 几乎无                                                    |
| 渲染优化   | 手动使用选择器                    | 通过属性访问自动优化                                      |
| 状态更新   | 通过 set 函数以不可变方式更新状态 | 直接对状态对象进行可变更新                                |
| 中间件支持 | 有支持                            | 不适用（因为是可变的，无需额外的 Immer 等对不可变的处理） |
| 其他       | 易于集成                          | 易于理解和使用，特别是对于习惯可变数据模式的开发者        |

### Zustand vs Jotai

| 特性       | Zustand             | Jotai                                                      |
| ---------- | ------------------- | ---------------------------------------------------------- |
| 状态模型   | 不可变状态          | 原子状态（可组合的小单位状态）                             |
| Context    | 不需要              | 不需要                                                     |
| API        | 直观、简洁          | 细粒度、可组合                                             |
| 代码样板   | 较少                | 较少                                                       |
| 渲染优化   | 手动使用选择器      | 原子依赖自动优化                                           |
| 状态更新   | 直接通过 store 函数 | 使用原子更新和订阅状态                                     |
| 中间件支持 | 有支持              | 不适用（原子模型提供不同的扩展方式）                       |
| 其他       | 易于集成            | 原子模型提供更高的可组合性，适用于需要细粒度状态管理的场景 |

### Zustand vs Recoil

| 特性       | Zustand             | Recoil                                                     |
| ---------- | ------------------- | ---------------------------------------------------------- |
| 状态模型   | 不可变状态          | 原子状态（通过字符串键识别）                               |
| Context    | 不需要              | 需要用 `RecoilRoot` 包装                                   |
| API        | 直观、简洁          | 细粒度、可组合，但需要理解 Recoil 的概念                   |
| 代码样板   | 较少                | 适中（需要定义原子和选择器）                               |
| 渲染优化   | 手动使用选择器      | 原子和选择器依赖自动优化                                   |
| 状态更新   | 直接通过 store 函数 | 使用原子和选择器进行状态更新和订阅                         |
| 中间件支持 | 有支持              | 不适用（Recoil 提供不同的扩展方式）                        |
| 其他       | 易于集成            | 提供更为高级的状态同步和派生功能，适用于复杂状态逻辑的应用 |

## 5. 安装

要在你的 React 项目中安装和使用 Zustand，你需要遵循以下步骤：

### 步骤 1: 安装 Zustand

使用 npm 或 yarn 来安装 Zustand:

```bash
# 使用 npm
npm install zustand

# 使用 yarn
yarn add zustand
```

### 步骤 2: 创建你的第一个 store

创建一个新文件（例如 `store.js`）来定义你的 store 和 state。使用 `create` 方法来创建一个新的 store。

```javascript
// store.js
import create from "zustand";

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
```

在这个例子中，我们创建了一个包含熊的数量和两个改变数量的方法的简单 store。

### 步骤 3: 在你的组件中使用 store

现在可以在你的 React 组件中使用定义好的 store 了。

```javascript
// App.js
import React from "react";
import useStore from "./store";

function App() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);

  return (
    <div>
      <h1>{bears} around here...</h1>
      <button onClick={increasePopulation}>Add a bear</button>
      <button onClick={removeAllBears}>Remove all bears</button>
    </div>
  );
}

export default App;
```

在这个组件中，我们通过调用 `useStore` 并传入选择器函数来访问 store 中的 `bears`、`increasePopulation` 和 `removeAllBears`。

### 步骤 4: 运行你的应用

你现在可以运行你的应用来查看 Zustand 状态管理是如何工作的。

```bash
# 如果你使用 npm
npm start

# 如果你使用 yarn
yarn start
```

你的应用将启动，并且你可以看到熊的数量，并使用按钮来增加或者移除熊。

## 6. 使用技巧

```ts
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

### 获取所有内容

你可以获取整个 store，但请记住这样做会导致组件在每次状态变化时都重新渲染！

```javascript
const state = useBearStore();
```

### 选择多个状态片段

默认情况下，Zustand 使用严格相等（`old === new`）来检测变化，这对于原子状态选择是高效的。

```javascript
const nuts = useBearStore((state) => state.nuts);
const honey = useBearStore((state) => state.honey);
```

如果你想构造一个包含多个状态选择的单个对象，类似于 Redux 的 `mapStateToProps`，你可以使用 `useShallow` 来防止当选择器输出根据浅相等不变时不必要的重新渲染。

```javascript
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const { nuts, honey } = useBearStore(
  useShallow((state) => ({ nuts: state.nuts, honey: state.honey })),
);
```

### 覆盖状态

`set` 函数有第二个参数，默认为 `false`。而不是合并，它将替换状态模型。小心不要抹去你依赖的部分，如操作。

```javascript
import omit from "lodash-es/omit";

const useFishStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // 清除整个 store，包括操作
  deleteTuna: () => set((state) => omit(state, ["tuna"]), true),
}));
```

### 异步操作

当你准备好时，只需调用 `set`，zustand 不介意你的操作是异步的还是同步的。

```javascript
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond);
    set({ fishies: await response.json() });
  },
}));
```

### 在操作中读取状态

`set` 允许函数更新 `set(state => result)`，但你依然可以通过 `get` 在外部访问状态。

```javascript
const useSoundStore = create((set, get) => ({
  sound: "grunt",
  action: () => {
    const sound = get().sound;
    // ...
  },
}));
```

### 在组件外部读写状态和响应变化

有时你需要以非响应式的方式访问状态或对 store 进行操作。对于这些情况，结果钩子有附加到其原型的实用程序函数。

```javascript
const useDogStore = create(() => ({ paw: true, snout: true, fur: true }));

const paw = useDogStore.getState().paw; // 获取非响应式最新状态
const unsub1 = useDogStore.subscribe(console.log); // 监听所有变化
useDogStore.setState({ paw: false }); // 更新状态，触发监听器
unsub1(); // 取消订阅监听器
```

### 使用带选择器的订阅

如果你需要使用选择器订阅，`subscribeWithSelector` 中间件会有所帮助。

```javascript
import { subscribeWithSelector } from "zustand/middleware";

const useDogStore = create(
  subscribeWithSelector(() => ({ paw: true, snout: true, fur: true })),
);

const unsub2 = useDogStore.subscribe((state) => state.paw, console.log);
```

### 在没有 React 的情况下使用 zustand

Zustand 核心可以导入并在没有 React 依赖的情况下使用。唯一的区别是 `create` 函数不返回一个钩子，而是 API 实用程序。

```javascript
import { createStore } from 'zustand/vanilla';

const store = createStore((set) => ...);
const { getState, setState, subscribe, getInitialState } = store;
export default store;
```

### 中间件

你可以按照你喜欢的方式函数组合你的 store。

```javascript
// 每次状态变化时记录日志的中间件
const log = (config) => (set, get, api) => config(...);
const useBeeStore = create(log((set) => ({ bees: false })));
```

### Redux 开发者工具

```javascript
import { devtools } from 'zustand/middleware';

const usePlainStore = create(devtools((set) => ...)); // 使用了 Redux 开发者工具的 store
```

## 7. 重新渲染？

Zustand 库使用了选择器 (selectors) 函数和引用相等性 (reference equality) 检查来帮助避免无效渲染。当你在组件中使用 Zustand 的 `useStore` 钩子时，你可以提供一个选择器函数来订阅特定的状态片段。Zustand 会使用严格相等性检查 (`===`) 来比较选择器返回的状态片段是否真的发生了变化，如果状态片段的值没有变化，组件不会重新渲染。

例如：

```javascript
const bears = useStore((state) => state.bears);
```

在这个例子中，组件只订阅 `bears` 状态片段，如果 `bears` 值没有变化，即使其他状态改变，组件也不会重新渲染。

对于更复杂的状态选择，可能需要构造一个包含多个状态片段的对象，这时可以使用 `shallow` 比较来防止无效渲染：

```javascript
import { useShallow } from "zustand/shallow";

const { nuts, honey } = useStore(
  (state) => ({
    nuts: state.nuts,
    honey: state.honey,
  }),
  useShallow,
);
```

`useShallow` 是从 Zustand 提供的 `/shallow` 路径中导入的一个工具函数，它对返回的对象进行浅层比较，如果对象的顶层属性和之前的状态一样，即使引用不同，也不会重新渲染组件。

总结一下，Zustand 通过以下方式来避免无效渲染：

1. **选择器**：通过允许你订阅特定的状态片段，仅当这些片段发生变化时才触发组件的重新渲染。
2. **引用相等性检查**：默认情况下，选择器返回的状态片段会通过严格相等性检查来决定是否需要重新渲染。
3. **浅层比较**：使用 `useShallow` 或其他浅层比较函数来对选择器返回的对象进行浅层属性比较，从而进一步减少不必要的渲染。

这些方法在一定程度上可以优化渲染性能，确保仅在实际需要时才更新组件。
