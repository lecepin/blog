Rust 啥都好，就是构建太慢太慢。用我的 M1 构建 Mac 应用 10 分钟内还能拿下，但其它普通配置的就太慢了，即便用 Github Actions 大约也近 30 分钟才能构建完：

![image](https://user-images.githubusercontent.com/11046969/182407090-ec5debcf-ac31-4793-8ca8-3cc7713b600c.png)


找一台高配置的 Windows 主机，结果经历了长时间的编译之后，又卡在了 Windows 的安装器 WiX 的下载失败上：


![image](https://user-images.githubusercontent.com/11046969/182406930-90762a51-18b4-4487-bd1d-07955baf2682.png)


外层的代理对命令行又不生效，最好的方式是把这个 WiX 包在浏览器下载完，然后放在 Tauri 需要的地方，让它直接使用，避免再在命令行里下载。

Tauri 的判断代码在这里：https://github.com/tauri-apps/tauri/blob/dev/tooling/bundler/src/bundle/windows/msi.rs#L29

```rust
/// Runs all of the commands to build the MSI installer.
/// Returns a vector of PathBuf that shows where the MSI was created.
pub fn bundle_project(settings: &Settings, updater: bool) -> crate::Result<Vec<PathBuf>> {
  let mut wix_path = dirs_next::cache_dir().unwrap();
  wix_path.push("tauri/WixTools");

  if !wix_path.exists() {
    wix::get_and_extract_wix(&wix_path)?;
  } else if WIX_REQUIRED_FILES
    .iter()
    .any(|p| !wix_path.join(p).exists())
  {
    warn!("WixTools directory is missing some files. Recreating it.");
    std::fs::remove_dir_all(&wix_path)?;
    wix::get_and_extract_wix(&wix_path)?;
  }

  wix::build_wix_app_installer(settings, &wix_path, updater)
}
```

`dirs_next::cache_dir()` 的结果如下：

Platform | Value                               | Example                      |
| -------- | ----------------------------------- | ---------------------------- |
| Linux    | `$XDG_CACHE_HOME` or `$HOME`/.cache | /home/alice/.cache           |
| macOS    | `$HOME`/Library/Caches              | /Users/Alice/Library/Caches  |
| Windows  | `{FOLDERID_LocalAppData}`           | C:\Users\Alice\AppData\Local |

所以直接把 Wix 下载完后，在 `C:\Users\xxxxxxxx\AppData\Loca` 中，创建 `tauri/WixTools` 文件夹，然后把内容解决到里面就可以了。

正常构建完成：

![image](https://user-images.githubusercontent.com/11046969/182406819-b0d6a8fc-064f-457b-bc51-29f0d7f9dcae.png)

