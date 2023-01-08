## 1. 前言

React 的属性透传场景 虽然有很多方式可以实现，但能做到代码写的少、re-render 轻松处理的方式并不多。

而状态管理工具 [Jotai](https://github.com/pmndrs/jotai) 却可以很好的解决这些问题。

![image](https://user-images.githubusercontent.com/11046969/211185614-f111ad63-f26d-41c9-b371-93c295543372.png)



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
          <Context6.Provider value={value6}>
            {children}
          </Context6.Provider>
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
  return <ThemedButton theme={theme} />
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
  }, [theme])
}
```

但这些方法，都会在使用时增加一些额外的工作量，变得繁琐和易出错。


## 3. 状态管理库 Jotai 的优势

刚好 Jotai 的其中一部分优势就能解决 React Context 中的这些问题。

Jotai 可以完美的解决嵌套地狱的问题，及精准 re-render 的问题。

简单写了一个例子，来看一下 Jotai re-render：[[codesandbox] jotai 配合 React.memo re-render 测试](https://codesandbox.io/s/jotai-accurate-render-react-memo-c54ot5)。

例子中 Jotai 的 Atom 及组件消费关系如下：

![image](https://user-images.githubusercontent.com/11046969/211185624-9a2f74a2-b6bf-44ef-a371-28f4da7d09fb.png)


## 4. Jotai 核心

Jotai 的学习成本很低，源码也比较易读。核心就三个 API：

- atom：创建原子相关方法。
- useAtom：视图关联原子相关方法。
- Provider：隔离和存储原子实例相关组件。

只需要熟悉这三个 API 的使用就可以轻松上手。

### 4.1 atom

atom 创建的其实是一份原子描述，并不会进行相关的存储。

可以创建原始原子及派生原子，用法如下：

```js
// primitive atom
function atom<Value>(initialValue: Value): PrimitiveAtom<Value>

// read-only atom
function atom<Value>(read: (get: Getter) => Value | Promise<Value>): Atom<Value>

// writable derived atom
function atom<Value, Update>(
  read: (get: Getter) => Value | Promise<Value>,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>

// write-only derived atom
function atom<Value, Update>(
  read: Value,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>

  
const primitiveAtom = atom(initialValue)
const derivedAtomWithRead = atom(read)
const derivedAtomWithReadWrite = atom(read, write)
const derivedAtomWithWriteOnly = atom(null, write)
```

### 4.2 useAtom

用来将 atom 关联到视图中，形成响应关系。（atom 必须保持引用不变，否则会无限循环）

基本用法：

```js
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
const ScopeContainerContext = getScopeContext(scope)

return createElement(
  ScopeContainerContext.Provider,
  {
    // 创建 atoms 的 weakMap 等存储，挂载在 Provider 中
    value: scopeContainerRef.current,
  },
  children
)
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
const scopeContainerRef = useRef<ScopeContainer>()
// 从此处可以看到，Provider 仅作为隔离数据使用，后期不会发生任何 value 层面的变化，
// 所有的触发，都由 内部的 某个 atom 的 listeners 去调用渲染
if (!scopeContainerRef.current) {
  // lazy initialization
  const scopeContainer = createScopeContainer(
    // initialValues 仅作用一次，后期的任何变化，将不会有任何效果
    initialValues,
    unstable_createStore
  )
  if (unstable_enableVersionedWrite) {
    let retrying = 0
    scopeContainer.w = (write) => {
      setVersion((parentVersion) => {
        const nextVersion = retrying ? parentVersion : { p: parentVersion }
        write(nextVersion)
        return nextVersion
      })
    }
    scopeContainer.v = version
    scopeContainer.r = (fn) => {
      ++retrying
      fn()
      --retrying
    }
  }
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

```js
export function atom<Value, Args extends unknown[], Result>(
  read: Value | Read<Value, SetAtom<Args, Result>>,
  write?: Write<Args, Result>
) {
  const key = `atom${++keyCount}`
  const config = {
    toString: () => key,
  } as WritableAtom<Value, Args, Result> & { init?: Value }
  if (typeof read === 'function') {
    config.read = read as Read<Value, SetAtom<Args, Result>>
  } else {
    config.init = read
    config.read = (get) => get(config)
    config.write = ((get: Getter, set: Setter, arg: SetStateAction<Value>) =>
      set(
        config as unknown as PrimitiveAtom<Value>,
        typeof arg === 'function'
          ? (arg as (prev: Value) => Value)(get(config))
          : arg
      )) as unknown as Write<Args, Result>
  }
  if (write) {
    config.write = write
  }
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
const [[version, valueFromReducer, atomFromReducer], rerenderIfChanged] =
  useReducer<
    Reducer<
      readonly [VersionObject | undefined, Awaited<Value>, Atom<Value>],
      VersionObject | undefined
    >,
    VersionObject | undefined
  >(
    (prev, nextVersion) => {
      const nextValue = getAtomValue(nextVersion)
      if (Object.is(prev[1], nextValue) && prev[2] === atom) {
        return prev // bail out
      }
      return [nextVersion, nextValue, atom]
    },
    versionFromProvider,
    (initialVersion) => {
      const initialValue = getAtomValue(initialVersion)
      return [initialVersion, initialValue, atom]
    }
  )
```

基于useAtom 创建的值，由 useReducer 实现，可以有效优化部分 re-render 的问题。

```js
useEffect(() => {
  const { v: versionFromProvider } = scopeContainer
  if (versionFromProvider) {
    store[COMMIT_ATOM](atom, versionFromProvider)
  }
  // Call `rerenderIfChanged` whenever this atom is invalidated. Note
  // that derived atoms may not be recomputed yet.
  const unsubscribe = store[SUBSCRIBE_ATOM](
    atom,
    rerenderIfChanged,
    versionFromProvider
  )
  rerenderIfChanged(versionFromProvider)
  return unsubscribe
}, [store, atom, scopeContainer])
```

```js
const subscribeAtom = (
  atom: AnyAtom,
  callback: (version?: VersionObject) => void,
  version?: VersionObject
) => {
  const mounted = addAtom(version, atom)
  const listeners = mounted.l
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
    // TODO should version be `undefined` for delAtom?
    delAtom(version, atom)
  }
}
```

useRender 的 dispatch 会添加到 atom 的订阅列表中，当 atom 发生变化时，会执行订阅列表中的 dispatch 实现响应。

![image](https://user-images.githubusercontent.com/11046969/211185633-cba8ed31-942b-48ee-bc4c-47ccb6d978f5.png)


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
