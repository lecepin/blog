## 1. react 和 vue 对比，优劣势是什么？你会如何选择

React 和 Vue 都是目前非常受欢迎的前端 JavaScript 框架，各有其优势和劣势，选择哪一个通常取决于项目需求、团队熟悉度以及个人偏好。以下是 React 和 Vue 的一些对比点：

**React:**

优势:

- **更大的生态系统和社区**：React 有更多的用户和贡献者，以及更多的第三方库和工具。
- **更灵活的架构**：React 提供了灵活的方式来构建应用，不过这也意味着需要开发者做出更多架构决策。
- **Facebook 背景**：由 Facebook 开发和维护，确保了其长期的稳定性和更新。
- **广泛的就业机会**：由于其受欢迎程度高，掌握 React 技能的开发者通常有更多的就业选择。

劣势:

- **学习曲线**：由于需要了解更多的概念（如 JSX、Hooks 等），React 的学习曲线可能比 Vue 稍陡峭。
- **更多的样板代码**：尤其在使用类组件的时候，React 可能需要更多的样板代码。

**Vue:**

优势:

- **简洁的 API 和设计**：Vue 的设计更简单直观，易于上手，特别是对于初学者。
- **更少的样板代码**：Vue 通过其模板系统和简易的双向数据绑定减少了样板代码。
- **良好的文档**：Vue 的官方文档在社区中被广泛认为是非常清晰和全面的，这有助于新手学习。
- **渐进式框架**：Vue 被设计成可以逐步采用，你可以只用它的一部分功能，然后逐渐深入。

劣势:

- **社区和生态系统较小**：尽管 Vue 的社区正在快速增长，但相比 React，它还是较小。
- **中国以外的市场认可度**：虽然 Vue 在中国非常流行，但在北美等市场，React 和 Angular 的受欢迎程度更高。

在选择 React 还是 Vue 时，我会考虑以下因素：

1. **项目需求**：如果项目需要大量的灵活性和复杂度，或者与现有的 React 生态系统集成，我可能会选择 React。如果项目需要快速原型开发和较低的初始学习门槛，Vue 可能是更好的选择。

2. **团队经验**：选择团队成员更熟悉的框架通常会提高开发效率和减少成本。

3. **社区和生态**：根据项目中可能会用到的库和工具，社区和生态系统的大小和激活度可能会影响我的选择。

4. **长期维护和更新**：考虑到长期的项目维护和更新，选择一个有良好支持和更新记录的框架是重要的。

5. **性能需求**：虽然两者在性能上都很优秀，根据具体的性能需求和优化可能性，我可能会对这两个框架进行更深入的比较。

总的来说，没有绝对的“最好”，只有最适合当前情境的选择。

## 2. react hooks 诞生的原因是什么？为了解决什么问题

React Hooks 是在 React 16.8 版本中引入的一个重要特性，它们的诞生主要是为了解决以下几个问题：

1. **复杂组件逻辑难以重用**：在 Hooks 之前，如果你想在多个组件之间重用一些状态逻辑，你可能需要用到高阶组件（HOCs）或者渲染属性（render props）等模式。这些模式可以工作，但它们往往使得组件层次深且难以理解，也增加了代码的复杂度。

2. **难以理解的类组件**：类组件让许多开发者感到困惑，特别是对于初学者来说，需要理解 JavaScript 中的`this`关键字的工作方式，以及如何正确地绑定事件处理器方法。此外，类组件的生命周期方法经常让人头疼，尤其是当需要在不同生命周期方法中进行相同逻辑处理时。

3. **副作用代码分散**：在类组件中，相关的业务逻辑代码往往被分散在多个生命周期方法中（比如`componentDidMount`和`componentDidUpdate`中都需要进行数据的加载操作），这使得逻辑难以跟踪和维护。

4. **复杂的组件状态逻辑**：类组件中状态逻辑经常和 UI 逻辑紧密耦合在一起，这使得状态逻辑难以测试和重用。

React Hooks 的引入旨在解决这些问题，提供了一种更简单、更直观的方式来使用 React 的特性，而不需要编写类。Hooks 允许你在不编写类的情况下使用状态和其他的 React 特性。主要的 Hooks 有：

- `useState`: 允许函数组件使用状态。
- `useEffect`: 允许函数组件执行副作用操作（如数据获取、订阅更新等）。
- `useContext`: 允许函数组件访问 React 的上下文系统。
- `useReducer`: 提供更复杂的状态逻辑管理，与 Redux 类似。
- `useCallback` 和 `useMemo`: 用于优化应用性能，避免不必要的渲染。

Hooks 的设计使得状态和相关逻辑可以更容易地打包在一起，从而更易于重用和测试，并且可以在不改变组件层次结构的情况下共享。这些特性使得开发者可以写出更简洁、更易于维护的代码。

## 3. hooks 带来了哪些新的问题？编写时如何注意

虽然 React Hooks 提供了许多优势，它们的使用也引入了一些新的问题和挑战。这里是一些常见的问题，以及如何在编写时注意这些问题：

1. **遵守 Hooks 规则**：

   - Hooks 必须在函数组件的最顶层调用，不得在循环、条件判断或嵌套函数中调用，以确保 Hooks 在每次组件渲染时都按相同的顺序被调用。
   - 只能在 React 的函数组件或自定义 Hooks 中调用 Hooks。

   为了避免违反这些规则，可以使用 ESLint 插件`eslint-plugin-react-hooks`来检查代码。

2. **过度使用 useEffect**：

   - `useEffect`可以带来副作用管理上的便利，但过度使用它可能导致组件逻辑变得混乱。应当根据副作用的性质（比如 DOM 修改、数据订阅等）合理安排`useEffect`的使用。

3. **复杂的依赖关系**：

   - `useEffect`和一些其他的 Hooks 允许你声明依赖项，以决定何时重新运行。不正确地声明依赖项可能导致无限循环或者过期的闭包。
   - 确保列出所有使用到的外部变量作为依赖项，以此来避免这些问题。

4. **性能问题**：

   - `useState`和`useEffect`在默认情况下在每次渲染后都会执行，这可能导致性能问题，特别是在渲染大型列表或复杂交互时。
   - 使用`useMemo`和`useCallback`来优化渲染性能，避免不必要的计算和渲染。

5. **自定义 Hooks 的管理**：

   - 自定义 Hooks 是一种强大的抽象方式，它可以让你提取组件逻辑。但如果没有合理的组织策略，可能导致复用代码变得困难。
   - 合理组织和命名自定义 Hooks，保持它们的纯净和独立性，以便于管理和复用。

6. **测试挑战**：
   - 使用 Hooks 的组件可能需要不同的测试策略，因为与类组件相比，它们可能没有实例方法也没有易于访问的内部状态。
   - 使用适合 Hooks 的测试库（如 React Testing Library），它鼓励更多的行为驱动测试，而不是依赖组件内部实现细节。

通过理解 Hooks 的工作原理并遵循最佳实践，可以最大限度地减少这些问题。始终关注 React 的官方文档和社区，以获取关于 Hooks 使用的最新指南和技巧。

## 4. Class 组件和 Function 组件的优劣对比

React 中的类组件和函数组件各有优缺点，随着 React 的发展，这些差异也在不断演变。以下是它们的一些对比：

**类组件**:

优势:

1. **状态管理**: 在引入 Hook 之前，类组件是唯一可以持有状态(state)的组件。
2. **生命周期方法**: 提供丰富的生命周期方法（如`componentDidMount`, `componentDidUpdate`等），允许执行复杂的操作。
3. **可以使用`this`关键字**: 访问或修改组件状态和属性。

劣势:

1. **更复杂的语法**: 类组件需要理解 JavaScript 中的`this`以及如何正确绑定事件处理函数。
2. **更大的尺寸**: 类组件通常比函数组件大小要大，可能导致更大的包体积。
3. **性能开销**: 类组件可能有轻微的性能开销，因为它们需要实例化。

**函数组件**:

优势:

1. **简洁性**: 语法更简洁，没有`this`的复杂性，容易编写和理解。
2. **轻量级**: 通常体积比类组件小，意味着更快的加载和解析。
3. **函数式编程**: 更容易使用函数式编程范式，代码可能更清晰和易于测试。
4. **Hooks**: 随着 React Hooks 的引入，函数组件几乎可以做到类组件的所有事情，并且能够更好地利用 React 的特性，如状态管理和副作用。

劣势:

1. **生命周期管理**: 在 Hooks 出现之前，函数组件没有直接对应于类组件生命周期方法的概念。
2. **学习成本**: 对于习惯于使用类的开发者来说，切换到函数组件加上 Hooks 的模式可能需要一段时间来适应。

在性能方面，函数组件通常被视为略优于类组件，尤其是在 React Hooks 引入后。以下是一些性能方面的考虑：

1. **组件尺寸与加载时间**：  
   函数组件通常更加轻量，因为它们不需要额外的方法和生命周期的处理，这可以减少文件的大小，使得加载时间更短。

2. **实例化开销**：  
   类组件需要通过`new`关键字来实例化，这个过程略微增加了运行时开销。函数组件避免了这种实例化开销，因为它们只是函数的调用。

3. **内存占用**：  
   函数组件通常会占用较少的内存，因为它们不需要额外的内存来存储类的实例。

4. **渲染性能**：  
   在实际的渲染性能方面，两者之间的差异通常可以忽略不计。React 团队努力确保性能差异最小化，因此从性能角度来说，选择哪一种类型的组件主要应该基于其他因素，如开发体验和代码的可维护性。

5. **优化机制**：  
   React 提供了一些优化机制，如`React.memo`和`shouldComponentUpdate`生命周期方法，它们都可以帮助避免不必要的渲染。对于函数组件，`React.memo`可以帮助你防止在 props 没有改变的情况下重新渲染。类似地，类组件可以通过实现`shouldComponentUpdate`方法来避免不必要的渲染。

6. **Hooks 的使用**：  
   虽然 Hooks 使函数组件变得更加强大，但是如果使用不当，也可能对性能产生负面影响。例如，如果不正确使用`useEffect`的依赖数组，可能导致额外的渲染或副作用执行。

总的来说，在现代 React 应用程序中，函数组件与类组件在性能上的差异非常微小，很难成为选择组件类型的决定性因素。对于大多数应用来说，其他因素，如开发体验、代码的清晰性和可维护性，以及与团队现有代码库的一致性，可能是更重要的考虑因素。选择函数组件还是类组件，最好根据团队习惯、项目需求和个人偏好来决定。

随着 React Hooks 的引入，函数组件的能力得到了极大的增强，使得之前类组件独有的功能（如状态管理和生命周期访问）现在也能在函数组件中实现。这导致了许多开发者和团队逐渐转向使用函数组件作为首选，尤其是对于新项目和新组件。

选择类组件还是函数组件通常取决于个人偏好、项目需求和团队规范。随着时间的推移和 React 的发展，函数组件加 Hooks 的模式正在成为社区中的主流写法。

## 5. 说一下 hooks 的闭包问题

在使用 React Hooks 时，尤其是`useState`和`useEffect`，我们经常会遇到闭包相关的问题。闭包问题通常发生在一个函数组件内部，当这个函数组件利用了 hooks 去捕获了某个变量的状态，并且在异步操作（比如 setTimeout、Promise 等）或者在回调函数中引用了这个状态时。

### 问题描述：

Hooks 中的闭包问题通常是由于函数组件的局部变量在创建时捕获了特定的作用域状态，而当这个函数组件重新渲染时，这些捕获的状态可能已经过时。这就导致了函数组件内部的事件处理器或者效果（effects）引用的状态不是最新的状态。

例如，假设你有一个定时器，它引用了一个通过`useState`创建的状态变量：

```javascript
function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 这里的count值是这个闭包创建时的值，而不是最新的count值
      console.log(count);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // 空依赖数组意味着effect只会在挂载时运行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

上面的代码中，`setInterval`的回调函数引用的`count`值是`useEffect`运行时的`count`的值，而当你点击按钮更新`count`时，定时器中的闭包并不会获取到更新后的`count`值。

### 解决方案：

解决 Hooks 闭包问题的常用方法包括：

1. **使用最新的状态**
   - 通过更新状态的函数形式来确保总是使用最新的状态：

```javascript
setCount((currentCount) => currentCount + 1);
```

2. **使用引用（`useRef`）**
   - 使用`useRef`来保持对最新值的引用：

```javascript
const countRef = useRef(count);
countRef.current = count;

useEffect(() => {
  const intervalId = setInterval(() => {
    // 使用countRef.current总是获取到最新的count值
    console.log(countRef.current);
  }, 1000);

  return () => clearInterval(intervalId);
}, []);
```

3. **在`useEffect`中包含所有依赖项**
   - 通过在`useEffect`的依赖数组中包含所有相关的依赖项，确保在依赖项更新时重新运行 effect：

```javascript
useEffect(() => {
  // ...
}, [count]); // count包含在依赖数组中，这样每次count更新时都会重新设置定时器
```

4. **使用函数式更新**
   - 对于设置状态的函数，传递一个函数而不是具体的值，这个函数接受前一个状态值作为参数，返回新的状态值。

```javascript
setCount((prevCount) => prevCount + 1);
```

理解和利用闭包是高级 JavaScript 和 React 开发的关键。通过合适的解决方案，可以确保我们的 Hooks 正确地引用和更新状态，避免产生难以追踪的 bug。

## 6. function 组件每次渲染都会生新执行，useState/useRef 如何保存值不被清除

在 React 中，`useState`和`useRef`是专门设计用来在函数组件多次渲染之间保持状态和引用的 Hooks。它们之所以能够保持值不被清除，是因为 React 底层的工作机制保证了这一点：

### 1. `useState`

`useState` Hook 让函数组件能够在渲染之间保持并更新状态。它接收初始状态作为参数，并返回一个数组，其中包含当前状态值和一个允许你更新该状态的函数。当你使用设置状态的函数更新状态时，React 会重新渲染组件，并保持该状态在重新渲染之间的连续性。

React 内部维护了一个状态数组，对于每个组件实例，这个数组中的每个状态都有固定的位置。当组件重新渲染时，React 使用这个数组中的值来确保状态在渲染之间保持不变。因为 React 知道每次渲染时状态的正确顺序，所以它能够准确地分配和更新这些状态。

```javascript
const [count, setCount] = useState(0); // 始终保持对同一状态的引用
```

### 2. `useRef`

`useRef` Hook 可以创建一个可变的引用对象，该对象在组件的整个生命周期内保持不变。`useRef`返回的对象包含一个名为`current`的属性，可以存储任何值，而且这个值在组件的每次渲染之间都会保持不变。

与`useState`不同，`useRef`不会触发组件的重新渲染，而是提供了一个在渲染之间能够持久化的容器。这对于存储任何可变值都是有用的，例如保存对 DOM 节点的引用或存储上一次渲染时的数据。

```javascript
const myRef = useRef(initialValue); // myRef.current将在渲染间保持不变
```

当组件因为状态更新或父组件的重新渲染而再次执行时，React 保证`useState`和`useRef`返回的状态和引用对象是稳定且不变的。因此，即便组件函数本身被重新执行，使用这些 Hooks 存储的值也不会被重置或清除。这是 React 的闭包机制和 Hooks 自身的实现细节相结合的结果，使得函数组件能够在不同渲染间保持状态的连续性和内部一致性。

React 使用一种内部数据结构（称为“Fiber”）来跟踪组件和它们的状态。当你使用`useState`和`useRef`这样的 Hooks 时，React 将这些状态和引用附加到当前组件的 Fiber 节点上。这些值会在组件的多次重新渲染之间保持稳定，即使是函数组件本身在每次渲染时都会重新执行。

### useState

使用`useState`创建的状态被 React 跟踪在一个内部的状态列表中。首次渲染时，React 会将初始状态值存储在 Fiber 节点的内存结构中。在后续渲染中，React 使用存储在 Fiber 节点中的状态，而不是重新初始化状态。这就是为什么状态值在重渲染后仍然保持一致的原因。

当你调用状态更新函数（比如`setCount`）时，React 会计划一个组件的更新，这将导致组件被重新渲染。但在执行更新时，React 不会重置状态，而是从 Fiber 节点中检索最新的状态值，并将其提供给组件。

状态更新函数知道具体要更新哪个状态，因为在 React 的 Fiber 架构中，每次调用`useState`都会有一个与之对应的 Hook 实例，其中包含了状态的更新逻辑和当前状态值。

### useRef

`useRef`的工作方式类似于`useState`，但它不会触发组件的重新渲染。`useRef`返回一个普通的 JavaScript 对象，这个对象有一个`current`属性，可以存储任何值。React 会将这个引用对象附加到组件的 Fiber 节点上，因此在整个组件生命周期内，无论组件渲染多少次，`useRef`返回的对象都是同一个。

React 确保在每次渲染时，都能够提供相同的引用对象给组件。由于`useRef`不触发重新渲染，而且返回的对象在组件的所有渲染中都是稳定的，所以你可以安全地在渲染之间保持和更新引用值。

### 总结

总的来说，React 的这些 Hooks 的工作原理依赖于 React 的 Fiber 架构，该架构允许 React 在内部追踪组件状态和引用。每当组件渲染时，它都会以正确的顺序和位置检索状态和引用，确保它们在多次渲染之间保持不变。这个设计使得函数组件可以在不失去其函数式和声明式特性的同时，使状态和引用在组件的整个生命周期中保持持久化。

## 7. 什么是 Fiber?诞生背景是什么

**Fiber** 是 React 16 中引入的新的协调引擎（reconciliation algorithm）或渲染架构，它主要的目标是提高 React 应用的性能，尤其是动画、布局和手势等场景的性能。Fiber 能够为 React 的渲染和更新提供更好的可预测性，并能够利用分块更新（chunking）、暂停、中止或重用工作的能力，以及为不同类型的更新分配优先级。

### 背景

在 Fiber 之前，React 使用的协调算法有一个主要的限制，即一旦开始渲染，就必须同步完成整个组件树的渲染。这意味着 React 无法中断工作以确保主线程的响应性。对于大型应用或复杂界面更新，这可能导致主线程阻塞，从而影响到动画的流畅度、输入响应等。

为了解决这些问题，React 团队重新设计了协调算法，引入了 Fiber。以下是一些 Fiber 的关键特性：

### 关键特性

1. **增量渲染（Incremental Rendering）**：Fiber 能够将渲染工作分割成多个小任务，而不是像以前那样一次性处理整个组件树。这样 React 可以根据需要在多个帧上分配这些任务。

2. **任务可中断**：Fiber 架构允许 React 暂停正在进行的工作，先执行更高优先级的工作，然后再回来完成之前的工作。这使得 React 可以保持应用的响应性，即使在大量更新发生时也是如此。

3. **错误处理**：Fiber 引入了一种新的错误边界（error boundaries）概念，这让组件能够捕获子组件树中的 JavaScript 错误，记录这些错误，并显示备用 UI。

4. **更好的优先级管理**：Fiber 允许 React 根据任务的重要性给它们分配不同的优先级。例如，动画更新可以被赋予高优先级，而数据抓取则可以是低优先级。

5. **新的生命周期方法**：为了适应 Fiber 架构，React 引入了新的生命周期方法（如`getDerivedStateFromProps`），这些方法适用于新的渲染策略。

### 实现细节

Fiber 实际上是对 React 虚拟 DOM 的每个节点的重新实现。每个 Fiber 节点代表一个工作单元，它对应一个 React 元素、组件实例或 DOM 节点。这个新的结构是个单链表的形式，允许 React 在执行中逐节点遍历和操作。

每个 Fiber 节点都有自己的内部状态和对其他 Fiber 节点的引用（例如，对子节点、父节点、兄弟节点的引用），以及对实际 DOM 节点的引用（如果有的话）。React 可以独立地更新这些 Fiber 节点，这是 Fiber 架构的核心优势，它允许任务分割和中断工作。

总之，Fiber 的引入使得 React 更加强大和高效，特别是在处理大规模应用和复杂更新时。它为未来的 React 特性和优化提供了基础，包括异步渲染和并发模式（Concurrent Mode），这些都是 React 应用未来性能提升的关键方面。

## 7. 任务优先级如何处理的？底层模型是什么

React Fiber 的任务优先级处理是通过一个调度器（Scheduler）来实现的，这个调度器负责协调不同优先级的任务。在 React 中，每个更新都有一个与之关联的优先级。React Scheduler 使用这些优先级来决定何时执行哪些更新。

### 优先级级别

React 定义了多个优先级级别，包括（但不限于）：

- **Immediate Priority**：用于不能等待的工作，比如由用户输入或动画触发的更新。
- **User Blocking Priority**：用于可能阻塞用户操作的工作。
- **Normal Priority**：用于正常的数据抓取、DOM 更新等。
- **Low Priority**：用于不急迫的任务，可以推迟的工作，如日志记录。
- **Idle Priority**：用于完全不紧急的任务，只有在主线程空闲时才执行，如离屏渲染。

### 调度模型

React Scheduler 的模型基于以下概念：

1. **requestIdleCallback**：这是浏览器 API 的一部分，允许开发者安排在主线程空闲时运行的低优先级工作。React Scheduler 使用了类似`requestIdleCallback`的机制，用于在浏览器空闲时执行低优先级工作。

2. **requestAnimationFrame**：这是另一种浏览器 API，常用于在下次重绘前执行动画或视觉更新。React Scheduler 利用它来确保高优先级的更新能够及时执行。

当 React 需要调度一个更新时，它会根据更新的优先级将其排队。Scheduler 将会决定基于优先级和浏览器的当前忙碌程度来执行哪些任务。高优先级的任务（如用户输入响应）会被提前执行，而低优先级的任务可能会延迟，直到浏览器有足够的空闲时间来处理这些任务。

### 中断和恢复

React Fiber 架构允许中断正在进行的工作，以及根据需要恢复这些工作。如果有一个新的高优先级更新发生（如用户点击），React 可以中断正在进行的低优先级渲染任务，优先执行高优先级更新，以确保良好的用户交互体验。

为了管理这些不同的工作单元（Fibers），React 维护了一个工作队列，其中包含了所有已调度且待处理的工作。Scheduler 会根据优先级来处理这个队列中的任务，使用循环来不断检查是否有更高优先级的任务需要插队执行。

### 总结

React Fiber 的任务优先级处理允许 React 应用更高效地管理和更新状态，避免长时间占用主线程，这样就可以保持应用的流畅性和快速响应用户交互。优先级调度是 Fiber 架构的核心特性之一，使得 React 可以在复杂应用中实现更好的性能和用户体验。

## 8. 这种模型下，如何实现任务中断的？用了什么技术

React Fiber 的任务中断是通过 Fiber 架构的工作循环来实现的。Fiber 架构改变了 React 以前的同步渲染模式，引入了一种可以暂停和恢复的异步渲染方式。以下是实现任务中断的关键技术和概念：

### 分包（Chunking）

Fiber 架构把渲染工作拆分成了多个小块（chunks）。每个 Fiber 节点代表了一个工作单元。React 渲染时，会按顺序遍历 Fiber 树中的节点，执行与每个节点相关的工作。

### 任务循环与调度

React 有一个内部调度系统（React Scheduler），负责管理任务的优先级和执行。在任务循环中，React 会根据优先级检查当前是否有更重要的任务需要处理，随时准备暂停当前的工作。

### 时间分片（Time Slicing）

React 使用浏览器的`requestIdleCallback`和`requestAnimationFrame`API 来执行时间分片。使用`requestIdleCallback`可以让 React 在浏览器空闲时执行低优先级的更新，而`requestAnimationFrame`则用于高优先级的更新，如动画。

### 任务中断

在 React 的工作循环中，开发者可以设置一个时间阈值，告诉调度器当前的时间片段是否还有剩余时间。如果当前时间片段已经没有剩余时间，React 可以将控制权交还给浏览器，使浏览器处理如输入、滚动等其他任务。这样的过程称为任务中断。当浏览器处理完其他任务并再次有空闲时，React 可以恢复之前中断的工作。

### 恢复与状态一致性

由于 React 每次处理的都是一个单独的 Fiber 节点，当工作被中断时，React 标记这个 Fiber 节点的状态，并将其保留在内存中。当恢复工作时，React 可以从上次中断的地方继续执行，确保组件状态的一致性。

### 实现细节

React 并没有直接使用`requestIdleCallback`，因为这个 API 的兼容性和稳定性问题。相反，React 实现了自己的任务调度策略，模拟了类似的机制，以控制何时执行、中断以及恢复任务。React 的并发模式（Concurrent Mode）依赖于这种任务调度策略，它使得 React 可以在渲染过程中中断，并根据优先级进行任务管理。

### 总结

通过上述的技术和架构，React 的 Fiber 架构能够在保持 UI 响应的同时，进行复杂的渲染任务。这使得 React 应用即使在繁重的计算和大量的组件更新时，也能保持良好的性能表现。任务中断是实现这一目标的关键技术之一。

## 9. 调度示例代码

React 团队开发了自己的调度器（scheduler）来实现任务的时间分片和中断，以便在不同的浏览器和平台上都能有可预测和一致的行为。这个调度器会模拟`requestIdleCallback`的行为，并加入了一些 React 特定的优化。

React 的调度器使用了一个循环来周期性地检查是否有任务需要执行。这个循环基于`requestAnimationFrame`和`MessageChannel`等 API 来实现，以确保即使在不支持`requestIdleCallback`的环境中也能运行。

以下是一个简化的 JavaScript 示例，演示了 React 可能如何使用`requestAnimationFrame`和`MessageChannel`来实现一个简单的任务调度器。这不是 React 实际的调度器代码，但它捕捉了基本的思想：

```javascript
// 假设的任务队列
let taskQueue = [];

// 调度一个任务
function scheduleTask(task) {
  taskQueue.push(task);
  startTaskLoop();
}

// 使用requestAnimationFrame和MessageChannel模拟实现任务循环
let isTaskLoopRunning = false;
const channel = new MessageChannel();
const { port1, port2 } = channel;

// 监听消息事件来运行任务
port1.onmessage = function () {
  // 检查当前帧是否还有剩余时间
  if (hasIdleTime()) {
    // 如果有剩余时间就执行任务
    performTask();
  } else {
    // 否则延迟到下一帧
    startTaskLoop();
  }
};

// 开始任务循环
function startTaskLoop() {
  if (!isTaskLoopRunning && taskQueue.length > 0) {
    isTaskLoopRunning = true;
    requestAnimationFrame(() => {
      // 发送消息来触发任务运行
      port2.postMessage(null);
    });
  }
}

// 执行任务
function performTask() {
  const task = taskQueue.shift();
  if (task) {
    // 执行任务代码
    task();
  }

  // 如果任务队列不为空，继续任务循环
  isTaskLoopRunning = taskQueue.length > 0;
  if (isTaskLoopRunning) {
    startTaskLoop();
  }
}

// 检查当前帧是否还有剩余时间
function hasIdleTime() {
  // 这里是简化的逻辑
  // 实际React会有更复杂的判断，会考虑执行时间等因素
  return performance.now() % 16 < 10;
}

// 示例任务
function exampleTask() {
  console.log("Task executed at", performance.now());
}

// 调度几个任务
scheduleTask(exampleTask);
scheduleTask(exampleTask);
scheduleTask(exampleTask);
```

在这个示例中，`scheduleTask`函数用来添加任务到队列。`startTaskLoop`函数会设置一个循环，使用`requestAnimationFrame`来确保在每个动画帧开始时检查任务队列。`port1.onmessage`监听器会在每个动画帧内部被调用，来决定是否执行任务或者等待下一帧。

注意，这只是一个非常简化的示例，仅用于阐释概念。React 的实际调度器要复杂得多，并且考虑了更多的性能优化和边缘情况处理。React 官方的 scheduler 包（`@scheduler`）中包含了 React 团队用于任务调度的实现细节。

## 10. 使用 MessageChannel 是为了解决什么问题

`MessageChannel` API 可以创建一个新的消息通道，并通过它的两个`MessagePort`属性发送数据。在 React 的任务调度器中，使用`MessageChannel`主要是为了实现一种可以跨浏览器和环境持续运行的“微任务”调度。这种方式有几个关键优点：

### 1. 控制事件循环

JavaScript 的事件循环机制包括宏任务（macrotask）和微任务（microtask）。使用`MessageChannel`可以在当前调用栈清空后，但在渲染或其他事件处理之前，立即执行任务。这允许 React 更精确地控制何时执行任务。

### 2. 绕过事件循环延迟

在浏览器事件循环中，宏任务（如 `setTimeout` 或 `setInterval`）可能会因为其他宏任务的执行而被延迟执行。使用`MessageChannel`可以确保任务尽可能快地在事件循环的下一个阶段执行，而不受其他宏任务的调度和执行影响。

### 3. 实现任务切片

React 的 Fiber 架构需要能够切片任务，这样就可以在执行长时间的任务时暂停并在稍后继续。`MessageChannel`提供了一种机制，允许 React 在每个任务之间插入暂停点，然后在浏览器的主线程上以微任务的形式继续这些任务。

### 4. 兼容性与一致性

`requestIdleCallback`是控制任务执行的一个选择，但它不是所有浏览器都支持，并且它的调度可能不够一致或可预测。`MessageChannel`相对来说支持得更好，且对任务执行的控制更为一致。

### 5. 高优先级任务调度

使用`MessageChannel`可以使得 React 在处理如输入事件之后尽快调度更新，因为它可以将任务排队为微任务，这些微任务将在当前宏任务结束后尽快执行，但在下一个宏任务开始之前执行。

通过这种方式，React 可以将更新工作划分为小的任务单元，并且在浏览器的主线程上有效地管理这些任务的执行。这种任务调度对于 React 的并发特性来说至关重要，它允许 React 暂停和恢复工作，提供了更平滑的用户体验，特别是在复杂的应用程序中。

## 11. MessageChannel 和 web worker 的区别

`MessageChannel`和`Web Workers`都是现代 Web 平台提供的 API，它们用于不同的场景和目的。让我们来看看它们的主要区别。

### MessageChannel

`MessageChannel` API 允许创建一个新的消息通道，并通过其两个`MessagePort`属性发送数据。这个 API 主要用于在同一页面的不同部分（例如，不同的 iframe 或脚本）之间进行直接通信。

- **用途**：主要用于在相同的全局环境（例如，同一页面中的不同脚本）或者通过 postMessage API 连接的不同全局环境（例如，Worker 或 iframe）之间传递消息。
- **执行上下文**：`MessageChannel` 不提供一个新的执行上下文，它在当前的 JavaScript 环境（通常是主线程）中运行。
- **性能**：它主要用于为不同上下文间的通信提供了一种低开销的方式。

### Web Workers

`Web Workers` API 允许开发者运行一个脚本操作在与主线程分离的后台线程中。这可以使得主线程（通常控制 UI）在执行大量计算时保持响应。

- **用途**：用于在后台执行复杂或耗时的计算任务，而不会冻结或减慢用户界面的响应。
- **执行上下文**：`Web Workers` 提供了一个独立的全局上下文，与主线程隔离。Worker 中的代码在其自己的线程里执行，这意味着它可以执行并发任务，而不影响主线程。
- **性能**：`Web Workers`允许长时间运行的脚本不阻塞主线程，但创建和管理 Worker 会带来一些额外的性能开销。

### 主要区别

- **并发性**：`Web Workers`实现了真正的并行性，允许在后台线程进行计算，而`MessageChannel`用于在同一线程中的不同实体间的通信。
- **上下文隔离**：`Web Workers`在独立的上下文中运行，不会直接访问 DOM 或者其他主线程特有的 API，而`MessageChannel`在当前上下文中工作，可以直接操作 DOM。
- **通信机制**：`Web Workers`使用`postMessage`和`onmessage`接口与主线程通信，`MessageChannel`则提供了两个`MessagePort`用于双向通信。
- **使用场景**：如果你需要在后台线程执行一些任务并且不影响 UI 线程，那么你应该使用`Web Workers`。而如果你仅仅需要在页面的不同部分或者不同工作上下文之间传递消息，`MessageChannel`可能更适合。

在某些情况下，它们可以一起使用，例如，你可以通过`MessageChannel`将一个`MessagePort`传递给一个`Web Worker`，然后在 Worker 和主线程之间建立直接的通信通道。这样可以避免使用全局`postMessage`接口，并提供更细粒度的通信控制。

## 12. 为什么不用 Promise 而是用 MessageChannel

在 React 的任务调度策略中，使用`MessageChannel`代替`Promise`主要是为了控制任务的执行时机，并确保在浏览器的主线程不繁忙时执行这些任务。`Promise`通常用于处理异步操作，但它们有一些特性使其不适合 React 调度器的需求：

### 1. 微任务队列

`Promise`将回调放入微任务队列中，这些回调会在当前事件循环的宏任务结束后，以及在下一个事件循环的宏任务开始前执行。这意味着`Promise`回调总是在当前事件循环尽可能早地执行，而不管主线程是否繁忙。

### 2. 立即执行

一旦`Promise`被解决（resolved）或拒绝（rejected），它的回调将被迅速放入微任务队列，并在当前事件循环的其余部分之后执行。这可能会导致问题，如果主线程正在处理高优先级的更新，比如用户输入，使用`Promise`可能会插入一个不必要的任务，从而导致用户体验不佳。

### 3. 控制性较差

当使用`Promise`时，开发者无法控制微任务的执行时机。所有得到排队的微任务都会在当前宏任务之后尽快执行，这使得在浏览器空闲时执行低优先级任务变得困难。

相比之下，`MessageChannel`提供了一种机制，允许 React 更细粒度地控制任务的调度，包括在浏览器空闲时执行任务。React 的调度器可以利用`MessageChannel`来更好地管理和优化 UI 渲染，从而提高应用性能。

### 4. 兼容性和一致性

`MessageChannel`提供了一种在不同浏览器和环境中一致的通信方式，React 可以借此实现跨浏览器的稳定调度。

### 总结

在 React 的设计中，选择`MessageChannel`而不是`Promise`是为了获得对任务执行时机的更好控制。`MessageChannel`允许 React 的调度器在浏览器主线程有能力处理新任务时才执行，而不是在当前宏任务完成之后立即执行，这为 React 提供了更多的灵活性来优化应用的性能和响应度。

## 13. 实现 MessageChannel 空闲时执行

实际上，`MessageChannel`本身并不提供直接的机制来识别浏览器是否空闲。相反，`MessageChannel`被用于代替`setTimeout`或`setInterval`的机制，以创建一个几乎立即触发的任务，而不必面对那些 API 的最小延迟限制（通常为 1 毫秒，某些情况下更长）。React 的调度器会使用`MessageChannel`来将任务排队为微任务，这些任务将会在当前宏任务结束后尽快执行。

要实际实现在浏览器空闲时执行的操作，React 调度器还要和其他 API（如`requestAnimationFrame`）一起配合使用。这里提供一个简化的例子，展示了如何结合`requestAnimationFrame`、`MessageChannel`和时间戳来模拟在浏览器空闲时执行任务的策略：

```javascript
// 假设的任务队列
const taskQueue = [];

// 使用MessageChannel来触发任务
const channel = new MessageChannel();
const { port1, port2 } = channel;

// 空闲时间的阈值
const IDLE_THRESHOLD = 50; // 50毫秒

let frameDeadline = 0; // 当前帧截止时间

// 监听消息事件来执行任务
port1.onmessage = () => {
  const currentTime = performance.now();
  let workYielded = false;

  // 处理队列中的任务，直到超过帧截止时间或没有更多任务
  while (taskQueue.length > 0 && currentTime <= frameDeadline) {
    const currentTask = taskQueue.shift();
    currentTask();
    workYielded = true;
  }

  // 如果还有任务没完成，继续安排下一个任务
  if (taskQueue.length > 0) {
    port2.postMessage(null);
  }
};

function scheduleTasks() {
  // 使用requestAnimationFrame来获取下一帧的开始时间
  requestAnimationFrame((frameTime) => {
    // 设置本帧的截止时间
    frameDeadline = frameTime + IDLE_THRESHOLD;
    // 发送消息，触发任务运行
    port2.postMessage(null);
  });
}

function scheduleTask(task) {
  // 将任务添加到队列
  taskQueue.push(task);
  // 安排任务执行
  scheduleTasks();
}

// 示例任务
function exampleTask() {
  console.log("Task executed at", performance.now());
}

// 安排几个任务
scheduleTask(exampleTask);
scheduleTask(exampleTask);
scheduleTask(exampleTask);
```

在这个例子中，我们定义了一个任务队列和一个使用`MessageChannel`的机制来触发任务的执行。我们还使用了`requestAnimationFrame`来获取每一帧的开始时间，并设置了一个截止时间`frameDeadline`。我们希望在这个截止时间之前执行任务，如果当前帧的时间已经不足（即超过了`IDLE_THRESHOLD`），我们就会中断任务的执行，等待下一次机会。

这个例子并不是 React 实际使用的代码，但它展示了 React 调度器可能使用的一些基本概念。实际的 React 调度器实现要复杂得多，它需要处理各种边缘情况、优先级、错误边界等复杂的逻辑。

## 14. 讲一下 Concurrent Mode

React 的 Concurrent Mode（并发模式）是一个可选的模式，它使 React 能够更好地利用协调（reconciliation）和渲染（rendering）的并发特性。Concurrent Mode 在 React 16 中作为实验性功能引入，并在后续版本中持续完善。这个模式使应用程序能够在加载新数据时保持响应，即使有大量渲染工作要做。

### 关键特性

Concurrent Mode 提供了以下几个关键功能：

1. **中断渲染**: 在 Concurrent Mode 中，渲染工作可以被中断并稍后再继续。这意味着 React 可以根据用户交互或其他重要任务暂停正在进行的渲染工作，以确保主线程的响应性。

2. **优先级化更新**: React 可以为更新分配不同的优先级。例如，来自用户输入的更新（如键盘或点击事件）可以被赋予更高的优先级，而数据抓取更新可以被赋予较低的优先级。

3. **并发数据抓取**: 开发者可以使用 Suspense 组件来指定组件如何等待异步数据。这允许 React 在数据抓取时保持 UI 的响应性，甚至在数据到达前开始渲染 UI。

4. **避免水平渲染**: 当数据缺失会导致组件抛出错误时，Suspense 可以用于定义一个加载状态，防止应用进入一个不完整的、中间状态。

### 怎么工作的

Concurrent Mode 通过以下方式工作：

- **时间分片（Time Slicing）**: React 将更新分解成小的任务单元。每个任务单元在执行时都会检查是否还有剩余时间，如果没有，就将控制权交还给浏览器。这样可以让 React 在执行大量工作时仍然能够响应用户的交互。

- **中断和恢复**: React 有能力根据优先级中断正在进行的低优先级更新，并开始执行更高优先级的更新。之后，它可以在适当的时候恢复之前中断的更新。

- **双缓冲（Double Buffering）**: 在 Concurrent Mode 中，React 在内存中维护了两个树结构：当前的树和正在工作的树。这使得 React 可以在用户不可见的地方进行工作，并且只有当工作完成并且整个树都准备好更新时，才会进行提交。

### 使用 Concurrent Mode

为了启用 Concurrent Mode，你需要使用`React.createRoot`代替`ReactDOM.render`来创建根节点。以下是一个简单的例子：

```javascript
import React from "react";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 注意事项

Concurrent Mode 是可选的，且它可能需要对现有的应用进行重构，尤其是对那些依赖于生命周期方法的行为和副作用的应用。在 Concurrent Mode 中，组件可能会渲染多次而不提交，这意味着生命周期方法可能会被多次调用。

Concurrent Mode 还没有完全成熟并在 React 的所有版本中默认启用，因为它可能引入一些不兼容的更改和新的概念，如 Suspense。开发者在使用时需要权衡其带来的好处和潜在的重构工作。

## 15. 讲一下 react18 的批处理

React 18 引入了一个新的自动批处理（Automatic Batching）功能，这是对 React 中现有批处理行为的一项重要改进。在之前的版本中，React 仅在生命周期方法和合成事件处理程序中自动批处理状态更新。这意味着如果你有多个状态更新发生在一个事件处理函数中，React 会将它们合并到一个单独的重新渲染中，以提高效率。

### React 18 中的自动批处理

在 React 18 中，自动批处理被扩展到更多的场景，包括：

- **Promise 的解决和拒绝处理程序**：在异步代码中，例如 Promise 链或 async/await 函数中的状态更新现在也会自动批处理。
- **setTimeout 和 setInterval 回调**：使用这些定时器函数的回调中的状态更新现在也会被批处理。
- **原生事件处理程序**：在非 React 合成事件的监听器中进行的状态更新也会被批处理。
- **任何其他事件循环中的事件处理**：几乎所有的状态更新，不管它们来源于什么，只要它们在同一个事件循环中，都会被自动批处理。

以下是一个示例，演示了在 React 17 和 React 18 中的行为差异：

```jsx
// 假设我们有两个状态更新函数
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

// 在 React 17 中，这些更新会导致两次重新渲染
setTimeout(() => {
  setCount((c) => c + 1); // 1st re-render
  setFlag((f) => !f); // 2nd re-render
}, 1000);

// 在 React 18 中，这些更新会被自动批处理为一次重新渲染
setTimeout(() => {
  setCount((c) => c + 1); // Both updates are batched
  setFlag((f) => !f); // into a single re-render
}, 1000);
```

### 如何工作的

自动批处理的工作原理是 React 在执行更新时采用了一种懒惰的方式，它会将多个更新累积起来，然后一次性应用这些更新，而不是对每个更新立即进行重新渲染。这减少了重复的工作和不必要的 DOM 更新，从而提高了性能。

### 选择性批处理

尽管自动批处理通常是有益的，但可能会有一些情况下你希望对一些更新进行即时处理。React 18 提供了 `flushSync` 函数，允许你选择性地退出批处理：

```jsx
import { flushSync } from "react-dom";

// 在 flushSync 的回调中的更新不会批处理
flushSync(() => {
  setCount((c) => c + 1); // These updates are
});
flushSync(() => {
  setFlag((f) => !f); // applied immediately
});
```

使用 `flushSync`，你可以确保在回调中的更新立即被应用，触发同步的重新渲染。

### 总结

React 18 中的自动批处理是对 React 更新机制的显著改进，它扩展了批处理可应用的范围，并提高了应用性能。开发者无需更改现有代码就可以从中受益，但同时也拥有了必要时控制更新同步的能力。该特性的引入使得 React 应用可以更有效率地处理状态更新，尤其是在复杂的应用和异步操作中。

## 16. 说下 useInsertionEffect、useEffect、useLayoutEffect 区别

在 React 中，`useEffect`、`useLayoutEffect`和`useInsertionEffect`都是用于在组件渲染过程中处理副作用的 Hooks，但它们在何时执行以及用途方面有所不同。

### useEffect

`useEffect`是最常用的副作用 Hook。它在组件渲染到屏幕之后的某个时间点异步执行，不会阻塞浏览器的绘制工作。这个 Hook 适用于大多数副作用场景，如数据抓取、设置订阅以及手动更改 DOM 等。

```jsx
useEffect(() => {
  // 这里的副作用将在组件渲染后异步执行
  console.log("Effect has run");

  return () => {
    // 清理副作用的逻辑，例如取消订阅
  };
}, [dependencies]); // 依赖数组，只有依赖变化了才会重新执行
```

### useLayoutEffect

`useLayoutEffect`与`useEffect`类似，但它是在所有的 DOM 变更之后同步调用的。这意味着你可以使用它来读取或更改 DOM，而不会有闪烁的问题。由于`useLayoutEffect`会同步执行，可能会影响页面性能，所以建议仅在需要与 DOM 相关的更新时使用。

```jsx
useLayoutEffect(() => {
  // 这里的副作用将在所有的 DOM 变更之后同步执行
  console.log("Layout effect has run");

  return () => {
    // 清理副作用的逻辑
  };
}, [dependencies]); // 依赖数组
```

### useInsertionEffect (New in React 18)

`useInsertionEffect`是 React 18 新增的 Hook，专门用于处理样式注入的场景。它在样式计算之前同步执行，确保在浏览器开始绘制之前，样式已经插入到 DOM 中。这个 Hook 的目的是避免在使用 CSS-in-JS 库时的样式闪烁问题。

```jsx
useInsertionEffect(() => {
  // 这里的副作用将在样式计算之前同步执行
  console.log("Insertion effect has run");

  return () => {
    // 清理副作用的逻辑
  };
}, [dependencies]); // 依赖数组
```

由于`useInsertionEffect`是为了处理样式注入的特定用例而设计的，它的使用场景相对较少，主要用于 CSS-in-JS 库的内部实现。

### 总结

- `useEffect`用于处理大多数副作用，它在组件渲染到屏幕后异步执行。
- `useLayoutEffect`用于处理需要同步执行的副作用，以避免可能的布局闪烁。
- `useInsertionEffect`是 React 18 新增的 Hook，用于处理样式注入，在样式计算之前同步执行。

在编写组件时，大多数副作用应该使用`useEffect`。只有当你需要同步读取或更改 DOM，或者当你需要在绘制前注入样式时，才考虑使用`useLayoutEffect`或`useInsertionEffect`。

## 17. 讲一下 react 状态发生变化触发视图更新的链路

React 状态更新触发视图更新的链路涉及一系列精心设计的步骤。这些步骤确保了当组件状态改变时，React 可以高效且准确地更新 UI。以下是 React 中状态更新触发视图更新链路的概述：

### 1. 状态更新

这个过程通常从一个状态更新开始。这可能是由于 `setState`、`useState` 的 setter 函数或 `useReducer` 的 dispatch 调用引起的。

```javascript
const [state, setState] = useState(initialState);

// 状态更新
setState(newState);
```

当状态更新被触发时，React 会将该组件标记为需要更新。

### 2. 调度更新

React 的调度器接收到更新请求，并根据其优先级决定何时执行更新。在 Concurrent Mode 下，React 可能会根据任务的紧急程度和浏览器的空闲时间来推迟或中断更新。

### 3. 协调（Reconciliation）

协调过程开始时，React 会为当前的更新创建一个工作单元，并开始遍历组件树（也称为 Fiber 树）。

1. **比较阶段**：React 会比较新的组件状态和上一次渲染的状态，计算出实际需要变更的部分。
2. **生成 Fiber 树**：React 为渲染中的每个组件创建或更新 Fiber 节点。Fiber 是 React 用于跟踪组件树中的每个组件状态和结构的内部数据结构。

### 4. 渲染

在协调过程中，React 为组件调用渲染函数（例如，函数组件本身或类组件的 `render` 方法），生成新的虚拟 DOM（React 元素）。

### 5. 提交

当协调完成并且 React 准备好应用变更到实际 DOM 时，它会执行提交阶段。

1. **执行副作用**：在提交阶段，React 会执行 `useEffect`、`useLayoutEffect` 等 Hook 中的副作用函数。
2. **更新 DOM**：React 将更新计算出来的变更应用到实际的 DOM 上。这可能包括属性的更新、元素的添加或删除等。
3. **引用赋值**：React 会更新需要变更的组件的引用，例如将 DOM 节点赋值给通过 `useRef` 创建的 Refs。

### 6. 清理与通知

最后，React 清理之前渲染的状态、执行副作用的清理函数，并在需要时通知组件更新完成。这是一个清理并使系统保持最新状态的过程。

### 思考

整个过程是高度优化的，涉及到了一系列复杂的内部机制。React 使用了如 Fiber 架构、双缓冲、时间切片等技术，使得即使在大规模的更新中也能保持高性能并避免阻塞主线程。

在实践中，React 开发者不需要深入了解所有内部细节，但理解状态更新和视图更新之间的基本链路对于编写高效且符合预期的代码是非常有帮助的。

## 18. 详细讲下比较阶段

在 React 的更新过程中，“比较阶段”（通常被称为协调或 reconciliation 阶段）是一个关键步骤，React 框架会通过该阶段确定哪些部分的 UI 需要根据最新的状态变化来进行更新。这个过程涉及比较之前的渲染结果（旧的虚拟 DOM）与新的渲染结果（新的虚拟 DOM），从而生成一个最小化的更新指令集合来应用至真实 DOM。

### 协调的目标

协调的主要目标是在组件状态或属性（props）发生变化时，高效地更新 UI，同时尽量减少不必要的 DOM 更新，因为 DOM 操作通常是昂贵的。

### 协调的步骤

协调过程包括以下步骤：

1. **创建新的虚拟 DOM 树**：当组件的状态或 props 发生变化时，React 会创建一棵新的虚拟 DOM 树。

2. **比较新旧虚拟 DOM 树**：React 使用 diff 算法比较新旧虚拟 DOM 树中的元素。这个比较过程是递归的，从根组件开始，一直到所有子孙组件。

3. **确定更新的节点**：在比较新旧虚拟 DOM 时，React 会识别哪些元素发生了变化。例如，如果一个组件的类型变了（从`<div>`变成`<span>`），或者 key 属性不同了，React 会摧毁旧组件并构建新组件。如果组件类型相同，React 会比较这个组件的 props，并确定需要更新哪些属性。

4. **标记需要更新的实际 DOM**：React 为每个发生变化的虚拟 DOM 元素生成更新操作，并标记它们在实际 DOM 中对应的节点需要更新。

### 优化措施

在协调过程中，React 采取了一些优化措施：

- **Keys**：当渲染列表时，给每个列表项分配一个稳定的 key 可以帮助 React 更快地比较列表中的元素。这是因为 key 提供了元素在多次渲染间的持久标识。

- **类型检查**：当元素类型（如`<div>`、`<span>`）发生变化时，React 会立即知道需要替换整个子树，而不需要进一步比较。

- **跳过不必要的比较**：如果组件的 props 和 state 没有变化，React 可以跳过这个组件及其子组件的比较过程，这得益于`PureComponent`、`React.memo`或`shouldComponentUpdate`生命周期方法。

### 结果应用

协调结束后，React 会收集所有的更新，并在接下来的“提交阶段”中应用到实际 DOM 上。这个分离的过程允许 React 实现高效的更新，只对那些真正发生变化的部分进行操作，从而提高应用的性能。

协调阶段是 React 内部的实现细节，而作为开发者，我们通常不需要直接与之交互。理解这个过程有助于我们编写更高效的组件，例如，通过合理使用 keys、避免不必要的重渲染等。

## 19. 实现一个简单版本的 diff 算法

React 的 diff 算法是一种高效的算法，用于比较两棵虚拟 DOM 树，找出它们之间的差异，然后将这些差异应用到实际的 DOM 上以更新 UI。React 的 diff 算法基于两个核心假设：不同类型的元素将产生不同的树结构，且开发者可以通过 `key` prop 来指示哪些子元素在不同的渲染中保持稳定。

下面是一个简化版的 diff 算法示例，它只处理了一些基本情况：

```javascript
function diff(oldVTree, newVTree) {
  // 存放差异的对象
  const patches = {};

  // 递归遍历树并记录差异
  walk(oldVTree, newVTree, patches, 0);

  return patches;
}

function walk(oldNode, newNode, patches, index) {
  // 单个元素的差异
  let patch = [];

  // 情况1: oldNode不存在
  if (!oldNode) {
    patch.push({ type: "INSERT", newNode });
  }
  // 情况2: 新旧节点类型不同，或者key不同
  else if (
    (newNode && oldNode.type !== newNode.type) ||
    oldNode.key !== newNode.key
  ) {
    patch.push({ type: "REPLACE", newNode });
  }
  // 情况3: 文本内容改变
  else if (
    typeof oldNode === "string" &&
    typeof newNode === "string" &&
    oldNode !== newNode
  ) {
    patch.push({ type: "TEXT", text: newNode });
  }
  // 情况4: 同类型、同key的节点进行属性对比
  else if (oldNode.type === newNode.type) {
    const propsPatches = diffProps(oldNode.props, newNode.props);
    if (propsPatches) {
      patch.push({ type: "PROPS", props: propsPatches });
    }

    // 递归比较子节点
    diffChildren(oldNode.children, newNode.children, patches, index);
  }

  // 如果有差异，则添加到 patches 对象中
  if (patch.length) {
    patches[index] = patch;
  }
}

function diffProps(oldProps, newProps) {
  let propPatches = {};
  let hasDiff = false;

  // 查找不同的属性
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      propPatches[key] = newProps[key];
      hasDiff = true;
    }
  }

  // 查找新添加的属性
  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      propPatches[key] = newProps[key];
      hasDiff = true;
    }
  }

  return hasDiff ? propPatches : null;
}

function diffChildren(oldChildren, newChildren, patches, index) {
  // 比较子节点时，应该保持对每个子节点的索引
  let currentIndex = index;
  for (let i = 0; i < oldChildren.length || i < newChildren.length; i++) {
    currentIndex +=
      (oldChildren[i] && oldChildren[i].children
        ? oldChildren[i].children.length
        : 0) + 1;
    walk(oldChildren[i], newChildren[i], patches, currentIndex);
  }
}
```

这个简单版本的 diff 算法实现了基本的比较逻辑，包括节点插入、替换和文本内容改变等操作。`diffProps` 函数用来对比节点属性的差异，而 `diffChildren` 函数用来递归对比子节点。

需要注意的是，这个简化版本的 diff 算法并不包含 React 实际使用的所有优化和特性。例如，它没有处理列表中元素排序和移动的情况，也没有实现复杂的 keys 处理逻辑，这些都是 React diff 算法的重要组成部分。此外，实际的算法还需要考虑各种边缘情况和性能优化策略。

## 20. StrictMode 为什么会渲染两次？它主要为了解决什么问题

React 的 `StrictMode` 是一个开发辅助工具，它帮助你发现应用中潜在的问题。在开发模式下，当组件被包裹在 `<StrictMode>` 中时，React 会对组件内的代码执行额外的检查和警告。这些检查旨在识别不安全的生命周期、过时的 API 调用和其他不推荐的使用模式，帮助你提前修复问题，避免在未来的 React 版本中遇到兼容性问题。

在 React 18 之前，`StrictMode` 不会导致组件渲染两次。然而，React 18 引入了新的并发特性，为了帮助开发者准备代码迁移到新的并发模型，`StrictMode` 在开发模式下开始对组件进行双重渲染（double rendering）。

### 双重渲染的原因

`StrictMode` 通过故意双重渲染组件，帮助开发者发现副作用在渲染之间可能不一致的问题。在并发模式下，React 可能会开始一个更新，然后在完成之前中断它，稍后再恢复更新。这意味着如果你的 render 函数或其他函数有副作用，那么这些副作用可能会在更新完成之前执行多次。

通过在开发模式下双重渲染组件，`StrictMode` 模仿了这种中断渲染的行为，以此来揭示出隐藏的副作用和潜在的问题。例如，如果你在渲染时有副作用（如在组件内部设置全局变量），那么在双重渲染中这些副作用会执行两次，从而可能暴露出问题。

### `StrictMode` 解决的问题

`StrictMode` 主要帮助解决以下问题：

- **不安全的生命周期警告**：帮助识别使用了即将废弃的生命周期钩子的组件，鼓励开发者使用更加安全的生命周期方法。
- **脱离 React API 的警告**：比如使用老式的 `ref` API 或者直接修改 DOM。
- **意外的副作用**：识别出不恰当的副作用，使它们在 React 的并发模式下不会产生问题。
- **弃用的 API 使用**：探测到使用废弃的 API 和模式，如 `findDOMNode`。
- **开发习惯**：鼓励使用如 `key` 属性等的最佳实践，从而提高应用性能。

### 限制

- 双重渲染只发生在开发模式下，不影响生产环境。
- 双重渲染有助于发现副作用，但并不是并发模式下实际中断更新的真实模拟。
- `StrictMode` 不会针对真实 DOM 或 CSS 进行双重渲染，只是在内存中进行，以便于发现问题而不会影响用户体验。

总之，`StrictMode` 和它的双重渲染机制是为了帮助开发者在未来的 React 版本中保持应用的稳定性和性能，特别是面对即将到来的并发特性时。通过提前暴露和解决这些问题，应用将能够更平滑地适应 React 的更新和改进。

## 21. react 有哪些工具可以去定位 react 的性能问题

React 提供了一些内置的工具和第三方库来帮助开发者诊断和解决性能问题。以下是一些常用的工具：

### React Developer Tools

React Developer Tools 是一个浏览器扩展，用于 Chrome 和 Firefox，提供了对 React 组件树的深入了解。它允许你检查组件层次结构、状态、属性和钩子，还包括以下有助于性能调优的功能：

1. **Profiler（性能分析器）**: React DevTools 中的 Profiler 选项卡可以记录和查看组件渲染的性能。它可以显示哪些组件重新渲染以及每次渲染的时间。
2. **Highlight Updates**: 可以高亮显示在渲染时发生更新的组件，这有助于发现不必要的重新渲染。

### React Profiler API

在 React 16.5 及其之后的版本中，React 引入了一个新的 Profiler API，它是一个声明式的性能监测工具，可以测量应用中组件渲染的成本。通过将 `<Profiler>` 组件添加到 React 树中，你可以收集关于组件渲染时间的详细信息。

### Performance Tab in Browsers

大多数现代浏览器都有一个性能标签（Performance tab），它提供了一个时间轴，展示了页面加载和用户交互过程中发生的所有事件。你可以使用它来记录、查看和分析页面的运行时性能，包括 JavaScript 执行时间、样式计算、布局、绘图和复合等。

### Web Vitals

"Web Vitals" 是 Google 推出的一套性能指标，旨在帮助开发者量化用户体验的关键方面。其中最著名的三个核心 Web Vitals 指标是 Largest Contentful Paint (LCP)、First Input Delay (FID) 和 Cumulative Layout Shift (CLS)。React 应用可以使用这些指标来评估性能。

### why-did-you-render

这是一个第三方库，它可以用于监视不必要的组件渲染。通过在开发模式下钩入 React，`why-did-you-render` 可以告诉你哪些组件被重新渲染以及造成这种情况的原因。

### Custom Performance Monitoring

你也可以使用浏览器的 Performance API（如 `performance.mark` 和 `performance.measure`）来手动标记和测量应用中的关键渲染路径和交互。

### 使用测量工具

对于手动性能监测，`useEffect` 和 `useLayoutEffect` 钩子可以用于测量组件加载和更新的时间。示例：

```javascript
useEffect(() => {
  const start = performance.now();
  // 执行任务
  const end = performance.now();
  console.log(`Operation took ${end - start} milliseconds`);
}, [dependencies]);
```

所有这些工具和技术都能帮助你诊断 React 应用中的性能瓶颈。通常，你需要结合使用它们来获取最全面的性能分析，并据此进行优化。

## 22. 性能工具使用示例

让我们来看一下如何使用上述列出的一些主要工具来定位和优化 React 应用的性能问题。

### React Developer Tools

1. **安装**:
   安装 React Developer Tools 浏览器扩展程序。可以在 Chrome Web Store 或 Firefox Add-ons 中找到。

2. **使用 Profiler**:
   打开 DevTools（F12 或右键点击页面选择 "Inspect"），然后选择 "React" 选项卡。在 "Profiler" 选项卡中，你可以开始记录性能数据。记录期间，进行一些操作后停止记录，工具会展示每个组件的渲染时间和渲染次数。

3. **Highlight Updates**:
   在 "React" 选项卡中，你可以启用 "Highlight Updates" 功能。当组件更新时，它们将在页面上以彩色边框高亮显示，以此来可视化显示页面的渲染。

### React Profiler API

1. **添加 `<Profiler>` 组件**:
   在你的应用代码中，将 `<Profiler>` 组件嵌套在你想要监测性能的组件树中。例如：

   ```jsx
   import React, { Profiler } from "react";

   function onRenderCallback(
     id, // 发生提交的Profiler树的 “id”
     phase, // "mount"（如果树刚刚挂载）或者 "update"（如果树重新渲染）
     actualDuration, // 渲染提交花费的时间
     baseDuration, // 估算不使用memoization的情况下渲染整颗子树需要的时间
     startTime, // 本次更新中React开始渲染的时间
     commitTime, // 本次更新中React提交更改的时间
     interactions // 本次更新涉及的interaction集合
   ) {
     // 处理渲染信息或记录日志
   }

   function MyComponent() {
     return (
       <Profiler id="MyComponent" onRender={onRenderCallback}>
         {/* ...子组件 */}
       </Profiler>
     );
   }
   ```

2. **处理性能数据**:
   在 `onRender` 回调中，你可以处理性能数据。这可能包括将性能数据记录到控制台或发送到后端服务器以供进一步分析。

### Performance Tab in Browsers

1. **打开 Performance Tab**:
   打开开发者工具，选择 "Performance" 选项卡。

2. **记录性能数据**:
   点击录制按钮，进行一些操作，比如页面加载或与 UI 交互，然后停止录制。

3. **分析时间轴**:
   查看记录的时间轴，它会包含 JavaScript 执行、样式计算、布局、绘图等信息。通过这些数据，你可以分析哪些过程占用了最长时间。

### Web Vitals

1. **安装 Web Vitals 库**:
   使用 npm 或 yarn 安装 `web-vitals` 库：

   ```sh
   npm install web-vitals
   // 或者
   yarn add web-vitals
   ```

2. **记录核心 Web Vitals 指标**:
   在应用的主要入口点，集成 `web-vitals` 库并记录性能指标：

   ```javascript
   import { getCLS, getFID, getLCP } from "web-vitals";

   getCLS(console.log);
   getFID(console.log);
   getLCP(console.log);
   ```

### why-did-you-render

1. **安装 why-did-you-render**:
   使用 npm 或 yarn 安装 `@welldone-software/why-did-you-render`：

   ```sh
   npm install @welldone-software/why-did-you-render
   // 或者
   yarn add @welldone-software/why-did-you-render
   ```

2. **集成到 React 应用**:
   在应用的根文件（通常是 `index.js` 或 `App.js`）中，初始化 why-did-you-render：

   ```javascript
   import React from "react";
   if (process.env.NODE_ENV !== "production") {
     const whyDidYouRender = require("@welldone-software/why-did-you-render");
     whyDidYouRender(React, {
       trackAllPureComponents: true,
     });
   }
   ```

3. **查看结果**:
   在开发者控制台中，why-did-you-render 会打印出不必要的组件渲染信息，以及可能的原因。

对于这些工具，通常最好从 React Developer Tools Profiler 开始，因为它直接集成了 React 内部的性能分析功能。然后，根据需要，你可以使用其他工具进行更详细的分析。在使用任何性能分析工具时，请确保在开发模式下运行你的应用，以便获得最详尽的性能反馈。
