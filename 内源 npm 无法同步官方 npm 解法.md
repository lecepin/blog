内源的 NPM 通常通过 `npm config set registry http://内网` 全局配置了内源 NPM，采用 T+1 进行官方 NPM 的缓存同步。

但可能会存在没有 `sync` 机制的场景，当依赖的一个外部包发了新版本是无法立即消费的。

可以采用以下方式修正。

#### 1. scope 限制 registry

使用 scope 直接将非 `@公司前缀` 的包全部走官方源，来解决不同步的问题。



```bash
npm config delete registry -g
npm config delete registry

npm config set @公司前缀:registry=http://内网
```

#### 2. scope + cnpm 提速

如果官方源速度慢，可以注册 cnpm，且 cnpm 是支持 sync 的。


```bash
npm config delete registry -g
npm config delete registry

npm config set @公司前缀:registry=http://内网
npm config set registry https://registry.npmmirror.com
```

或者直接放在 `.npmrc` 里：

```bash
registry=https://registry.npmmirror.com
@公司前缀:registry=http://内网
```

需要同部包，直接：

```bash
cnpm sync xxx
```
