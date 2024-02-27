![image](https://github.com/lecepin/blog/assets/11046969/a2e0c5dc-cc61-4762-836e-27eabe216c36)


## 1. fastify

Fastify 是一个高效且快速的 Node.js web 框架，专为提供最佳的性能而设计。它是相对较新的，但已经因其高性能和低开销而受到许多开发者的欢迎。Fastify 提供了一个简洁的开发体验，同时支持快速的路由和插件架构，使得开发者可以快速构建和扩展他们的应用。

Fastify 可以被视为 Node.js 中的一个高效、现代化的 web 框架，是构建快速 web 应用的一个优秀选择。

主要特性和原则：

- **高性能**：据我们所知，Fastify 是最快的 web 框架之一，根据代码复杂度，我们可以处理每秒高达 30,000 个请求。
- **可扩展**：Fastify 通过其钩子、插件和装饰器完全可扩展。
- **基于模式**：虽然不是强制的，但我们建议使用 JSON Schema 来验证你的路由并序列化你的输出，内部地，Fastify 将模式编译成一个高性能的函数。
- **日志记录**：日志非常重要但成本高昂；我们选择了最佳的日志记录器 Pino 来几乎消除这一成本！
- **开发者友好**：这个框架旨在非常表达性，并在不牺牲性能和安全性的情况下，帮助开发者日常使用。
- **TypeScript 准备就绪**：我们努力维护 TypeScript 类型声明文件，以支持不断增长的 TypeScript 社区。

## 2. 诞生背景

Fastify 的诞生背景主要源于对现有 Node.js web 框架的性能和开发效率的需求。在 Fastify 出现之前，Express 和 Koa 已经是 Node.js 领域广泛使用的两个框架。虽然它们非常流行且易于使用，但在性能方面，尤其是在处理大量请求时，可能不会提供最优的性能。

Fastify 旨在解决以下几个关键问题：

1. **性能**：Fastify 的核心目标之一是提供比现有框架更高的性能。它通过减少每个请求的开销来实现这一点，使其能够处理更多的请求，这对于构建高性能应用程序至关重要。

2. **开发效率**：尽管性能至关重要，但开发效率同样重要。Fastify 通过其插件架构和开箱即用的功能（如模式验证、日志记录等）提供了一个高效且易于使用的开发环境，这有助于加速开发过程并减少潜在的错误。

3. **模式验证**：Fastify 内置对 JSON Schema 的支持，这不仅有助于验证客户端输入，还能确保应用程序的数据一致性和可靠性。这是许多框架在核心层面没有集成的功能。

4. **可扩展性**：通过其插件架构，Fastify 允许开发者轻松地添加新功能或集成第三方库，而不会对应用程序的整体性能产生重大影响。

通过解决这些问题，Fastify 为开发高性能、可维护且易于开发的 Node.js 应用程序提供了一个强大的平台。这些特性让 Fastify 在 JavaScript 社区中迅速获得了关注和使用。

## 3. 高性能实现

![image](https://github.com/lecepin/blog/assets/11046969/791108b4-f74f-48c6-a1f1-847ac83d9cdd)


Fastify 实现高性能的关键在于它的设计和架构选择，这些选择帮助最小化每个请求的开销。下面是 Fastify 实现高性能的几个关键方面：

1. **高效的路由分发**：Fastify 使用的是一个非常快的路由分发机制，这意味着当请求进来时，Fastify 能够迅速决定哪个处理函数应该被调用。这种快速的路由决策极大地减少了请求处理时间。

2. **预编译的序列化**：Fastify 在发送响应之前不是在运行时动态序列化对象，而是使用预编译的序列化函数。这种方法减少了每个请求的处理时间，因为响应可以更快地被序列化并发送给客户端。

3. **模式驱动的开发**：Fastify 强烈推荐（并在某些情况下要求）使用 JSON Schema 来定义路由的输入和输出。这不仅有助于验证和文档化 API，而且允许 Fastify 预编译验证逻辑，从而提高运行时效率。

4. **优化的插件系统**：Fastify 的插件架构旨在尽可能高效。插件系统允许代码重用和最佳实践，同时保持核心框架的轻量级。这种设计支持了高度的模块化和灵活性，而不牺牲性能。

5. **高效的日志记录**：内置的日志记录工具 Pino 是为速度而设计的，它提供了极低的开销日志记录功能，这对于保持应用程序的性能至关重要。

6. **零成本抽象**：Fastify 的设计哲学是尽量减少抽象层的性能开销。这意味着即使在使用各种抽象和便利功能时，Fastify 也能保持高性能。

通过这些设计决策和优化，Fastify 能够提供出色的性能，这使得它成为构建高效且响应迅速的 Node.js 应用的优秀选择。

## 4. 安装使用

```
npm install fastify
```

```js
// Import the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
```

或者使用 cli 生成骨架：

```
npm install --global fastify-cli
fastify generate myproject
```

JSON Schema 和 hooks 处理请求示例：

```js
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: "world" };
  },
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
```

## 5. 插件、装饰器、中间件、钩子

在 Fastify 中，插件、装饰器、中间件和钩子是框架核心概念，各自承担不同的角色：

1. **插件（Plugins）**：

   - 插件是 Fastify 应用中用于添加功能、共享代码或封装逻辑的主要方式。
   - 一个插件可以是一个函数，该函数接受 Fastify 实例、选项和回调函数作为参数。
   - 插件可以注册路由、添加装饰器、声明新的钩子，甚至可以封装其他插件，用于构建模块化的应用。
   - 插件允许开发者构建可重用的逻辑块，可以轻松地在不同的 Fastify 应用或同一个应用的不同部分之间共享。

2. **装饰器（Decorators）**：

   - 装饰器在 Fastify 中用于扩展 Fastify 实例、请求（Request）和回复（Reply）对象，通过添加新的方法或属性。
   - 开发者可以使用装饰器来添加自定义的功能或数据，使其在整个应用的不同部分可用。
   - 例如，可以添加一个装饰器来添加一个方法，该方法在每个请求中都可用，用于访问共享的配置数据或服务。

3. **中间件（Middleware）**：

   - 尽管 Fastify 设计上不依赖于中间件，但它支持使用 Express/Connect 风格的中间件，主要用于兼容性或特定功能的集成。
   - 中间件可以访问请求和响应对象，可以执行代码、修改请求和响应对象、终止请求处理链、调用堆栈中的下一个中间件等。
   - Fastify 中间件应谨慎使用，因为不当使用可能会绕过 Fastify 的一些优化，影响性能。

4. **钩子（Hooks）**：
   - 钩子是 Fastify 中的一种机制，允许开发者在请求生命周期的不同阶段介入执行逻辑（例如，在请求接收之后、路由解析之前、发送响应之前等）。
   - 钩子可以用于执行一些预处理或后处理逻辑，如权限检查、请求日志记录、修改响应等。
   - Fastify 提供了多种类型的钩子（如 `onRequest`, `preHandler`, `onSend`, 等），使开发者能够精细控制请求处理的不同阶段。

这些构件共同工作，为 Fastify 提供了极大的灵活性和扩展性，同时保持了框架的高性能特性。

### 5.1 声明周期权重

Fastify 中的组件（插件、装饰器、中间件和钩子）遵循一定的执行顺序和优先级，这些顺序和优先级定义了它们在请求处理流程中的作用时机。理解这个执行流程对于设计高效和可靠的 Fastify 应用至关重要。

1. **插件**：

   - 插件在应用启动时加载，按照注册的顺序执行。一旦应用启动完成，插件的设置就被固化，对于后续的每个请求，插件中定义的功能（如路由、钩子、装饰器）都是可用的。

2. **装饰器**：

   - 装饰器本身没有明确的执行时机，它们提供的方法或属性在被装饰的对象（Fastify 实例、请求、回复）上即刻可用，并在对象的生命周期内持续有效。

3. **中间件**：

   - 中间件在每个请求处理流程的早期执行，具体是在路由匹配之前。中间件可以修改请求和回复对象，或者决定是否将请求传递给下一个处理器。

4. **钩子**：
   - 钩子遵循特定的执行顺序，反映在请求的处理流程中：
     - `onRequest`：在请求被接收后立即执行，但在任何其他处理之前。
     - `preParsing`：在请求体解析之前执行。
     - `preValidation`：在路由级别的验证之前执行。
     - `preHandler`：在路由处理函数之前执行。
     - `preSerialization`：在响应被序列化之前执行，发送给客户端之前。
     - `onSend`：在响应发送给客户端之前，但在序列化之后执行。
     - `onResponse`：在响应完全发送给客户端后执行。

针对中断的能力：

- **插件**：不直接参与请求处理的中断，但可以注册会影响流程的钩子或中间件。
- **装饰器**：不控制流程，因此不参与中断。
- **中间件**：可以中断请求处理流程，例如，不调用 `next()` 或发送响应可以停止后续处理。
- **钩子**：特定的钩子（如 `preHandler`）可以决定是否继续处理请求，或者直接发送响应，从而中断后续流程。

理解这些组件的执行顺序和中断能力对于构建符合预期行为的 Fastify 应用至关重要。

## 6. 生命周期

```
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
```

当响应被劫持时 (即调用了 `reply.hijack()`) 会跳过之后的步骤，否则，响应被提交后的数据流向如下：

```
                        ★ schema validation Error
                                    │
                                    └─▶ schemaErrorFormatter
                                               │
                          reply sent ◀── JSON ─┴─ Error instance
                                                      │
                                                      │         ★ throw an Error
                     ★ send or return                │                  │
                            │                         │                  │
                            │                         ▼                  │
       reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler ◀─────┘
                                                      │
                                 reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook
                                                                                │
                                                                                └─▶ reply sent
```

## 7. 封装

![image](https://github.com/lecepin/blog/assets/11046969/e3163309-fd82-417e-8b3a-022b0bdfb560)


Fastify 的一个基本特性是“封装上下文”。封装上下文决定了哪些装饰器、注册的钩子和插件可用于路由。

注意，每个上下文仅从父上下文继承。父上下文不能访问其后代上下文中的任何实体。这种默认情况有时不是所需的。在这种情况下，可以通过使用 `fastify-plugin` 破坏封装上下文，使得在后代上下文中注册的任何东西都可用于包含的父上下文。

## 8. JSON Schema 验证路由

JSON Schema 在 Fastify 中与路由结合使用，主要是用于验证客户端请求的数据和格式化响应数据。通过定义 JSON Schema，可以确保传入的请求数据满足特定格式和类型要求，同时还可以控制响应数据的结构。这样做有助于提高 API 的健壮性和安全性。

以下是一个如何在 Fastify 路由中使用 JSON Schema 来验证请求和响应的示例：

```javascript
const fastify = require("fastify")();

// 定义 JSON Schema
const userSchema = {
  type: "object",
  required: ["username", "email", "age"],
  properties: {
    username: { type: "string" },
    email: { type: "string", format: "email" },
    age: { type: "number", minimum: 1 },
  },
};

fastify.route({
  method: "POST",
  url: "/create-user",
  schema: {
    body: userSchema, // 使用 JSON Schema 验证请求体
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          id: { type: "string" },
        },
      },
    },
  },
  handler: (request, reply) => {
    // 处理请求逻辑
    // 假设创建用户成功，返回用户 ID
    reply.send({ success: true, id: "12345" });
  },
});

fastify.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running on http://localhost:3000");
});
```

在这个例子中：

1. 定义了一个 `userSchema`，描述了预期的请求体格式，包括必需字段和各字段的类型。
2. 在路由配置中，通过 `schema` 属性将 `userSchema` 应用于请求体（`body`），这样 Fastify 会自动验证传入的请求数据是否符合定义的 schema。
3. 同样，也定义了响应的 schema，确保响应数据结构符合预期。

通过这种方式，可以确保所有进入的请求都经过严格的验证，并且所有的响应都符合预定的格式，从而增强了 API 的健壮性和用户的可预测性。

## 9. 示例

### 9.1 Hooks 处理登录态问题

```js
const fastify = require("fastify")({ logger: true });
const secureSession = require("fastify-secure-session");

// 注册 session 插件
fastify.register(secureSession, {
  secret: "averylognsecretkey", // 应使用一个长而复杂的密钥
  cookie: {
    path: "/",
    // 配置其他 cookie 选项根据需要
  },
});

// 仅对/api/a 和/api/c 应用 preHandler 钩子
fastify.addHook("preHandler", (request, reply, done) => {
  if (
    (request.routerPath === "/api/a" || request.routerPath === "/api/c") &&
    !request.session.user
  ) {
    request.session.redirectTo = request.raw.url;
    reply.redirect(302, "/login");
    done();
  } else {
    done();
  }
});

// 不需要 session 验证的路由
fastify.get("/api/b", (req, reply) => {
  reply.send({ message: "Access granted for /api/b" });
});

// 需要 session 验证的路由
fastify.get("/api/a", (req, reply) => {
  reply.send({ message: "Access granted for /api/a" });
});

fastify.get("/api/c", (req, reply) => {
  reply.send({ message: "Access granted for /api/c" });
});

// 登录页面的路由
fastify.get("/login", (req, reply) => {
  reply.send(`Login form goes here. POST to /login to authenticate.`);
});

// 登录逻辑
fastify.post("/login", (req, reply) => {
  const { username, password } = req.body;
  if (username === "user" && password === "password") {
    req.session.user = username;
    const redirectTo = req.session.redirectTo || "/";
    delete req.session.redirectTo;
    reply.redirect(302, redirectTo);
  } else {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

// 启动服务器
fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on http://localhost:3000`);
});
```

### 9.2 限定参数

下面是 post 必须传 `a` 和 `b` 参数：

```js
const fastify = require("fastify")();

const postSchema = {
  schema: {
    body: {
      type: "object",
      required: ["a", "b"],
      properties: {
        a: { type: "string" },
        b: { type: "string" },
      },
    },
    response: {
      // 如果缺失，默认返回 400 错误，可在此处修改 400 的返回类型
      400: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          error: { type: "string" },
          message: { type: "string" },
        },
      },
    },
  },

  // 此处可以拦截上面的默认拦截策略
  preValidation: (request, reply, done) => {
    if (!request.body || !request.body.a || !request.body.b) {
      reply
        .code(400)
        .send({ error: "Bad Request", message: "Missing required parameters" });
      return;
    }
    done();
  },
};

fastify.post("/api/data", postSchema, (request, reply) => {
  // 如果到这里，说明 a 和 b 参数都已经通过验证
  reply.send({ message: "Success" });
});

fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server listening on port 3000");
});
```

如果不在路由中定义 `preValidation` 钩子和自定义的 `response` schema，当 POST 请求的 body 不符合定义的 JSON Schema 时，Fastify 默认会返回一个 400 错误（Bad Request）。这个错误的响应体会包含关于哪些字段不符合要求的信息，但这个信息是由 Fastify 自动生成的，可能不会像自定义错误消息那样具体或清晰。

默认情况下，如果只传了 `a` 参数而缺失了 `b` 参数，Fastify 会返回一个包含错误详情的响应，类似于：

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body should have required property 'b'"
}
```
