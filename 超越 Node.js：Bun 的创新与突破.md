![image](https://github.com/lecepin/blog/assets/11046969/998e4599-6d76-4fe6-8313-4ebc63000077)




## 1. Bun

Bun 是一个全新的 JavaScript 运行时，类似于 Node.js 和 Deno，它专注于提供出色的性能和开发者体验。Bun 的一些特点包括：

1. **快速的性能**：Bun 旨在提供高性能，无论是启动时间、执行速度还是安装依赖包的速度。

2. **兼容性**：Bun 致力于与现有的 JavaScript 生态系统兼容，包括 Node.js 的软件包。

3. **内建的软件包管理器**：Bun 内置了一个软件包管理器，这意味着你可以直接使用它来安装 npm 包，无需额外的工具。

4. **现代 JavaScript**：Bun 支持现代 JavaScript 语法和特性，让开发者能够使用最新的 JavaScript 特性编写代码。

5. **原生的 Web API**：Bun 提供了许多浏览器中的 Web API，这使得编写服务器端代码与编写客户端代码更为相似。

Bun 还在积极开发中，可能会添加更多特性和改进。

## 2. 什么是运行时

"运行时"（Runtime）在计算机编程中指的是一个软件程序执行时提供的环境，其中包含了执行程序所必需的库、调试和其他支持功能。在 JavaScript 的世界中，运行时负责解释执行 JavaScript 代码，并提供可以由 JavaScript 代码调用的 API，例如处理文件系统、网络通信、定时器等。

就 JavaScript 语言而言，最著名的运行时环境是浏览器和 Node.js。浏览器提供了一个针对客户端脚本的运行环境，允许 JavaScript 与网页交互，控制 DOM 元素，响应事件等。而 Node.js 则提供了一个服务器端的运行环境，扩展了 JavaScript 的能力，使其可以进行文件系统操作、TCP/IP 通信等不受浏览器安全限制的操作。

Bun 运行时，旨在服务于现代 JavaScript 生态系统。它有三个主要的设计目标：

- 速度：Bun 启动迅速，运行快速。它扩展了 JavaScriptCore，这是为 Safari 打造的注重性能的 JS 引擎。随着计算转向边缘计算，这一点至关重要。
- 优雅的 API： Bun 提供了一组最小的、高度优化的 API，用于执行常见任务，比如启动 HTTP 服务器和写文件。
- 统一的开发体验：Bun 是一个用于构建 JavaScript 应用的完整工具包，包括一个软件包管理器、测试运行器和打包工具。

Bun 被设计为 Node.js 的替代品。它固有地实现了数百个 Node.js 和 Web API，包括 fs、path、Buffer 等。
Bun 的目标是运行世界上大多数的服务器端 JavaScript，并提供工具以提高性能，降低复杂性，并成倍增加开发人员的生产力。

## 3. 诞生背景

Bun 的诞生背景和它的开发都是为了满足现代 JavaScript 生态系统中日益增长的性能需求和开发体验改进的需求。随着 JavaScript 应用程序日益复杂，开发者社区对工具的性能和效率要求越来越高。Bun 团队看到了这种需求，并试图通过创建一个高速、高效且功能丰富的新运行时来解决这些问题。

Node.js 性能并不差，实际上它已经足够强大，可以胜任广泛的服务器端应用。然而，Node.js 是一个相对较老的平台，它的设计并不总是能够充分利用现代硬件的性能，或者满足现代开发流程中的所有需求。还有一些历史遗留问题，如对老旧回调模式的依赖，以及在一些场景中的性能瓶颈。

Deno 是由 Node.js 的创始人之一 Ryan Dahl 启动的项目，目的是创建一个更安全、更现代的 JavaScript 运行时环境。Deno 试图解决 Node.js 存在的一些设计问题，比如通过提供首级的异步支持改进 API，引入 TypeScript 作为一级语言支持，以及实现更加安全的权限模型等。

至于为什么 Deno 没有超过 Bun，这可能有几个原因：

1. **时间和社区接受度**：Deno 相对于 Node.js 仍然是一个较新的项目，并且需要时间来建立社区和生态系统。Bun 作为一个更新的项目，能够从现有的生态系统中学习，并试图提供即使是比 Deno 还要更快的性能和更好的开发体验。

2. **性能**：Bun 的一些设计决策，特别是使用 Zig 和 JavaScriptCore，据称提供了出色的性能。这可能吸引了那些对性能有严格要求的开发者。

3. **特性和方便性**：Bun 提供了一个完整的开发工具集，包括软件包管理器、测试运行器和打包工具，这使得开发者可以在一个统一的平台上工作，而不需要集成多个不同的工具。

4. **市场定位和宣传**：Bun 的市场定位和传播方式可能也对其受欢迎程度产生了影响。

## 4. bun 的一些性能数据对比
![image](https://github.com/lecepin/blog/assets/11046969/16ab1d2c-0e38-4d34-8eef-0476676e1b71)

![image](https://github.com/lecepin/blog/assets/11046969/b071b747-a30c-45f9-b160-cd3777c33922)

![image](https://github.com/lecepin/blog/assets/11046969/81e13b78-b6a4-4064-8a88-b9ed432ac84f)

![image](https://github.com/lecepin/blog/assets/11046969/84bae59d-0d9c-49e1-9a74-ec42b993abaa)

![image](https://github.com/lecepin/blog/assets/11046969/e793d624-01f7-4280-a5f5-96d59b0b5579)








## 5. 我需要用 bun 么

确定是否应该在项目中使用 Bun 通常取决于项目的特定需求和 Bun 提供的功能是否能为你的项目带来实际的好处。以下是一些考虑因素，可以帮助你决定是否在项目中使用 Bun：

1. **性能需求**：如果你的项目对启动时间或运行性能有严格要求，那么使用 Bun 可能是一个好选择，因为 Bun 提供了优化的性能。

2. **现代化工具链**：Bun 提供了一个集成的开发环境，包括软件包管理器、测试运行器和打包器。如果你希望使用一个统一的工具链来简化开发流程，Bun 可能适合你的项目。

3. **特定 API 的支持**：如果你的项目依赖于 Bun 提供的特定 API（如高效的文件 I/O、HTTP 服务等），并且这些 API 比传统 Node.js 或其他运行时提供的更符合你的需求，那么选择 Bun 可能更有利。

4. **生态系统兼容性**：虽然 Bun 努力兼容 Node.js 生态系统，但如果你的项目依赖于大量特定的 Node.js 模块或功能，你可能需要评估它们在 Bun 上的兼容性。

5. **项目规模和复杂性**：对于小型或实验性项目，尝试新的技术可能较少风险。但对于大型或生产级项目，可能需要更谨慎地评估 Bun 的稳定性和成熟度。

6. **社区和支持**：考虑 Bun 的社区支持和资源。一个活跌的社区和丰富的文档可以帮助你快速解决问题。

7. **长期维护和更新**：评估 Bun 的开发进度和长期支持计划。选择一个有持续更新和支持的运行时对于确保项目的长期成功非常重要。

8. **试验和评估**：最终，最好的方式是在一个较小的项目或项目的一部分中试验 Bun，评估它是否满足你的需求，以及它在实践中的表现如何。

通过综合考虑这些因素，你可以更好地决定是否应该在项目中使用 Bun。

## 6. 安装 bun

### macOS

在 macOS 上，你可以使用 Homebrew 来安装 Bun：

```bash
brew install bun
```

### Windows

在 Windows 上，你可以使用 Scoop 来安装 Bun：

```bash
scoop bucket add extras
scoop install bun
```

或者，你可以从 Bun 的 GitHub 发布页面下载 Windows 的预构建二进制文件，并手动添加到你的系统路径中。

### Linux

对于 Linux 用户，可以使用包管理器来安装。对于使用 APT 的 Debian 或 Ubuntu 系统：

```bash
# 先添加 Bun 的 GPG 密钥
wget -qO- https://bun.sh/install | bash
```

这将下载一个安装脚本，你需要运行该脚本以完成安装过程。

### Docker

你也可以在 Docker 容器中使用 Bun。你可以从 Docker Hub 上拉取 Bun 的官方镜像：

```bash
docker pull bunsh/bun
```

### 手动安装

最后，你也可以从官方网站或 GitHub 发布页面下载 Bun 的预构建二进制文件，并手动添加到你的系统路径中。

在使用以上任何一种方法安装 Bun 后，你可以在终端或命令提示符中运行以下命令来验证安装：

```bash
bun --version
```

这应该会显示 Bun 的版本号，表明安装成功。

## 7. bun cli

| 类别 | 命令/标志           | 描述                                                                                                                     |
| ---- | ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 命令 | `run <file>`        | 使用 Bun 执行文件。                                                                                                      |
|      | `lint`              | 运行 package.json 脚本。                                                                                                 |
|      | `test`              | 使用 Bun 运行单元测试。                                                                                                  |
|      | `x <binary>`        | 执行包二进制文件（CLI），如有需要则安装之（bunx）。                                                                      |
|      | `repl`              | 启动一个和 Bun 交互的 REPL 会话。                                                                                        |
|      | `install`           | 为 package.json 安装依赖项（bun i）。                                                                                    |
|      | `add <package>`     | 向 package.json 添加依赖项（bun a）。                                                                                    |
|      | `remove <package>`  | 从 package.json 移除依赖项（bun rm）。                                                                                   |
|      | `update <package>`  | 更新过时的依赖项。                                                                                                       |
|      | `link [<package>]`  | 注册或链接本地 npm 包。                                                                                                  |
|      | `unlink`            | 注销本地 npm 包。                                                                                                        |
|      | `pm <subcommand>`   | 额外的包管理工具。                                                                                                       |
|      | `build <files>`     | 将 TypeScript 和 JavaScript 打包成单个文件。                                                                             |
|      | `init`              | 从空白模板开始一个空的 Bun 项目。                                                                                        |
|      | `create <template>` | 从模板创建一个新项目（bun c）。                                                                                          |
|      | `upgrade`           | 升级到 Bun 的最新版本。                                                                                                  |
|      | `<command> --help`  | 打印命令的帮助文本。                                                                                                     |
| 标志 | `--watch`           | 文件变更时自动重启进程。                                                                                                 |
|      | `--hot`             | 在 Bun 运行时、测试运行器或打包器中启用自动重载。                                                                        |
|      | `--smol`            | 使用更少的内存，但更频繁地运行垃圾收集。                                                                                 |
|      | `-r, --preload`     | 在其他模块加载前导入一个模块。                                                                                           |
|      | `--inspect`         | 激活 Bun 的调试器。                                                                                                      |
|      | `--inspect-wait`    | 激活 Bun 的调试器，在执行前等待连接。                                                                                    |
|      | `--inspect-brk`     | 激活 Bun 的调试器，在代码的第一行设置断点并等待。                                                                        |
|      | `--if-present`      | 如果入口点不存在，则退出而不报错。                                                                                       |
|      | `--no-install`      | 在 Bun 运行时禁用自动安装。                                                                                              |
|      | `--install`         | 配置自动安装行为。选项包括 "auto"（默认，当没有 node_modules 时自动安装），"fallback"（仅当包缺失时），"force"（始终）。 |
|      | `-i`                | 执行时自动安装依赖项。等同于 --install=fallback。                                                                        |
|      | `-e, --eval`        | 将参数作为脚本进行评估。                                                                                                 |
|      | `--prefer-offline`  | 在 Bun 运行时跳过包的旧态检查，并从磁盘解析。                                                                            |
|      | `--prefer-latest`   | 在 Bun 运行时始终使用包的最新匹配版本，并总是检查 npm。                                                                  |
|      | `-p, --port`        | 设置 Bun.serve 的默认端口。                                                                                              |
|      | `-b, --bun`         | 通过符号链接 node 强制脚本或包使用 Bun 的运行时而不是 Node.js。                                                          |
|      | `--silent`          | 不打印脚本命令。                                                                                                         |
|      | `-v, --version`     | 打印版本并退出。                                                                                                         |
|      | `--revision`        | 打印版本和修订版并退出。                                                                                                 |
|      | `--env-file`        | 从指定文件加载环境变量。                                                                                                 |
|      | `--cwd`             | 绝对路径，用于解析文件和入口点。这会改变进程的当前工作目录。                                                             |
|      | `-c, --config`      | 指定 Bun 配置文件的路径。默认为 $cwd/bunfig.toml。                                                                       |
|      | `-h, --help`        | 显示此菜单并退出。                                                                                                       |

## 8. bun API

| 主题                 | APIs                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP 服务器          | `Bun.serve`                                                                                                                                                                                                                                                                                                                                                                       |
| 打包器               | `Bun.build`                                                                                                                                                                                                                                                                                                                                                                       |
| 文件 I/O             | `Bun.file` `Bun.write`                                                                                                                                                                                                                                                                                                                                                            |
| 子进程               | `Bun.spawn` `Bun.spawnSync`                                                                                                                                                                                                                                                                                                                                                       |
| TCP 连接             | `Bun.listen` `Bun.connect`                                                                                                                                                                                                                                                                                                                                                        |
| 转译器               | `Bun.Transpiler`                                                                                                                                                                                                                                                                                                                                                                  |
| 路由                 | `Bun.FileSystemRouter`                                                                                                                                                                                                                                                                                                                                                            |
| 流式 HTML 变换       | `HTMLRewriter`                                                                                                                                                                                                                                                                                                                                                                    |
| 哈希                 | `Bun.hash` `Bun.CryptoHasher`                                                                                                                                                                                                                                                                                                                                                     |
| import.meta          | `import.meta`                                                                                                                                                                                                                                                                                                                                                                     |
| SQLite               | `bun:sqlite`                                                                                                                                                                                                                                                                                                                                                                      |
| 外部函数接口（FFI）  | `bun:ffi`                                                                                                                                                                                                                                                                                                                                                                         |
| 测试                 | `bun:test`                                                                                                                                                                                                                                                                                                                                                                        |
| Node-API             | `Node-API`                                                                                                                                                                                                                                                                                                                                                                        |
| 文件模式匹配（Glob） | `Bun.Glob`                                                                                                                                                                                                                                                                                                                                                                        |
| 实用工具             | `Bun.version` `Bun.revision` `Bun.env` `Bun.main` `Bun.sleep()` `Bun.sleepSync()` `Bun.which()` `Bun.peek()` `Bun.openInEditor()` `Bun.deepEquals()` `Bun.escapeHTML()` `Bun.fileURLToPath()` `Bun.pathToFileURL()` `Bun.gzipSync()` `Bun.gunzipSync()` `Bun.deflateSync()` `Bun.inflateSync()` `Bun.inspect()` `Bun.nanoseconds()` `Bun.readableStreamTo*()` `Bun.resolveSync()` |

上表展示了 Bun 官方 API 页面中列出的主题和相关 API。Bun 实现了一组原生 API，这些 API 要么是直接挂载在全局的 `Bun` 对象上，要么是通过内置模块提供的。这些 API 经过了大量优化，是实现一些常见功能的官方“Bun 原生”方式。

## 9. bun Web API

| 主题        | APIs                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| HTTP        | `fetch` `Response` `Request` `Headers` `AbortController` `AbortSignal`                                          |
| URLs        | `URL` `URLSearchParams`                                                                                         |
| Web Workers | `Worker` `self.postMessage` `structuredClone` `MessagePort` `MessageChannel` `BroadcastChannel`                 |
| Streams     | `ReadableStream` `WritableStream` `TransformStream` `ByteLengthQueuingStrategy` `CountQueuingStrategy` 及相关类 |
| Blob        | `Blob`                                                                                                          |
| WebSockets  | `WebSocket`                                                                                                     |
| 编码与解码  | `atob` `btoa` `TextEncoder` `TextDecoder`                                                                       |
| JSON        | `JSON`                                                                                                          |
| 超时        | `setTimeout` `clearTimeout`                                                                                     |
| 间隔        | `setInterval` `clearInterval`                                                                                   |
| Crypto      | `crypto` `SubtleCrypto` `CryptoKey`                                                                             |
| 调试        | `console` `performance`                                                                                         |
| Microtasks  | `queueMicrotask`                                                                                                |
| 错误处理    | `reportError`                                                                                                   |
| 用户交互    | `alert` `confirm` `prompt`（意在用于交互式 CLI）                                                                |
| Realms      | `ShadowRealm`                                                                                                   |
| 事件        | `EventTarget` `Event` `ErrorEvent` `CloseEvent` `MessageEvent`                                                  |

上表展示了 Bun 官方 Web API 页面中列出的部分或完整支持的 Web API。

## 9. bun 示例

### HTTP server

```ts
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on localhost:${server.port}`);
```

### Websocket server

```js
const server = Bun.serve<{ authToken: string; }>({
  fetch(req, server) {
    // use a library to parse cookies
    const cookies = parseCookies(req.headers.get("Cookie"));
    server.upgrade(req, {
      data: { authToken: cookies['X-Token'] },
    });
  },
  websocket: {
    // handler called when a message is received
    async message(ws, message) {
      console.log(`Received: ${message}`);
      const user = getUserFromToken(ws.data.authToken);
      await db.Message.insert({
        message: String(message),
        userId: user.id,
      });
    },
  },
});

console.log(`Listening on localhost:${server.port}`);
```

### 读写文件

```ts
const file = Bun.file(import.meta.dir + "/package.json"); // BunFile

const pkg = await file.json(); // BunFile extends Blob
pkg.name = "my-package";
pkg.version = "1.0.0";

await Bun.write(file, JSON.stringify(pkg, null, 2));
```

### Hash 密码

```ts
const password = "super-secure-pa$$word";

const hash = await Bun.password.hash(password);
// => $argon2id$v=19$m=65536,t=2,p=1$tFq+9AVr1bfPxQdh...

const isMatch = await Bun.password.verify(password, hash);
// => true
```

### 浏览器打包

```ts
await Bun.build({
  entrypoints: ["./index.tsx"],
  outdir: "./build",
  minify: true,
  plugins: [
    /* ... */
  ],
});
```

![image](https://github.com/lecepin/blog/assets/11046969/3e5be45e-6ba3-41d6-a48c-3c1f657feba5)


### 写测试

```ts
import { describe, expect, test, beforeAll } from "bun:test";

beforeAll(() => {
  // setup tests
});

describe("math", () => {
  test("addition", () => {
    expect(2 + 2).toBe(4);
    expect(7 + 13).toMatchSnapshot();
  });
});
```

### 文件系统路由

```ts
const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "/path/to/pages",
});

const match = router.match("/blog/my-cool-post");
match.filePath; // "/path/to/pages/blog/[slug].tsx",
match.kind; // "dynamic"
match.params; // { slug: "my-cool-post" }
```

### 读流

```ts
const response = await fetch("https://bun.sh");

await Bun.readableStreamToArrayBuffer(response.body); // => ArrayBuffer
await Bun.readableStreamToBlob(response.body); // => Blob
await Bun.readableStreamToJSON(response.body); // => object
await Bun.readableStreamToText(response.body); // => string
await Bun.readableStreamToArray(response.body); // => unknown[]
```

### 运行 Shell 脚本

```ts
import { $ } from "bun";

// Run a cross-platform shell command
await $`echo "Hello, world!"`;

const response = await fetch("https://example.com");

// Pipe the response body to gzip
const data = await $`gzip < ${response}`.arrayBuffer();
```

### 调用 C 函数

```ts
import { dlopen, FFIType, suffix } from "bun:ffi";

// `suffix` is either "dylib", "so", or "dll" depending on the platform
const path = `libsqlite3.${suffix}`;

const {
  symbols: {
    sqlite3_libversion, // the function to call
  },
} = dlopen(path, {
  sqlite3_libversion: {
    args: [], // no arguments
    returns: FFIType.cstring, // returns a string
  },
});

console.log(`SQLite 3 version: ${sqlite3_libversion()}`);
```

## 10. npm 项目迁移 bun 注意事项

以下是 Bun 相较于 npm 在 `package.json` 以及配置方面的一些主要区别和迁移指南：

### 生命周期脚本（Lifecycle Scripts）

- **npm**：执行 `package.json` 中定义的 `{pre|post}install` 和 `{pre|post}prepare` 以及安装依赖时的生命周期脚本。
- **Bun**：Bun 执行项目的生命周期脚本，但出于安全考虑不会执行安装依赖的生命周期脚本。要允许特定包的生命周期脚本，需要在 `package.json` 的 `trustedDependencies` 中指定。

### 锁文件（Lockfile）

- **npm**：使用 `package-lock.json`。
- **Bun**：使用二进制的 `bun.lockb` 锁文件。可以通过 `bun install -y` 生成与 Yarn v1 兼容的 `yarn.lock` 以方便检查。Bun 的锁文件设计用于提高性能，可以通过 Git 配置来实现 `bun.lockb` 的可读差异输出。

### 配置文件（bunfig.toml）

- **Bun**：主要用于配置 Bun 特有的行为。它是可选的，Bun 也可以在没有该文件的情况下正常工作。可以在全局（`$HOME/.bunfig.toml` 或 `$XDG_CONFIG_HOME/.bunfig.toml`）和局部（项目根目录）创建 `bunfig.toml` 文件。局部配置会覆盖全局配置，CLI 标志会覆盖 `bunfig.toml` 的设置。

### 安装（Install）

- **npm**：有各种标志和配置以控制依赖项安装的行为。
- **Bun**：`bun install` 的行为可以通过 `bunfig.toml` 的 `[install]` 部分进行配置。包括是否安装可选依赖、开发依赖、同级依赖；是否在生产模式下运行；是否设置精确版本；自动安装行为的配置；是否冻结锁文件；干运行；全局安装目录和二进制目录的配置；注册表和范围的配置；缓存行为；和锁文件行为。

### 迁移指南

1. **安装 Bun**：确保你已经安装了 Bun。
2. **备份你的项目**：在做任何改动前备份你的 `package.json` 和整个项目。
3. **创建 `bunfig.toml`**：根据需要在项目根目录创建一个 `bunfig.toml` 文件，并根据你的项目特定需求配置 Bun。
4. **运行 `bun install`**：生成 `bun.lockb` 并安装所有依赖。
5. **修改 `package.json`**：如果需要，将信任的依赖项添加到 `trustedDependencies`。
6. **测试项目**：确保所有功能正常工作，并解决任何与 Bun 相关的问题。
7. **更新脚本**：如果项目中有脚本引用了 `npm` 命令，将其更新为对应的 Bun 命令。
8. **适配 CI/CD**：更新你的持续集成和部署系统，以使用 Bun。
9. **监控部署**：部署到生产后密切监控以捕获潜在问题。

请注意，由于 Bun 还在发展中，上述信息可能会随着 Bun 的更新而发生变化。在进行迁移之前，建议查阅 Bun 的最新官方文档。
