![image](https://github.com/lecepin/blog/assets/11046969/822a6c12-cc30-4204-a7de-9840fae7e5e4)


## 1. HTMLX

htmx 是一个轻量级的 JavaScript 库，它允许你直接在 HTML 中使用现代浏览器的功能，而不需要编写 JavaScript 代码。通过 htmx，你可以使用 HTML 属性执行 AJAX 请求，使用 CSS 过渡动画，利用 WebSocket 和服务器发送事件 (Server-Sent Events) 等功能来构建现代化的用户界面。

htmx 的特点包括：

- 体积小（压缩后大约 14KB），没有依赖，可扩展，兼容 IE11。
- 通过扩展现有 HTML 标签的功能，比如允许除了 `<a>` 和 `<form>` 之外的元素发起 HTTP 请求，支持多种 HTTP 动词，以及提供更多的 DOM 更新选项。
- 通过简单的 HTML 属性，可以让开发者用声明式编码方式实现丰富的交互效果。
- htmx 是 intercooler.js 的后继产品。

## 2. 诞生背景

![image](https://github.com/lecepin/blog/assets/11046969/ec8aec07-af45-460a-a9a9-b151dbf03b0a)


htmx 的诞生背景来源于现代 web 开发中一个普遍的问题：随着前端技术的复杂性不断增加，开发者不得不学习和维护越来越庞杂的 JavaScript 框架和库，以构建动态和互动式的 web 应用。这些框架和库虽然功能强大，但也带来了更高的学习成本和维护成本。

htmx 旨在通过扩展 HTML（而非替换它），实现动态的 web 交互。它的主要目标是将简洁性和声明性编程引入前端开发中，让开发者能够使用简单的 HTML 属性来实现复杂的功能，如异步请求、局部页面更新和客户端表单处理等。

具体来说，htmx 的设计理念是让开发者能够：

1. 利用已经熟悉的 HTML 和 CSS 知识，无需或很少需要编写 JavaScript 代码。
2. 降低前端开发的复杂性，减少对复杂 JavaScript 框架的依赖。
3. 使代码更易读易维护，通过声明式的标记直接在 HTML 中指定行为。
4. 实现渐进增强，让 web 应用能够在不同程度的技术堆栈上运行，增强兼容性和可访问性。

htmx 通过提供一系列自定义的 HTML 属性，使得开发者能够简化 JavaScript 使用，仅通过 HTML 标签就可实现原本需要复杂脚本才能完成的动态交互功能。这样，开发者可以专注于内容和结构，而不是行为逻辑的实现细节，从而在开发现代 web 应用时更加快速和高效。

## 3. HTMLX VS React…

![image](https://github.com/lecepin/blog/assets/11046969/be1977a3-53dc-4803-9d28-032edff65699)


htmx 与 React 和 Vue 这类现代 JavaScript 框架相比，有以下几个潜在的优势：

1. **简单性和可学习性**：htmx 旨在通过扩展 HTML 的能力来实现丰富的用户交互，因此它的学习曲线通常比较平缓，特别是对于那些熟悉 HTML 和 CSS 但对 JavaScript 不是很熟练的开发者来说。相比之下，React 和 Vue 都有自己的概念和生态系统，需要投入更多时间来学习。

2. **减少 JavaScript 代码**：htmx 通过在 HTML 标签中使用自定义属性来实现交互，减少了编写、测试和维护 JavaScript 代码的需求。而 React 和 Vue 则依赖于大量的 JavaScript 或 TypeScript 代码来构建组件和管理状态。

3. **渐进增强**：htmx 允许开发者在已有的服务器端渲染应用上逐步增加交互性，而不需要重构整个应用，这使得其非常适合逐步迁移老项目或在不要求单页面应用（SPA）的项目中使用。React 和 Vue 则更倾向于用于构建 SPA 或需要前端构建步骤的现代 web 应用。

4. **低技术堆栈要求**：htmx 不需要构建工具或复杂的前端工程化支持，可以直接引入到 HTML 页面中使用。而 React 和 Vue 通常需要配置如 Webpack 或 Vite 这类现代前端构建工具。

5. **轻量级**：htmx 非常轻量，不会给项目带来过多的依赖和负担。React 和 Vue 在这方面相对较重，特别是当项目变得越来越复杂时。

6. **与现有后端框架的紧密集成**：htmx 设计用于与任何服务器端语言或框架无缝集成，它可以很容易地与 Ruby on Rails、Django、Flask 等后端框架结合使用，无需更改现有的服务器端代码结构。

不过，htmx 也有局限性。它不适合构建复杂的单页应用（SPA），因为它没有像 React 或 Vue 那样的组件化和状态管理解决方案。同时，htmx 的功能和性能优化可能不如专门的前端框架那么高级和细致。

总的来说，htmx 更适合于需要快速开发、简单交互、并且希望减少 JavaScript 依赖的项目，而 React 和 Vue 更适用于需要构建复杂、高度交互式、大型单页应用的场景。选择哪个技术栈，应基于项目需求、团队技能和长期维护的考虑。

## 4. 我是否应该迁移到 HTMLX

作为一个 React 开发者，考虑切换技术栈到 htmx 可能需要基于几个关键因素。htmx 不是为了替代 React 而设计，而是为了提供一种不同的开发模式。以下是几个可能说服你考虑使用 htmx 的理由：

1. **简化开发流程**：如果你正在寻找一种可以简化前端开发过程的方法，减少 JavaScript 的编写量，并且依靠 HTML 本身的能力来构建交云富的动态网页，那么 htmx 是一个很好的选择。

2. **提高开发速度**：htmx 可以让你更快地构建和原型化应用，特别是对于小到中型的项目或者需要快速迭代的项目，它的简洁性和易用性可能会显著降低开发时间。

3. **减少学习负担**：对于团队中不熟悉 React 或现代 JavaScript 的成员，htmx 提供了一种更容易上手的方法。它允许团队成员使用他们已经熟悉的 HTML 和 CSS 知识来实现复杂的交互。

4. **无需构建工具**：htmx 不需要依赖复杂的构建系统和构建工具，你可以直接在 HTML 文件中引入 htmx 并开始使用。这使得你不用关心配置如 Webpack 或 Babel 这样的构建工具。

5. **增强现有应用**：如果你在维护一个主要由后端模板渲染的现有应用，并希望在不重构整个应用的情况下增加客户端的交互性能，htmx 可以是一个低成本投入的解决方案。

6. **追求更轻量的页面载入**：htmx 比 React 更轻量，这可能导致更快的页面加载时间，尤其是在移动设备和低带宽环境下。

7. **渐进增强的策略**：htmx 适用于渐进增强的开发策略，你可以逐步增强现有的服务器渲染网页的交互性，而不是从头构建一个单页应用。

然而，值得注意的是，htmx 并不适合所有的场景。如果你正在开发一个需要复杂状态管理、高度组件化、或大量前端逻辑的应用，React 可能仍然是更好的选择。htmx 更适合于那些不需要 React 全部特性集的场景，或者当你希望以一种更简单、更传统的方式增强你的网页时。

## 5. 安装使用

要安装并开始使用 htmx，你可以通过以下几种简单的方式将它集成到你的网页中。

### 1. 通过 CDN 引入

直接在你的 HTML 文件中添加以下 `<script>` 标签来加载 htmx。将这段代码放到 `<head>` 或者 `<body>` 标签的末尾。

```html
<script src="https://unpkg.com/htmx.org"></script>
```

或者，你也可以使用其他 CDN 服务或指定特定版本的 htmx：

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@1.6.0"></script>
```

使用 CDN 是最简单和最快速的方式开始使用 htmx。

### 2. 下载并托管 htmx

你可以从 htmx 的 GitHub 仓库或官网下载最新的 htmx 文件，然后将它上传到你的服务器。

1. 访问 htmx 官网（https://htmx.org/）或 GitHub 仓库。
2. 下载 htmx 的 `.js` 文件。
3. 上传文件到你的服务器，并在 HTML 中通过 `<script>` 标签引用它。

例如：

```html
<script src="/path/to/htmx.js"></script>
```

确保 `/path/to/` 是 htmx 文件在你服务器上的实际路径。

### 3. 使用 npm 或 yarn 安装

如果你的项目使用 Node.js 和 npm（或 yarn），你可以通过包管理器来安装 htmx。

使用 npm：

```sh
npm install htmx.org --save
```

使用 yarn：

```sh
yarn add htmx.org
```

然后在你的 JavaScript 模块或入口文件中引入 htmx：

```javascript
import "htmx.org";
```

或者，你可以将它引入到你的一个特定的脚本文件中，并通过构建过程（例如 Webpack 或 Parcel）将其包含在你的最终打包文件中。

### 4. 元素

htmx 提供了一系列特殊的属性（例如 `hx-get`、`hx-post`、`hx-put`、`hx-delete` 等），这些属性允许你从 HTML 元素直接发起 AJAX 请求。你还可以使用 `hx-trigger` 属性来指定触发 AJAX 请求的事件类型，比如点击事件 (`click`) 或鼠标悬停事件 (`mouseenter`)。

此外，htmx 还支持各种触发修饰符和过滤器，使得你可以更精细地控制 AJAX 请求的触发条件。例如，你可以使用 `once` 修饰符来确保 AJAX 请求只发生一次，或者使用延迟 (`delay`) 来延迟请求的发出。

htmx 同样支持通过服务器响应来控制页面上元素的更新。你可以利用 `hx-swap` 属性来定义响应内容应该如何在 DOM 中被替换或插入，也可以使用扩展的 CSS 选择器语法来指定更新的目标元素。

为了优化用户体验，htmx 也提供了请求指示器（loading 指示器），可以在 AJAX 请求发起时向用户显示一个可见的反馈，例如一个加载中的动画。

htmx 还有许多其它高级功能，如视图转换（View Transitions）、历史支持、事件和日志记录等。通过这些功能，开发者可以创建丰富且高效的用户界面，同时减少编写和维护 JavaScript 代码的工作量。

## 6. 示例

### 1. AJAX 加载内容

假设您有一个服务器端的 URL `/get-content`，它返回一些 HTML 内容。您可以使用 `hx-get` 属性来创建一个按钮，点击后会异步加载内容并将其插入到页面上的指定元素中。

```html
<!-- 点击按钮后，将异步加载内容到 id="content" 的元素中 -->
<button hx-get="/get-content" hx-target="#content">点击我加载内容</button>

<!-- 加载的内容将被显示在这个 div 中 -->
<div id="content"></div>
```

### 2. 表单提交

您可以使用 `htmx` 来异步提交表单。这意味着用户可以提交表单，页面不会刷新，而表单的响应将直接显示在页面上。

```html
<!-- 这个表单提交到 /submit-form 时不会导致页面刷新 -->
<form hx-post="/submit-form" hx-target="#form-result" hx-swap="outerHTML">
  <input type="text" name="name" />
  <input type="submit" value="提交" />
</form>

<!-- 表单提交后响应的内容会显示在这里 -->
<div id="form-result"></div>
```

### 3. 实时搜索

使用 `htmx` 还可以非常容易地创建实时搜索表单，当用户在搜索框输入时，搜索结果可以不断刷新，下面是一个示例：

```html
<!-- 当在 input 中输入文字时，发送 GET 请求到 /search  -->
<input
  hx-get="/search"
  hx-target="#search-results"
  hx-trigger="keyup changed delay:500ms"
  hx-params="q:value"
/>

<!-- 搜索结果将被显示在这里 -->
<div id="search-results"></div>
```

搜索框中键入的内容将被发送到 `/search?q=<输入的值>`，服务器需要根据查询参数 `q` 返回相应的搜索结果。

### 4. 删除操作

使用 `htmx`，您可以很容易地实现在不刷新页面的情况下删除项目：

```html
<!-- 删除 ID 为 123 的项目 -->
<button hx-delete="/delete-item/123" hx-target="#item-123" hx-swap="outerHTML">
  删除项目
</button>

<!-- 项目被删除后，这个元素将被服务器的响应替换或移除 -->
<div id="item-123">...</div>
```

点击按钮时，将向服务器发送一个 DELETE 请求，以删除 ID 为 123 的项目。

### 5. 加载更多内容

创建一个“加载更多”按钮，当点击时，可以加载下一页的内容。

```html
<!-- 点击此按钮将加载下一页，并将内容追加到 id="items" 的元素中 -->
<button hx-get="/get-more-items?page=2" hx-target="#items" hx-swap="afterend">
  加载更多
</button>

<!-- 新加载的内容将追加到这个列表中 -->
<div id="items">
  <!-- 初始内容... -->
</div>
```

在实际应用中，您需要动态更新 `hx-get` 属性中的 `page` 参数，以便加载正确的内容页面。

`htmx` 允许您通过 HTML 添加丰富的交互性，而不是依赖 JavaScript。这些例子只是展示了 `htmx` 功能的一部分。您可以通过查看 `htmx` 的官方文档来了解更多高级功能和用法。

## 7. 命令标签列表

`htmx` 是通过一组自定义的 HTML 属性来工作的，它们通常以 `hx-` 前缀开头。这些属性可以添加到标准的 HTML 标签上，以提供各种动态行为。以下是一些常用的 `htmx` 属性（命令和标签）：

### 核心属性

- `hx-get`: 发起一个 AJAX GET 请求。
- `hx-post`: 发起一个 AJAX POST 请求。
- `hx-put`: 发起一个 AJAX PUT 请求。
- `hx-delete`: 发起一个 AJAX DELETE 请求。
- `hx-patch`: 发起一个 AJAX PATCH 请求。
- `hx-trigger`: 定义触发 AJAX 请求的事件，如 `click`, `keyup`, 等。
- `hx-target`: 指定哪个元素会被请求的响应替换或更新。
- `hx-swap`: 定义如何将响应内容插入到目标元素中，比如 `innerHTML`, `outerHTML`, `beforebegin`, `afterend` 等。

### 增强属性

- `hx-params`: 控制包含哪些参数在请求中，如 `none`, `*`, `vals`, 等。
- `hx-include`: 明确指定哪些元素的值应该包括在请求参数中。
- `hx-indicator`: 指定一个或多个元素，在 AJAX 请求进行时显示为加载指示器。
- `hx-push-url`: 控制是否将 AJAX 请求的 URL 推送到浏览器的历史记录中。
- `hx-prompt`: 在发起请求前提示用户输入消息。
- `hx-confirm`: 在执行操作前要求用户确认。

### 响应处理

- `hx-select`: 从 AJAX 响应中选择一部分内容进行更新，而不是整个响应。
- `hx-headers`: 允许设置自定义请求头。

### 事件属性

- `hx-on`: 指定特定的事件及其处理，如 `hx-on="click: doSomething"`。

### WebSockets

- `hx-ws`: 定义与 WebSocket 连接相关的行为。

### 工具属性

- `hx-boost`: 自动增强页面上的链接和表单，使它们通过 AJAX 异步工作。
- `hx-history-elt`: 指定一个元素，其内容变化将触发浏览器历史记录的更新。
