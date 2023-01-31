## 1. 前言

台球是一个让人非常着迷的运动项目，充满了各种计算逻辑，十分有趣。

对于初学者，母球、目标球、袋口三者在一条线上的时候，是非常容易进球的，但对于三者不在一条线上时，就是需要假想球的帮助，然后假想球的位置 对于初学者来说并不容易精准定位。

于是我用了一种比较高效且精准的定位方法，并用 Canvas 将其过程进行了可视化。此方法在中杆击球下，可以实现百分百进球（当然你出杆不能歪😂）。

## 2. 使用

台球计算工具在这个仓库 [⭐ https://github.com/lecepin/billiard-aim-calculation](https://github.com/lecepin/billiard-aim-calculation)。

![GIF 2023-1-31 14-52-09](https://user-images.githubusercontent.com/11046969/215687776-894a980d-d34a-4731-9822-6189aa7ace91.gif)

可以通过确定现场中的角度，进行上图球的位置拖动，获得假想球的位置。

## 3. 原理

此种定位假想球的原理非常简单。

通过两个点就可以确认出来假想球的位置。

![image](https://user-images.githubusercontent.com/11046969/215688407-1ee8a9c7-3e61-46e9-a145-660be97c14f3.png)

第一个位置为 A 点。A 为袋口到目标球的位置，也是就袋口到目标球最远处的点。

第二个位置 B 点。确定好 A 后，记住这个点，然后回到母球的位置，从母球方向看，获得最边上的 B 点。

通过 A、B 这两个位置点，以 A 为中心点，镜像映射 B 获得 C 点，C 点就是假想球最边的位置，以 C 点移动半颗球的位置就是瞄准击打点。

> 项目 Github 地址：[⭐ https://github.com/lecepin/billiard-aim-calculation](https://github.com/lecepin/billiard-aim-calculation)。
> 此仓库会持续将台球的各种计算过程可视化出来。欢迎 Star。

