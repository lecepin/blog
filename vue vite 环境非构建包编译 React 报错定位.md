## 1. 背景

众所周知，vite 在构建生态的位置，vue 与之更是密切，主流的 vue 库几乎都与 vite 捆绑。

但有些 UI 库 如 @private/ui 并没进行行编译，而是直接将源码发布到了 npm 中，无法实现兼容化，需要消费方去自行处理库中的环境问题，及额外的编译时间。

基于 vue 官方脚手架创建的项目也是捆绑的 vite，但在使用 @private/ui 组件时，开发环境一直编译报错，无法使用。

还得从 vite 下手，看下为什么它无法编译通过。

## 2. 问题现场

开发环境报错：

![image](https://github.com/lecepin/blog/assets/11046969/84e9a199-099e-41bf-b7c7-ead1c11d26ee)

![image](https://github.com/lecepin/blog/assets/11046969/029aa2b2-dbf1-4834-83ba-af58e096c332)


为什么会把 @private/ui 编译成了 React.createElement 去创建元素？

编译环境：

![image](https://github.com/lecepin/blog/assets/11046969/5538ee15-715c-4816-abb2-97ea72bf051c)


正常。

vite 是有两套构建环境的，这种不一致性很麻烦：

![image](https://github.com/lecepin/blog/assets/11046969/479b0f73-34eb-46d0-a852-e4cb24e94c6f)


问题就出在开发环境的 esbuild 中。

## 3. vite optimizeDeps

从样是写 tsx，为什么项目中的可以正常执行，而 @private/ui 中的就编译错误？两者明显不在一个构建过程中。
vite 的 optimizeDeps 也没进行配置，怎么会出现预编译的效果。

debugger 编译过程发现，@private/ui 真被自动添加进去了：

![image](https://github.com/lecepin/blog/assets/11046969/0101de64-66e5-4958-9a49-8c0be8d0a018)


查看自动添加逻辑：

https://github.com/vitejs/vite/blob/main/packages/vite/src/node/optimizer/scan.ts#L526

```js
// bare imports: record and externalize ----------------------------------
build.onResolve(
  {
    // avoid matching windows volume
    filter: /^[\w@][^:]/,
  },
  async ({ path: id, importer, pluginData }) => {
    if (moduleListContains(exclude, id)) {
      return externalUnlessEntry({ path: id });
    }
    if (depImports[id]) {
      return externalUnlessEntry({ path: id });
    }
    const resolved = await resolve(id, importer, {
      custom: {
        depScan: { loader: pluginData?.htmlType?.loader },
      },
    });
    if (resolved) {
      if (shouldExternalizeDep(resolved, id)) {
        return externalUnlessEntry({ path: id });
      }
      if (isInNodeModules(resolved) || include?.includes(id)) {
        // dependency or forced included, externalize and stop crawling
        if (isOptimizable(resolved, config.optimizeDeps)) {
          depImports[id] = resolved;
        }
        return externalUnlessEntry({ path: id });
      } else if (isScannable(resolved, config.optimizeDeps.extensions)) {
        const namespace = htmlTypesRE.test(resolved) ? "html" : undefined;
        // linked package, keep crawling
        return {
          path: path.resolve(resolved),
          namespace,
        };
      } else {
        return externalUnlessEntry({ path: id });
      }
    } else {
      missing[id] = normalizePath(importer);
    }
  }
);
```

可以看到只要是项目源码直接引用的，js 类型的包就会被自动添加进去。

## 4. 解决

这里要注意所有在预处理过程中的 esbuild 配置，一定要在`optimizeDeps.esbuildOptions` 中配置，而不是`esbuild`，两个流程读取的配置不一样，详情看源码。

### 4.1 解法一：esbuild jsx 重写

esbuild 提供了 jsx 相关的配置重写，可以直接将`React.createElement`重写为 `h`。
https://www.typescriptlang.org/tsconfig/#jsx
https://www.typescriptlang.org/tsconfig/#jsxFactory
https://www.typescriptlang.org/tsconfig/#jsxFragmentFactory

```js
{
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
}
```

编译后：

```js
// 最初编译结果
return React.createElement(React.Fragment, null, slots.handler && React.createElement(
  GridItem,
  {
    row: props.row,
    column: "1 / -1",
    ...bindings
  },
  slots.handler()
)

// 修改后编译结果
return h(Fragment, null, slots.handler && h(
  GridItem,
  {
    row: props.row,
    column: "1 / -1",
    ...bindings
  },
  slots.handler()
)
```

可以看到正常了，但又报错了：

![image](https://github.com/lecepin/blog/assets/11046969/dc7386ed-d890-4543-a711-dc7652bce804)


esbuild 提供了 `jsxImportSource` 来解决这种问题，但必须符合下面要求：
https://esbuild.github.io/api/#jsx-import-source

```js
import { createElement } from "your-pkg";
import { Fragment, jsx, jsxs } from "your-pkg/jsx-runtime";
import { Fragment, jsxDEV } from "your-pkg/jsx-dev-runtime";
```

然而 vue 完全没这种包。

esbuild 还有一个 `inject`的配置：
https://esbuild.github.io/api/#inject

不太好的方式是，直接把 `React` 定义到全局变量中：

```js
// inject.js
const { h, Fragment } = require("vue");

window.React = {
  createElement: h,
  Fragment: Fragment,
};

// vite.config
inject: ["./inject.js"],

```

可以正常工作了。

esbuild 提供了另一种方式：

```js
import { h, Fragment } from "vue";

export { h as "React.createElement", Fragment as "React.Fragment" };
```

但报错：

✘ [ERROR] Using a string as a module namespace identifier name is not supported in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)

看到 esbuild 的 define 的定义：https://esbuild.github.io/api/#define
在线编译效果：https://esbuild.github.io/try/#YgAwLjE5LjIALS1pbmplY3Q6Li9wcm9jZXNzLWN3ZC1zaGltLmpzIC0tdGFyZ2V0PWVzNiAtLWRlZmluZTpwcm9jZXNzLmN3ZD1wcm9jZXNzQ3dkU2hpbQAAcHJvY2Vzcy1jd2Qtc2hpbS5qcwBleHBvcnQgbGV0IHByb2Nlc3NDd2RTaGltID0gKCkgPT4gJycAZQBlbnRyeS5qcwBjb25zb2xlLmxvZyhwcm9jZXNzLmN3ZCgpKQo

结合起来重写配置：

```js
// inject.js
export { h, Fragment } from "vue";

// config
inject: ["./inject.js"],
define: {
  "React.createElement": "h",
  "React.Fragment": "Fragment",
}
```

可以正常工作。

### 4.2 解法二：移除 @private/ui 预编译

更快的方式是把 @private/ui 从预编译中移除，但会增加加载时长。

```js
exclude: ["@private/ui"];
```

## 5. 其它

由于没编译，组件库内非 es 的模块还会出问题，还要项目上去做预编译才能正常使用：

![image](https://github.com/lecepin/blog/assets/11046969/e3de3b42-ffe5-406d-b5bf-67d0ee127f5a)


```js
export default defineConfig({
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    include: [
      "lodash.uniq",
      "lodash.get",
      "lodash.set",
      // ...
    ],
    esbuildOptions: {
      inject: ["./inject.js"],
      define: {
        "React.createElement": "h",
        "React.Fragment": "Fragment",
      },
    },
  },
  esbuild: {},
});
```

## 6. 总结

vite 固然好，但多编译环境还是会出现对不齐的问题，一些配置在 vite 官网中也讲的不是很清楚，还是得抠源码看具体实现细节。

另外对于库的开发者来讲，一定要提供编译好后的代码给开发者，包括脚本和样式，默认美好。
