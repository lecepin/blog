![image](https://github.com/lecepin/blog/assets/11046969/14ae51cd-0624-4e2e-b01e-64c8c07e544a)


SolidJS是一个声明式的、高效的、编译时优化的JavaScript库，用于构建用户界面。它的核心特点是让你能够编写的代码既接近原生JavaScript，又能够享受到现代响应式框架提供的便利。

SolidJS的设计哲学强调了性能与简洁性。它不使用虚拟DOM（Virtual DOM），而是通过编译时的静态分析生成高效的真实DOM更新指令。这种方法使得SolidJS在性能方面非常出色，尤其是在渲染和更新视图方面。

SolidJS的响应式系统基于细粒度的响应式原语。这意味着它能够精确地知道哪些部分的状态（state）发生了变化，并且只更新依赖于这些变化的组件，而不需要重新渲染整个组件树。

## 1. 关键特性

1. 细粒度的响应式系统：SolidJS使用细粒度的反应性原理。这意味着只有当数据实际发生变化时，依赖于这些数据的UI部分才会更新，从而提高了性能。

2. 编译时优化：SolidJS在构建过程中进行编译时优化。它通过静态分析和编译时间的转换来优化组件和响应式代码，生成最小化的、高效的指令集来直接操作DOM。

3. 不使用虚拟DOM：与React等使用虚拟DOM的框架不同，SolidJS直接操作真实DOM。这减少了内存的使用，同时减少了与虚拟DOM对比的额外计算，从而提升了性能。

4. JSX支持：SolidJS使用JSX语法来定义组件的结构，这使得代码更易读、易写，并且让开发者可以利用编译时优化。

5. 非侵入式响应性：SolidJS的响应式系统允许你编写看起来像是普通JavaScript的代码。它不要求使用特殊的函数或方法来创建响应式数据，而是在编译时处理响应式。

6. 首次渲染优化：SolidJS特别注重首次加载性能。通过减少首次渲染时的工作量，SolidJS确保了快速的加载和渲染时间。

7. 服务器端渲染（SSR）和静态站点生成（SSG）：SolidJS支持服务器端渲染和静态站点生成，这有助于提升网站的加载速度和搜索引擎优化。

8. 近乎原生的包大小：由于编译时优化，SolidJS生成的代码非常接近原生的JavaScript，这意味着最终打包的大小更小，加载时间更短。

9. 类似于React的开发体验：对于熟悉React的开发人员来说，SolidJS提供了类似的API和概念，比如组件、Props、Hooks等，这使得从React迁移到SolidJS比较容易。

10. TypeScript支持：SolidJS从一开始就内建了对TypeScript的支持，这样就能够在编码时提供类型检查和自动补全等特性，帮助提升开发效率。

![image](https://github.com/lecepin/blog/assets/11046969/2823ffaf-f818-4d05-8114-5a5c193b2ae8)


## 2. 示例代码

```jsx
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
// 组件只是一个返回DOM节点的函数
function Counter() {
  // 创建一个响应式状态，给我们一个访问器 count() 和一个设置器 setCount()
  const [count, setCount] = createSignal(0);
  
  // 要创建派生状态，只需将表达式包裹在一个函数中
  const doubleCount = () => count() * 2;
  
  console.log("函数体只运行一次...");
  // JSX允许你在JavaScript函数中编写HTML，并使用 { } 语法包含动态表达式
  // 这里唯一会重新渲染的部分是 count() 文本。
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        Increment: {doubleCount()}
      </button>
    </>
  );
}
// render函数将一个组件挂载到你的页面上
render(Counter, document.getElementById("app")!);
```

Solid 将您的 JSX 编译为高效的真实 DOM 更新。它在运行时使用相同的反应原语（createSignal），但确保尽可能少的重新渲染。本例中的内容如下：

```jsx
import { template as _$template } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
// 编译器提取出所有静态的HTML
const _tmpl$ = /*#__PURE__*/_$template(`<button>Increment: `);
import { createSignal, createEffect } from "solid-js";
import { render } from "solid-js/web";
function Counter() {
  const [count, setCount] = createSignal(0);
  
  const doubleCount = () => count() * 2;
  
  console.log("函数体只运行一次...");

  return (() => {
    //_el$ 是一个真实的DOM节点！
    const _el$ = _tmpl$();
    _el$.$$click = () => setCount(c => c + 1);
    // 这样插入count作为按钮的子元素，允许count更新而不需要重新渲染整个按钮
    _$insert(_el$, doubleCount);
    return _el$;
  })();
}
render(Counter, document.getElementById("app"));
// 委托事件处理（如点击事件）
_$delegateEvents(["click"]);
```

## 3. React 用户友好

![image](https://github.com/lecepin/blog/assets/11046969/06168c4f-2241-472b-b1f0-6d2f20669a4f)


SolidJS 设计时考虑了对 React 用户的友好性，它借鉴了 React 的一些核心概念，使得对于熟悉 React 的开发者来说，学习和使用 SolidJS 相对容易。包括：

1. **相似的 JSX 语法**：SolidJS 使用 JSX，这对于 React 用户来说非常熟悉。你可以像在 React 中那样使用 JSX 来构建用户界面。

2. **组件模型**：SolidJS 的组件模型与 React 类似，都是基于函数的组件。React 用户可以使用他们已经熟悉的组件编写方式来构建 SolidJS 应用。

3. **响应式状态管理**：SolidJS 中的 `createSignal` 类似于 React 的 `useState` Hook。尽管背后的响应式机制不同，概念上的相似性有助于 React 用户更快地适应使用 SolidJS 进行状态管理。

4. **生命周期管理**：SolidJS 提供了生命周期函数，类似于 React 中的生命周期方法和 `useEffect` Hook，让开发者能够在组件的不同生命周期阶段执行逻辑。

5. **TypeScript 支持**：SolidJS 和 React 都支持 TypeScript，这对于习惯使用类型系统的 React 开发者转移到 SolidJS 非常便利。

6. **官方文档和资源**：SolidJS 提供了详细的文档和示例，这有助于 React 用户理解 SolidJS 的工作方式及其与 React 的区别。

然而，也有一些不同之处需要注意：

- **响应式系统**：SolidJS 使用一种不同于 React 的响应式系统，它基于细粒度的依赖跟踪，而不是基于虚拟 DOM 的比较和更新。React 用户需要理解这种新的更新机制。

- **没有虚拟 DOM**：SolidJS 直接操作实际的 DOM，而不使用虚拟 DOM。这使得性能更优，但对于习惯于 React 虚拟 DOM 模型的开发者来说，可能需要一些调整。

- **API 差异**：尽管有许多相似之处，SolidJS 的 API 仍然存在一些与 React 不同的地方。这些差异可能需要开发者投入时间去适应。


## 3. Solidjs 高性能原因

SolidJS 的性能之所以出色，主要归功于其设计哲学和实现策略，特别是在响应式系统和编译时优化方面。包括：

1. **编译时优化**：
   - SolidJS 在构建阶段进行编译时优化，它会分析组件代码，并生成最佳的、针对性的更新逻辑。
   - 编译器能够检测静态内容，并在构建时将其提取出来，减少了运行时的工作量。
   - 通过静态分析，SolidJS 可以预先确定哪些部分的DOM需要动态更新，而不需要在运行时进行虚拟 DOM 的比较。

2. **细粒度响应式系统**：
   - SolidJS 使用了一种细粒度的响应式系统。它跟踪每个独立的响应式值（通过 `createSignal` 创建）和依赖它们的计算。
   - 只有当某个响应式值发生变化时，依赖于这个值的具体部分才会更新。这意味着不需要重新渲染整个组件，只更新实际改变的部分。

3. **不使用虚拟 DOM**：
   - SolidJS 直接操作实际的 DOM 节点，避免了虚拟 DOM 带来的额外开销，如创建虚拟节点和进行 DOM 差异比较。
   - 这种方法减少了内存使用并加快了更新速度，因为操作是针对性的并且高效执行。

4. **按需更新**：
   - 由于细粒度的响应式系统，SolidJS 可以精确地更新所需的 DOM 元素而不会影响其他元素。
   - 对于列表渲染等常见的性能瓶颈，SolidJS 可以仅更新变化的部分，而不是重新渲染整个列表。

5. **内置优化**：
   - SolidJS 内置了一些优化措施，例如在适当的时机批量更新，减少浏览器的重绘和重排次数。

## 4. SolidJS 生态

![image](https://github.com/lecepin/blog/assets/11046969/a0446223-009e-4c57-812d-e285a680b300)


SolidJS 是一个相对较新的前端框架，其生态系统正在快速发展。虽然它的生态可能不像 React 或 Vue 那样成熟和庞大，但 SolidJS 社区正积极地构建和维护一系列工具和资源，以支持开发者构建高效的应用程序。

## 5. 适合场景

SolidJS由于其优异的性能和简洁的设计，在一些特定场景下可能是一个合适的选择。包括：

1. **性能敏感型应用**：
   - 如果你正在构建一个对性能要求极高的应用，如需要快速响应的用户界面或动画密集型的应用，SolidJS的高效更新策略和细粒度响应式系统可能会带来显著的性能优势。

2. **大型动态应用**：
   - 对于大型的动态应用，SolidJS的细粒度响应式可以确保只有真正需要变更的部分才会被重绘，这可以提高复杂界面的渲染效率。

3. **静态站点生成（SSG）和服务器端渲染（SSR）应用**：
   - SolidJS支持SSG和SSR，如果你希望提高SEO效率或首屏加载速度，SolidJS可以成为一个很好的选择。

4. **具有复杂状态管理需求的应用**：
   - SolidJS的响应式系统可以简化复杂状态管理，适用于那些需要精细控制状态更新逻辑的应用。

5. **迁移现有项目**：
   - 对于想要从React等库迁移但又不希望完全重写应用的团队，SolidJS由于其相似的开发体验，可以作为一个平滑过渡的选项。

6. **小型到中型项目**：
   - 对于新项目，特别是小到中型规模的项目，SolidJS的简单API和小的运行时体积可以加速开发和加载时间。

7. **实验性和学习项目**：
   - 如果你是一名开发者，想要探索最新的前端技术，或者对响应式编程感兴趣，那么尝试SolidJS也是一个很好的学习机会。

8. **内部工具和仪表盘**：
   - 对于需要快速开发和拥有复杂交互性的内部工具和仪表盘，SolidJS的简洁性和性能优势可能会非常有用。

选择SolidJS或任何其他前端框架时，需要考虑多种因素，包括团队的熟悉度、社区支持、生态系统的成熟度以及特定项目的需求。

---

- https://www.solidjs.com/
- https://github.com/solidjs/solid
