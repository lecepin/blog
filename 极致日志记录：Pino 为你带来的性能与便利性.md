![image](https://github.com/lecepin/blog/assets/11046969/3b8bbbb7-9d31-4625-8131-e579937c7ccc)


## 1. Pino

Pino 是一个非常快速且简洁的 Node.js 日志库，其设计宗旨在于提供最小的开销以及高性能的日志记录功能。Pino 项目受到 Bunyan 日志库的启发，但其在性能上做了大量优化，因此在处理大量日志时，Pino 的性能表现通常优于其他日志库。

以下是 Pino 日志库的一些主要特点：

1. **高性能**：Pino 的设计侧重于效率和性能，尤其是在高负载环境下，Pino 能够保持较低的资源消耗。

2. **JSON 格式**：Pino 默认输出日志为 JSON 格式，这种格式易于机器解析，同时也方便人工阅读。

3. **可配置性**：Pino 允许开发者自定义日志级别、日志消息格式和其他选项，以满足不同的应用场景需求。

4. **流式接口**：Pino 采用 Node.js 的流（Streams）来处理日志，这意味着你可以将日志流式传输到文件、过程（process）或任何其他流支持的目的地。

5. **生态系统**：Pino 有着丰富的插件和集成，比如 `pino-pretty` 用于美化日志的输出，以及与各种日志管理系统的集成。

6. **浏览器支持**：Pino 不仅可以在 Node.js 环境中使用，同时也支持浏览器，使其成为一个通用的日志解决方案。

7. **子记录器**：Pino 允许创建子记录器（child loggers），这些子记录器可以继承父记录器的配置，并且可以添加额外的上下文，非常适合用在模块化的应用程序中。

8. **轻量级**：Pino 的核心库非常精简，核心功能都聚焦于日志记录本身，不包含冗余的特性和依赖。

## 2. 诞生背景

Pino 的诞生背景主要是为了解决在 Node.js 应用程序中日志记录时的性能问题。在 Pino 出现之前，已经存在一些流行的日志库，比如 Winston 和 Bunyan。这些日志库功能强大，但在高负载情况下，对性能的影响较大。

Node.js 应用程序往往需要处理大量并发请求，日志记录是几乎每个应用程序都需要执行的任务。如果日志库本身的性能不够好，它会成为应用程序的瓶颈，导致整体的性能下降。尤其是在微服务架构中，每个服务都需要进行日志记录，性能问题会被放大。

Pino 的创造者意在开发一个更快、更轻量级的日志库，以解决以下问题：

1. **性能开销**：在高吞吐量的生产环境中，已存在的日志库可能会由于其复杂性和功能丰富性而带来显著的性能开销。Pino 通过减少特性和优化代码路径来减少性能开销。

2. **日志格式简化**：Pino 坚持使用 JSON 格式记录日志，因为它既易于机器解析，又便于开发者阅读，同时也简化了日志处理的复杂性。

3. **可插拔的传输机制**：Pino 鼓励在日志流的外部处理日志的传输，比如使用 Unix 管道将日志传输到其他处理器或存储系统。这与其他日志库内置的传输机制不同，能够进一步降低日志库内部的复杂性和性能开销。

4. **透明的日志级别控制**：Pino 提供了清晰简单的 API 来控制日志级别。

5. **易于集成**：Pino 被设计成易于与现有的日志管理服务和工具集成。

总结来说，Pino 的出现是为了提供一个在高性能要求下仍然能够保持轻量级和高效率的日志解决方案，解决其他日志库在处理大规模、高频率日志记录时可能带来的性能问题。

## 3. 核心概念

Pino 作为一个 Node.js 日志库，有几个核心概念构成其基础：

1. **日志级别**：日志级别表示日志消息的严重性。Pino 遵循 Syslog 级别的惯例，提供了多个内置的日志级别，包括 `fatal`、`error`、`warn`、`info`、`debug` 和 `trace`。用户可以根据需要记录不同级别的日志信息，也可以配置 Pino 仅输出某个级别以上的日志。

2. **记录器（Logger）**：记录器是 Pino 的核心对象，它提供了创建日志消息的方法。每个 Pino 实例都是一个记录器，可以配置有关日志记录的参数，如日志级别、输出流等。开发者可以使用记录器实例来记录各种级别的日志条目。

3. **子记录器（Child Logger）**：Pino 允许从已有的记录器派生出子记录器。子记录器继承父记录器的配置，并且可以添加额外的日志字段，这在为特定的组件或模块添加特定上下文时非常有用。

4. **序列化（Serialization）**：Pino 以 JSON 格式输出日志，序列化是将日志数据转换成 JSON 字符串的过程。Pino 提供了自定义序列化函数的能力，以便对某些特殊字段进行定制的序列化处理。

5. **流（Streams）**：Pino 使用 Node.js 的流来处理日志输出。默认情况下，日志写入标准输出（stdout），但开发者可以配置 Pino 将日志流式传输到文件、远程服务或任何其他流支持的目的地。

6. **基准（Benchmarks）**：Pino 强调性能，并提供了基准测试来展示其与其他日志库相比在速度和效率上的优势。基准是衡量 Pino 性能的重要组成部分，并且帮助开发者了解在不同场景下 Pino 的表现。

7. **生态系统**：Pino 拥有一系列的插件和工具，比如 `pino-pretty` 用于在开发时格式化日志输出，以及各种传输工具可以将日志发送到外部系统，如 ELK 栈或其他日志分析服务。

8. **可配置性**：Pino 提供了丰富的配置选项，允许开发者根据需要调整日志的各个方面，从日志级别到自定义输出格式等。

这些核心概念共同构成了 Pino 的日志记录机制，使它成为一个灵活、高效且易于使用的日志库。

## 4. 安装使用

要在你的 Node.js 项目中安装并使用 Pino，你可以按照以下步骤进行：

### 安装 Pino

首先，你需要通过 npm（Node.js 的包管理器）来安装 Pino。在你的项目根目录中，打开终端或命令提示符，然后运行以下命令：

```bash
npm install pino
```

这将会将 Pino 添加到你的项目的 `package.json` 文件中，并下载安装到 `node_modules` 目录。

### 基本使用

安装完成后，你可以在项目的 JavaScript 文件中引入并使用 Pino。以下是一个基本示例：

```javascript
const pino = require("pino");

// 创建一个 Pino 日志记录器实例
const logger = pino();

// 记录不同级别的日志
logger.info("Hello, this is an info level log");
logger.warn("This is a warning level log");
logger.error("This is an error level log");
```

上面的代码创建了一个默认配置的 Pino 日志记录器，然后记录了信息（info）、警告（warn）、错误（error）三个级别的日志。默认情况下，日志会输出到标准输出流（stdout），通常是控制台。

```
{"level":30,"time":1597674331170,"pid":1234,"hostname":"your-hostname","msg":"Hello, this is an info level log"}
{"level":40,"time":1597674331171,"pid":1234,"hostname":"your-hostname","msg":"This is a warning level log"}
{"level":50,"time":1597674331172,"pid":1234,"hostname":"your-hostname","msg":"This is an error level log"}
```

其中，level 表示日志级别（30 代表 info，40 代表 warn，50 代表 error），time 是日志事件发生的时间戳，pid 是进程 ID，hostname 是主机名，msg 是日志消息。

### 配置 Pino

Pino 提供了多种配置选项，可以在创建记录器时传递一个配置对象来自定义行为。例如，设置日志级别和自定义序列化器：

```javascript
const pino = require("pino");

// 自定义配置
const logger = pino({
  level: "debug", // 设置记录的最低日志级别
  serializers: {
    req: pino.stdSerializers.req, // 标准请求序列化器
    res: pino.stdSerializers.res, // 标准响应序列化器
  },
});

// 记录一个 debug 级别的日志
logger.debug({ req: request }, "Request received");
```

在这里，我们设置了记录器只记录 `debug` 级别或更高级别的日志，并且提供了对请求和响应对象的序列化。

### 子记录器

你还可以创建子记录器（child loggers），以继承父记录器的配置并且添加额外的上下文信息：

```javascript
const childLogger = logger.child({ component: "my-component" });

// 在子记录器上记录日志，将自动包含 component 字段
childLogger.info("This log is from my-component");
```

### 流式传输日志

如果你需要将日志写入文件或传输到远程服务，你可以使用 Node.js 的流（Streams）：

```javascript
const fs = require("fs");
const pino = require("pino");

// 创建一个可写流到文件
const stream = fs.createWriteStream("./my-log.log");

// 配置 Pino 使用这个流
const logger = pino(stream);

logger.info("This log will be written to my-log.log");
```

OR 多流

```js
const multistream = require("pino-multi-stream").multistream;

// 创建多个流
let streams = [
  { stream: fs.createWriteStream("./my-log.log") },
  { stream: process.stdout }, // 标准输出流（控制台）
];

const logger = pino({}, multistream(streams));

logger.info("This log will be written to my-log.log and printed to console");
```

这个例子展示了如何创建一个记录器，它会将日志写入到 `my-log.log` 文件中。

以上就是 Pino 的基本安装和使用。Pino 有许多其他高级功能和配置，你可以在 Pino 的官方文档中找到更多的指南和信息。

## 5. 构造器

Pino 的构造函数可以接收两个可选参数：一个是用于配置记录器（Logger）的选项对象，另一个是一个 Node.js 的流（Stream）对象，用于指定日志的输出目的地。

### 第一个参数：配置选项对象

这个参数是一个普通的 JavaScript 对象，它允许你自定义 Pino 记录器的行为。以下是一些常见的配置选项：

- `level`：设置记录的最低日志级别。只有等于或高于此级别的日志消息会被记录。默认是 `'info'`。
- `serializers`：一个包含自定义序列化函数的对象。序列化函数用于在日志消息被写入之前转换对象。
- `prettyPrint`：一个布尔值或对象，用于开启日志的美化输出（主要用于开发环境）。在 Pino v7.x 以后不再推荐使用，推荐使用 `pino-pretty` 模块。
- `enabled`：一个布尔值，用于启用或禁用日志记录。默认为 `true`。
- `timestamp`：一个布尔值或函数，用于为日志消息生成时间戳。
- `base`：一个包含要添加到日志记录中的基本属性的对象，例如 `{ pid: process.pid }`。如果设置为 `null`，Pino 将不会添加任何基础属性。
- `messageKey`：定义日志对象中表示消息文本的字段名称，默认是 `'msg'`。
- `name`：为记录器设置一个名称，这个名称将作为一个附加字段添加到所有日志中。

这里是一个带有一些配置选项的示例：

```javascript
const pino = require("pino");

const logger = pino({
  level: "debug",
  base: null,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  messageKey: "message",
});
```

### 第二个参数：流对象

第二个参数是一个 Node.js 流（Stream）对象，它定义了日志的输出目的地。如果这个参数被省略，Pino 将默认输出到 `process.stdout`，也就是控制台。通常，你可以传递一个写入流（Writable Stream），将日志直接写入文件或其他存储介质。

这里是一个创建文件流作为日志输出的示例：

```javascript
const fs = require("fs");
const pino = require("pino");

// 创建一个写入流
const logStream = fs.createWriteStream("./my-log.log");

// 使用自定义流作为 Pino 的输出
const logger = pino({}, logStream);
```

在这个例子中，日志将会被写入到 `./my-log.log` 文件中。

要注意的是，Pino 日志记录器的构造函数只能在创建记录器时接收这些参数。一旦记录器被创建，它的配置就不能更改，但你可以创建新的子记录器并且给它们不同的配置。

## 6. 常用场景

### 6.1 文件日志

```js
const fs = require("fs");
const pino = require("pino");

// 创建一个追加模式的写入流
const logStream = fs.createWriteStream("./my-log.log", { flags: "a" });

// 使用自定义流作为 Pino 的输出
const logger = pino({}, logStream);
```

### 6.2 美化输出

`npm i -D pino-pretty`

```js
const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

logger.info({ value1: "abc", value2: 123 }, "Multiple values logged");
```

### 6.3 网络请求场景

```js
"use strict";

const http = require("http");
const server = http.createServer(handle);

const logger = require("pino-http")();

function handle(req, res) {
  logger(req, res);
  req.log.info("something else");
  res.end("hello world");
}

server.listen(3000);
```

输出：

```
[2016-03-31T16:53:21.079Z] INFO (46316 on MBP-di-Matteo): something else
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 64386
    }
[2016-03-31T16:53:21.087Z] INFO (46316 on MBP-di-Matteo): request completed
    res: {
      "statusCode": 200,
      "header": "HTTP/1.1 200 OK\r\nX-Powered-By: restify\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: 11\r\nETag: W/\"b-XrY7u+Ae7tCTyyK7j1rNww\"\r\nDate: Thu, 31 Mar 2016 16:53:21 GMT\r\nConnection: keep-alive\r\n\r\n"
    }
    responseTime: 10
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 64386
    }
```

### 6.4 推到日志存储服务器

Pino 本身专注于生成日志，并将其输出为 JSON 格式的记录，它不直接提供发送日志到远程服务器的功能。不过，你可以使用 Pino 与其他 Node.js 模块或服务结合，以实现将日志发送到远端存储的需求。

有几种方法可以将 Pino 日志发送到远程服务器：

1. **使用 Node.js Streams 和传输协议**: 你可以创建一个可写流，它将日志记录发送到远程服务器。这可以通过 HTTP 请求、TCP 连接、WebSocket 连接或任何其他传输协议实现。

2. **使用日志转发服务**: 有些服务，如 Logstash、Fluentd 或 Vector，可以接收日志记录，然后将它们转发到不同的目的地，包括远程文件存储、日志索引服务或数据库。

3. **使用云日志服务**: 例如 AWS CloudWatch、Google Stackdriver、Azure Monitor 或其他专业的日志管理服务，它们通常提供了 API 来直接发送日志数据。

下面是一个简单的例子，如何使用 Node.js 的 `http` 模块手动发送日志到远程服务器：

```javascript
const pino = require("pino");
const http = require("http");

// 创建 Pino 日志记录器
const logger = pino({
  // Pino 日志实例的配置
});

// 自定义一个发送日志的函数
function sendLogToServer(logData) {
  const options = {
    hostname: "your.log.server.com",
    port: 80,
    path: "/logs",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(logData),
    },
  };

  const req = http.request(options, (res) => {
    // 处理响应的逻辑...
  });

  req.on("error", (e) => {
    console.error(`Problem with log request: ${e.message}`);
  });

  // 写入数据到请求体
  req.write(logData);
  req.end();
}

// 使用自定义的 Pino 目标，将日志发送到远程服务器
const sendLogStream = {
  write: (logData) => {
    sendLogToServer(logData);
  },
};

// 创建一个新的 Pino 实例，将自定义流作为其目标
const remoteLogger = pino(sendLogStream);

// 使用 remoteLogger 进行日志记录
remoteLogger.info("This log will be sent to the remote server");
```

在上述代码中，`sendLogToServer` 函数负责将日志数据作为 POST 请求的体发送到远程服务器。我们创建了一个包含 `write` 方法的自定义流 `sendLogStream`，Pino 会将日志记录写入这个流。然后，我们创建了一个新的 Pino 实例 `remoteLogger`，将此自定义流作为输出目标，这样所有通过 `remoteLogger` 生成的日志都会被发送到我们指定的远程服务器。

请注意，这只是一个基础示例。在实际部署中，你可能需要考虑更多的因素，例如网络错误处理、认证、日志缓冲和批量发送以提高效率等。

为了更好地管理性能和可靠性，通常建议使用专业的日志转发服务或云日志服务来处理日志的远程传输。这些服务通常提供高级的功能，如自动重试、负载平衡、故障转移和日志数据压缩。

### 6.5 日志文件过大时的轮转

Pino 本身不提供直接的日志分片功能，也称为日志轮转（log rotation）。不过，日志轮转是一个常见的需求，通常用于当日志文件达到一定大小或者一定时间间隔后创建新的日志文件。这有助于防止单个日志文件变得过大并简化旧日志的归档和删除。

虽然 Pino 不内置这个功能，但是你可以通过一些方法来实现日志分片：

1. **使用外部日志轮转工具**:
   广泛使用的日志轮转工具，如 `logrotate`（在 Linux 系统上）或 `rotatelogs`（与 Apache httpd 一起提供），可以配置来管理日志文件的轮转。你可以指定轮转的策略，例如每天轮转或达到特定大小时轮转。

2. **使用 Node.js 的文件流和模块**:
   在 Node.js 中，你可以使用像 `rotating-file-stream` 这样的模块来创建一个可写流，该流会自动处理文件的轮转。

安装 `rotating-file-stream`：

```bash
npm install rotating-file-stream
```

使用 `rotating-file-stream` 的示例：

```javascript
const pino = require("pino");
const rfs = require("rotating-file-stream");

// 创建一个 rotating-file-stream 实例
const stream = rfs.createStream("myapp.log", {
  size: "10M", // 每个日志文件的最大大小
  interval: "1d", // 每天轮转一次
  compress: "gzip", // 压缩旧日志文件
  path: "/path/to/logs", // 日志文件存放路径
});

// 创建 Pino 记录器，并将流作为日志输出目标
const logger = pino(stream);

// 使用 logger 正常记录日志
logger.info("This log entry will go to a rotated file.");
```

在这个例子中，日志文件将会在达到10MB 或每天轮转一次，旧的日志文件会被压缩为 `.gz` 格式。

3. **集成日志管理系统**:
   如果你的日志记录策略比较复杂，或者你需要更高级的日志管理功能，考虑使用日志管理系统，如 Logstash、Fluentd、Graylog 等。这些系统可以接收日志数据，然后根据配置进行管理，包括日志轮转、归档和删除。

记住，无论你选择哪种方法，都要确保你的日志轮转策略与应用程序的日志生成速度相协调，并且满足你的存储容量和归档需求。此外，对于生产环境，建议使用成熟的日志管理系统或服务，因为它们会提供更多的可靠性和灵活性。

### 6.6 异步日志

Pino 本身设计为一个非常高效的日志库，它的默认行为是使用 Node.js 的异步 API 写日志到流。当你使用 Pino 的 `pino` 函数或 `pino.destination` 创建日志记录器时，写入操作默认是异步的。

例如：

```javascript
const pino = require("pino");

// 创建一个日志记录器，它会异步地将日志写入到 process.stdout
const logger = pino();

// 或者使用 pino.destination 创建自定义的日志目标
const logDestination = pino.destination({
  dest: "./my-app.log", // 文件路径
  sync: false, // 使用异步写入，默认为 false
});

const asyncLogger = pino(logDestination);

// 使用 logger 记录日志
asyncLogger.info("This log will be written asynchronously");
```

在上述代码中，我们创建了一个日志记录器 `asyncLogger`，它将日志以异步方式写入到文件 `my-app.log` 中。虽然 `sync` 选项默认已经是 `false`（即异步写入），但是在这里显式地设置它可以让你的意图更清晰。

Pino 的异步 I/O 操作是由 Node.js 的底层文件系统和流（Stream）模块处理的，这些模块使用了底层的非阻塞 I/O。

如果你考虑日志写入的性能，并且想要确保日志写入操作不会影响你的应用程序主线程的性能，可以考虑以下额外策略：

1. **使用 pino.destination 的缓冲写入选项**：

```javascript
const destination = pino.destination({
  dest: "./my-app.log",
  minLength: 4096, // 设置缓冲区大小
  sync: false,
});

const logger = pino(destination);
```

在这个例子中，`minLength` 选项设置了一个缓冲区大小，日志消息将会在缓冲区达到这个长度后被刷新到文件中，这有助于减少磁盘 I/O 的次数。

2. **使用 Pino 的 `pino.extreme` 模式**（在 Pino 版本 6 之前）:

   Extreme 模式增加了缓冲区，以减少对底层系统的调用次数。这可以极大地提高吞吐量，但可能在进程崩溃时丢失最多 10s 内的日志数据。

```javascript
const pino = require("pino");
const extremeDest = pino.extreme(); // 在 Pino v6 之前使用
const extremeLogger = pino(extremeDest);

extremeLogger.info("This log will be written with extreme performance");
```

3. **使用 `pino.transport` 创建一个单独的工作线程来处理日志**（Pino v6+）:

```javascript
const pino = require("pino");

const logger = pino({
  transport: {
    target: "pino/file",
    options: { destination: "./my-app.log" },
  },
});
```

在 Pino 版本 6 以上，你可以使用 `transport` 选项来创建一个后台工作线程，专门用于处理日志写入，这样可以避免阻塞主线程。

记住，使用更多的缓冲和后台处理可以提高性能，但也增加了在进程崩溃时丢失日志的风险。确保权衡这些因素，并根据你的应用程序的需求进行选择。
