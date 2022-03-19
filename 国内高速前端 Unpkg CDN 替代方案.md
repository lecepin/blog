# 1. 背景
目前国内有很多 NPM 的 CDN，可以高速支持相关包文件的访问下载，如：
- BootCDN: [www.bootcdn.cn](https://www.bootcdn.cn)
- 七牛云: [www.staticfile.org](https://www.staticfile.org/)
- 360: [cdn.baomitu.com](https://cdn.baomitu.com/)
- 字节跳动: [cdn.bytedance.com](https://cdn.bytedance.com/)

但这些 CDN 并不全，很多 NPM 上的包 在这些 CDN 上是找不到的。原因是，它们都是从 [CDNJS](https://cdnjs.com/) 上同步的数据，CDNJS 并不会把所有的 NPM 包进行同步，所以当你需要的一些 NPM 包没有在 CDNJS 上面，你就用不了上面这些国内 CDN 了。

解决可以访问所有 NPM 包的问题，可以使用 [unpkg](https://unpkg.com/)，但它的访问速度在国内并不佳：

![image](https://user-images.githubusercontent.com/11046969/159113642-79849a96-7626-4194-a810-f3aabb3aea57.png)


和它相同功能的 [jsdelivr](https://cdn.jsdelivr.net/)，在国内的速度也不佳：

![image](https://user-images.githubusercontent.com/11046969/159113650-31c5f1f2-3957-47b3-984b-c5cb9d276d1f.png)


于是就整理了下，国内的 Unpkg 替代品。

# 2. 国内 Unpkg
目前找了对外的国内 Unpkg 有两个：
- 饿了么：[github.elemecdn.com](https://github.elemecdn.com/)、[npm.elemecdn.com](https://npm.elemecdn.com/)
- 知乎：[unpkg.zhimg.com](https://unpkg.zhimg.com/)

都是部署在国内阿里云的 CDN 上，速度都还不错，如下图所示：

![image](https://user-images.githubusercontent.com/11046969/159113662-e4ddc9b0-9e62-4962-807d-104c801383e5.png)



可以放心使用。
