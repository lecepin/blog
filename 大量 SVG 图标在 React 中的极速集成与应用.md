## 1. 背景

在一些业务场景中，可能需要使用一些业务上自定义的图标，而这些业务图标消费起来需要很多重复的流程和样板代码，用多了很繁琐。

大致流程：

Sketch svg 导出 ➡️ 压缩 svg ➡️ 纯色图标 currentColor 覆写 ➡️ 上传 svg 供 img 消费 OR svg 引入 React ➡️ svg React 组件样板代码编写 ➡️ -.125em 对齐处理 ➡️ 纯色图标 mask 处理 ➡️ 消费导入

可以看到当自定义的 svg 过多时，处理起来很繁琐。

期待效果，尽量减少 SVG 样板代码的编写，减少特殊样式的注入，减少 import 及 减少网络请求。

## 2. 实现

下面有两种实现方式，一种是纯色的 font 化，一种是通过编写工具读取配置文件自动生成。

### 2.1 实现一：font 化

对于纯色图标将所有 svg 创建一个单独的字体文件实现。

流程生成大致如下：

```js
// ...
const svgData = fs.readFileSync(svgFile, "utf-8");

// 解析 SVG 文件
const svgTree = svgParser.parse(svgData);

// 提取路径数据
const paths = svgTree.children.filter((node) => node.tagName === "path");
const pathData = paths.map((path) => path.properties.d);

// 创建字体对象
const font = FontCarrier.create();

// 添加字形
pathData.forEach((data, index) => {
  const glyph = font.createGlyph();
  glyph.path(data);
  font.setGlyph("icon" + index, glyph);
});

// 生成字体文件
const fontBuffer = font.output();
// ...
```

生成兼容全平台字体样式：

```css
@font-face {
  font-family: "xadmin";
  src: url("fonts/xadmin.woff?pf1byw") format("woff"), /* WOFF 字体格式优先 */
      url("fonts/xadmin.eot?pf1byw#iefix") format("embedded-opentype"),
    /* IE9 Compat Modes */ url("fonts/xadmin.ttf?pf1byw") format("truetype"), /* Safari, Android, iOS */
      url("fonts/xadmin.svg?pf1byw#xadmin") format("svg"); /* Legacy iOS */
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
```

这边建议 WOFF 字体优先，WOFF 是为 Web 设计的字体格式，WOFF 内置了字体的压缩，会有比 TTF/OTF 更小的文件体积，浏览器兼容性在 98% 左右。

字体加载过程中会发生偏移问题，这里可以通过设置 `font-display: optional` 来减少 CLS 问题。
由于浏览器解析 @font-face 定义后并不会下载字体，而是在构建 render tree 时发现有非空节点在使用该字体时才会触发字体的下载，所以字体文件需要通过 `preload` 进行提前加载，如果将 font 文件放在 CDN 还需要加入 `crossorigin="anonymous"` 来实现不同源的资源可以被缓存在浏览器中，并在不同网站之间共享。

在 TS 场景下为了更快速的活的提示，可以对 `i` 进行重新定义自动生成 icon.d.ts：

```tsx
namespace JSX {
  interface IntrinsicElements {
    i: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      className?:
        | "icon-info"
        | "icon-send"
        | "icon-bread-delimiter"
        | "icon-copy"
        | "icon-terminal-folder"
        | "icon-terminal-all"
        | "icon-one"
        | "icon-lock"
        | "icon-edit"
        | "icon-delete";
    };
  }
}
```

- 优势：
  - 只需要在入口引入一个样式文件即可。
  - 消费时不需要任何 import 语句，直接消费 i 元素即可，且具备完成的 icon 代码提示。
  - 变色场景仅需要修改 `color` 属性。
- 不足：
  - 彩色图标有兼容问题，所以仅适合纯色图标。
  - 无法按需导入，引能全量（纯单个业务场景可以忽略）。
  - 简单 svg 比 font 的渲染性能更好。

### 2.2 实现二：工具自动化 svg

如何使用 svg 的全部优势，无论纯色还是彩色的都可正常使用，且减少样板代码及缩短链路呢？

比较直接的方式就是工具化，读取一个配置文件实现全链路，消费的时候仅 import 一下就可以了。

于是写了下面这个工具。

#### 2.2.1 svg 纯色可修改实现

这里有两种方式，一种是修改 svg 代码，将所有 `fill` 进行替换，修改为 `currentColor`，在外层直接设置 `color` 即可。

```svg
<path d="M7 1.75a....25v-.375a.25.25 0 0 1 .25-.25h.375Z" fill="currentColor" />
```

另一种采用蒙板方式实现，将背景极与蒙板图片合成，并将背景色指定为 color 颜色：

```css
-webkit-mask: url("data:image/svg+xml,...C%2Fsvg%3E") no-repeat;
mask: url("data:image/svg+xml,...C%2Fsvg%3E") no-repeat;
-webkit-mask-size: 100% 100%;
mask-size: 100% 100%;
background-color: currentColor;
```

#### 2.2.2 svg 对齐问题

这里统一使用 background 处理，使用时指定宽高即可。

彩色 svg 处理：

```css
background: url("data:image/svg+xml,...C%2Fsvg%3E") no-repeat;
background-size: 100% 100%;
background-color: transparent;
```

#### 2.2.3 组件化

直接根据配置文件聚合生成到一个 TSX 中即可，如下：

```tsx
import React, { FC } from "react";

type TProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const Icongoal: FC<TProps> = ({ className, style = {} }) => (
  <div
    style={{
      background:
        'url("data:image/svg+xml,%3Csvg...%3E%3C%2Fsvg%3E") no-repeat',
      backgroundSize: "100% 100%",
      backgroundColor: "transparent",
      width: "1em",
      height: "1em",
      ...style,
    }}
    className={className}
  />
);

export const Iconlocak: FC<TProps> = ({ className, style = {} }) => (
  <div
    style={{
      mask: 'url("data:image/svg+xml,%3Csvg%...3C%2Fsvg%3E") no-repeat',
      WebkitMask: 'url("data:image/svg+xml,%3Csvg%...vg%3E") no-repeat',
      backgroundColor: "currentColor",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
      width: "1em",
      height: "1em",
      ...style,
    }}
    className={className}
  />
);
// ...
```

#### 2.2.4 压缩填充处理

将前置流程进行处理，并移除与 React 冲突的 class：

```js
optimize(item.content, {
  plugins: [
    { name: "removeAttrs", params: { attrs: "class" } },
    {
      name: "preset-default",
    },
    {
      name: "fill-currentColor",
      fn: () => {
        return {
          element: {
            enter: (node) => {
              if (
                node.attributes.fill == null ||
                node.attributes.fill == "" ||
                node.attributes.fill == "none"
              ) {
                return;
              }

              node.attributes.fill = "currentColor";
            },
          },
        };
      },
    },
  ],
});
```

#### 2.2.5 配置文件

```js
module.exports = {
  // 有色 svg 列表
  colorIcon: [
    {
      // 名称
      name: "goal",
      // svg 内容
      content: `<?xml version="1.0" encoding="UTF-8"?>`,
    },
  ],
  // 单色 svg 列表
  solidColorIcon: [
    {
      name: "lock",
      content: `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"/><path d="M10.5 6.3v-1a2.5 2.5 0 0 0-5 0v1h5zm1.5 1H4v6h8v-6zM9.75 9.8a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25zM4.5 5.3a3.5 3.5 0 0 1 7 0v1h.5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h.5v-1z" fill="#0D5DFF" class="fill-line"/></g></svg>`,
    },
  ],
  // 从文件夹读取彩色 svg 文件
  colorIconDirPath: "./",
  // 从文件夹读取单色 svg 文件
  solidColorIconDirPath: "./",

  // React 组件 TSX 导出目录
  output: "./dist",

  // React 组件前缀
  compoentPrefix: "Icon",
};
```

#### 2.2.6 预览图标

未避免见名不知图的问题，会自动生成图标的预览页面，可参考使用。

- 优势：
  - 链路缩短，一键生成。
  - 支持单色/彩色 svg。
  - 按需加载、构建。
  - 减少网络请求，提升渲染性能。
- 不足：
  - 过多时会增加打包体积。

[Github 项目地址](https://github.com/lecepin/quick-icon)
