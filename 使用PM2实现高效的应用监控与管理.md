![image](https://github.com/lecepin/blog/assets/11046969/8949797a-6f32-439b-a35b-7abd3677c6d4)


## 1. pm2

PM2 是一个流行的进程管理器，用于 Node.js 应用程序。它支持应用程序的负载均衡、自动重启、日志管理、监控以及多环境管理等功能。PM2让开发者能够以守护进程的方式运行和管理 Node.js 应用，即使在应用崩溃或服务器重启后也能自动重启应用。这使得 PM2非常适合在生产环境中部署 Node.js 应用。除此之外，PM2还支持应用的零停机更新，以及对 Docker 容器的支持。

## 2. 诞生背景

PM2 的诞生背景主要是为了解决 Node.js 应用程序在生产环境中的运维问题。在 PM2出现之前，Node.js 开发者经常面临如何有效管理和维持应用稳定运行的挑战，特别是在应对应用崩溃、服务器重启或是负载均衡等方面。

PM2的主要目标是提供一个简单而强大的工具，帮助开发者和系统管理员在生产环境中管理和维护 Node.js 应用。它解决的关键问题包括：

1. **自动重启**: 如果 Node.js 应用崩溃或由于某种原因停止，PM2可以自动重启应用，确保服务的持续可用性。
2. **负载均衡**: PM2支持集群模式，能够启动多个应用实例，并在它们之间自动分配负载，提高应用的可伸缩性和可用性。
3. **无停机更新**: PM2允许开发者在不停止当前服务的情况下，更新 Node.js 应用到新的版本，这对于需要24/7运行的服务来说非常重要。
4. **日志管理**: PM2提供了日志管理的功能，使得跟踪和调试生产环境中的应用更为便捷。
5. **监控**: PM2包含了一个监控系统，可以实时查看应用的 CPU 和内存使用情况，帮助开发者优化应用性能。

## 2. 安装

执行以下命令来全局安装 PM2。全局安装意味着你可以在任何地方运行 PM2命令。

```bash
npm install pm2 -g
```

这条命令会将 PM2安装到你的系统上，`-g` 参数表示全局安装，这样你就可以在任何目录下使用 PM2命令。

安装完成后，你可以运行以下命令来检查 PM2是否正确安装：

```bash
pm2 --version
```

## 3. 常用命令

| 命令        | 描述                     | 使用示例及参数                                                                           |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `start`     | 启动应用                 | `pm2 start app.js`<br>`pm2 start app.js -i 4 --name myApp`<br>`pm2 start app.js --watch` |
| `stop`      | 停止应用                 | `pm2 stop app.js`<br>`pm2 stop 0`<br>`pm2 stop all`                                      |
| `restart`   | 重启应用                 | `pm2 restart app.js`<br>`pm2 restart all`                                                |
| `delete`    | 删除应用                 | `pm2 delete app.js`<br>`pm2 delete 0`<br>`pm2 delete all`                                |
| `list`      | 列出所有应用             | `pm2 list`                                                                               |
| `monit`     | 监控应用                 | `pm2 monit`                                                                              |
| `logs`      | 查看应用日志             | `pm2 logs`<br>`pm2 logs app.js`<br>`pm2 logs --lines 100`                                |
| `save`      | 保存当前应用列表         | `pm2 save`                                                                               |
| `reload`    | 重载应用                 | `pm2 reload app.js`<br>`pm2 reload all`                                                  |
| `scale`     | 调整集群模式下的实例数量 | `pm2 scale app +1`<br>`pm2 scale app 4`                                                  |
| `describe`  | 查看应用详细信息         | `pm2 describe 0`                                                                         |
| `update`    | 更新 PM2守护进程         | `pm2 update`                                                                             |
| `status`    | 查看应用状态             | `pm2 status`                                                                             |
| `flush`     | 清空所有日志文件         | `pm2 flush`                                                                              |
| `startup`   | 创建开机自启动脚本       | `pm2 startup`                                                                            |
| `unstartup` | 删除开机自启动脚本       | `pm2 unstartup`                                                                          |

## 4. 配置文件

PM2的配置文件通常被称为`ecosystem.config.js`，这是一个 JavaScript 文件，允许你配置和管理应用程序的多个方面。通过使用配置文件，你可以轻松地指定环境变量、日志文件路径、实例数量等，并且可以一次性启动多个应用。下面详细介绍如何使用 PM2配置文件。

### 基本结构

PM2的`ecosystem.config.js`文件基本结构如下：

```javascript
module.exports = {
  apps: [
    {
      name: "app1", // 应用程序名称
      script: "./app.js", // 主脚本路径
      args: "arg1 arg2", // 传递给脚本的参数
      instances: 4, // 应用实例数
      autorestart: true, // 自动重启
      watch: false, // 监控文件变动
      max_memory_restart: "1G", // 内存超过1G 重启
      env: {
        // 环境变量
        NODE_ENV: "development",
      },
      env_production: {
        // 生产环境变量
        NODE_ENV: "production",
      },
    },
    {
      name: "app2",
      script: "./app2.js",
      // 其他配置...
    },
  ],
};
```

### 主要字段解释

- **apps**: 一个数组，包含了你要运行的应用的配置对象。
- **name**: 应用程序的名称。
- **script**: 应用程序的启动脚本或文件。
- **args**: 传递给脚本的参数。
- **instances**: 启动应用实例的数量。对于无状态的应用，可以设置为`max`以根据 CPU 核心数量来启动最大实例数。
- **autorestart**: 如果应用崩溃或者停止，是否自动重启。
- **watch**: 是否启用文件监控和自动重启。
- **max_memory_restart**: 当应用超过指定内存量时自动重启。
- **env**: 在这个对象中，你可以指定传递给应用的环境变量。这些环境变量在所有环境下都会加载。
- **env_production**, **env_development**: 你可以为不同的环境指定不同的环境变量。

### 使用配置文件

1. **启动应用**: 使用配置文件启动应用时，运行如下命令：

   ```bash
   pm2 start ecosystem.config.js
   ```

2. **指定环境**: 如果你有为不同环境定义的变量，可以在启动时指定：

   ```bash
   pm2 start ecosystem.config.js --env production
   ```

   这将使用`env_production`中定义的环境变量。

3. **管理应用**: 一旦应用启动，你可以使用 PM2的标准命令来管理它们，例如`pm2 stop`, `pm2 restart`, 和`pm2 delete`。

配置文件为应用部署提供了强大而灵活的管理方式，特别是当你需要部署多个应用或需要为应用指定特定的环境变量和配置时。通过精心设计的配置文件，你可以确保应用的部署更加一致和可预测。

## 5. CLI 实现配置文件效果

如果你不使用配置文件，而是选择直接使用 PM2的 CLI 命令来实现上面提到的功能，可以通过在命令行中添加特定的选项和参数来完成。下面是如何通过 CLI 命令实现配置文件中提到的一些主要功能：

1. **启动应用并传递参数**:

   ```bash
   pm2 start app.js --name "app1" -- arg1=value1 arg2=value2
   ```

   这里`--name "app1"`设定了应用的名称，`-- arg1 arg2`向应用传递了参数。

2. **指定实例数量**:

   ```bash
   pm2 start app.js -i 4
   ```

   该命令启动了4个应用实例。如果你想要根据 CPU 核心数量来启动最大实例数，可以使用`-i max`。

3. **启用自动重启**:
   自动重启是 PM2的默认行为，无需特别指定。

4. **启用文件监控**:

   ```bash
   pm2 start app.js --watch
   ```

   这会监控应用目录中文件的变动，并在变动时自动重启应用。

5. **限制内存重启**:

   ```bash
   pm2 start app.js --max-memory-restart 1G
   ```

   当应用消耗的内存超过1GB 时，PM2将自动重启应用。

6. **设置环境变量**:
   你可以在启动命令中直接设置环境变量：

   ```bash
   NODE_ENV=development pm2 start app.js
   ```

   或者，为了同时设置多个环境变量，可以使用：

   ```bash
   pm2 start app.js --env NODE_ENV=development,env1=13,env2=32
   ```

7. **为生产环境设置环境变量**:
   对于生产环境，你可以这样设置：
   ```bash
   NODE_ENV=production pm2 start app.js
   ```

使用 CLI 命令直接设置这些选项的好处是快速简便，特别是对于一次性或临时的任务。但对于更复杂的部署，或者当你需要在多个环境中维护一致的配置时，使用配置文件将更为有效和易于管理。

## 6. 监控

PM2提供了一个内置的监控工具，允许你实时查看运行在 PM2下的应用的性能指标，如 CPU 和内存使用情况。这个监控工具可以帮助你了解应用的运行状况，及时发现潜在的问题。

### 使用 PM2监控命令行工具

![image](https://github.com/lecepin/blog/assets/11046969/5affd627-6071-4eb6-a594-270e6b879741)


1. **启动监控控制台**:
   要查看实时的监控数据，可以在命令行中使用以下命令：
   ```bash
   pm2 monit
   ```
   这会打开一个交互式的监控控制台，其中展示了所有由 PM2管理的进程的 CPU 和内存使用情况。

### 使用 PM2 Web 界面

![image](https://github.com/lecepin/blog/assets/11046969/5609e00f-7b9e-47b9-8004-7ce6d8f78b28)


PM2还提供了一个 Web 界面，称为 PM2 Plus，用于更高级的监控和管理功能，包括远程监控和日志管理。不过，这需要在 PM2 Plus 网站上注册并设置 keymetrics 代理。

1. **PM2 Plus**:
   - 你可以访问[PM2 Plus](https://pm2.io/)来获取更多关于这个服务的信息。
   - 它允许你监控关键指标，设置告警，查看日志，和进行实时的问题排查。

### 自定义指标

PM2还允许你定义自己的指标来监控。你可以在你的应用中集成 PM2的 API 来发送自定义指标，这样就可以在 PM2的监控工具中查看这些指标了。

## 7. 其它

### 7.1 负载均衡下的会话管理

在使用 PM2的集群模式运行多个实例的场景下，确保会话（session）一致性是一个重要的考虑点。由于每个实例都是独立运行的，直接在内存中存储会话信息可能会导致会话不一致的问题，因为用户的后续请求可能被路由到不同的实例上，而不同的实例之间无法共享内存中的会话信息。

为了解决这个问题，通常的做法是使用一个中央存储来存储会话信息，这样不同的实例可以共享这些信息。以下是一些常见的解决方案：

1. **使用 Redis 存储会话**: Redis 是一种常用的解决方案，它提供了快速的数据读写并支持数据持久化。使用 Redis 作为会话存储，可以确保不同的实例能够访问和更新同一份会话数据。

2. **使用数据库存储会话**: 另一种常见的方法是将会话存储在数据库中，如 MongoDB 或 MySQL 等。这样可以确保会话信息的一致性，但可能比使用内存存储或 Redis 的性能稍低。

3. **使用其他共享存储方案**: 根据应用的具体需求，还可以考虑使用其他类型的共享存储方案，如 Memcached、Etcd 等。

对于 Node.js 应用，如果你使用 Express 框架，可以利用`express-session`配合 Redis 等存储的中间件来实现会话的共享。例如，使用`connect-redis`中间件将会话存储在 Redis 中：

```javascript
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

app.use(
  session({
    store: new RedisStore({
      // Redis 服务器配置
      host: "localhost",
      port: 6379,
    }),
    secret: "your_secret",
    resave: false,
    saveUninitialized: false,
  })
);
```

使用这种方式，无论用户的请求被路由到哪个实例，应用都能访问到同一份会话信息，从而避免了会话不一致的问题。确保你的会话存储方案是可伸缩的，并且可以处理你的应用负载。

### 7.2 异常重启处理

当 PM2重启应用时，确保应用的当前状态完成后再继续，以及在异常重启下恢复重启前的状态，需要在应用层面做一些策略设计。这通常涉及到优雅的关闭处理和持久化状态管理。

#### 优雅的关闭处理

1. **捕获关闭信号**：在 Node.js 应用中，你可以监听如`SIGINT`和`SIGTERM`这样的信号，这样当 PM2尝试重启应用时，你的代码可以捕获这些信号并执行清理逻辑。

   ```javascript
   process.on("SIGINT", function () {
     console.log("Received SIGINT. Performing graceful shutdown.");
     gracefulShutdown();
   });

   function gracefulShutdown() {
     // 在这里执行清理操作，如关闭数据库连接、完成正在处理的请求等
   }
   ```

2. **完成正在处理的请求**：在收到关闭信号后，应用应该停止接受新的请求，但同时确保当前正在处理的请求完成。这可能涉及到跟踪所有活跃的请求并等待它们结束。

#### 恢复状态

1. **状态持久化**：为了在重启后恢复状态，应用的关键状态需要持久化，例如存储在数据库或文件系统中。这样，在应用重启后，可以从这些持久化的存储中恢复状态。

2. **启动时的状态恢复逻辑**：应用启动时应该包含逻辑来检查并恢复之前的状态。这可能包括读取数据库中的数据，或从文件系统中恢复信息等。

#### PM2特定策略

- **进程守护**：PM2会守护你的应用进程，如果应用崩溃或非正常退出，它会自动重启应用。这是通过配置 PM2的`restart`策略实现的。

- **零停机重启**：使用 PM2的`reload`或`gracefulReload`命令可以实现零停机重启，这对于不间断服务的应用特别有用。这些命令会等待新的实例启动并接收连接后，再停止旧的实例。

### 7.3 SIGINT 信号超时处理

```js
const express = require("express");
const app = express();
const server = app.listen(3000, () =>
  console.log("Server started on port 3000")
);

let activeConnections = new Set();

app.get("/", (req, res) => {
  // 模拟长时间运行的请求
  const requestId = Date.now();
  activeConnections.add(requestId);
  console.log(`Request ${requestId} started`);

  setTimeout(() => {
    res.send("Hello World");
    activeConnections.delete(requestId);
    console.log(`Request ${requestId} finished`);
  }, 10000); // 假设请求处理需要10秒
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Graceful shutdown start.");

  // 停止服务器接受新的连接
  server.close(() => {
    console.log("Server closed. No new connections are accepted.");
  });

  // 等待所有活动请求完成
  const checkActiveConnections = () => {
    if (activeConnections.size > 0) {
      console.log(
        `Waiting for ${activeConnections.size} active connections to finish.`
      );
      setTimeout(checkActiveConnections, 1000);
    } else {
      console.log("All connections finished. Exiting now.");
      process.exit(0);
    }
  };

  checkActiveConnections();
});
```

捕获`SIGINT`信号后，进程确实有机会执行清理逻辑，但这并不意味着 PM2无法再去主动 kill 进程。当你的应用捕获`SIGINT`信号并进入清理阶段时，PM2会等待一段时间（默认是1600毫秒），这个时间是可配置的。如果应用在这段时间内没有退出，PM2会发送`SIGKILL`信号来强制终止进程。

这意味着你的清理逻辑需要在 PM2的超时时间内完成，以确保它能够正常执行并让进程优雅地退出。如果清理逻辑需要的时间超过了 PM2的超时阈值，你可以调整 PM2的配置来增加这个超时时间。

例如，你可以在启动应用时通过`--kill-timeout`参数来设置这个超时时间：

```bash
pm2 start app.js --kill-timeout 3000
```

这里，`--kill-timeout 3000`表示 PM2将等待3000毫秒（3秒）给应用足够的时间来处理清理逻辑。如果应用在3秒内没有退出，PM2将使用`SIGKILL`来强制终止应用。

这个机制确保了你的应用有机会在 PM2重启或停止它之前完成必要的清理工作，同时也保留了 PM2在应用无法正确响应终止信号时强制关闭它的能力。
