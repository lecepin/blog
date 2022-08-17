有一些隐藏在代码中的 ASCII 有意思的图片，如：

```js
/*
                                 _
                              _ooOoo_
                             o8888888o
                             88" . "88
                             (| -_- |)
                             O\  =  /O
                          ____/`---'\____
                        .'  \\|     |//  `.
                       /  \\|||  :  |||//  \
                      /  _||||| -:- |||||_  \
                      |   | \\\  -  /'| |   |
                      | \_|  `\`---'//  |_/ |
                      \  .-\__ `-. -'__/-.  /
                    ___`. .'  /--.--\  `. .'___
                 ."" '<  `.___\_<|>_/___.' _> \"".
                | | :  `- \`. ;`. _/; .'/ /  .' ; |    
                \  \ `-.   \_\_`. _.'_/_/  -' _.' /
  ================-.`___`-.__\ \___  /__.-'_.'_.-'================
                              `=--=-'                  

                   佛祖保佑    永无BUG    永不宕机
*/
```

可以把一些有意思的图片转成 ASCII 艺术图，嵌到代码中，或者 log 中。

整体原理比较简单，这里用 Rust Wasm 实现一下。

## 1. 原理

先简单说一下原理。

1. RGB 图片转成灰度图片。
2. 准备一些不同密度的 ASCII 字符。
3. 遍历灰度图片像素，根据亮度值 替换相应的 ASCII 字符。

这里主要说一下灰度的处理过程。

### 1.1 灰度处理

灰度和彩色图片的区别就是 `R=G=B`。

关于灰度值的计算，有 3 种主流方式：
- 最大值法：`Max(R, G, B)`。
- 平均值法：`(R + G + B) / 3`。
- 加权平均值法：
  - `0.2126 * R + 0.7152 * G + 0.0722 * B`
  - `0.299 * R + 0.587 * G + 0.114 * B`
  - `Math.sqrt( (0.299 * R) ** 2 + (0.587 * G) ** 2 + (0.114 * B) ** 2 )`

效果如下图所示 ([演示地址](https://lecepin.github.io/rust-wasm-image-ascii/gray.html))：

![image](https://user-images.githubusercontent.com/11046969/185090833-cd71e959-2ac1-4abb-ad0e-c140b07349f5.png)

这里在 Rust 中用的是加权平均值的第一种方式：

```rust
pub fn get_luminance(r: u8, g: u8, b: u8) -> f32 {
    let r = 0.2126 * (r as f32);
    let g = 0.7152 * (g as f32);
    let b = 0.0722 * (b as f32);
    r + g + b
}
```

## 2. Rust Image 的一些处理

这里罗列一下一些注意点。

### 2.1 JS 到 Rust 的 File 传递

这里需要转成 Uint8Array 进行传递：

```js
const file = e.target.files[0];
const reader = new FileReader();

reader.onloadend = (evt) => {
  try {
    const u8buffer = new Uint8Array(evt.target.result);
    const result = get_rust_image(u8buffer);
  } catch (error) {
    console.log({ error });
  }
};
file && reader.readAsArrayBuffer(file);
```

对应的 Rust 按照 `Vec<u8>` 处理 :
```rust
#[wasm_bindgen]
pub fn get_rust_image(raw: Vec<u8>) { ... }
```

### 2.2 Rust 到 JS `Vec<u8>` 传递

Rust 部分只要传递 `Vec<u8>` 即可：
```rust
#[wasm_bindgen]
pub fn get_rust_image(raw: Vec<u8>)  -> Vec<u8> { ... }
```

JS 消费时，按照 Uint8Array 处理即可：

```js
// to Blob
const blob = new Blob([u8buffer.buffer]);
// to File
const file = new File([blob], 'image.unknown');
// to URL
const url = URL.createObjectURL(blob);
```

### 2.3 Rust Image Crate 输出图片数据

Image Crate 将图片加载完后，默认输出的 bytes 是一个解码后的原始数据，传递给 JS 后是无法正常使用的，需要对原始数据进行编码后，输出才行。

![image](https://user-images.githubusercontent.com/11046969/185090956-5295e17a-e578-4271-ba92-7a65b96cef7c.png)


```rust
// 给编码器一块内存空间，用来写入数据
let mut output_buffer = vec![];
// 创建一个编码器
let mut encoder = JpegEncoder::new_with_quality(&mut output_buffer, 100);

// 编码输出
encoder
    .encode(&img_raw, width, height, ColorType::L8)
    .unwrap();

// 直接把内存输出就行
output_buffer
```

## 3. 实现

这里做了两个版本。

### 3.1 简版实现

这个比较简单，就是去色，匹配，再连接即可：

```rust
#[wasm_bindgen]
pub fn get_ascii_by_image(raw: Vec<u8>, scale: u32, reverse: bool) -> String {
    let img = load_from_memory(&raw).unwrap();
    let img = img
        .resize(
            (img.width() * scale / 100) as u32,
            (img.height() * scale / 100) as u32,
            FilterType::Nearest,
        )
        .grayscale();
    let mut pallete = [' ', '.', '\\', '*', '#', '$', '@'];
    let mut current_line = 0;
    let mut result = "".to_string();

    if reverse {
        pallete.reverse();
    }

    for (_, line, rgba) in img.pixels() {
        if current_line != line {
            result.push('\n');
            current_line = line;
        }

        let r = 0.2126 * (rgba.0[0] as f32);
        let g = 0.7152 * (rgba.0[0] as f32);
        let b = 0.0722 * (rgba.0[0] as f32);
        let gray = r + g + b;
        let caracter = ((gray / 255.0) * (pallete.len() - 1) as f32).round() as usize;

        result.push(pallete[caracter]);

        // 填充一下，有些扁
        if caracter < (pallete.len() - 2) {
            result.push('.');
        } else {
            result.push(' ');
        }
    }

    result
}
```
[演示地址](https://lecepin.github.io/rust-wasm-image-ascii/test.html)

执行时间在 20ms 左右。

![image](https://user-images.githubusercontent.com/11046969/185091081-dd6b53d2-b5b8-4b57-80ec-1abfce14487d.png)


### 3.2 Tai 版

看到一个支持 ASCII 种类挺多的 Rust 项目 https://github.com/MustafaSalih1993/tai ，于是将这个项目的 IO 部分进行了修改，适配 WASM 进行了编译处理。

[演示地址](https://lecepin.github.io/rust-wasm-image-ascii/index.html)

这个耗时在 50ms 左右。

![image](https://user-images.githubusercontent.com/11046969/185091133-0c6d6dd7-4a0a-48d2-99b4-12ee6606e2f8.png)

## 4. 安装&使用


```html
<script type="module">
  import initWasm, {
    get_gray_image,
    get_ascii_by_image,
    get_ascii_by_image_tai,
  } from "./pkg/rust_wasm_image_ascii.js";

  initWasm()
    .then(() => {});
</script>
```

可以直接使用仓库中 `pkg/` 目录中的文件，也可以使用 upkg 的资源 https://unpkg.com/browse/rust-wasm-image-ascii/ ，也可以 `npm install rust-wasm-image-ascii` 使用。

接口描述参考这里：[pkg/rust_wasm_image_ascii.d.ts](https://github.com/lecepin/rust-wasm-image-ascii/blob/master/pkg/rust_wasm_image_ascii.d.ts)

> 🌟 Github 代码地址：[https://github.com/lecepin/rust-wasm-image-ascii](https://github.com/lecepin/rust-wasm-image-ascii)

