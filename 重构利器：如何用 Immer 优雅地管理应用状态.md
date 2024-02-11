![image](https://github.com/lecepin/blog/assets/11046969/d995e6b4-4350-46df-9c0d-fe9b8a1dfbd6)


## 1. immer

`immer` 是一个 JavaScript 库，用于处理不可变数据的状态更新。不可变数据意味着一旦创建，数据结构就不能被修改。在编写复杂的应用程序时，不可变性可以带来一系列好处，比如更容易追踪数据的改变、更容易实现撤销/重做功能以及更简单的状态管理。

然而，处理不可变数据结构通常需要编写大量的样板代码，尤其是在更新嵌套结构时。`immer` 库通过提供一个简单的可变（mutable）API 来更新不可变（immutable）状态，从而简化了这一过程。

`immer` 的核心概念是“草稿状态”（draft state）。这个库允许你编写看似可变的代码来更新一个不变的状态，但实际上，你是在修改的一个临时的草稿状态。一旦修改完成，`immer` 会基于这个草稿状态产生一个新的不可变状态。

## 2. 诞生背景

`immer` 的诞生背景主要与在 JavaScript 应用中管理复杂的不可变状态有关。在 React 和 Redux 等现代前端框架和库中，不可变数据的概念非常重要，因为它帮助开发者避免直接修改状态，从而避免潜在的副作用和性能问题。不可变数据还使得状态的变化更加可预测，便于跟踪和调试，同时也简化了复杂的功能如时间旅行（time travel debugging）和状态快照的实现。

React 的 `setState` 方法和 Redux 的 reducer 函数都要求你返回一个新的状态对象，而不是修改原有的状态。当状态结构简单时，这通常不是问题，但当应用逐渐变得复杂，状态结构也变得更加嵌套时，更新状态会变得越来越繁琐。例如，如果你需要更新一个嵌套的数组或对象，你需要逐层克隆所有父级对象，直到达到你想要修改的属性。这不仅编写起来复杂，而且容易出错。

为了解决这个问题，Michel Weststrate（也是 MobX 库的作者）创建了 `immer`。他的目标是创建一个库，它能够让你以一种更自然和声明式的方式更新不可变状态，同时避免手动处理复杂的对象和数组克隆操作。通过 `immer`，你可以继续编写简单直观的可变代码，但是产生的结果是按照不变性原则处理的，这样就既保持了代码的简洁，也确保了状态的不可变性。

简而言之，`immer` 的诞生背景是为了解决在处理复杂不可变状态时的编码复杂性问题，同时帮助开发者避免常见的不可变数据操作错误，提高代码的可维护性和可读性。

## 3. immer 对象克隆算法的简单实现

![image](https://github.com/lecepin/blog/assets/11046969/ef30d684-e453-4f34-82b9-799561572a52)


`immer` 库使用了一种称为结构共享的技术来实现对象克隆，这种技术可以有效地创建新的不可变状态，同时尽可能地重用旧状态中未修改的部分。下面是一个简化版的 `immer` 克隆算法的实现，用于展示其基本原理：

```javascript
function createDraft(initialState) {
  // 遍历对象，递归地将其属性转化为可写。
  function createProxy(state) {
    if (typeof state === "object" && state !== null) {
      return new Proxy(state, {
        get(target, prop) {
          if (prop === "isDraft") return true;
          return createProxy(target[prop]);
        },
        set(target, prop, value) {
          target[prop] = value;
          return true;
        },
      });
    }
    return state;
  }

  return createProxy(initialState);
}

function finishDraft(draft) {
  // 遍历对象的草稿版本，并递归地生成最终的不可变状态。
  function finalize(state) {
    if (typeof state === "object" && state !== null && state.isDraft) {
      const finalState = Array.isArray(state) ? [] : {};
      for (const key in state) {
        finalState[key] = finalize(state[key]);
      }
      return finalState;
    }
    return state;
  }

  return finalize(draft);
}

function produce(baseState, producer) {
  // 创建草稿状态
  const draft = createDraft(baseState);
  // 执行修改器函数
  producer(draft);
  // 返回最终的不可变状态
  return finishDraft(draft);
}

// 使用示例
const baseState = {
  a: {
    b: 1,
    c: [2, 3],
  },
};

const nextState = produce(baseState, (draftState) => {
  draftState.a.b = 99;
  draftState.a.c.push(4);
});

console.log(baseState); // 输出原始状态，未被修改
console.log(nextState); // 输出已修改的新状态
```

上面的代码是一个简化版本的 `immer` 实现，它使用 `Proxy` 来拦截对草稿状态的所有操作。`createDraft` 函数创建一个代理，该代理使得对原始状态的任何修改都会被捕获。`finishDraft` 函数遍历草稿状态，并为任何修改过的部分创建新的不可变对象。

请注意，这个简单实现并不包含 `immer` 本身的完整特性集合。例如，它不会处理对象引用的问题，也不会优化未修改属性的结构共享。此外，本实现中，一旦您对草稿对象进行操作，所有的嵌套对象都会变成一个新对象，而 `immer` 会尽可能地重用旧状态中未修改的部分。

`immer` 库本身的实现要复杂得多，并且有很多优化，以确保性能并处理更多边缘情况。如果你打算在生产环境中使用不可变数据更新，建议直接使用 `immer` 库，而不是自己实现。

## 4. 安装使用

要使用 `immer` 库，你首先需要将其安装到你的项目中。你可以使用 npm 或 yarn 来安装 `immer`。

如果你使用 npm，请在你的项目根目录的命令行中运行以下命令：

```sh
npm install immer
```

如果你使用 yarn，请运行：

```sh
yarn add immer
```

一旦 `immer` 安装完成，你就可以在你的项目中导入并开始使用它了。下面是一个基本的使用示例：

```javascript
// 引入 immer 库
import produce from "immer";

// 假设你有一个初始状态对象
const initialState = {
  user: {
    name: "Alice",
    age: 25,
    address: {
      city: "Wonderland",
    },
  },
  tasks: [],
};

// 你想要基于这个初始状态进行一些修改
const nextState = produce(initialState, (draftState) => {
  // 直接对草稿状态进行修改
  draftState.user.age = 26;
  draftState.tasks.push("Learn immer");
  // No need to return anything, immer will take care of the rest
});

// 现在，initialState 保持不变，nextState 是更新后的状态
console.log(initialState); // 未修改的初始状态
console.log(nextState); // 更新后的新状态
```

在上面的代码中，我们使用 `produce` 函数来取得状态的草稿版本并进行修改。在 `produce` 函数的第一个参数中，我们传入了我们想要修改的初始状态。第二个参数是一个函数，它接收一个参数 `draftState`，这是初始状态的草稿版本。在这个函数体内，我们可以对 `draftState` 进行修改，好像它是可变的一样。一旦函数执行完成，`produce` 会根据我们对草稿所做的修改生成一个新的不可变状态，并将其作为返回值。

值得注意的是，在使用 `immer` 时，你不需要返回新的状态 —— `immer` 会自动处理这一切。这就是为什么在上面的示例中，对 `draftState` 的修改没有明确的 `return` 语句。

### 4.1 React 结合

结合 React 使用 `immer` 可以极大地简化状态更新逻辑，尤其是当你的组件状态比较复杂、层次比较深时。以下是一个简单的例子，展示了如何在一个 React 函数组件中使用 `immer` 进行状态管理。

然后在你的 React 组件中导入 `useReducer` 钩子和 `immer` 的 `produce` 函数：

```javascript
import React, { useReducer } from "react";
import produce from "immer";

// 假设我们的组件有一个初始状态
const initialState = {
  count: 0,
  user: {
    name: "Alice",
    favorites: ["coding", "reading"],
  },
};

// 使用 immer 创建 reducer 函数
const reducer = produce((draft, action) => {
  switch (action.type) {
    case "increment":
      draft.count += 1;
      break;
    case "addFavorite":
      draft.user.favorites.push(action.payload);
      break;
    // 更多的 action 处理...
    default:
    // 注意：在这里不需要 break，因为我们没有修改草稿状态
  }
});

// React 函数组件
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <p>Favorites: {state.user.favorites.join(", ")}</p>
      <button
        onClick={() => dispatch({ type: "addFavorite", payload: "skating" })}
      >
        Add Favorite
      </button>
    </div>
  );
}

export default Counter;
```

在上面的示例中，我们创建了一个使用 `immer` 的 `reducer` 函数，它处理两种动作：增加计数器和添加一个新的喜好项。在 `reducer` 函数中，我们直接对 `draft` 状态进行修改，而不需要担心会改变原始状态或者进行复杂的深拷贝操作。

`useReducer` 钩子使用我们的 `reducer` 函数和初始状态，并返回当前的状态和一个 `dispatch` 函数，我们可以用它来触发状态更新。

在组件中，我们使用按钮点击事件来触发不同的动作，这些动作将被 `reducer` 处理，从而更新状态。由于 `immer` 确保了状态的不可变性，这使得在 React 中使用 `immer` 非常适合，因为不可变状态是 React 优化渲染性能的关键。

结合 React 使用 `immer` 可以让你专注于状态更新的逻辑，而不是状态更新的机制，简化了代码并减少了出错的可能性。

## 5. 不可变库对比

不可变数据库是在 JavaScript 开发中管理状态的流行选择之一。这些库通过提供不可变数据结构来帮助开发者编写更可预测、更容易维护的代码。以下是一些较为知名的不可变数据库，按照它们的知名度和使用情况排序：

1. **Immutable.js**

   - **适合的场景**：大规模的应用程序，或者对性能有较高要求的项目，特别是当涉及到复杂的状态管理和频繁的状态更新时。
   - **优点**：提供丰富的不可变数据结构（如 List、Map、Set 等）；高效的数据更新和读取操作；良好的性能，尤其是在大型数据集上。
   - **劣势**：有较大的学习曲线，因为它有自己的 API 风格；与普通的 JavaScript 对象不直接兼容，有时需要转换；可能会导致较大的打包体积。

2. **Immer**

   - **适合的场景**：需要易用性和较少的学习曲线的项目，尤其是在 React 应用程序中管理状态时。
   - **优点**：简化不可变数据的操作；直观的 API 设计；与普通的 JavaScript 对象操作相似；可以与现有的库和框架无缝集成；针对性能做了优化。
   - **劣势**：使用 `Proxy`，因此在旧版浏览器中不受支持，且在某些情况下可能会有性能开销。

3. **Mori**

   - **适合的场景**：函数式编程风格的项目，或者希望使用 ClojureScript 风格数据结构的 JavaScript 开发者。
   - **优点**：提供丰富的不可变数据结构，类似于 Clojure 的持久化数据结构；支持函数式编程范式；性能优秀。
   - **劣势**：与 Immutable.js 类似，有自己的 API，需要学习；与 JavaScript 原生对象不直接兼容。

4. **seamless-immutable**
   - **适合的场景**：适用于需要轻量级不可变数据解决方案的应用，不愿意引入 Immutable.js 或其他重型库的项目。
   - **优点**：简单易用；API 设计类似于原生 JavaScript；较小的打包体积。
   - **劣势**：不提供 Immutable.js 那样丰富的数据结构和方法；对于大型数据集或复杂操作，性能可能不如专门的不可变数据库。

在选择适合的不可变数据库时，你需要考虑几个关键因素，比如应用程序的规模、状态管理的复杂性、开发团队的偏好、以及与其他库或框架的集成需求。对于性能的考量，一般建议在实际的应用场景中进行基准测试，以确定哪个库最适合你的需求。同时，也要衡量库的大小和学习曲线对项目的整体影响。

## 6. 性能对比

![image](https://github.com/lecepin/blog/assets/11046969/e627ad6f-503d-4057-b0a0-1142aae9ba65)


## 7.你需要么

Immer 的核心价值在于简化不可变状态的更新，这个特点并不仅限于 React 应用。在其他前端框架中，如 Vue.js、Angular 或甚至原生 JavaScript 项目，也可以从 Immer 提供的简洁的状态管理方式中受益。以下是一些适合引入 Immer 的场景，这些场景适用于多种前端框架和上下文：

1. **复杂的状态结构**：对于那些具有复杂或深层嵌套的状态对象的应用程序，Immer 可以简化修改这些对象的逻辑，从而避免手动处理深拷贝和不可变性。

2. **全局状态管理**：在使用 Vuex（Vue.js）、NgRx（Angular）或其他全局状态管理库时，Immer 可以简化状态更新的 reducer 逻辑，使其更加可读和易于维护。

3. **大型或中型应用**：在较大的应用中，状态管理往往变得复杂且容易出错。Immer 通过自动处理状态不可变性，有助于降低出错率和提高代码的清晰度。

4. **团队项目**：在多人协作的项目中，确保每个开发者都正确地处理状态不可变性可能是一个挑战。使用 Immer 可以减少这种心智负担，并帮助团队成员遵循最佳实践。

5. **学习曲线和开发速度**：如果项目团队更习惯于可变的编程方式，引入 Immer 可以减少学习新的不可变数据操作方法的时间，从而加快开发速度。

6. **性能考虑**：虽然 Immer 使用 `Proxy` 可能有性能开销，但对于大多数应用来说，这种开销是可以接受的。在需要性能优化的地方，Immer 的结构共享可以减少不必要的数据复制和渲染。

7. **现有代码库的重构**：如果你正在重构或增强现有项目，而该项目中已经有大量的直接状态修改代码，引入 Immer 可以帮助你逐步迁移到不可变模式，而无需大幅度重写现有逻辑。

8. **测试和可预测性**：使用 Immer 可以提高应用程序状态的可预测性，这在编写测试和调试时特别有用，因为你可以确定状态只会以你通过 Immer 指定的方式改变。

总而言之，任何涉及复杂状态逻辑、需要增强代码可读性和可维护性、或者希望简化状态更新逻辑的 JavaScript 应用程序，都可以考虑引入 Immer。无论你是使用 React、Vue.js、Angular 或其他框架，Immer 的设计理念和优势都是普遍适用的。如何决定是否引入 Immer，取决于项目的具体需求、团队偏好以及性能要求。
