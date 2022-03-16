# 1. 背景
在一些安全场景，或者一些本地化的场景（如本地化的 Markdown 记事本），如果有图片上传并需要查看的场景，在不上传到服务器的情况下，实现这个效果，通常是把图片 Base64 化，但编码后的字符串会非常长，体验较差。

这里不妨尝试使用 ServiceWorker + IndexedDB 来解决这个问题。

# 2. API 优势
IndexedDB 几乎什么都可以存储，二进制类的文件更不在话下，且存储空间在大多数浏览器中，是和系统空间持平的。

ServiceWorker 可以做页面的网络代理层，所以就不需要 Base64 化了，可以直接写一个特定规则的图片地址，实现从 IndexedDB 中 读/写 文件。

# 3. 实现

例如把这种特殊的图片采用 `.dbimg` 后缀。

上传图片时，就可以通过拦截上传请求的方式实现，流程如下：

![image](https://user-images.githubusercontent.com/11046969/158573694-415a4e26-534a-4255-a9ef-b25d01fa95b6.png)


```js
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  if (e.request.method == "POST" && url.indexOf("update-img") > -1) {
    e.respondWith(
      e.request.formData().then((data) => {
        const file = data.get("img");
        const name = Date.now() + Math.random().toString().substr(2, 4);

        db.put("img", { name, file });
        return new Response(
          JSON.stringify({
            name: name + ".dbimg",
          })
        );
      })
    );
  }
});
```

读取时，通过判断 `.dbimg` 后缀实现，流程如下：

![image](https://user-images.githubusercontent.com/11046969/158573728-4caeadcd-e965-43cb-9972-365820c11435.png)


```js
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  if (e.request.method == "GET" && url.substr(url.length - 6) == ".dbimg") {
    const name = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));

    e.respondWith(
      db
        .getAllMatching("img", { index: "name", query: IDBKeyRange.only(name) })
        .then((data) => {
          if (data.length) {
            return new Response(data[0].file);
          }

          return new Response("", { status: 404 });
        })
    );
  }
});
```

# 4. 效果
体验地址：[https://lecepin.github.io/file-proxy-indexedDB/](https://lecepin.github.io/file-proxy-indexedDB/)

⭐ 仓库地址：[https://github.com/lecepin/file-proxy-indexedDB](https://github.com/lecepin/file-proxy-indexedDB)

![image](https://user-images.githubusercontent.com/11046969/158573772-cecdfcbe-abb3-451e-8281-1c2a881541be.png)

![image](https://user-images.githubusercontent.com/11046969/158573800-ca0bd3da-8b8b-425b-8a69-bcff2344fbd4.png)

![image](https://user-images.githubusercontent.com/11046969/158573824-f5faecb5-3559-46ff-b9fe-513a44566b2c.png)
