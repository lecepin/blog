# 前言
最近看到小米 12S Utra 的发布，看了下详情页面，发现演示的照片都好看的，包含了品牌、设备、镜头、位置等信息，如下图所示：

![image](https://user-images.githubusercontent.com/11046969/179392166-2b3516fc-b1b9-42d3-9624-6fc8d1e68453.png)


作为一个摄影爱好者，也希望把自己的照片也输出这些信息。

但目前此类水印好像只在小米 12S Utra 的编辑器里有，没有其他途径。

于是就写了这个小工具。

---

# 水印工具
- 地址：[https://lecepin.github.io/gen-brand-photo-pictrue/](https://lecepin.github.io/gen-brand-photo-pictrue/)
- 🌟 Github 仓库地址：[https://github.com/lecepin/gen-brand-photo-pictrue](https://github.com/lecepin/gen-brand-photo-pictrue)


![image](https://user-images.githubusercontent.com/11046969/179392176-12fce775-ac34-41bb-aa26-592540e75f0b.png)


支持：
- 自动读取照片 exif 数据，并自动填写到图片中，包括型号、品牌、焦距、光圈、快门、ISO、拍摄时间、GPS 信息。
- 可手动编辑水印参数。
- 目前支持 苹果、佳能、大疆、富士、华为、莱卡、小米、尼康、索尼 品牌。

### 实现
实现上比较容易，就是读取照片数据的前 4KB 数据，获取照片的基本信息，也就是 Exif 数据。

最近刚好在用 Rust，于就是就 Rust 写了 WebAssembly 进行 Exif 数据的读取，代码如下：

```rust
#[wasm_bindgen]
pub fn get_exif(raw: Vec<u8>) -> JsValue {
    let mut exif_data: Vec<ExifData> = Vec::new();
    let exifreader = exif::Reader::new();
    let mut bufreader = std::io::Cursor::new(raw.as_slice());
    let exif = exifreader.read_from_container(&mut bufreader).unwrap();

    for field in exif.fields() {
        if let Some(_) = field.tag.to_string().find("Tag(Exif") {
            continue;
        }

        if ["Make", "Model"].contains(&field.tag.to_string().as_str()) {
            exif_data.push(ExifData {
                tag: field.tag.to_string(),
                value: field
                    .display_value()
                    .to_string()
                    .replace(
                        |item: char| ["\"", ","].contains(&item.to_string().as_str()),
                        "",
                    )
                    .trim()
                    .to_string(),
                value_with_unit: field
                    .display_value()
                    .with_unit(&exif)
                    .to_string()
                    .replace('"', ""),
            });
            continue;
        }

        exif_data.push(ExifData {
            tag: field.tag.to_string(),
            value: field.display_value().to_string(),
            value_with_unit: field.display_value().with_unit(&exif).to_string(),
        });
    }

    JsValue::from_serde(&exif_data).unwrap()
}
```


测试了一下用 Rust Exif 与 npm exif 的执行速度：
- Rust WebAssembly：0.6ms
- Npm exif 包：5.6ms

大约快 10倍左右，还是很夸张的。

### 其它示例
最后看下，使用这个工具生成的照片吧。

![image](https://user-images.githubusercontent.com/11046969/179392189-1e634c60-99c1-440d-b6e4-7893abbfa8ae.png)

![image](https://user-images.githubusercontent.com/11046969/179392195-f2b46e6c-996c-4621-9c6a-a30e4655497e.png)

![image](https://user-images.githubusercontent.com/11046969/179392200-ed8382a3-1588-4f11-ae76-738a2f2fa223.png)

![image](https://user-images.githubusercontent.com/11046969/179392205-13b25007-f02d-4139-848e-9baba6d862bf.png)

![image](https://user-images.githubusercontent.com/11046969/179392213-da401593-9433-496c-b1f3-c943271534ef.png)

