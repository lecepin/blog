## 1. 前言

React 的属性透传场景 虽然有很多方式可以实现，但能做到代码写的少、re-render 轻松处理的方式并不多。

而状态管理工具 Jotai(https://github.com/pmndrs/jotai) 却可以很好的解决这些问题。

![image](https://github.com/lecepin/blog/assets/11046969/a383f0b1-32d6-4f18-acf2-197a142f286d)


最近的业务和组件场景里 也在用此方式实现。

## 2. React Context 的不足

常规解决数据透传通常使用 React 的 Context 来实现，但它却有一些不足的地方：

- React Context.Provider 嵌套地狱问题。
- Context value 修改时，触发消费 Context 组件 re-render 的问题（组件引用值未变化时）。

### 2.1 Provider 嵌套地狱

如下代码所示：

```jsx
<Context1.Provider value={value1}>
  <Context2.Provider value={value2}>
    <Context3.Provider value={value3}>
      <Context4.Provider value={value4}>
        <Context5.Provider value={value5}>
          <Context6.Provider value={value6}>{children}</Context6.Provider>
        </Context5.Provider>
      </Context4.Provider>
    </Context3.Provider>
  </Context2.Provider>
</Context1.Provider>
```

### 2.2 Context re-render

此问题通常有三种方式来解决：

1. 将包含多个属性的 Context 剥离成单个 Context 进行使用。但这样会导致 2.1 中嵌套地狱的问题发生。

```jsx
function Button() {
  let theme = useContext(ThemeContext);
  return <ExpensiveTree className={theme} />;
}
```

2. 将组件剥离成两个，剥离出来的用 `React.memo` 进行包裹，再消费。

```jsx
function Button() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme;
  return <ThemedButton theme={theme} />;
}

const ThemedButton = memo(({ theme }) => {
  return <ExpensiveTree className={theme} />;
});
```

3. 在组件的 return 中，用 `React.useMemo` 包裹，将 Context 中消费的值，做为其依赖项。

```jsx
function Button() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme;

  return useMemo(() => {
    return <ExpensiveTree className={theme} />;
  }, [theme]);
}
```

但这些方法，都会在使用时增加一些额外的工作量，变得繁琐和易出错。

## 3. 状态管理库 Jotai 的优势

刚好 Jotai 的其中一部分优势就能解决 React Context 中的这些问题。

Jotai 可以完美的解决嵌套地狱的问题，及精准 re-render 的问题。

简单写了一个例子，来看一下 Jotai re-render：[codesandbox] jotai 配合 React.memo re-render 测试(https://codesandbox.io/s/jotai-accurate-render-react-memo-c54ot5 )。

例子中 Jotai 的 Atom 及组件消费关系如下：

![image](https://github.com/lecepin/blog/assets/11046969/854c8fe5-37c4-4c6b-b22c-7fecab40ae1a)


## 4. Jotai 核心

Jotai 的学习成本很低，源码也比较易读。核心就三个 API：

- atom：创建原子相关方法。
- useAtom：视图关联原子相关方法。
- Provider：隔离和存储原子实例相关组件。

只需要熟悉这三个 API 的使用就可以轻松上手。

### 4.1 atom

atom 创建的其实是一份原子描述，并不会进行相关的存储。

可以创建原始原子及派生原子，用法如下：

```ts
// primitive atom
// 创建一个基础原子，它包含一个初始值，并且是可读写的。
// 它是状态的最基本形式，类似于 useState 的功能。
function atom<Value>(initialValue: Value): PrimitiveAtom<Value>

// read-only atom
// 创建一个只读原子，它不会接受一个初始值，而是接受一个读取函数。
// 这个函数定义了如何获取这个原子的值。可以返回一个同步的 Value 或者一个 Promise<Value>，如果原子的计算是异步的。
function atom<Value>(read: (get: Getter) => Value | Promise<Value>): Atom<Value>

// writable derived atom
// 创建一个可读写的派生原子，它通过一个读取函数来定义它的值，并且提供一个写入函数来定义如何更新这个原子的值。
// read 函数定义了如何根据依赖的其他原子来计算这个原子的值。
// write 函数定义了如何根据更新操作来改变这个原子的值。
function atom<Value, Update>(
  read: (get: Getter) => Value | Promise<Value>,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>

// write-only derived atom
// 创建一个只写的派生原子，它被初始化为一个值，并且提供一个写入函数来定义如何更新这个原子。
// read 值为 null 表示这个原子没有自己的状态，它完全依赖于 write 函数来处理更新。
// write 函数定义了如何根据更新操作来改变依赖的其他原子的值。
function atom<Value, Update>(
  read: Value,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>

// 示例用法
const primitiveAtom = atom(initialValue) // 创建一个基本原子，带有初始值。
const derivedAtomWithRead = atom(read) // 创建一个只读的派生原子，通过读取函数来定义。
const derivedAtomWithReadWrite = atom(read, write) // 创建一个可读写的派生原子，通过读取和写入函数来定义。
const derivedAtomWithWriteOnly = atom(null, write) // 创建一个只写的派生原子，通过写入函数来定义更新操作。
```

### 4.2 useAtom

用来将 atom 关联到视图中，形成响应关系。（atom 必须保持引用不变，否则会无限循环）

基本用法：

```ts
// primitive or writable derived atom
function useAtom<Value, Update>(
  atom: WritableAtom<Value, Update>,
  scope?: Scope
): [Value, SetAtom<Update>]

// read-only atom
function useAtom<Value>(atom: Atom<Value>, scope?: Scope): [Value, never]
```

如果“只读”或“只写”，建议直接使用：

- useAtomValue
- useSetAtom

### 4.3 Provider

使用上和 React Provider 很相似，当然底层也是用 React Context.Provider 包装的。

主要用来隔离 atom 实例 及存储 atom 实例用的。

有隔离需求可以包裹在视图中，无隔离需求可以不添加，和 React Context.Provider 一样。

基本用法：

```js
const Provider: React.FC<{
  initialValues?: Iterable<readonly [AnyAtom, unknown]>
  scope?: Scope
}>
```

## 5. Jotai 实现原理

下面看一下内部实现的基本原理。

### 5.1 Provider

Provider 的创建源码：

```js
const ScopeContainerContext = getScopeContext(scope);

return createElement(
  ScopeContainerContext.Provider,
  {
    // 创建 atoms 的 weakMap 等存储，挂载在 Provider 中
    value: scopeContainerRef.current,
  },
  children
);
```

```js
const ScopeContextMap = new Map<Scope | undefined, ScopeContext>()

export const getScopeContext = (scope?: Scope) => {
  if (!ScopeContextMap.has(scope)) {
    ScopeContextMap.set(scope, createContext(createScopeContainer()))
  }

  return ScopeContextMap.get(scope) as ScopeContext
}
```

```js
// 创建一个引用容器，用于存储 Jotai 的 scope 容器实例。
// Scope 容器用于隔离一组原子的状态，允许我们创建独立的状态树。
const scopeContainerRef = useRef<ScopeContainer>()

// 检查 scope 容器是否已经初始化。如果没有，则执行下面的初始化代码。
if (!scopeContainerRef.current) {
  // 延迟初始化模式。
  // 当组件第一次渲染时，我们创建 scope 容器并将其保存在 ref 中。
  const scopeContainer = createScopeContainer(
    // initialValues 只会在初始化时被使用一次，任何后续的变化都不会影响到这些初始值。
    initialValues,
    unstable_createStore // 这是一个不稳定的 API，用于创建 Jotai store。
  )

  // 如果启用了版本化写入，我们需要特殊处理写入操作。
  if (unstable_enableVersionedWrite) {
    let retrying = 0 // 用于跟踪重试次数。
    // 定义一个写入函数，该函数会更新版本号，以确保原子状态的一致性。
    scopeContainer.w = (write) => {
      setVersion((parentVersion) => {
        // 如果正在重试，则使用相同的版本号，否则创建一个新的版本号。
        const nextVersion = retrying ? parentVersion : { p: parentVersion }
        write(nextVersion) // 执行写入操作。
        return nextVersion // 返回新的版本号，用于后续的状态更新。
      })
    }
    // 将当前版本号存储在容器中。
    scopeContainer.v = version
    // 定义重试函数，该函数在有冲突时会重试状态更新。
    scopeContainer.r = (fn) => {
      ++retrying // 增加重试次数。
      fn() // 执行传入的函数。
      --retrying // 执行完毕后减少重试次数。
    }
  }
  // 将初始化完成的 scope 容器实例保存到 ref 中。
  scopeContainerRef.current = scopeContainer
}

```

可以清楚的看到，主要就做了：

- Provider 隔离。
- 在 Provider 的 value 中挂载 atom 实例。
- 通过 `scope` 缓存 createContext 实例。

另外，创建完 Provider 后，未来的所有变化都不会导致其内部的 value 发生变化，所以由 Provider 导致的渲染是不存在的。且 `initialValues` 也只会消费一次，未来变化也不会响应。

> 通过 `scope` 的设置，可以实现和原生 React Context.Provider 一样的效果，进行分割及多层嵌套。

### 5.2 atom

atom 的生成很简单，就是一份描述：

```ts
// 导出 atom 函数，这是 Jotai 状态管理库中用于创建原子的核心函数。
// Value: 原子中存储的值的类型。
// Args: write 函数可能接收的参数类型的数组。
// Result: write 函数返回的结果的类型。
export function atom<Value, Args extends unknown[], Result>(
  // read: 原子的读取函数或者初始值。
  // 如果提供了函数，则它定义了如何获取原子的值。
  // 如果提供了值，则它作为原子的初始值。
  read: Value | Read<Value, SetAtom<Args, Result>>,
  // write: 可选的写入函数，定义了如何更新原子的值。
  write?: Write<Args, Result>
) {
  // 生成一个唯一的键来标识原子。
  const key = `atom${++keyCount}`
  // 创建原子配置对象，并设置其 toString 方法，以便能够返回该原子的键。
  const config = {
    toString: () => key,
  } as WritableAtom<Value, Args, Result> & { init?: Value }

  // 检查 read 参数是否为函数。
  if (typeof read === 'function') {
    // 如果 read 是函数，则直接将其设置为原子的读取函数。
    config.read = read as Read<Value, SetAtom<Args, Result>>
  } else {
    // 如果 read 不是函数，则将其视为初始值，并设置 init 属性。
    config.init = read
    // 定义默认的读取函数，该函数简单地返回当前原子的值。
    config.read = (get) => get(config)
    // 定义默认的写入函数，该函数负责处理更新原子的值。
    config.write = ((get: Getter, set: Setter, arg: SetStateAction<Value>) =>
      set(
        config as unknown as PrimitiveAtom<Value>,
        // 如果提供的是函数，则调用该函数来计算新值。
        // 否则，直接使用提供的值作为新值。
        typeof arg === 'function'
          ? (arg as (prev: Value) => Value)(get(config))
          : arg
      )) as unknown as Write<Args, Result>
  }

  // 如果提供了 write 函数，则将其设置为原子的写入函数。
  if (write) {
    config.write = write
  }

  // 返回配置好的原子对象。
  return config
}
```

生成完成后，会挂载在 Provider 的 store 中。store 由 WeakMap 维护，所以不用担心内存泄漏的问题。

store 中的派生 atom 的触发变化和渲染，主要由 `dependencies` 和 `listeners` 实现。

### 5.3 useAtom

```js
export function useAtomValue<Value>(atom: Atom<Value>, scope?: Scope) {
  const ScopeContext = getScopeContext(scope)
  const scopeContainer = useContext(ScopeContext)
  // ...
}
```

可以看到 useAtom 中的信息也是通过读取 Context 实现，scope 用来标识与 Provider 匹配。

```js
// 使用 useReducer 钩子来跟踪原子（atom）的版本号、值以及对应的原子对象。
// useReducer 返回的状态数组包含版本号、从 reducer 获取的值以及从 reducer 获取的原子。
// 同时也返回一个 rerenderIfChanged 函数，用于在原子值发生变化时触发组件的重新渲染。
const [[version, valueFromReducer, atomFromReducer], rerenderIfChanged] =
  useReducer<
    // Reducer 的类型定义，描述状态和动作的结构。
    // readonly VersionObject | undefined, Awaited<Value>, Atom<Value>:
    // 表示状态的三个元素分别是版本对象（可能是 undefined）、
    // 经过 Promise 解析的 Value 类型的值，以及对应的 Atom<Value> 原子对象。
    // VersionObject | undefined: 动作的类型，可能是版本对象或者 undefined。
    Reducer<
      readonly [VersionObject | undefined, Awaited<Value>, Atom<Value>],
      VersionObject | undefined
    >,
    // Reducer 的初始动作类型。
    VersionObject | undefined
  >(
    // Reducer 函数，接收前一个状态和新的版本号，返回新的状态。
    (prev, nextVersion) => {
      // 根据新的版本号获取原子的值。
      const nextValue = getAtomValue(nextVersion)
      // 如果新旧值相同且原子对象未改变，则返回前一个状态（不触发渲染）。
      if (Object.is(prev[1], nextValue) && prev[2] === atom) {
        return prev // bail out
      }
      // 如果值有变化或原子对象改变，则返回包含新版本号、新值和原子对象的新状态。
      return [nextVersion, nextValue, atom]
    },
    // Reducer 的初始动作，通常是来自外部 Provider 的版本号。
    versionFromProvider,
    // 初始化函数，接收初始版本号，返回初始状态数组。
    (initialVersion) => {
      // 根据初始版本号获取原子的初始值。
      const initialValue = getAtomValue(initialVersion)
      // 返回包含初始版本号、初始值和原子对象的初始状态数组。
      return [initialVersion, initialValue, atom]
    }
  )

```

基于 useAtom 创建的值，由 useReducer 实现，可以有效优化部分 re-render 的问题。

```js
// 使用 useEffect 钩子来订阅原子的变化，并在必要时触发组件的重新渲染。
useEffect(() => {
  // 从 scopeContainer 中获取版本号，这个版本号可能是由 Provider 提供的。
  const { v: versionFromProvider } = scopeContainer;

  // 如果存在版本号，那么使用 store 的 COMMIT_ATOM 方法将这个原子和版本号关联起来。
  // 这通常意味着将原子的当前状态设置为提供的版本号所指示的状态。
  if (versionFromProvider) {
    store[COMMIT_ATOM](atom, versionFromProvider);
  }

  // 订阅原子的变化。当原子失效时，调用 `rerenderIfChanged` 函数。
  // 注意，派生原子此时可能尚未重新计算。
  const unsubscribe = store[SUBSCRIBE_ATOM](
    atom,
    rerenderIfChanged,
    versionFromProvider
  );

  // 立即调用 `rerenderIfChanged` 函数，以确保当前版本号对应的状态是最新的。
  // 这可能会导致组件的第一次渲染。
  rerenderIfChanged(versionFromProvider);

  // 返回一个函数，当组件卸载时，用于取消订阅原子的变化。
  return unsubscribe;
}, [store, atom, scopeContainer]); // useEffect 的依赖列表，仅当 store、atom 或 scopeContainer 更改时，才重新运行这个 effect。
```

```js
// `subscribeAtom` 函数用于设置订阅给定原子的变化。当原子的版本更新时，会调用回调函数。
const subscribeAtom = (
  // `atom` 参数是任何类型的原子对象（AnyAtom）。
  atom: AnyAtom,
  // `callback` 参数是一个回调函数，当原子的版本发生变化时会被调用。
  // 回调函数可以选择接收一个版本对象（VersionObject），该对象表示原子状态的版本。
  callback: (version?: VersionObject) => void,
  // `version` 参数是一个可选的版本对象，用于初始化原子的订阅时的版本状态。
  version?: VersionObject
) => {
  // 调用 `addAtom` 函数将原子添加到状态管理中，并关联起始版本（如果有）。
  // 返回的 `mounted` 对象包含原子的元数据，包括监听器列表。
  const mounted = addAtom(version, atom)
  // 获取该原子对应的监听器列表。
  const listeners = mounted.l
  // 将回调函数添加到监听器列表中，以便在原子状态变化时接收通知。
  listeners.add(callback)
  // 返回一个取消订阅的函数。当调用此函数时，会从监听器列表中移除回调函数。
  // 同时也会调用 `delAtom` 函数，表示不再关注该原子的状态变化。
  return () => {
    listeners.delete(callback)
    // TODO: 需要考虑是否在调用 `delAtom` 时将版本设置为 `undefined`。
    delAtom(version, atom)
  }
}

```

useRender 的 dispatch 会添加到 atom 的订阅列表中，当 atom 发生变化时，会执行订阅列表中的 dispatch 实现响应。

![image](https://github.com/lecepin/blog/assets/11046969/603492c4-a172-474d-b398-93491ff17f2b)


## 6. 开发中的注意

如果 Jotai 使用在应用级的全局状态中，不太需要注意。但在开发的组件中使用 Jotai 还是需要注意的。

### 6.1 开发组件的注意

最根本的一点就是 atom 的隔离问题，不然组件内的数据用的是同一份，会导致干扰。

所以需要额外包裹 Provider 进行隔离：

```jsx
const ComponentA = () => {
  return <div>A</div>;
};

export default () => {
  return (
    <Provider>
      <ComponentA />
    </Provider>
  );
};
```

如果原组件有 memo，需要把它移到 Provider 这一层：

```jsx
export default memo(() => {
  return (
    <Provider>
      <ComponentA />
    </Provider>
  );
});
```

如果有 forwardRef 之类的，基本要写两遍：

```jsx
const ComponentA = forwardRef(({ onChange, defaultValue }, ref) => {
  useImperativeHandle(ref, () => ({ changeStyle }));
  return <div>A</div>;
});

export default memo(
  forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      changeStyle: _ref.current.changeStyle,
    }));

    const _ref = useRef();

    return (
      <Provider>
        <ComponentA ref={_ref} />
      </Provider>
    );
  })
);
```

## 7. 场景示例

### 7.1 异步

Jotai 提供了 `loadable` 函数来处理异步原子的加载状态。它可以帮助你更方便地区分加载中、成功、错误等状态。下面是一个使用 `loadable` 的完整示例：

```jsx
import { atom } from "jotai";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import React from "react";

// 创建一个异步原子，用于获取用户列表
const fetchUsersAtom = atom(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await response.json();
  return users;
});

// 使用 loadable 包装 fetchUsersAtom
const usersLoadableAtom = loadable(fetchUsersAtom);

// React 组件，使用上面定义的原子来获取和显示用户列表
const UsersList = () => {
  // 使用 loadable 版本的原子，它会根据加载状态提供不同的值
  const [usersLoadable] = useAtom(usersLoadableAtom);

  return (
    <div>
      {usersLoadable.state === "loading" && <div>Loading...</div>}
      {usersLoadable.state === "hasError" && (
        <div>Error: {usersLoadable.error.message}</div>
      )}
      {usersLoadable.state === "hasValue" && (
        <ul>
          {usersLoadable.contents.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
```

这个例子中使用了 `loadable` 函数来创建 `usersLoadableAtom`。该原子会返回一个对象，它包含了状态信息和数据。`loadable` 这个高阶原子会根据内部原子的结果提供 `state`、`contents`、`error` 等属性：

- `state`: 表示当前异步原子的状态，可能的值是 'loading'、'hasValue' 或 'hasError'。
- `contents`: 当 `state` 为 'hasValue' 时，包含异步原子解析的值。
- `error`: 当 `state` 为 'hasError' 时，包含捕获的错误信息。

在组件中，你可以根据这些状态来渲染不同的 UI。例如，当 `state` 为 'loading' 时显示加载指示器，当 `state` 为 'hasError' 时显示错误信息，当 `state` 为 'hasValue' 时渲染数据。这样，你就不再需要手动管理加载和错误状态了。

### 7.2 存储

`atomWithStorage` 是 Jotai 中一个实用的函数，它允许你创建一个原子（atom），该原子的状态会自动与浏览器的 `localStorage` 或 `sessionStorage` 同步。这意味着原子的状态将被持久化，即使在页面刷新或重新打开后也能保留。

下面是使用 `atomWithStorage` 的一个示例：

```jsx
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import React from "react";

// 创建一个原子，其状态会自动与 localStorage 中的 "count" 键同步
const countAtom = atomWithStorage("count", 0);

// React 组件，使用上面定义的原子来显示和更新计数器
const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
```

在上述代码中：

1. 使用 `atomWithStorage` 创建了一个名为 `countAtom` 的原子，其初始值为 `0`，键名为 `"count"`，这意味着原子的状态会与 `localStorage` 中的 `"count"` 键同步。
2. 在 `Counter` 组件中，使用 `useAtom` 钩子读取和更新 `countAtom` 的状态。
3. 提供了两个按钮来增加和减少计数器的值。每当计数器的值发生变化时，新的值会自动保存到 `localStorage` 中。

现在，无论何时刷新页面或关闭浏览器重新打开，计数器的值都将从 `localStorage` 中恢复，从而保持状态持久化。

`atomWithStorage` 还支持传入一个自定义存储对象，这使得你能够使用除了 `localStorage` 和 `sessionStorage` 之外的存储解决方案。使用自定义存储时，你需要传入一个有 `getItem`、`setItem` 和 `removeItem` 方法的对象。这三个方法分别用于读取、保存和删除存储项。

### 7.3 重置

使用 Jotai，你可以创建一个可重置的原子（atom），这意味着你可以恢复到原子的初始状态。这通常是通过结合使用 `atom` 和 `useResetAtom` 钩子实现的。以下是一个演示如何创建和使用可重置原子的示例：

```jsx
import { atom, useAtom, useResetAtom } from "jotai";
import React from "react";

// 创建一个基本原子，并设置初始值
const countAtom = atom(0);

// React 组件，使用上面定义的原子来显示和更新计数器
const Counter = () => {
  // 使用 useAtom 钩子来读取和更新原子的状态
  const [count, setCount] = useAtom(countAtom);
  // 使用 useResetAtom 钩子来获取一个可以重置原子状态的函数
  const resetCount = useResetAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
};

export default Counter;
```

在上述代码中：

1. 使用 `atom` 创建了一个名为 `countAtom` 的原子，其初始值为 `0`。
2. 在 `Counter` 组件中，使用 `useAtom` 钩子读取和更新 `countAtom` 的状态。
3. 提供了三个按钮来分别增加、减少计数器的值，以及重置计数器的值。
4. 使用 `useResetAtom` 钩子获取了一个 `resetCount` 函数，当点击 "Reset" 按钮时会调用该函数，从而将 `countAtom` 的状态重置为其初始值（在这个例子中是 `0`）。

现在，当你点击 "Increment" 或 "Decrement" 按钮时，计数器的值会相应地增加或减少。点击 "Reset" 按钮会把计数器的值重置为初始值。这样的设计可以方便地在状态管理中实现重置功能，而不需要手动更新状态为初始值。

### 7.4 家族

在 Jotai 中，原子家族（atom family）是一个创建一系列相似原子的高阶函数。每个原子都是唯一的，但它们共享相同的行为和逻辑。使用原子家族可以使得根据特定参数生成原子变得简单。这在处理列表或动态生成的内容时特别有用。

下面是一个使用原子家族的示例，该例子展示了如何为一个待办事项列表中的每一项创建唯一的原子。

```jsx
import { atomFamily, useAtom } from "jotai";
import React from "react";

// 创建一个原子家族，每个原子代表一个待办事项的完成状态
const todoCompletedAtomFamily = atomFamily((id) => atom(false));

// 代表单个待办事项的组件
const TodoItem = ({ id }) => {
  // 使用原子家族，根据待办事项的 id 创建一个原子
  const [completed, setCompleted] = useAtom(todoCompletedAtomFamily(id));

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      Task {id} {completed ? "(completed)" : ""}
    </li>
  );
};

// 待办事项列表的组件
const TodoList = () => {
  const todoIds = [1, 2, 3]; // 假设这是待办事项的 IDs

  return (
    <ul>
      {todoIds.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </ul>
  );
};

export default TodoList;
```

在上述代码中：

1. 使用 `atomFamily` 创建了一个叫做 `todoCompletedAtomFamily` 的原子家族。该家族接受一个 ID 并返回一个原子，该原子的初始值为 `false`。
2. `TodoItem` 组件接受一个 `id` 属性，使用 `todoCompletedAtomFamily(id)` 根据这个 ID 创建一个原子，然后使用 `useAtom` 钩子读取和更新这个原子的状态。这允许每个待办事项有自己的完成状态。
3. `TodoList` 组件渲染了一个待办事项的 ID 列表，并为每个 ID 创建一个 `TodoItem` 组件。

使用原子家族可以避免在组件外部手动创建大量相似的原子，同时也保持了状态的封装和组件的可重用性。原子家族使得根据参数（在本例中为待办事项的 ID）动态创建原子变得非常简单。

### 7.5 Reducer

Jotai 提供了一个实用的 `atomWithReducer` 函数，它允许你以类似 Redux 中使用 reducer 的方式来管理原子状态。这种方法结合了 Jotai 的原子概念和 Redux 的 reducer 模式，让你能够用一个函数来处理多种行为，以及让状态更新的逻辑更加集中和清晰。

以下是如何使用 `atomWithReducer` 的示例：

```jsx
import { atomWithReducer } from "jotai/utils";
import { useAtom } from "jotai";
import React from "react";

// 定义 action 类型
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// 初始状态
const initialState = { count: 0 };

// 定义 reducer 函数
const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case RESET:
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// 使用 `atomWithReducer` 创建一个原子，传入初始状态和 reducer 函数
const counterAtom = atomWithReducer(initialState, counterReducer);

// React 组件
const Counter = () => {
  // 使用 `useAtom` 钩子获取状态和 dispatch 函数
  const [state, dispatch] = useAtom(counterAtom);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: RESET })}>Reset</button>
    </div>
  );
};

export default Counter;
```

在上述代码中：

1. 定义了一些 action 类型常量（`INCREMENT`、`DECREMENT`、`RESET`）。
2. 定义了 `initialState` 作为计数器的初始状态。
3. 定义了一个 `counterReducer` 函数，它根据 action 的类型来更新状态。
4. 使用 `atomWithReducer` 创建了 `counterAtom`，它接收初始状态和 reducer 函数。
5. 在 `Counter` 组件中，使用 `useAtom` 钩子读取状态和派发 action，有三个按钮分别对应不同的 action。

通过 `atomWithReducer`，可以将状态更新逻辑封装在一个 reducer 函数中，使得组件代码更加简洁，并且易于理解和维护。这种模式对于习惯使用 Redux 的开发者来说会感到相当熟悉。

### 7.6 选择特定部分

`selectAtom` 是 Jotai 的一个实用函数，允许你根据一个原子（atom）的值选择性地创建一个派生原子（derived atom）。这个派生原子只会在选择的部分状态发生变化时通知组件重新渲染，这有助于优化性能。

以下是 `selectAtom` 的一个示例，展示了如何从一个原子中选择一部分状态：

```jsx
import { atom, useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import React from "react";

// 创建一个原子，其中包含一个对象作为状态
const userAtom = atom({
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
});

// 使用 selectAtom 选择 userAtom 中的 'age' 属性
const userAgeAtom = selectAtom(userAtom, (state) => state.age);

// React 组件，使用上面定义的 userAgeAtom 来显示用户的年龄
const UserAge = () => {
  // 使用 useAtom 钩子来读取用户年龄
  const [age] = useAtom(userAgeAtom);

  return <p>User's age: {age}</p>;
};

// 主组件，展示用户的完整信息
const UserProfile = () => {
  // 使用 useAtom 钩子来读取完整的用户状态
  const [user] = useAtom(userAtom);

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* 使用 UserAge 组件来展示年龄 */}
      <UserAge />
    </div>
  );
};

export default UserProfile;
```

在上述代码中：

1. 创建一个 `userAtom`，它包含了一个包含用户信息的对象。
2. 使用 `selectAtom` 创建了一个派生原子 `userAgeAtom`，它只关心 `userAtom` 中的 `age` 属性。
3. `UserAge` 组件使用 `userAgeAtom` 来显示用户的年龄。当 `userAtom` 中的 `age` 发生变化时，`UserAge` 组件将重新渲染。
4. `UserProfile` 组件使用 `userAtom` 来显示用户的完整信息。该组件会在 `userAtom` 的任何属性发生变化时重新渲染。

使用 `selectAtom` 可以减少不必要的组件渲染，因为只有选择的状态部分发生变化时，使用了相应派生原子的组件才会重新渲染。这可以提高性能，特别是在有很多派生状态或组件的大型应用中。

注意此种情况下，父组件重新渲染，依然会导致子组件重新渲染（vDOM），需要包装 `memo`：

```js
const UserAge = React.memo(() => {
  // 使用 useAtom 钩子来读取用户年龄
  const [age] = useAtom(userAgeAtom);

  return <p>User's age: {age}</p>;
});
```

### 7.7 拆分多个单独原子

`splitAtom` 是 Jotai 库中的一个实用工具，它允许你将一个包含多个值的原子拆分为多个单独的原子。这在处理像数组这样的集合时特别有用，因为你可以获取和更新数组中的单个元素而不是整个数组。

下面是如何使用 `splitAtom` 的一个示例：

```jsx
import { atom, useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import React from "react";

// 创建一个原子，它的值是一个对象数组
const itemsAtom = atom([
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
]);

// 使用 splitAtom 将 itemsAtom 拆分为独立的原子数组
const itemAtomsAtom = splitAtom(itemsAtom);

// Item 组件，用于显示和更改单个项目
const Item = ({ itemAtom }) => {
  const [item, setItem] = useAtom(itemAtom);

  const handleChange = (event) => {
    // 更新当前项目的文本
    setItem({ ...item, text: event.target.value });
  };

  return (
    <div>
      <input value={item.text} onChange={handleChange} />
    </div>
  );
};

// ItemsList 组件，用于渲染项目列表
const ItemsList = () => {
  // useAtom 用于读取拆分后的原子数组
  const [itemAtoms] = useAtom(itemAtomsAtom);

  return (
    <div>
      {itemAtoms.map((itemAtom, index) => (
        <Item key={index} itemAtom={itemAtom} />
      ))}
    </div>
  );
};

export default ItemsList;
```

在上述代码中：

1. 我们首先创建了一个 `itemsAtom`，它包含了一个对象数组作为其值。
2. 然后，我们使用 `splitAtom` 将这个原子拆分为独立的原子数组 `itemAtomsAtom`。
3. `Item` 组件通过 `itemAtom` 属性接收一个原子，并使用 `useAtom` 钩子来读取和更新该原子的值。
4. 最后，`ItemsList` 组件使用 `itemAtomsAtom` 来渲染一个项目列表。它通过 `useAtom` 钩子获取拆分后的原子数组，并为每个项目渲染一个 `Item` 组件。

`splitAtom` 的优势在于，你可以独立地更新数组中的每个项目，而不需要处理整个数组。这可以优化性能，尤其是在处理大型数组时，因为它减少了需要重新渲染的组件数量。

## 8. Jotai VS Zustand

`zustand`和`jotai`都是 React 生态系统中的状态管理库，它们提供了不同于传统的 Redux 或者 Context API 的解决方案。尽管它们在表层上可能看起来很相似，但是它们的设计理念、API 以及使用场景有着一些区别。理解这些差异将有助于您根据项目需求做出更合适的选择。

**zustand**：

- Zustand 是一个非常轻量级的状态管理库，它通过一个简单直观的 API 提供了创建全局状态的能力。
- 它鼓励可变的更新方式，这意味着你可以直接修改状态，而不需要像 Redux 那样返回一个新的状态对象。
- Zustand 的状态存储没有限制在特定的数据结构上，你可以随意定义你的状态结构。
- 它有着很好的性能，因为它只会在相关组件上触发重渲染。
- 使用 zustand 创建的状态是全局单一的，这对于大型应用来说可能更有利。

**jotai**：

- Jotai 专注于原子化的状态管理，它的设计理念是将状态拆分成最小的、可重用的部分，称为"原子"。
- Jotai 的原子是不可变的，并且每个原子都是独立的状态片段。
- 它更倾向于函数式编程风格，每个状态更新都是通过创建新的状态来实现的。
- Jotai 支持基于原子的依赖管理，这意味着你可以轻松地组合和派生状态。
- Jotai 通过原子级的重渲染来优化性能，这使它在处理复杂依赖关系时性能更佳。

### 8.1 Context 关系

`zustand`和`jotai`都使用 React Context 来提供状态管理的能力，但它们的实现细节和上下文管理方式有所不同。

**zustand**:

- Zustand 并不直接依赖于 React Context API。它使用了一个简化的全局存储概念，并通过 React hooks（如`useStore`）来让组件订阅状态的变化。
- 在 zustand 中，你创建一个全局的 store，组件通过自定义的 hook 直接与这个 store 进行交互，而不是每次都通过 Context API。
- 它的订阅机制基于引用的订阅，不同于传统的通过 Context 提供的状态。当状态更新时，只有订阅了该部分状态的组件会被重新渲染。

**jotai**:

- Jotai 更直接地使用了 React Context API。当你创建一个原子（atom）时，Jotai 在内部使用 Context 来确保状态的正确传递和订阅。
- Jotai 允许你在组件树的任何地方使用原子，并且可以通过`<Provider>`组件包装分组，这有助于控制状态的范围和隔离，可以提供多重 Context 实例。
- Jotai 的状态更新和订阅也是基于原子级别的，这意味着只有使用了特定原子的组件才会在该原子更新时重新渲染。

虽然两者都使用了 React Context，但是 zustand 的状态管理更偏向于一个全局的单一真相源（single source of truth），而 jotai 则提供了更细粒度的状态管理和更深层次的 Context API 集成。

在实际应用中，即使它们都用 Context 来传递状态，但因为它们的订阅和更新机制是基于订阅的部分状态或原子，因此不太可能出现整个应用状态被单一的 Context 污染的情况。组件只会订阅它们所依赖的那部分状态或原子，并且在这些状态或原子发生变化时才会触发重渲染。

因此，当你使用 zustand 或 jotai 时，你并不需要担心由于它们挂载在同一个 React Context 中会导致状态污染问题。它们都提供了有效的机制来隔离和管理状态更新，从而确保了性能和组件的可维护性。

如何选择：

1. **项目规模**：如果项目较大，可能需要更严格的状态管理模式，那么 jotai 的原子化管理可能会更有优势。
2. **状态更新风格**：如果你喜欢函数式编程和不可变数据流，可能会更倾向于使用 jotai。如果你喜欢直接修改状态，并且追求编码的简洁性，zustand 可能是一个更好的选择。
3. **状态组织**：考虑你如何组织状态，如果你希望将状态分散在许多独立的片段中，并且能够轻松地在它们之间创建关系，那么 jotai 可能更合适。如果你想要一个全局的状态树，那么 zustand 可能是更好的选择。
4. **性能需求**：两者都具有优化性能的设计，但是它们的优化策略有所不同。根据应用的特定需求，你可能需要评估它们在实际应用中的性能表现。
5. **组件开发**：两者都不建议用。

总的来说，选择哪一个库，很大程度上取决于你个人的偏好、项目需求以及你希望如何组织你的状态逻辑。实践中，你可能需要尝试这两种库，来感受它们在实际项目中的使用体验。
