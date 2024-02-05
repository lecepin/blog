React 浮层组件（也称为弹出组件或弹窗组件）通常是指在用户界面上浮动显示的组件，它们脱离常规的文档流，并且可以在用户进行某些操作时出现在页面的最上层。React 浮层组件可以用于创建模态框（Modal）、下拉菜单（Dropdown）、工具提示（Tooltip）、侧边栏（Sidebar）或任何其他需要动态显示和隐藏且通常位置固定或绝对定位的内容。

React 浮层组件的特点包括：

1. **层级管理**：浮层组件通常具有较高的`z-index`值，使得它们能够显示在其他内容之上。

2. **动态性**：它们通常是响应用户交互（如点击按钮或鼠标悬停）而显示的，并且可以通过用户交互（如点击遮罩层或按下 Escape 键）来关闭。

3. **定位**：浮层组件可以根据触发它们的元素（如按钮或链接）的位置动态定位。

4. **独立渲染**：为了避免 CSS 布局的限制（如`overflow`或父元素的`z-index`），浮层组件通常使用 React 的`ReactDOM.createPortal`方法渲染到 DOM 树的其他位置，比如直接渲染到`document.body`下。

5. **可访问性**（Accessibility）：良好的浮层组件应该考虑到可访问性，比如焦点管理、键盘导航和屏幕阅读器的支持。

## 1. 实现简单的 Tootip

Tootip 就是简单的文字提示气泡框。


![image](https://github.com/lecepin/blog/assets/11046969/d271e4e2-0149-43e1-92cb-aa07a442eb5b)


简单实现：

```jsx
import React, { useState, useRef } from "react";

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef();

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  // 获取触发元素的位置，以便正确定位Tooltip
  const computePosition = () => {
    if (tooltipRef.current) {
      const { top, height } = tooltipRef.current.getBoundingClientRect();
      return {
        top: top + height + window.scrollY,
        left: 0 + window.scrollX,
      };
    }

    return { top: 0, left: 0 };
  };

  const tooltipStyle = {
    position: "absolute",
    border: "1px solid #ccc",
    backgroundColor: "white",
    padding: "5px",
    zIndex: 1000,
    ...computePosition(), // 计算位置并应用样式
    display: visible ? "block" : "none", // 控制显示与隐藏
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={tooltipRef}
    >
      <div
        style={tooltipStyle}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {text}
      </div>
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>
    </div>
  );
};

// 使用Tooltip的组件
const App = () => {
  return (
    <div>
      <p>
        Hover over the word{" "}
        <Tooltip text="A helpful tooltip.">"tooltip"</Tooltip> to see the
        tooltip.
      </p>
    </div>
  );
};
```

## 2. 存在问题

上面的 Tooltip 实现确实可能带来一些问题。以下是一些主要考虑点：

1. **影响原布局**：

   - 由于 Tooltip 采用绝对定位，它可能会覆盖页面上的其他元素而不是占据自己的空间。这可能导致页面元素的重叠，尤其是当 Tooltip 很大的时候。
   - 如果 Tooltip 的触发元素没有设置合适的定位上下文（如 `position: relative`），Tooltip 可能会相对于错误的父元素定位，出现在页面意外的位置。

2. **可能被隐藏**：

   - 如果 Tooltip 的父元素设置了 `overflow: hidden` 或者 `clip-path` 属性，这可能会导致 Tooltip 被裁剪或完全隐藏。
   - 当 Tooltip 出现在视口边缘附近时，部分 Tooltip 可能会位于视口外，从而导致内容不完全可见。

3. **性能问题**：

   - Tooltip 的位置计算涉及 DOM 的读取操作（如 `getBoundingClientRect`），这可能会导致回流（reflow）和重绘（repaint），尤其是在大型应用中或在频繁更新的情况下。
   - 鼠标事件的频繁触发（如 `onMouseEnter` 和 `onMouseLeave`）可能导致 Tooltip 的频繁显示和隐藏，进而引发性能问题。

4. **可访问性问题**：

   - 不使用 `createPortal` 的 Tooltip 可能不会管理焦点，这会影响键盘用户和屏幕阅读器用户的体验。
   - 如果 Tooltip 中的内容对用户理解页面很重要，但仅通过鼠标悬停来显示，键盘用户可能无法访问这些信息。

5. **屏幕适配问题**：

   - Tooltip 在移动设备上可能表现不佳，因为移动设备通常没有悬停状态，可能需要其他机制来触发 Tooltip。
   - 在响应式设计中，Tooltip 可能需要不同的样式或定位策略以适应不同屏幕尺寸。

6. **复杂度增加**：
   - 当页面中有许多 Tooltip 时，管理它们的位置和可见性状态可能会变得复杂。

为了解决这些问题，您可能需要进一步优化 Tooltip 组件，例如：

- 使用 debounce 或 throttle 函数来减少位置计算的频率，优化性能。
- 添加额外的逻辑来确保 Tooltip 在视口内完全可见，例如通过调整位置或改变 Tooltip 出现的方向。
- 通过添加适合键盘导航的交互来提高可访问性，例如使 Tooltip 在获取焦点时显示。
- 为移动设备实现不同的交互模式，或者完全避免在小屏幕上使用 Tooltip。

尽管有这些潜在的问题，但在某些情况下，这种不使用 `createPortal` 的实现方式可能足够满足简单的需求。对于更复杂的情况，则可能需要考虑更高级的解决方案，例如使用 `React.createPortal` 或第三方库，这些库已经解决了上述问题。

## 3. createPortal

![image](https://github.com/lecepin/blog/assets/11046969/1e056eb3-a5b5-4b84-b81b-19f6844422e0)


`ReactDOM.createPortal` 是 React 提供的一个 API，它允许你把子节点渲染到存在于父组件之外的 DOM 节点上。这个方法的签名如下：

```jsx
ReactDOM.createPortal(child, container);
```

其中 `child` 是任何可以渲染的 React 子元素，例如一个元素、字符串或碎片（fragment），而 `container` 是一个 DOM 元素。

`createPortal` 的主要用处包括：

1. **事件冒泡**：
   使用 `createPortal` 渲染的子组件会在 DOM 树上处于不同的位置，但从 React 的角度来看，它仍然存在于 React 组件树中原来的位置，这意味着事件可以正常冒泡到 React 父组件，尽管这些元素在 DOM 层级结构中并不直接相连。

2. **避免 CSS 约束**：
   在某些情况下，你可能不希望子组件受到父组件 CSS 的影响，例如在一个设置了`overflow: hidden`或`z-index`的父元素内部渲染一个模态对话框（modal）或工具提示（tooltip）。通过使用 `createPortal`，模态或工具提示可以渲染到 DOM 树中的其他位置，例如直接渲染到`document.body`下，从而避免了这些 CSS 约束。

3. **视觉上的“脱离”**：
   当你需要组件在视觉上位于页面层次结构之外时（如模态框、通知、悬浮卡片等），`createPortal` 提供了一种将组件结构上与视觉结构分离的方法。这可能是因为这些组件需要在页面上占据最顶层，以避免被其他元素遮挡。

### 3. createPortal 注意事项

假设你指的是 "reactportal" 中可能遇到的问题，那么在使用 React 的 `createPortal` API 时，以下是一些可能遇到的典型问题和挑战：

1. **事件冒泡**：
   使用 `createPortal` 创建的 React 元素虽然在 DOM 树中是在不同位置，但它们在 React 组件树中仍然保持原位置。因此，事件冒泡将不按照 DOM 结构进行，而是沿着 React 组件树向上冒泡。这可能导致一些意料之外的行为，尤其是在复杂的事件处理逻辑中。

2. **样式隔离**：
   当弹出的内容移动到 DOM 树的其他部分时，可能会丢失某些由上层组件提供的 CSS 样式。你可能需要额外处理以确保弹出内容的样式与预期一致。

3. **上下文不一致**：
   虽然 `createPortal` 允许在 React 组件树中保留上下文，但如果你在 DOM 树中的其他位置使用 Portal，与 Portal 交互的 DOM 元素可能不会有相同的上下文（例如，React 的 Context API）。

4. **辅助技术的支持**：
   移动到 DOM 树其他位置的内容可能会影响辅助技术（如屏幕阅读器）对页面的解读，因为这些内容在语义结构上可能被解读为与它们在屏幕上的视觉位置不一致。

5. **性能考量**：
   如果你频繁创建和销毁 Portal，或者 Portal 中包含大量动态内容，这可能会影响应用的性能。

6. **服务端渲染（SSR）兼容性**：
   在服务端渲染环境下，由于没有 `document.body`，使用 `createPortal` 可能需要额外的处理来确保代码的兼容性。

7. **滚动和定位问题**：
   如果 Portal 内容需要基于触发元素的位置进行定位，页面滚动或窗口大小变化时可能需要更新位置，这可能会需要额外的事件监听和状态管理。

8. **嵌套 Portal**：
   在 Portal 内部创建另一个 Portal 可能会导致一些复杂的层级问题，特别是在处理事件和样式时。

9. **可访问性（a11y）**：
   创建的 Portal 内容可能会打乱键盘导航顺序，或者改变焦点管理的预期行为。你可能需要手动管理焦点以确保良好的可访问性。

为了解决这些问题，你可能需要实施一些策略，比如在样式上使用更高的特异性，使用辅助技术友好的方法来管理焦点，或者确保上下文在 Portal 内部和外部保持一致。此外，对于性能和兼容性问题，可能需要一些额外的优化和测试。

## 4. cloneElement

![image](https://github.com/lecepin/blog/assets/11046969/c75b8b4f-5273-44c5-ac6a-6a0d781734b0)


React 的 `cloneElement` 函数允许你克隆一个 React 元素，并传入新的 props、ref。这个函数的签名如下：

```jsx
React.cloneElement(element, [props], [...children]);
```

- `element` 是你想要克隆的 React 元素。
- `props` 是一个对象，其中包含了你希望在克隆的元素上设置或覆盖的新属性。
- `children` 是任意数量的子元素，用于替换克隆元素的子元素。

`cloneElement` 主要用于以下几种场景：

1. **属性增强**：
   当你需要增强一个元素的功能而又不想显式创建一个新的组件时，你可以使用 `cloneElement` 来添加或修改属性。例如，你可以为一个元素添加额外的 `onMouseEnter`、`onClick` 等事件处理器。

2. **条件渲染**：
   你可以对子组件进行有条件的修改，例如在特定情况下为子组件添加附加的 props 或样式。

3. **引用保持**：
   `cloneElement` 在克隆时保持子元素类型的不变和 `key` 的不变，这有助于保持组件的状态和避免不必要的卸载和重新挂载。

4. **与高阶组件（Higher-Order Components, HOCs）结合**：
   在开发高阶组件时，`cloneElement` 可以用来包裹传入的子组件，并为其注入需要的 props。

5. **与 React 的 Context 结合**：
   有时候你可能需要在组件树中深处的组件接收到来自顶层的 props，为了避免明确地传递这些 props，你可以使用 `cloneElement` 结合 Context API 来灵活地为深层组件注入所需的数据。

以下是一个使用 `cloneElement` 来增强子组件 `onMouseEnter` 事件的例子：

```jsx
import React, { cloneElement } from "react";

class EnhancedComponent extends React.Component {
  handleMouseEnter = () => {
    // 提供额外的 onMouseEnter 行为
    console.log("Mouse entered!");
  };

  render() {
    const { children } = this.props;

    // 假设我们只处理一个子元素的情况
    const child = React.Children.only(children);

    // 克隆子元素并注入新的 onMouseEnter 处理器
    const enhancedChild = cloneElement(child, {
      onMouseEnter: this.handleMouseEnter,
    });

    return enhancedChild;
  }
}

export default EnhancedComponent;
```

在这个例子中，`EnhancedComponent` 接收一个单一的子组件，并使用 `cloneElement` 对其进行克隆，添加一个新的 `onMouseEnter` 事件处理器。如果原始子组件已经有 `onMouseEnter` 处理器，这个新的处理器会被合并，两个处理器都会被执行。

总之，`cloneElement` 在不同的用例中都很有用，尤其是当你想要微调元素的属性或行为而又不想创建全新的组件时。然而，过度使用 `cloneElement` 可能使组件变得难以理解和维护，因此应该谨慎使用。

## 5. 重写 Tootip

使用 `cloneElement` 和 `createPortal` 来实现一个 Tooltip 组件，可以将 Tooltip 的内容渲染到页面的顶级位置，同时注入事件处理器到触发元素。这样的实现可以解决上文提到的一些问题，例如避免因为 `overflow` 或 `z-index` 造成的渲染问题。

以下是一个简单的函数式组件模式的 `Tooltip` 实现：

```jsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const childRef = useRef(null);

  const handleMouseEnter = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", handleMouseLeave);
    };
  }, []);

  const tooltip =
    show &&
    ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          padding: "5px",
          borderRadius: "3px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {content}
      </div>,
      document.body
    );

  const clonedChild = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: childRef,
  });

  return (
    <>
      {clonedChild}
      {tooltip}
    </>
  );
};

// 使用Tooltip的组件
const App = () => {
  return (
    <div style={{ marginTop: "100px", marginLeft: "100px" }}>
      <Tooltip content="This is a tooltip!">
        <button>Hover over me!</button>
      </Tooltip>
    </div>
  );
};

export default App;
```

在这个例子中，`Tooltip` 组件接受一个 `children` 属性和一个 `content` 属性。`children` 是触发 Tooltip 的元素，`content` 是显示在 Tooltip 中的内容。

使用 `cloneElement`，我们为 `children` 元素克隆一个新版本并添加了 `onMouseEnter` 和 `onMouseLeave` 事件处理器，用于控制 Tooltip 的显示和隐藏。

我们使用 `createPortal` 将 Tooltip 内容渲染到 `document.body` 中，这样 Tooltip 就能够避开任何本地 CSS 的限制。`show` 状态控制 Tooltip 的显示，`position` 状态用于计算 Tooltip 应该出现在页面上的位置。

通过 `useEffect`，我们添加了对 `scroll` 事件的监听来在页面滚动时隐藏 Tooltip，防止 Tooltip 位置不正确。

这样，你就得到了一个使用 `cloneElement` 和 `createPortal` 实现的 Tooltip 组件，它可以在不影响页面布局和样式的情况下工作，并且能够在页面上的任何位置正确地显示 Tooltip。

### 5.1 同步元素滚动

上面的代码示例中，Tooltip 在触发元素的 `onMouseEnter` 事件处理器中计算其显示位置，并在 `onMouseLeave` 或窗口的 `scroll` 事件中被隐藏。这意味着一旦 Tooltip 显示出来，如果用户滚动页面，Tooltip 会保持在首次显示时计算出的固定位置，而不会跟随触发元素移动。

如果要实现 Tooltip 位置与触发元素同步滚动的效果，需要动态更新 Tooltip 的位置，以响应页面的滚动事件。这可以通过在 `useEffect` 钩子中添加对滚动事件的监听来实现。在滚动事件的回调中，我们可以重新计算 Tooltip 的位置，使其与触发元素保持同步。

以下是更新后的代码示例，实现了 Tooltip 与触发元素同步滚动的效果：

```jsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const childRef = useRef(null);

  const updatePosition = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      };
    }
  };

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    setPosition(updatePosition());
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (show) {
        setPosition(updatePosition());
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 清理函数
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]); // 依赖于 `show`，仅当 Tooltip 显示时添加事件监听

  const tooltip =
    show &&
    ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          padding: "5px",
          borderRadius: "3px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          // 添加 transition 效果使位置更新更平滑
          transition: "top 0.3s, left 0.3s",
        }}
      >
        {content}
      </div>,
      document.body
    );

  const clonedChild = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: childRef,
  });

  return (
    <>
      {clonedChild}
      {tooltip}
    </>
  );
};

// 使用Tooltip的组件
const App = () => {
  return (
    <div style={{ marginTop: "100px", marginLeft: "100px" }}>
      <Tooltip content="This is a tooltip!">
        <button>Hover over me!</button>
      </Tooltip>
    </div>
  );
};

export default App;
```

在这个更新的实现中，添加了 `updatePosition` 函数，它负责根据当前触发元素的位置来更新 Tooltip 的位置。在 `useEffect` 中注册了页面滚动的事件监听器 `handleScroll`，它会在页面滚动时调用 `updatePosition` 来更新 Tooltip 的位置。监听器仅在 Tooltip 显示时进行注册，从而避免不必要的事件监听和执行。

综上所述，更新后的代码使得 Tooltip 能够在页面滚动时跟随触发元素移动，从而解决了位置同步的问题。

### 5.2 防止 cloneElement 注入破坏

在使用 `cloneElement` 对子组件增强或注入新的属性和事件处理器时，需要特别注意不要覆盖子组件原有的属性和事件处理器。为了避免这种覆盖，可将原有的属性和处理器与新的属性和处理器合并。

下面是一个示例，它展示了如何使用 `cloneElement` 来增强子组件的 `onMouseEnter` 和 `onMouseLeave` 事件处理器，同时保留原有的事件处理器：

```jsx
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const childRef = useRef(null);

  const handleMouseEnter = (originalOnMouseEnter) => (event) => {
    // 如果子组件有自己的 onMouseEnter 事件处理器，先调用它
    if (originalOnMouseEnter) {
      originalOnMouseEnter(event);
    }
    // 然后执行 Tooltip 特定的逻辑
    setShow(true);
  };

  const handleMouseLeave = (originalOnMouseLeave) => (event) => {
    // 如果子组件有自己的 onMouseLeave 事件处理器，先调用它
    if (originalOnMouseLeave) {
      originalOnMouseLeave(event);
    }
    // 然后执行 Tooltip 特定的逻辑
    setShow(false);
  };

  const tooltipElement =
    show &&
    ReactDOM.createPortal(
      <div
        style={
          {
            /* Tooltip样式 */
          }
        }
      >
        {content}
      </div>,
      document.body
    );

  // 克隆子组件，合并事件处理器
  const clonedChild = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: handleMouseEnter(children.props.onMouseEnter),
    onMouseLeave: handleMouseLeave(children.props.onMouseLeave),
  });

  return (
    <>
      {clonedChild}
      {tooltipElement}
    </>
  );
};

// 使用Tooltip的组件
const App = () => {
  const handleButtonMouseEnter = () => {
    console.log("Button's original onMouseEnter called");
  };

  const handleButtonMouseLeave = () => {
    console.log("Button's original onMouseLeave called");
  };

  return (
    <div style={{ marginTop: "100px", marginLeft: "100px" }}>
      <Tooltip content="This is a tooltip!">
        <button
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          Hover over me!
        </button>
      </Tooltip>
    </div>
  );
};

export default App;
```

在 `Tooltip` 组件中，我们为 `handleMouseEnter` 和 `handleMouseLeave` 方法分别传入了子组件原有的 `onMouseEnter` 和 `onMouseLeave` 事件处理器。然后在这些方法的闭包中，如果存在原有的事件处理器，我们先调用这些原有的事件处理器，接着执行 Tooltip 的逻辑。这样一来，我们就可以确保子组件的原有行为不会被 Tooltip 组件的行为覆盖。

如此，`cloneElement` 能够安全地用于增强子组件，而不会破坏子组件的预期行为。

## 6. 其他优化

在实现 React 组件时，尤其是在开发像 Tooltip 这样可能大量使用的组件时，考虑性能优化是非常重要的。下面是一些性能优化的建议：

1. **避免不必要的重新渲染**：

   - 使用 `React.memo` 来包裹函数组件，避免在 props 没有改变的情况下发生不必要的渲染。
   - 确保你的组件尽可能地只在必要时更新。比如，如果 Tooltip 组件的状态没有改变，就没有必要更新 DOM。

2. **减少重计算**：

   - 通过缓存计算结果（如使用 `useMemo` 钩子），减少 Tooltip 位置计算的次数。
   - 使用 `throttle` 或 `debounce` 函数限制事件处理器的调用频率，尤其是对于像 `resize` 和 `scroll` 这样可能频繁触发的事件。

3. **优化事件处理器**：

   - 确保添加的事件监听器（比如滚动监听器）在组件卸载时被移除，以避免内存泄漏。
   - 如果有可能，使用事件委托来减少事件监听器的数量。

4. **使用 `shouldComponentUpdate` 或 `React.PureComponent`**：

   - 对于类组件，可以通过实现 `shouldComponentUpdate` 方法来避免不必要的更新。
   - 如果你的类组件拥有不可变的 props 和 state，可以考虑使用 `React.PureComponent`，它自动为 `shouldComponentUpdate` 提供了一个浅比较实现。

5. **减少 DOM 操作**：

   - 对于使用 `createPortal` 的组件，尽可能减少 DOM 节点的插入和移除操作。可以考虑在应用的顶层预先定义好挂载点，而不是动态创建和销毁。

6. **利用 CSS 动画代替 JS 动画**：

   - 当可能时，使用 CSS 动画和过渡效果，因为它们可以利用 GPU 加速，而 JS 动画可能会触发更多的重绘和回流。

7. **使用懒加载**：

   - 如果 Tooltip 内容很大或包含图片等资源，可以考虑使用懒加载技术，只有当 Tooltip 显示时才加载内容。

8. **避免内联函数定义**：

   - 避免在渲染方法中定义内联函数，因为这将在每次渲染时创建新的函数实例，这可能会导致子组件的不必要重渲染。

9. **分离组件**：

   - 将大型组件拆分成更小、更容易管理的子组件，这样可以更精细地控制渲染行为。

10. **使用 `key` 属性**：
    - 当渲染列表或集合时，确保每个元素都有一个独特的 `key` 属性，这可以帮助 React 在更新过程中识别和重用 DOM 节点。

通过实施上述优化策略，你可以提高组件的性能，特别是在渲染大量 Tooltip 或在滚动等高频事件触发时。性能优化是一个持续的过程，始终需要根据实际场景和应用需求来评估和调整。
