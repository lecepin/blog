# 1. 背景
- 如果你想在当前的页面，试一下某个 JS 工具库，而这个工具库恰好你没安装。（如 lodash）
- 如果你想分享一段脚本给别人，而又不希望别人在执行的过程太过麻烦。（如你写了一段恢复复制和右键功能的脚本）

那下面的方法你可以尝试一下。

# 2. 常用方法
主要方法有如下。

## 2.1. 工具包的注入
复制如下代码，在 DevTools 中执行就可以了：

```javascript
function ls(src, callback, prefix = "https://unpkg.com/") {
  var _script = document.createElement("script");
  _script.src = prefix + src;
  _script.onload = (e) => {
    console.log("===> 加载完成", src);
    callback && callback();
  };

  document.head.appendChild(_script);
}

ls("工具包名");
```

如 lodash、jquery、dayjs：

```javascript
ls("lodash", () => {
	console.log('load:', _)
});
ls("jquery", () => {
	console.log('load:', $)
});
ls("dayjs", () => {
	console.log('load:', dayjs)
});
```

使用其他源：

```javascript
ls("react/umd/react.production.min.js", () => {
	console.log('load:', React)
}, 'https://unpkg.zhimg.com/');

ls("xstate@4/dist/xstate.js", () => {
	console.log('load:', XState)
}, 'https://cdn.jsdelivr.net/npm/');
```

##  2.2. 脚本的注入
如下面这段清除水印及恢复右键、选取的脚本：

```javascript
[document, ...document.getElementsByTagName("*")].map((item) => {
  if (item.style) {
    item.style.cssText += "user-select:auto!important;";
    if (item.style.cssText.indexOf("url(") >= 0) {
      item.style.cssText += "background:unset!important;";
    }
  }

  item.oncontextmenu =
    item.oncopy =
    item.onselectstart =
    item.οnpaste =
    item.oncut =
    item.onmousedown =
      function (e) {
        e.stopPropagation();
        return true;
      };
});
```

如果想分享给其他人使用，有如下方法：

### 2.2.1. 直接 DevTools 执行
就是直接粘贴到 DevTools 的 Console 下，直接执行就可以了。

但这个比较麻烦，每次都要打开 DevTools 和 复制。

### 2.2.2. 直接在地址栏执行
在脚本前面加上 `javascript:`，然后直接粘贴在地址栏中，回车即可执行。

![image](https://user-images.githubusercontent.com/11046969/155868529-c1d9516b-8964-4d47-8b11-34cfff7d7e2c.png)



比 2.2.1 少了一步打开 DevTools 的过程，但还是需要复制，且如果复制的内容包含 `javascript:`，地址拦会自动给你清除掉，除非你手动再输入一遍。

### 2.2.3. 书签执行
地址栏执行的优化版。不过 只需要复制一次就可以了，后面不用再去复制。

 1. 打开浏览器的书签管理：右上角设置 -> 书签 -> 书签管理器 （或者直接在地址栏中输入 `chrome://bookmarks/`
    进行打开） 
 2. 点击 添加新书签 ，打开弹窗
 3. `名称` 自行输入，`网址` 就是那段 `javascript:` 拼合的代码，保存。

![image](https://user-images.githubusercontent.com/11046969/155868535-69bfb989-fc35-4eb8-95e3-b5c06d80afe9.png)


然后，每次需要的时候，只需要点击一下书签就可以了：

![image](https://user-images.githubusercontent.com/11046969/155868540-ca52c5bd-649c-4130-9b97-74c81c635fbc.png)


