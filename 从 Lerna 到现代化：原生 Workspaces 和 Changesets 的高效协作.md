# 1. 背景



最近新接手的一些 monorepo 的库项目，项目是用 lerna 进行管理的，使用过程中有一些不丝滑的地方，包括：



1. lerna 版本过旧，使用 `4.0.0`（现版本 `8.1.3`），功能差异过大，很多功能特性被新版本移除。
2. 发库版本过于繁琐和麻烦，对 git 侵入性很强。如果对 lerna 工具链不熟悉，很难操控。
3. lerna 太强大，也带来来巨量的配置参数，数了一下，共有 `15` 个命令，`134` 的 cli 入参。

通过 lerna 官网可以看到，它诞生背景解决的包管理的问题，现在的包管理工具，如 npm、pnpm、yarn 等都已经支持，官方也呼吁有此功能需求的，建议不要再用 lerna 了，因为这些功能 lerna 已经全部移除。

> 原文：
> Lerna is the original monorepo/workspace tool in the JavaScript ecosystem. When it was created in 2015/2016 the ecosystem looked totally different, and there were no built in capabilities to handle working with multiple packages in a single repository (a "workspace"). Commands like lerna bootstrap, lerna add and lerna link were all a critical part of the lerna project, because there were no other options.
>
> However, the fact is that - for many years now - the package managers we know and love (npm, yarn and pnpm) all fully support that concept of workspaces as a first-class use-case.
>
> They have battle tested implementations covering adding, removing and linking local packages, and combining them with third party dependencies in a natural way.
>
> This is the reason why, for the final several years of his tenure as lead maintainer of lerna, Daniel, had been encouraging folks to strongly reconsider their use of the legacy package management commands in lerna, and instead leverage their package manager of choice to do what it does best.
>
> We knew about this context from afar, but as new stewards of the project in 2022 we did not want to jump straight in and start removing capabilities without first taking the time to get familiar with the reality up close. Now that we have been actively maintaining for a while, we are in full agreement with Daniel and others that the legacy package management commands in lerna needed to be retired.
>
> By removing these legacy pieces which have better alternatives natively in package managers, we and the rest of the lerna community are now freed up to concentrate our efforts on things which are uniquely valuable about lerna (such as, but not limited to, versioning and publishing), and making them the best they can be!

在此背景下，也有了对于 monorepo 的改造。
核心诉求是，操作更简单，使用更方便，保持技术先进性。

# 2. lerna 解决的问题

![image](https://github.com/lecepin/blog/assets/11046969/ed8debc4-002f-431b-8886-85b6225efaf9)


回到为什么使用 lerna，看下 lerna 到底解决了哪些问题。

早期的 lerna 主要解决：

1. 支持链接 monorepo 中的不同项目，实现相互导入，而不用发布 npm 来消费。可以简单理解为 `npm link`。
2. 任意数量的项目，只需要运行一个命令。如根目录执行 `lerna bootstrap`就可以给所有包进行安装和链接。包括 `lerna run --scope my-component test` 等。
3. 提供包的版本能力。
4. 提供包的发布能力。

> 上面的 1 和 2，在 lerna 7就没了，官方文档中也不在提及。

# 3. 现代化替代方案

接下来看下，现在的替代方案。

## 3.1 原生 npm workspace 解决1、2问题

![image](https://github.com/lecepin/blog/assets/11046969/b0ee8ece-d14f-4971-9ed0-045dac6ed9d1)


从 npm 7 https://docs.npmjs.com/cli/v7/using-npm/workspaces 开始(最新 10.8.1)，就支持了 workspace 的能力。

如 `packages/` 下的所有包，就可以在 `package.json` 下这样写：

```js
{
  "workspaces": [
    "./packages/*"
  ]
}
```

`npm i` 时，workspace 下的包都会进行安装。

通过 `--workspace` 参数，可以针对性执行命令，如 `npm run test --workspace=a --workspace=b`。

但原生 npm 下做 dependencies 中的 workspace link 还是不好用。
下面看 pnpm。

### 3.1.1 pnpm 支持

![image](https://github.com/lecepin/blog/assets/11046969/e1daed5c-12b7-497c-bfc4-26e0ed25493e)


pnpm 的优势非常多，在最直观的软、硬链安装方案来降低磁盘使用空间和提升安装速度外，对 workspace 的支持也是十分友好。

workspace 的作用范围在 `pnpm-workspace.yaml` 中进行声明，如：

```yml
packages:
  - 'packages/*'
```

`pnpm i` 时，workspace 下的包都会进行安装。

另外支持 `workspace:`协议，可以保证 workspace 内消费的包，都是 workspace 内的，这个非常方便。

同时在执行 `pnpm publish` 发包时，pnpm 会自动修改包的 package.json 中的，对于 workspace 的依赖版本为实际的版本。

在执行命令方面，支持 `pnpm run` 命令，它支持 `--recursive`，可以实现根据依赖顺序执行。比如 workspace 中，a 包依赖 b 包，则执行 `pnpm run build --recursive`进，会先为 b 包执行 build，然后再在 a 包执行 build。

同时支持 `--filter`参数，是的操作非常灵活。

## 3.2 版本及发布能力

在讲替换前，先看一下原来的执行流程，这里先看 `lerna version`。

下面是 `lerna version` 最基本的执行流程：

![image](https://github.com/lecepin/blog/assets/11046969/6e08c211-e8a3-4d00-862a-411b49262785)


这里面做了很多事情，对 `git` 强依赖，比如上面的流程就至少经历了下面的命令：

- 本地是否有过提交：`git rev-list --count --all --max-count=1`
- 取当前分支名：`git rev-parse --abbrev-ref HEAD`
- 远端是否存在当前分支：`git show-ref --verify refs/remotes/origin/<branch>`
- 当前分支是否落后于远程分支：`git rev-list --left-right --count origin/<branch>...<branch>`
- 本地当前分支上一个 tag，及版本，及当前版本的 commit 数量，及本地是否有文件修改：`git describe --always --long --dirty --first-paren`
- 判断相对 tag，当前是否有文件变化：`git diff --name-only <tag> `
- ` git push --follow-tags --no-verify --atomic origin <branch>`

所以要想让 `lerna version` 正常工作，你必须在此之前，完成以下工作：

- 将你的本地 git branch 的 HEAD 与 remote 对齐
- 本地 git branch 必须要在 remote 存在
- 本的 git branch 的 commit 必须多于最近的一个 git tag 的数量

满足不了，你加上 `--force-publish` 参数都不会工作。

还有，当你没用 lerna 去打 tag，而是自己手动打了一个，会使 tag 缺少注视，修复起来也麻烦，需要执行：

```bash
GIT_AUTHOR_NAME="$(git show $1 --format=%aN -s)"
GIT_AUTHOR_EMAIL="$(git show $1 --format=%aE -s)"
GIT_AUTHOR_DATE="$(git show $1 --format=%aD -s)"
GIT_COMMITTER_NAME="$(git show $1 --format=%cN -s)"
GIT_COMMITTER_EMAIL="$(git show $1 --format=%cE -s)"
GIT_COMMITTER_DATE="$(git show $1 --format=%cD -s)"

git tag -a -m $1 -f $1 $1

git push --tags --force
```

重新订正。

这种强依赖 git 有好处也有坏处。就比如你先 git push 了，而没 `lerna version`，那再去打 version，苦不堪言。

### 3.2.1 拥抱 changesets

![image](https://github.com/lecepin/blog/assets/11046969/e243ec0c-cf5a-408c-bc09-9294eb4d362d)


changesets 是完美替代 lerna 3、4（包版本、包发布）功能的工具，使用简单，符合直觉。最大的优点在于提供了很大的自主权在用户手中。‍⁢

changesets 基本和 git 没啥太大关系，除了打 tag 的功能。替代命令是 `changeset version` 和 `changeset publish`。

现在的 version 流程：

![image](https://github.com/lecepin/blog/assets/11046969/2d6ed469-f6a1-4292-83a9-7d68742fe777)


将 pre-release 的判断前置，然后增加 add 能力，自动记录影响范围和内容，最后通过 version 自动聚合 CHANGLOG.md，并为所有包生成合适的版本号。

最后 publish 直接与 npm server 交互，只有当版本已经在 npm server 上存在外，其它都可正常发布。

monorepo 比较核心的问题也是 lerna 的主要能力。但今天 workspace 的能力原生已经支持了，包版本处理和发布的能力，changesets 也已经解决了。



