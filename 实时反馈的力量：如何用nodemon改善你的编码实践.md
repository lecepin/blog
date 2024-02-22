![image](https://github.com/lecepin/blog/assets/11046969/b6f20037-ee00-46ac-8972-31bac93d0721)


## 1. nodemon

`nodemon`是一个帮助开发基于 Node.js 的应用程序的工具，通过在检测到目录中的文件更改时自动重启 node 应用程序来实现。

`nodemon`不需要对您的代码或开发方式进行任何额外的更改。`nodemon`是 node 的一个替换包装器。使用`nodemon`时，只需在执行脚本时将命令行中的`node`替换为`nodemon`即可。

## 2. 诞生背景

`nodemon`是由 Ian Crowther 开发的，最初发布于2011年。它的诞生背景主要是为了解决 Node.js 开发中的一个常见问题：每次修改代码后，都需要手动重启应用程序以加载新的更改。这个重复的过程不仅耗时而且降低了开发效率。

在 Node.js 应用程序开发过程中，实时反馈对于提高开发效率至关重要。开发者需要快速测试代码更改的效果，但 Node.js 自身不提供自动重启应用的功能。`nodemon`就是为了填补这个空白而诞生的。它监视指定目录下文件的任何更改，并在检测到更改时自动重启 Node.js 应用程序，从而无需开发者手动介入。

总的来说，`nodemon`解决了以下几个核心问题：

1. **提高开发效率**：通过自动重启应用，开发者可以立即看到代码更改的效果，无需频繁手动重启。
2. **简化开发流程**：开发者可以专注于编写和修改代码，而不需要担心重启服务器的问题。
3. **支持多种文件类型**：除了 JavaScript 文件外，`nodemon`还可以监视其他类型的文件变化，比如在使用模板或样式文件时，也能自动重启应用，提供灵活的开发体验。

通过解决这些问题，`nodemon`成为了 Node.js 开发者工具箱中的一个重要工具，特别是在开发阶段，它极大地提升了开发的便捷性和效率。

## 3. 安装

可以通过 git 克隆或使用 npm（推荐的方式）进行安装：

```bash
npm install -g nodemon # 或使用 yarn: yarn global add nodemon
```

这样，`nodemon`就会被安装到您的系统路径中。

您也可以将`nodemon`安装为开发依赖：

```bash
npm install --save-dev nodemon # 或使用 yarn: yarn add nodemon -D
```

使用本地安装时，`nodemon`不会在您的系统路径中可用，或者您不能直接从命令行中使用它。相反，本地安装的`nodemon`可以通过在 npm 脚本（如 npm start）中调用它或使用`npx nodemon`来运行。

## 4. 使用

`nodemon`包装了您的应用程序，因此您可以传递所有通常会传递给您的应用程序的参数：

```bash
nodemon [your node app]
```

对于 CLI 选项，使用`-h`（或`--help`）参数：

```bash
nodemon -h
```

使用`nodemon`很简单，如果我的应用程序接受主机和端口作为参数，我会这样启动它：

```bash
nodemon ./server.js localhost 8080
```

此脚本的任何输出都会以`[nodemon]`为前缀，否则您的应用程序的所有输出，包括错误，都会如预期那样被回显出来。

您还可以像通常那样通过命令行向 node 传递`inspect`标志：

```bash
nodemon --inspect ./server.js 80
```

如果您的应用程序有一个`package.json`文件，您可以完全省略主脚本，`nodemon`会读取`package.json`中的`main`属性并使用该值作为应用程序（参考）。

`nodemon`还会搜索`package.json`中的`scripts.start`属性（从`nodemon` 1.1.x 开始）。

还可以查看`nodemon`的 FAQ 或问题。

**自动重新运行**

`nodemon`最初是编写来重启挂起的进程，如 Web 服务器，但现在也支持干净退出的应用程序。如果您的脚本干净地退出，`nodemon`将继续监视目录（或目录）并在有任何更改时重启脚本。

**手动重启**

当`nodemon`运行时，如果您需要手动重启您的应用程序，而不是停止并重启`nodemon`，您可以输入`rs`并回车，`nodemon`将重新启动您的进程。

**配置文件**

`nodemon`支持本地和全局配置文件。这些通常命名为`nodemon.json`，可以位于当前工作目录或您的主目录。可以使用`--config <file>`选项指定另一个本地配置文件。

优先级如下，以便命令行参数始终覆盖配置文件设置：

- 命令行参数
- 本地配置
- 全局配置

配置文件可以采用任何命令行参数作为 JSON 键值，例如：

```json
{
  "verbose": true,
  "ignore": ["*.test.js", "**/fixtures/**"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

上述`nodemon.json`文件可能是我的全局配置，这样我就有了对 ruby 文件和 processing 文件的支

持，我可以运行`nodemon demo.pde`，`nodemon`会自动知道如何运行脚本，即使默认情况下不支持 processing 脚本。

如果您想将所有包配置保留在一个地方，`nodemon`支持使用`package.json`进行配置。以与配置文件相同的格式指定配置，但在`package.json`文件的`nodemonConfig`下，例如，以下是`package.json`：

```json
{
  "name": "nodemon",
  "homepage": "http://nodemon.io",
  "...": "... other standard package.json values",
  "nodemonConfig": {
    "ignore": ["**/test/**", "**/docs/**"],
    "delay": 2500
  }
}
```

注意，如果您指定了一个`--config`文件或提供了一个本地`nodemon.json`，任何`package.json`配置都将被忽略。

这一部分需要更好的文档，但现在您也可以查看`nodemon --help config`（也在这里）。

**运行非 node 脚本**

`nodemon`也可以用来执行和监视其他程序。`nodemon`将读取正在运行的脚本的文件扩展名，并监视那个扩展名而不是`.js`，如果没有`nodemon.json`：

```bash
nodemon --exec "python -v" ./app.py
```

现在，`nodemon`将以 python 的详细模式（注意，如果您没有向 exec 程序传递参数，您不需要引号）运行`app.py`，并寻找新的或修改过的`.py`扩展文件。

**默认可执行文件**

使用`nodemon.json`配置文件，您可以使用`execMap`属性定义自己的默认可执行文件。这在您使用默认情况下`nodemon`不支持的语言时特别有用。

为了添加对`.pl`扩展名（对于 Perl）的支持，`nodemon.json`文件将添加：

```json
{
  "execMap": {
    "pl": "perl"
  }
}
```

现在运行以下命令，`nodemon`将知道使用 perl 作为可执行文件：

```bash
nodemon script.pl
```

通常建议使用全局`nodemon.json`添加自己的`execMap`选项。然而，如果有一个常见的默认值缺失，可以将其合并到项目中，以便`nodemon`默认支持它，通过更改`default.js`并发送拉取请求。

**监视多个目录**

默认情况下，`nodemon`监视当前工作目录。如果您想控制该选项，请使用`--watch`选项添加特定路径：

```bash
nodemon --watch app --watch libs app/server.js
```

现在`nodemon`只会在`./app`或`./libs`目录中有更改时重启。默认情况下，`nodemon`会遍历子目录，因此没有必要明确包含子目录。

`nodemon`还支持 unix globbing，例如`--watch './lib/*'`。globbing 模式必须加引号。对于高级 globbing，请参见`picomatch`文档，`nodemon`通过`chokidar`（而`chokidar`通过`anymatch`）使用该库。

**指定扩展名监视列表**

默认情况下，`nodemon`查找具有`.js`、`.mjs`、`.coffee`、`.litcoffee`和`.json`扩展名的文件。如果您使用`--exec`选项并监视`app.py`，`nodemon`将监视具有`.py`扩展名的文件。然而，您可以使用`-e`（或`--ext`）开关指定自己的列表，如下所示：

```bash
nodemon -e js,pug
```

现在`nodemon`将在目录（或子目录）中的任何

更改发生时重新启动，扩展名为`.js`、`.pug`的文件。

**忽略文件**

默认情况下，`nodemon`只会在`.js` JavaScript 文件更改时重启。在某些情况下，您会希望忽略某些特定文件、目录或文件模式，以防止`nodemon`过早重启您的应用程序。

这可以通过命令行完成：

```bash
nodemon --ignore lib/ --ignore tests/
```

或者可以忽略特定文件：

```bash
nodemon --ignore lib/app.js
```

模式也可以被忽略（但请确保引用参数）：

```bash
nodemon --ignore 'lib/*.js'
```

重要的是，忽略规则是与完整的绝对路径匹配的模式，这决定了有多少文件被监视。如果使用通配符 glob 模式，它需要使用`**`或完全省略。例如，`nodemon --ignore '**/test/**'`将工作，而`--ignore '*/test/*'`则不会。

注意，默认情况下，`nodemon`会忽略`.git`、`node_modules`、`bower_components`、`.nyc_output`、`coverage`和`.sass-cache`目录，并将您的忽略模式添加到列表中。如果您确实想监视像`node_modules`这样的目录，您需要覆盖底层的默认忽略规则。

**应用程序没有重启**

在某些网络环境中（如在容器中运行`nodemon`跨挂载驱动器读取时），您需要使用`legacyWatch: true`，它启用了 Chokidar 的轮询。

通过 CLI，使用`--legacy-watch`或简写`-L`：

```bash
nodemon -L
```

虽然这应该是最后的手段，因为它将轮询它能找到的每个文件。

**延迟重启**

在某些情况下，您可能希望等到一些文件更改后再进行。在检查新文件更改之前的超时时间是1秒。如果您正在上传多个文件，而且这需要一些秒钟，这可能导致您的应用程序不必要地多次重启。

要添加额外的节流，或延迟重启，请使用`--delay`命令：

```bash
nodemon --delay 10 server.js
```

为了更精确，可以指定毫秒。要么作为浮点数：

```bash
nodemon --delay 2.5 server.js
```

要么使用时间指定符（ms）：

```bash
nodemon --delay 2500ms server.js
```

延迟数字是在最后一个文件更改后多少秒（或毫秒，如果指定）才重启。因此，`nodemon`将只在给定的秒数后重启您的应用程序。

如果您在`nodemon.json`中设置此值，该值将始终以毫秒为单位解释。例如，以下是等效的：

```bash
nodemon --delay 2.5

{
  "delay": 2500
}
```

**平稳地重新加载您的脚本**

可以让`nodemon`向您的应用程序发送您指定的任何信号。

```bash
nodemon --signal SIGHUP server.js
```

您的应用程序可以如下处理信号。

```js
process.once("SIGHUP", function () {
  reloadSomeConfiguration();
});
```

请注意，`nodemon`将向进程树中的每个进程发送此信号。

如果您使用 cluster，那么每个 worker（以及 master）都将接收到信号。如果您希望在接收到 SIGHUP 时终止所有 worker，一个常见的模式是在 master 中捕获 SIGHUP，并向所有 worker 转发 SIGTERM，同时确保所有 worker 忽略 SIGHUP。

```js
if (cluster.isMaster) {
  process.on("SIGH

UP", function () {
    for (const worker of Object.values(cluster.workers)) {
      worker.process.kill("SIGTERM");
    }
  });
} else {
  process.on("SIGHUP", function() {})
}
```

**控制您的脚本关闭**

`nodemon`在看到文件更新时向您的应用程序发送 kill 信号。如果您需要在脚本中清理关闭，您可以捕获 kill 信号并自己处理。

以下示例将侦听 SIGUSR2信号（`nodemon`用于重启），运行清理过程，然后杀死自己以让`nodemon`继续控制：

```js
process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
```

注意，只有在您的关闭工作完成后，才调用`process.kill`。感谢 Benjie Gillam 写下这种技术。

**在`nodemon`状态变化时触发事件**

如果您想要在`nodemon`重启时收到类似 growl 的通知，或者在事件发生时触发动作，那么您可以要么要求`nodemon`，要么将事件操作添加到您的`nodemon.json`文件中。

例如，要在 Mac 上`nodemon`重启时触发通知，`nodemon.json`看起来像这样：

```json
{
  "events": {
    "restart": "osascript -e 'display notification \"app restarted\" with title \"nodemon\"'"
  }
}
```

可用事件的完整列表列在事件状态 wiki 上。注意，您可以绑定到状态和消息。

**将输出管道到其他地方**

```js
nodemon({
  script: ...,
  stdout: false // 重要：这告诉 nodemon 不要输出到控制台
}).on('readable', function() { // `readable`事件表示数据已经准备好拾取
  this.stdout.pipe(fs.createWriteStream('output.txt'));
  this.stderr.pipe(fs.createWriteStream('err.txt'));
});
```

**设计原则**

- 标志越少越好
- 跨所有平台工作
- 功能越少越好
- 让个人在`nodemon`之上构建
- 提供所有 CLI 功能作为 API
- 贡献必须有并通过测试

## 5. nodemon VS pm2

`pm2`和`nodemon`都是流行的Node.js应用程序管理工具，但它们各自适用于不同的场景，并具有不同的特点和优缺点：

### pm2

- **特点**：
  - 面向生产环境设计，提供进程守护、负载均衡、日志管理、监控和性能分析等功能。
  - 支持应用程序的无缝重启和零停机更新。
  - 可以管理多个应用进程，并提供应用程序的状态管理。
  - 支持多环境配置，易于在不同环境下部署。

- **适应场景**：
  - 生产环境下部署Node.js应用程序。
  - 需要高可用性和稳定性的场合。
  - 对应用进行监控和性能分析。

- **优点**：
  - 功能全面，适合复杂的生产环境。
  - 自动重启失败的进程，提高应用稳定性。
  - 负载均衡提高应用的处理能力。

- **缺点**：
  - 相对复杂，新手可能需要时间学习。
  - 资源占用相对较高。

### nodemon

- **特点**：
  - 主要用于开发环境，监视文件变化自动重启应用，提高开发效率。
  - 简单易用，无需额外配置即可开始使用。
  - 支持任何通过命令行启动的Node.js应用。

- **适应场景**：
  - 开发阶段，需要频繁重启应用以测试代码更改。
  - 小型项目或个人项目的快速原型开发。

- **优点**：
  - 非常适合开发使用，提升开发效率。
  - 安装简单，使用方便，几乎无学习成本。
  - 支持运行非Node脚本，扩展性好。

- **缺点**：
  - 不包含像pm2那样的进程守护、负载均衡等生产环境所需功能。
  - 主要用于开发环境，不适合直接在生产环境中使用。

总结来说，`pm2`更适合用于生产环境中的Node.js应用程序管理，提供了丰富的功能来确保应用的稳定运行和高可用性。而`nodemon`则更适合于开发环境，通过监视文件变动自动重启应用，极大地提升了开发的便捷性和效率。两者在选择时应根据实际的使用场景和需求来决定。
