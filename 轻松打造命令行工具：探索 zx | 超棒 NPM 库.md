![](/images/1705842175_6b0958dd000baecd.png)

## 1. zx 是什么

Google 的 `zx` 工具是一个基于 Node.js 的命令行脚本运行器，旨在让 shell 脚本的编写更加简单和强大。它通过提供一系列的实用功能以及对现代 JavaScript 语言特性的支持，使得编写和执行复杂的脚本任务变得更加轻松。

`zx` 使用了 JavaScript（ES Module）、顶层的 `await` 支持、模板字面量、以及其它 ES6+ 的特性，而不是传统的 Bash 或 Shell 脚本。这意味着你可以利用你现有的 JavaScript/Node.js 知识来编写命令行工具。

下面是一些 `zx` 主要特性：

1. **简单的命令执行**：通过 `$` 函数可以轻松地执行 shell 命令并获取输出。
2. **管道支持**：可以使用 Node.js 的流来处理数据。
3. **内置的 fetch**：内置了 Node-fetch，可以直接在脚本中发送 HTTP 请求。
4. **内置的包管理器支持**：可以在脚本中使用 `npm`、`yarn` 命令。
5. **Markdown 支持**：可以在 Markdown 文件中编写脚本，并以执行脚本的形式运行 Markdown。
6. **顶层 await**：Node.js 可以直接在脚本的最顶层使用 await，无需封装在 async 函数中。
7. **环境变量和路径处理**：zx 提供了一些辅助函数来处理环境变量和文件路径。
8. **脚本参数解析**：zx 可以分析传递给脚本的参数，无需额外的解析库。
9. **错误处理**：执行命令时如果有错误发生，zx 会默认抛出异常，简化错误处理逻辑。

安装 `zx` 的方式通常是使用 `npm`（或 `yarn`）进行全局安装：

```bash
npm install -g zx
```

或者作为项目的依赖：

```bash
npm install zx --save-dev
```

一个简单的 `zx` 脚本示例：

```javascript
#!/usr/bin/env zx

let branch = await $`git branch --show-current`;
console.log(`Current git branch is ${branch}`);
```

此脚本使用了 `zx` 的 `$` 函数来执行 `git` 命令，并打印当前的 git 分支。

`zx` 是为了简化和加强命令行脚本的编写，让开发者能够使用更现代的语言特性来创建更加健壮和易于维护的脚本。

## 2. 诞生背景

`zx` 工具的诞生背景是由于传统的 Unix shell 脚本（如 Bash）存在一些限制和不便之处，特别是对于那些熟悉 JavaScript 和 Node.js 生态的开发者来说。`zx` 试图解决以下几点问题或不便：

1. **语言特性限制**：Bash 脚本语言相对较老，缺少许多现代编程语言拥有的高级特性，例如异步处理、Promise、和模块系统等。
2. **跨平台兼容性**：Bash 在 Windows 上不是原生支持的，需要通过特定的环境（如 Cygwin 或 WSL）来运行，而 `zx` 脚本作为 Node.js 脚本，能够在任何支持 Node.js 的平台上运行，提高了跨平台兼容性。
3. **错误处理**：在 Bash 脚本中，错误处理往往是比较繁琐的，需要检查命令的退出码等。而在 `zx` 中，如果命令执行失败，则会抛出异常，可以使用 JavaScript 的 try-catch 机制来处理错误。
4. **工具链集成**：JavaScript 开发者通常已经熟悉 npm/yarn 等包管理器和大量的 Node.js 模块。`zx` 允许开发者在脚本中直接使用这些工具和模块，而无需切换到 Bash 语境。
5. **代码可读性和维护性**：JavaScript 提供了丰富的语言特性，包括箭头函数、模板字符串、解构赋值等，这些特性能够让代码更加简洁明了，提升可读性和维护性。

## 3. zx 命令概览


| 分类          | 命令/属性      | 用途描述                                                 | 示例/用法                                                      |
| ------------- | -------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| 执行控制      | `$`            | 执行命令并返回 `stdout`、`stderr` 和 `exitCode`          | ``let output = await $`ls`;``                                   |
|               | `$.spawn`      | 创建一个子进程，类似 `child_process.spawn`               | ``await $.spawn('ls', ['-l']);``                               |
|               | `$.shell`      | 设置或获取用于执行命令的 shell                           | ``$.shell = '/bin/bash';``                                     |
|               | `nothrow()`    | 执行命令，即使出错也不抛出异常                            | ``await $`rm -rf /`.nothrow();``                               |
|               | `quiet()`      | 执行命令不打印输出                                       | ``await $`rm file.txt`.quiet();``                              |
|               | `timeout()`    | 设置命令执行的超时时间                                    | ``await $`sleep 5`.timeout(1000);``                            |
|               | `retry()`      | 重试执行命令直到成功或达到重试次数                        | ``await retry(() => $`ping -c 1 google.com`);``                |
| 流程控制      | `pipe()`       | 管道连接命令，将上一个命令的输出作为下一个命令的输入      | ``let result = await $`echo hello`.pipe($`grep h`);``          |
|               | `kill()`       | 发送信号以终止进程                                        | ``let p = $`sleep 1000`; setTimeout(() => p.kill(), 100);``    |
|               | `stdin()`      | 为下一条执行的命令提供 stdin 数据                         | ``await $`cat`.stdin('Hello, zx!');``                          |
|               | `cd()`         | 更改当前工作目录                                          | ``await cd('/path/to/dir');``                                  |
|               | `within()`     | 在指定目录下执行命令                                      | ``await within('/path/to/dir', async () => { await $`ls`; });``|
|               | `spinner()`    | 显示旋转器（spinner）并执行命令                           | ``await spinner('Loading', $`sleep 5`);``                      |
| 输入/输出控制 | `stdio()`      | 自定义命令的 stdio 配置                                    | ``await $`node script.js`.stdio('inherit');``                  |
|               | `$.log`        | 控制是否记录执行命令的日志                                | ``$.log = true;``                                              |
|               | `$.verbose`    | 设置详细模式以打印额外信息                                | ``$.verbose = true;``                                          |
|               | `$.prefix`     | 设置命令前缀                                               | ``$.prefix = 'SUDO_ASKPASS=askpass sudo -A';``                 |
|               | `$.quote`      | 函数，用于正确转义命令参数                                | ``let cmd = `echo ${$.quote('hello world')}`;``                |
|               | `echo()`       | 打印文本到控制台                                          | ``echo('Hello, world!');``                                     |
| 环境控制      | `$.env`        | 设置或获取环境变量                                         | ``$.env.PATH += ':/custom/path';``                             |
|               | `$.cwd`        | 获取当前工作目录路径                                      | ``console.log('Current directory:', $.cwd);``                  |
| 文件和系统    | `fs`           | Node.js 的文件系统模块，用于操作文件系统                   | ``fs.writeFileSync('file.txt', 'Hello, zx!');``                |
|               | `os`           | Node.js 的操作系统模块，提供关于系统的信息和工具          | ``console.log('Platform:', os.platform());``                   |
|               | `path`         | Node.js 的路径模块，用于操作文件系统路径                   | ``let fullPath = path.resolve('file.txt');``                   |
|               | `glob()`       | 使用 glob 模式匹配文件路径                                 | ``let files = await glob('**/*.js');``                         |
|               | `which()`      | 在系统的 PATH 中查找给定命令的路径                         | ``let npmPath = await which('npm');``                          |
| 其他工具      | `fetch()`      | 发起网络请求                                              | ``let response = await fetch('https://api.github.com');``      |
|               | `question()`   | 提出一个问题并等待用户输入                                | ``let name = await question('What is your name? ');``          |
|               | `sleep()`      | 暂停执行指定的时间                                        | ``await sleep(1000);``                                         |
|               | `chalk`        | 用于在控制台中输出彩色文本                                 | ``console.log(chalk.blue('Hello, world!'));``                  |
|               | `yaml`         | 解析 YAML 内容                                             | ``let data = yaml.parse('key: value');``                       |
|               | `argv`         | 包含命令行参数的数组                                      | ``console.log('Arguments:', argv);``                           |

                          |

这个表格提供了 `zx` 命令的一个简单用法概览，让你可以更快地理解如何在脚本中利用这些命令。记得实际使用时检查每个命令的详细文档，以了解更多高级用法和注意事项。

## 4. zx 跨平台

`zx` 作为一个基于 Node.js 的工具，本身就继承了 Node.js 的跨平台特性。Node.js 应用和脚本可以在任何支持 Node.js 的操作系统上运行，包括 Windows、macOS 和 Linux。以下是一些 `zx` 的特性以及如何使用 `zx` 编写跨平台脚本的建议：

1. **使用 Node.js 的 API**：
   Node.js 提供了许多跨平台的 API，例如文件系统操作（`fs` 模块）、路径操作（`path` 模块）等。当你在 `zx` 脚本中需要执行这些操作时，使用这些 API 可以保证脚本的跨平台兼容性。

2. **避免平台特定的命令**：
   尽量避免使用特定于某个平台的 shell 命令，例如在 Windows 上使用 `dir` 而不是跨平台的 `ls`，或者使用特定于 Linux 的命令如 `grep`。如果必须要使用，可以考虑使用 Node.js 的模块来提供跨平台支持（如使用 `find` 模块来代替 Unix 的 `find` 命令）。

3. **条件逻辑**：
   当无法避免使用平台特定的命令时，可以在脚本中使用条件逻辑来分别处理不同操作系统下的情况。`zx` 提供了 `$.os` 对象，可以用来检测当前运行的操作系统。

   ```javascript
   if ($.os === "darwin") {
     // macOS specific commands
   } else if ($.os === "win32") {
     // Windows specific commands
   } else {
     // Linux or other UNIX-like OS commands
   }
   ```

4. **可移植的路径处理**：
   在处理文件路径时，使用 Node.js 的 `path` 模块，它提供了跨平台的路径处理方法，如 `path.join()`。

5. **使用环境变量**：
   对于一些环境特定的配置，可以通过环境变量来设置，而不是硬编码在脚本中。

6. **使用 `zx` 的 `$` 函数**：
   `zx` 的 `$` 函数用于执行 shell 命令，并会自动处理平台差异，如路径的引号等。

编写跨平台的 `zx` 脚本的关键是使用 Node.js 提供的跨平台功能，并在必要时通过条件逻辑来处理操作系统间的差异。这样编写的脚本能够在大多数环境中无需修改即可运行。

使用 `#!/usr/bin/env zx` 这样的 shebang 行确实是针对类 Unix 系统（包括 Linux 和 macOS）的一种约定，用来指定脚本的解释器。这行告诉系统用 `zx` 环境来运行脚本。

对于 Windows 平台，shebang 行 (`#!`) 并不是本地支持的，而是被一些兼容层（如 Git Bash 或 WSL）识别。Windows 的命令提示符（cmd.exe）和 PowerShell 不会解析 shebang 行，因此在这些环境下直接运行带有 shebang 行的脚本将不会工作。

然而，这并不意味着 `zx` 脚本不能在 Windows 上运行。你可以通过以下方法来保持跨平台兼容性：

1. **直接使用 `zx` 命令运行脚本**：在任何平台上，你都可以使用 `zx` 命令显式运行脚本，而不依赖 shebang 行。例如：

   ```bash
   zx script.mjs
   ```

2. **使用兼容层**：在 Windows 上，你可以使用如 Git Bash、Cygwin 或 Windows Subsystem for Linux (WSL) 这样的兼容层来识别并正确处理 shebang 行。

3. **使用 npm 脚本**：在 `package.json` 中定义一个脚本任务来运行 `zx` 脚本，这样你可以不依赖于 shebang 行就能跨平台运行。例如：

   ```json
   "scripts": {
       "start": "zx script.mjs"
   }
   ```

   然后使用 `npm start` 来运行。

4. **省略 shebang 行**：如果你通常通过显式调用 `zx` 来运行脚本，那么你可以选择省略 shebang 行，这样就不会影响 Windows 用户。

## 5. zx 和 nodejs child_process 对比

通过 Node.js 内置的 `child_process` 模块（例如使用 `exec` 或 `spawn` 函数）来执行 shell 命令，这与 `zx` 提供的功能在某种程度上是重叠的。然而，`zx` 提供的是一个更为简洁、更易于使用的接口，同时集成了多种功能，使得编写复杂的脚本变得更加直观和便捷。让我们对比一下 `child_process` 模块和 `zx` 的一些区别：

### Node.js `child_process`

使用 `child_process` 模块执行 shell 命令通常需要处理一些繁琐的细节：

- 手动处理子进程的标准输入输出流。
- 处理跨平台问题（如路径、环境变量等）。
- 手动管理命令执行后的回调和错误处理。

一个使用 `child_process` 的示例可能如下：

```javascript
const { exec } = require("child_process");

exec("echo hello", (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`标准输出: ${stdout}`);
  if (stderr) {
    console.error(`标准错误: ${stderr}`);
  }
});
```

### 使用 `zx`

相比之下，`zx` 封装了这些底层细节，提供了更优雅的 API，能让你写出更简洁、更易读的代码。`zx` 增加的好处包括：

- 可以直接使用模板字面量来构建命令，而无需担心字符串拼接和转义问题。
- 异步执行命令并通过 `Promise` 处理返回值和错误，使得异步流程控制更加直观。
- 内置的工具函数（如 `fetch`、`question` 等）简化常见任务。
- 可以使用 JavaScript 的 `try...catch` 语法来捕获和处理错误。
- 提供类似管道的操作和文件读写的简洁方法。

以下是使用 `zx` 执行相同命令的示例：

```javascript
#!/usr/bin/env zx

try {
  let output = await $`echo hello`;
  console.log(output.stdout);
} catch (error) {
  console.error(error);
}
```

## 6. 示例：用 zx 实现一个模版创建脚手架

如果你想要使用 `zx` 实现一个脚手架工具，其中包括选择模板的能力，你需要结合 `zx` 提供的 `question` 函数来获取用户输入，以及一些其他的 Node.js 模块来处理文件复制、模板渲染等任务。以下是创建一个基本的脚手架工具的步骤示例：

1. **设置项目结构**：你可能需要创建一个有预先定义的模板结构的目录，例如：

   ```
   templates/
     react/
       v1/
       v2/
     vue/
       v1/
       v2/
     solidjs/
       v1/
       v2/
   ```

2. **创建主脚本文件**：比如 `create-my-app.mjs`，并添加正确的 shebang 行在文件顶部：

   ```javascript
   #!/usr/bin/env zx
   ```

3. **实现交互式输入**：使用 `zx` 的 `question` 函数来让用户选择框架和版本：

   ```javascript
   #!/usr/bin/env zx

   // 询问用户想要使用的框架
   const framework = await question("Choose a framework (react/vue/solidjs): ");

   // 确保用户输入的框架是有效的
   if (!["react", "vue", "solidjs"].includes(framework)) {
     console.error("Invalid framework selected!");
     process.exit(1);
   }

   // 询问用户想要的版本
   const version = await question(
     `Choose a version of ${framework} (v1/v2/v3): `
   );

   // 确保用户输入的版本是有效的
   if (!["v1", "v2", "v3"].includes(version)) {
     console.error("Invalid version selected!");
     process.exit(1);
   }

   // ...接下来根据用户的选择复制模板文件等
   ```

4. **复制模板文件**：基于用户选择的框架和版本，从 `templates` 目录中复制相应的模板文件到目标目录。这可以通过 Node.js 的 `fs` 模块来实现，或者使用 `zx` 提供的 `$` 函数执行 `cp` 命令：

   ```javascript
   // 目标目录，可以从用户输入中获取或者使用默认值
   const targetDir = "my-new-app";

   // 构建源模板路径
   const templatePath = `./templates/${framework}/${version}`;

   // 复制模板到目标目录
   await $`cp -r ${templatePath} ${targetDir}`;
   console.log(`Project created at ${targetDir}`);
   ```

5. **添加帮助信息**：你可以实现一个帮助系统，当用户运行脚本时带上 `-h` 或 `--help` 选项就显示帮助信息：

   ```javascript
   if (argv.includes("-h") || argv.includes("--help")) {
     console.log(`
       Usage:
         create-my-app [options]
   
       Options:
         -h, --help  Display this help message.
   
       Example:
         create-my-app
     `);
     process.exit(0);
   }
   ```

6. **测试和调试**：运行并测试你的脚本，确保一切按预期工作。

7. **分发你的脚手架**：你可以将脚手架工具作为一个 npm 包分发，这样用户可以通过 `npx` 来运行你的脚手架，或者全局安装它。

通过使用 `zx`，你可以非常方便地创建一个跨平台的脚手架工具，同样，你也可以引入其他的库来增强你的脚手架功能，例如 `inquirer` 用于更复杂的命令行交互，或者 `handlebars` 用于模板渲染等。

### 6.1 加入 inquirer 实现 select

使用第三方库如 `inquirer`，它提供了更丰富的命令行交互界面，包括列表选择等。

首先，你需要安装 `inquirer` 库：

```bash
npm install inquirer
```

然后在你的 `zx` 脚本中使用它：

```javascript
#!/usr/bin/env zx
import inquirer from "inquirer";

async function main() {
  // 选择框架
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["react", "vue", "solidjs"],
    },
  ]);

  // 选择版本
  const { version } = await inquirer.prompt([
    {
      type: "list",
      name: "version",
      message: `Choose a version for ${framework}:`,
      choices: ["v1", "v2", "v3"],
    },
  ]);

  // 复制模板文件等后续操作
  console.log(`You have selected: ${framework} ${version}`);
  // ...根据用户的选择复制模板文件等
}

main().catch((err) => {
  console.error(err);
});
```

### 6.2 检测更新实现

关于确定更新到最新版本的问题，通常来说，如果你的脚手架工具遵循语义版本控制（Semantic Versioning），你可以使用诸如 `semver` 这样的库来比较版本号，并提供更精细的更新控制：

```bash
npm install semver
```

使用 `semver.lt` 函数，你可以确定当前版本是否小于最新版本，这意味着无论是小的补丁更新还是重大版本升级，只要最新版本号高于当前版本号，就会提示用户更新。 使用 `semver` 库可以确保在比较版本号时处理预发布版本和版本范围等复杂情况。



```javascript
#!/usr/bin/env zx
import semver from "semver";

async function checkForUpdates() {
  const currentPackageJson = JSON.parse(
    await fs.readFile("package.json", "utf8")
  );
  const currentVersion = currentPackageJson.version;

  const response = await fetch("https://abc.com/ver.json");
  const latestVersionInfo = await response.json();
  const latestVersion = latestVersionInfo.version;

  if (semver.lt(currentVersion, latestVersion)) {
    console.warn(`Update available: ${currentVersion} -> ${latestVersion}`);
    console.warn("Please update by running: npm install -g my-cli-tool@latest");
    process.exit(1); // 停止执行
  }
}

async function main() {
  await checkForUpdates();

  // ...接下来是脚本的主要功能
}

main().catch((err) => {
  console.error(err);
});
```
