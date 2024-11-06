![image](https://github.com/user-attachments/assets/991f20ec-0201-48f3-8823-0d14c854e7f3)


https://github.com/handlebars-lang/handlebars.js

## 1. Handlebars

Handlebars.js 是一个流行的模板引擎，基于 JavaScript，常用于前端和 Node.js 环境。它采用逻辑简单的模板语法，用于将动态数据填充到 HTML 模板中。与一些其他模板引擎不同，Handlebars.js 遵循逻辑与视图分离的原则，限制在模板中编写复杂的 JavaScript 逻辑，从而保持模板的简洁和可维护性。

```html
<p>{{firstname}} {{lastname}}</p>
```

Handlebars 表达式是一个 `{{`，一些内容，后跟一个 `}}`。执行模板时，这些表达式会被输入对象中的值所替换。

## 2. 诞生背景

Handlebars.js 诞生于 2010 年左右，是从 Mustache 模板引擎发展而来的。它的诞生背景与当时前端开发中对模板引擎的需求密切相关，主要是为了解决以下几个问题：

### 1. **视图逻辑和业务逻辑分离**

在传统的 JavaScript 编程中，动态生成 HTML 通常会混合大量的业务逻辑和 DOM 操作，导致代码复杂、不易维护。Handlebars.js 提供了一种更清晰的方法，将 HTML 模板和 JavaScript 逻辑分开，通过占位符的方式在 HTML 中表示数据，而不直接处理业务逻辑。这种模式更易维护和调试，也符合 MVC（Model-View-Controller）架构的分离原则。

### 2. **简化 HTML 渲染**

在当时，JavaScript 渲染 HTML 的方式通常涉及大量 DOM 操作，如 `document.createElement`、`innerHTML` 等，写法繁琐，且性能不佳。Handlebars.js 允许开发者将模板和数据简单地合并生成最终的 HTML，无需手动操作 DOM，从而加快了开发速度。

### 3. **增强 Mustache 功能**

Handlebars.js 是对 Mustache 模板引擎的增强。Mustache 本身是一种逻辑少的模板引擎，遵循“无逻辑模板”原则，但它的功能较为有限。为了更灵活地控制模板渲染逻辑，Handlebars.js 在 Mustache 的基础上引入了 **Helper** 和 **Partial** 的概念，使开发者可以定义自定义函数（Helper）和复用小模块（Partial），让模板的表达能力更强。

### 4. **减少后端模板渲染的压力**

随着单页应用（SPA）和前后端分离架构的流行，前端承担了更多的视图渲染责任。Handlebars.js 等模板引擎帮助前端在客户端渲染模板，减轻了后端服务器的负担，同时也提升了用户体验，因为无需等待服务器渲染即可更新页面内容。

### 5. **跨平台适用性**

Handlebars.js 可以在浏览器和 Node.js 环境下使用，方便跨平台开发。无论是前端渲染还是在 Node.js 后端生成 HTML，Handlebars.js 都能胜任。

## 3. 核心构成

Handlebars.js 由多个核心概念构成，这些概念共同构建了其强大而简洁的模板系统。下面详细介绍 Handlebars.js 的几个关键组成部分，以及它们的作用和使用方式。

### 1. **模板（Template）**

Handlebars 模板是 HTML 中的一个部分，包含了一些特殊的占位符。模板中的内容不会直接渲染，而是会在结合数据后生成 HTML。模板的作用是为数据定义结构和样式，使渲染过程简单而灵活。

- **模板语法**  
  Handlebars 使用双大括号 `{{}}` 作为占位符，称为**Mustache** 表达式。通常用于在模板中插入变量、执行条件语句或循环。

  **示例：**

  ```html
  <script id="my-template" type="text/x-handlebars-template">
    <h1>Hello, {{name}}!</h1>
  </script>
  ```

  上面定义了一个包含占位符 `{{name}}` 的模板，用于显示名称。

### 2. **数据上下文（Context）**

Handlebars 通过上下文对象将数据传递给模板。模板在渲染时会访问上下文中的属性，并将其插入到对应的占位符中。上下文通常是一个 JavaScript 对象。

**示例：**

```javascript
const data = {
  name: "Alice",
};
```

上述上下文将会替换模板中的 `{{name}}` 为 “Alice”。

### 3. **Helper 函数（Helpers）**

Helper 是 Handlebars 提供的一种功能扩展方式，可以在模板中执行特定逻辑。通过 Helper，开发者可以编写自定义函数来增强模板的表达能力。Helper 分为**内置 Helper** 和 **自定义 Helper**。

- **内置 Helper**：例如 `{{#if}}`、`{{#each}}` 等，用于在模板中添加条件判断、循环等功能。

  ```html
  {{#if isAdmin}}
    <p>Welcome, Admin!</p>
  {{else}}
    <p>Welcome, Guest!</p>
  {{/if}}
  ```

- **自定义 Helper**：可以注册自定义函数，并在模板中调用。例如，定义一个将字符串转为大写的 Helper：

  ```javascript
  Handlebars.registerHelper("uppercase", function (str) {
    return str.toUpperCase();
  });
  ```

  使用时：

  ```html
  <p>{{uppercase name}}</p>
  ```

### 4. **部分模板（Partials）**

**部分模板**（Partials）用于复用模板代码。可以将常用的模板片段定义为部分模板，然后在主模板中嵌入使用。它非常适合需要重复显示的元素，如导航栏、页脚等。

- **注册 Partial**：

  ```javascript
  Handlebars.registerPartial("userInfo", "<p>Name: {{name}}</p>");
  ```

- **在模板中使用 Partial**：

  ```html
  {{> userInfo}}
  ```

以上会将 `userInfo` 部分插入到模板中，显示用户的姓名。

### 5. **编译与渲染**

Handlebars.js 的模板在使用前需要先编译，然后再结合数据生成 HTML。编译将模板转化为可执行的 JavaScript 函数，加快了后续渲染的速度。

- **编译模板**：

  ```javascript
  const source = document.getElementById("my-template").innerHTML;
  const template = Handlebars.compile(source);
  ```

- **渲染模板**：

  ```javascript
  const data = { name: "Alice" };
  const html = template(data);
  document.getElementById("output").innerHTML = html;
  ```

上面代码中，通过 `compile` 函数编译模板，之后将数据传入编译后的函数 `template` 中，生成 HTML 字符串。

### 6. **块级 Helper（Block Helpers）**

块级 Helper 是一个扩展功能，允许对特定的模板块添加逻辑控制。Handlebars 的内置 Helper `#if`、`#each`、`#unless` 都属于块级 Helper。开发者还可以创建自定义块级 Helper。

- **自定义块级 Helper**：

  ```javascript
  Handlebars.registerHelper("bold", function (options) {
    return "<strong>" + options.fn(this) + "</strong>";
  });
  ```

  在模板中：

  ```html
  {{#bold}}This text will be bold.{{/bold}}
  ```

### 7. **注册条件判断（Built-in Conditionals）**

Handlebars 内置的条件语句包括 `#if`、`#unless`。可以根据上下文中的条件渲染不同的内容。配合其他 Helper，可以实现复杂的模板逻辑。

**示例：**

```html
{{#if isAvailable}}
  <p>Item is available</p>
{{else}}
  <p>Item is not available</p>
{{/if}}
```

### 8. **安全输出**

Handlebars 默认会对变量输出进行 HTML 转义，以防止 XSS 攻击。当需要输出 HTML 时，可以使用 `{{{` 和 `}}}` 三个大括号包裹变量，这样输出的内容不会被转义。

```html
{{{htmlContent}}}  <!-- 不会转义 HTML 标签 -->
```

Handlebars.js 的构成和各个组成部分的用法如下：

- **模板**：定义 HTML 结构和数据插入位置。
- **数据上下文**：为模板提供数据源。
- **Helper**：扩展模板逻辑，可以是内置 Helper 或自定义函数。
- **部分模板**：用于复用模板片段，增强代码的复用性。
- **编译与渲染**：编译模板并结合数据生成 HTML。
- **块级 Helper**：支持自定义逻辑控制的块状结构。
- **安全输出**：防止 XSS，保护数据输出的安全性。

## 4. 快速上手

npm:

```
npm install handlebars
```

CDN:

```
https://cdnjs.com/libraries/handlebars.js
http://www.jsdelivr.com/#!handlebarsjs
```

以下是 Handlebars.js 的快速上手指南，包括浏览器使用方法和 npm 使用方法：

### 一、浏览器中使用 Handlebars.js

1. **引入 Handlebars.js**

   可以通过 CDN 引入 Handlebars.js：

   ```html
   <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js"></script>
   ```

2. **编写模板**

   在 HTML 中创建一个 `<script>` 标签，定义模板内容。给它一个唯一的 `id`，以便后续获取模板内容。

   ```html
   <script id="template" type="text/x-handlebars-template">
     <h1>Hello, {{name}}!</h1>
     <p>Your age is {{age}}.</p>
   </script>
   ```

3. **编写 JavaScript 代码**

   获取模板内容并进行编译，然后结合数据生成 HTML，最后插入到页面中。

   ```html
   <script>
     // 获取模板内容
     const source = document.getElementById("template").innerHTML;
     // 编译模板
     const template = Handlebars.compile(source);
     // 定义数据
     const context = {
       name: "Alice",
       age: 30
     };
     // 渲染模板并插入页面
     const html = template(context);
     document.getElementById("output").innerHTML = html;
   </script>
   ```

4. **显示结果**

   在 HTML 中定义一个容器来显示生成的内容。

   ```html
   <div id="output"></div>
   ```

   **完整代码示例：**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>Handlebars Example</title>
     <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js"></script>
   </head>
   <body>
     <!-- 定义模板 -->
     <script id="template" type="text/x-handlebars-template">
       <h1>Hello, {{name}}!</h1>
       <p>Your age is {{age}}.</p>
     </script>

     <!-- 显示渲染结果的容器 -->
     <div id="output"></div>

     <script>
       // 获取并编译模板
       const source = document.getElementById("template").innerHTML;
       const template = Handlebars.compile(source);

       // 数据
       const context = {
         name: "Alice",
         age: 30
       };

       // 渲染模板并插入页面
       const html = template(context);
       document.getElementById("output").innerHTML = html;
     </script>
   </body>
   </html>
   ```

### 二、通过 npm 使用 Handlebars.js

1. **安装 Handlebars**

   使用 npm 安装 Handlebars.js：

   ```bash
   npm install handlebars
   ```

2. **创建模板文件**

   在 JavaScript 文件中导入 Handlebars，并定义模板内容。

   ```javascript
   // 导入 Handlebars
   const Handlebars = require("handlebars");

   // 定义模板
   const source = "<h1>Hello, {{name}}!</h1><p>Your age is {{age}}.</p>";

   // 编译模板
   const template = Handlebars.compile(source);

   // 定义数据
   const context = {
     name: "Bob",
     age: 25,
   };

   // 渲染模板
   const html = template(context);

   console.log(html);
   ```

## 5. 语法概览

| 语法/功能           | 表达式或用法                     | 说明                             |
| ------------------- | -------------------------------- | -------------------------------- |
| **插值表达式**      | `{{变量}}`                       | 输出变量的值，自动转义           |
| **原始 HTML 插值**  | `{{{变量}}}`                     | 输出 HTML，不转义                |
| **条件判断**        | `{{#if 条件}}...{{/if}}`         | 条件为真时渲染                   |
| **反向条件判断**    | `{{#unless 条件}}...{{/unless}}` | 条件为假时渲染                   |
| **数组循环**        | `{{#each 数组}}...{{/each}}`     | 遍历数组                         |
| **对象循环**        | `{{#each 对象}}...{{/each}}`     | 遍历对象，使用 `@key` 引用属性名 |
| **上下文引用**      | `this`、`@root`                  | 当前上下文、全局上下文           |
| **部分模板**        | `{{> partialName}}`              | 插入复用模板                     |
| **内置 Helper**     | `#if`、`#unless`、`#each` 等     | 基础控制结构                     |
| **自定义 Helper**   | `Handlebars.registerHelper`      | 增强模板表达能力                 |
| **块级 Helper**     | 自定义 `options.fn`              | 对模板块进行控制                 |
| **调试 Helper**     | `{{log 变量}}`                   | 控制台输出调试信息               |
| **属性查找 Helper** | `{{lookup 对象 "属性"}}`         | 动态查找对象属性                 |
| **编译与渲染**      | `Handlebars.compile`             | 编译模板生成渲染函数             |

这样整理的 Handlebars 语法结构会更直观，可以快速找到相应的表达式和用法。

## 6. @元数据 变量

在 Handlebars.js 中，`@` 前缀用来引用一些特殊的「元数据」变量，这些变量在模板中不属于普通的数据字段，而是帮助开发者更灵活地访问循环、层次和上下文相关的信息。

### 1. `@index`

- **说明**：在 `{{#each}}` 循环中使用，表示当前项在数组中的索引，起始索引为 `0`。
- **用法示例**：
  ```handlebars
  {{#each items}}
    <p>{{@index}}: {{this}}</p>
  {{/each}}
  ```
- **渲染结果**（假设 `items` 为 `["apple", "banana", "cherry"]`）：
  ```html
  <p>0: apple</p>
  <p>1: banana</p>
  <p>2: cherry</p>
  ```

### 2. `@key`

- **说明**：在对象的 `{{#each}}` 循环中使用，表示当前对象属性的键名。
- **用法示例**：
  ```handlebars
  {{#each user}}
    <p>{{@key}}: {{this}}</p>
  {{/each}}
  ```
- **渲染结果**（假设 `user` 为 `{ name: "Alice", age: 30 }`）：
  ```html
  <p>name: Alice</p>
  <p>age: 30</p>
  ```

### 3. `@root`

- **说明**：表示模板的全局上下文对象。在嵌套结构中，`@root` 用于访问最顶层的数据，避免因为层次切换而无法引用全局数据。
- **用法示例**：
  ```handlebars
  {{#each users}}
    <p>{{this.name}} - Parent: {{@root.companyName}}</p>
  {{/each}}
  ```
- **渲染结果**（假设 `users` 为一个用户列表，顶层数据有 `companyName` 字段）：
  ```html
  <p>Alice - Parent: OpenAI</p>
  <p>Bob - Parent: OpenAI</p>
  ```

### 4. `@first`

- **说明**：在 `{{#each}}` 循环中使用，表示当前项是否为数组的第一个元素。值为布尔值（`true` 或 `false`）。
- **用法示例**：
  ```handlebars
  {{#each items}}
    {{#if @first}}
      <p>First item: {{this}}</p>
    {{else}}
      <p>Other item: {{this}}</p>
    {{/if}}
  {{/each}}
  ```
- **渲染结果**（假设 `items` 为 `["apple", "banana", "cherry"]`）：
  ```html
  <p>First item: apple</p>
  <p>Other item: banana</p>
  <p>Other item: cherry</p>
  ```

### 5. `@last`

- **说明**：在 `{{#each}}` 循环中使用，表示当前项是否为数组的最后一个元素。值为布尔值。
- **用法示例**：
  ```handlebars
  {{#each items}}
    {{#if @last}}
      <p>Last item: {{this}}</p>
    {{else}}
      <p>Other item: {{this}}</p>
    {{/if}}
  {{/each}}
  ```
- **渲染结果**（假设 `items` 为 `["apple", "banana", "cherry"]`）：
  ```html
  <p>Other item: apple</p>
  <p>Other item: banana</p>
  <p>Last item: cherry</p>
  ```

| `@data` 变量 | 用途                             | 用法示例                               |
| ------------ | -------------------------------- | -------------------------------------- |
| `@index`     | 在数组循环中表示当前项索引       | `{{@index}}` 输出当前项的索引          |
| `@key`       | 在对象循环中表示当前项的键名     | `{{@key}}` 输出对象的属性名            |
| `@root`      | 全局上下文，用于访问最顶层数据   | `{{@root.someField}}` 访问最外层的数据 |
| `@first`     | 数组循环中标记是否为第一个元素   | `{{#if @first}}` 判断当前是否为首项    |
| `@last`      | 数组循环中标记是否为最后一个元素 | `{{#if @last}}` 判断当前是否为末项     |

这些 `@` 变量使得 Handlebars 在循环、层次嵌套和条件控制上更灵活，帮助实现更精确的数据渲染。
