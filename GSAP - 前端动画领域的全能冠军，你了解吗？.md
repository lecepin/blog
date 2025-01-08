


![image](https://github.com/user-attachments/assets/39107cec-3aea-44ca-a15d-7d80c032f11a)


GSAP（GreenSock Animation Platform）是一款强大的 JavaScript 动画库，由 GreenSock 公司开发，在动画制作领域颇负盛名。

## 诞生背景

#### 当时网页动画技术的局限

- **原生 JavaScript 动画的不足**：在 GSAP 诞生之前，若要使用原生 JavaScript 创建动画，主要依赖`setInterval`或`requestAnimationFrame`函数 。通过`setInterval`实现动画时，由于其执行频率受系统和浏览器环境影响，很难保证动画的流畅性。例如，在一些性能较差的设备上，动画可能会出现卡顿现象。而`requestAnimationFrame`虽能与浏览器的刷新频率同步，但编写复杂动画时，代码量会迅速增加，需要手动计算每个动画帧的状态变化，比如元素的位置、缩放、旋转等属性的改变，这对开发者的数学和逻辑能力要求较高，且开发效率较低。
- **CSS 动画的短板**：CSS 动画在实现简单的过渡效果（如淡入淡出、平移等）方面较为便捷，通过`transition`和`animation`属性即可轻松实现。然而，CSS 动画在控制动画的时间轴方面存在明显不足。例如，当需要多个动画按照特定顺序、延迟或同时执行时，CSS 动画的实现就变得极为复杂，甚至几乎无法完成。此外，CSS 动画的缓动效果相对有限，虽然有一些预定义的缓动函数，但难以满足复杂的、个性化的动画需求。同时，在处理与用户交互相关的动画时，CSS 动画缺乏灵活性，很难根据用户的操作实时改变动画状态。

#### GSAP 解决的关键问题

- **复杂动画的高效控制**：GSAP 提供了直观且强大的 API，使得开发者能够轻松创建复杂的动画序列。例如，通过`Timeline`类，开发者可以像在时间轴上排列轨道一样，精确控制多个动画的播放顺序、延迟时间以及相互之间的依赖关系。以一个网页导航栏的动画为例，当用户鼠标悬停时，导航栏的展开动画可能包括图标旋转、菜单滑出、文字淡入等多个子动画，使用 GSAP 可以方便地将这些动画组合在一个时间轴中，按照理想的顺序和节奏依次执行，大大提升了开发效率和动画效果的可控性。
- **高品质的缓动效果**：缓动效果是影响动画自然度和吸引力的关键因素。GSAP 内置了丰富的缓动函数库，涵盖了线性、弹性、弹跳、正弦等多种类型，超过30种预定义的缓动函数。这意味着开发者无需自行编写复杂的数学公式来实现不同的缓动效果，直接调用相应的函数即可。而且，GSAP 还支持自定义缓动函数，满足特定创意需求。例如，在制作一个模拟物体从高处掉落并反弹的动画时，使用弹性缓动函数可以让动画效果更加逼真，仿佛物体具有真实的物理属性。
- **跨浏览器兼容性**：在不同浏览器中，动画的表现可能存在差异。GSAP 在开发过程中充分考虑了跨浏览器兼容性问题，经过了大量的测试和优化，确保动画在主流浏览器（如 Chrome、Firefox、Safari、Edge 等）以及不同版本上都能保持一致的效果。这使得开发者无需花费大量时间和精力去针对不同浏览器编写特定的代码来修复动画显示问题，大大降低了开发成本，提高了项目的稳定性和可维护性。

## 适合场景

- **网页设计与开发**：在网页设计中，GSAP 可用于制作各种复杂且流畅的页面动画效果，如导航栏的展开与收缩动画、图片轮播效果、元素的淡入淡出和滚动加载动画等。还可配合`ScrollTrigger`插件，实现元素随页面滚动而触发动画，为用户带来丰富的交互体验，适用于企业官网、产品展示网站、创意工作室网站等。
- **游戏开发**：无论是2D 还是3D 游戏，GSAP 都能为游戏角色的动作、技能特效、场景切换等提供高效的动画支持。像角色的移动、攻击、跳跃等动作，以及技能释放时的光影、粒子效果等，使用 GSAP 可使游戏动画更加流畅和生动，增强游戏的趣味性和吸引力。
- **移动应用开发**：在移动应用中，GSAP 可用于创建各种交互性强的动画效果，如引导页动画、菜单切换动画、数据加载动画、列表项的滑动和删除动画等。提升用户体验，使应用界面更加生动和吸引人。
- **在线广告与营销**：在制作在线广告时，GSAP 能够帮助创建极具吸引力的动态广告内容，如弹窗广告、横幅广告、视频广告中的动画元素等。通过炫酷的动画效果吸引用户的注意力，提高广告的点击率和转化率。

## 竞品

GSAP 的竞品主要有 Anime.js、Velocity.js、mo.js 等。它们之间的优劣和选择具体如下：

- **GSAP**：具有强大的功能，提供丰富动画效果和控制功能，如时间线、缓动函数等；性能卓越，渲染速度快，浏览器重绘少；社区支持广泛，有大量教程和资源。不过，其 API 复杂，学习曲线较陡，体积较大，可能增加页面加载时间。
- **Anime.js**：优势在于轻量级，体积小巧，不占用过多资源；API 友好，易于上手，适合初学者；可定制性高，支持自定义动画参数和回调函数。缺点是功能相对有限，处理复杂动画场景能力不如 GSAP。
- **Velocity.js**：渲染速度快，性能好，适合处理大量动画；API 简洁明了，易于使用；浏览器兼容性好，支持多种浏览器和设备。但它依赖 jQuery，增加了项目依赖性，且社区规模较小，资源相对较少。
- **mo.js**：能创建高度定制化的动画效果，提供强大的形状系统、自定义数值和时间系统，还有多种内置动画效果，如粒子系统、生长动画等。但 API 复杂，学习成本较高。

#### 不同场景下的选择建议

- **复杂大型项目**：若需要实现复杂的动画序列、精准控制动画时间轴和大量动画元素交互等，GSAP 是较好选择，其强大功能和性能可满足需求。如大型电商网站的促销活动页面、交互性强的游戏网站等。
- **初学者或轻量级项目**：Anime.js 更合适，容易上手，能快速实现一些基础动画效果，且轻量级特点不会给项目带来过多负担，适用于个人博客、简单的企业宣传网站等。
- **注重动画渲染速度和简洁 API**：Velocity.js 比较符合要求，在需要快速渲染大量动画且项目已使用 jQuery 的情况下，能发挥其优势，像一些数据可视化项目、列表动画较多的页面等。
- **需要高度定制化动画效果**：如制作具有独特形状变化、粒子效果等创意动画时，mo.js 可提供强大的定制功能来实现创意想法，适合创意广告、艺术展示类网站或应用。

## 核心组成

其核心构成涵盖多个关键部分，每个部分都承担着独特而重要的职责，共同助力开发者创建出高性能、复杂且精美的动画效果。以下为你详细介绍：

#### 1. Tween 类（TweenMax 和 TweenLite）

- **核心功能**：这两个类是 GSAP 创建基本补间动画的核心工具。补间动画是指在两个关键状态之间自动生成过渡动画的技术。TweenMax 功能全面，包含了 GSAP 所有特性；而 TweenLite 则是轻量级版本，体积更小，适用于对文件体积敏感的项目，开发者可按需选择。
- **使用方式**：通过这两个类，开发者能够轻松定义动画的起始状态、结束状态、持续时间、缓动函数等关键参数。例如，要使一个 HTML 元素在2秒内从当前位置移动到新的坐标位置，并以特定的缓动效果过渡，代码可能如下：

```javascript
// 引入 GSAP 库后
// 选择要应用动画的元素，假设 HTML 中有一个 id 为“box”的元素
const box = document.getElementById("box");
// 使用 TweenLite 创建动画
gsap.to(box, {
  x: 500, // 目标水平位置
  y: 300, // 目标垂直位置
  duration: 2, // 动画持续2秒
  ease: "Power3.easeInOut", // 使用 Power3缓动函数，有不同的缓动效果可供选择
});
```

#### 2. Timeline 类（TimelineMax 和 TimelineLite）

- **核心功能**：Timeline 类主要用于管理动画时间轴，这是 GSAP 实现复杂动画序列的关键所在。它允许开发者将多个补间动画组合在一起，并按照特定的顺序、时间间隔进行播放，同时还能方便地控制整个动画序列的播放、暂停、倒放等操作。
- **使用方式**：例如，在一个网页加载动画场景中，可能先有一个 logo 的淡入动画，接着是导航栏的滑动出现动画，最后是页面主体内容的渐显动画。使用 Timeline 类可以这样实现：

```javascript
// 创建一个 Timeline 实例
const tl = gsap.timeline();
// 添加 logo 淡入动画
tl.to("#logo", {
  opacity: 1,
  duration: 1,
  ease: "Linear.easeInOut",
});
// 添加导航栏滑动出现动画，延迟0.5秒执行
tl.to(
  "#navbar",
  {
    x: 0,
    duration: 1,
    ease: "Power2.easeOut",
  },
  0.5
);
// 添加页面主体内容渐显动画，在前一个动画结束后立即执行
tl.to("#main-content", {
  opacity: 1,
  duration: 1,
  ease: "Sine.easeInOut",
});
```

#### 3. Ease 缓动函数（EasePack）

- **核心功能**：缓动函数决定了动画在过渡过程中的速度变化，是使动画看起来自然、生动的关键因素。GSAP 提供了丰富的预定义缓动函数，涵盖线性、弹性、弹跳、正弦等多种类型，总数超过30种。这些缓动函数模拟了现实世界中物体运动的不同特性，让动画效果更加逼真。同时，GSAP 还支持开发者自定义缓动函数，以满足独特的创意需求。
- **使用方式**：在创建补间动画时，只需在相关参数中指定所需的缓动函数名称即可应用。如前面例子中的`'Power3.easeInOut'`，`Power3`表示缓动函数类型，`easeInOut`表示缓动的方向，即动画在开始和结束时都有加速和减速的过程。

#### 4. Plugins 插件系统

- **核心功能**：GSAP 的插件系统极大地扩展了其功能边界。通过各种插件，开发者可以实现诸如 SVG 动画、视差效果、文本特效等特定领域的复杂动画。插件能够针对不同的需求，为 GSAP 添加额外的方法和功能，使开发者无需从头编写复杂代码就能实现专业级的动画效果。

- **ScrollTrigger 插件**：该插件允许开发者创建与页面滚动相关的动画效果，如元素随着页面滚动而淡入、滑动进入视野等。例如，实现一个网页中的图片在滚动到特定位置时才开始动画展示：

```javascript
// 引入 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);
const image = document.getElementById("image");
gsap.to(image, {
  opacity: 1,
  scale: 1.2,
  duration: 1,
  ease: "Power2.easeOut",
  scrollTrigger: {
    trigger: image,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
});
```

- **SplitText 插件**：用于将文本内容拆分成单个字符、单词或行，并对每个部分应用独立的动画效果。例如，实现一段文字逐个字符淡入的效果：

```javascript
// 引入 SplitText 插件
gsap.registerPlugin(SplitText);
const text = document.getElementById("text");
const split = new SplitText(text, { type: "chars" });
gsap.to(split.chars, {
  opacity: 1,
  y: 0,
  stagger: 0.1,
  duration: 1,
  ease: "Power2.easeOut",
});
```


## 快速上手

以下是几个GSAP快速上手的示例：

### 基础动画示例
在HTML文件中，创建一个具有`id`为`box`的`div`元素，通过GSAP使其产生简单的移动和颜色变化动画。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入GSAP库，这里使用CDN链接，也可下载后本地引入 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <style>
        #box {
            width: 100px;
            height: 100px;
            background-color: blue;
            margin-top: 100px;
            margin-left: 100px;
        }
    </style>
</head>

<body>
    <div id="box"></div>
    <script>
        // 选择要应用动画的元素
        const box = document.getElementById('box');
        // 使用gsap.to()方法创建动画
        gsap.to(box, {
            x: 300, // 水平方向移动到300px位置
            y: 200, // 垂直方向移动到200px位置
            backgroundColor: 'red', // 改变背景颜色为红色
            duration: 2, // 动画持续时间为2秒
            ease: 'Power3.easeInOut' // 使用Power3缓动函数
        });
    </script>
</body>

</html>
```


![image](https://github.com/user-attachments/assets/9fd0daf4-5d09-4d14-ab1a-7b88a7a901c7)



### 多个动画顺序执行示例
在HTML文件中，创建三个`div`元素，分别具有`id`为`box1`、`box2`和`box3`，通过GSAP实现三个元素按顺序进行不同的动画。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入GSAP库，这里使用CDN链接，也可下载后本地引入 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <style>
       .box {
            width: 100px;
            height: 100px;
            margin: 50px;
        }

        #box1 {
            background-color: red;
        }

        #box2 {
            background-color: green;
        }

        #box3 {
            background-color: blue;
        }
    </style>
</head>

<body>
    <div id="box1" class="box"></div>
    <div id="box2" class="box"></div>
    <div id="box3" class="box"></div>
    <script>
        // 创建一个Timeline实例
        const tl = gsap.timeline();
        // 添加box1的动画，淡入并放大
        tl.to('#box1', {
            opacity: 1,
            scale: 1.5,
            duration: 1,
            ease: 'Sine.easeInOut'
        });
        // 添加box2的动画，延迟0.5秒后向右移动并改变透明度
        tl.to('#box2', {
            x: 200,
            opacity: 0.5,
            duration: 1,
            ease: 'Power2.easeOut'
        }, 0.5);
        // 添加box3的动画，在前一个动画结束后向上移动并旋转
        tl.to('#box3', {
            y: -100,
            rotation: 45,
            duration: 1,
            ease: 'Linear.easeInOut'
        });
    </script>
</body>

</html>
```


![image](https://github.com/user-attachments/assets/0e83c73b-c12a-46ff-a0ba-16a1a7753790)


### 与鼠标交互动画示例
在HTML文件中，创建一个具有`id`为`box`的`div`元素，当鼠标悬停在元素上时，元素产生动画效果，鼠标移开时，动画反向播放。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 引入GSAP库，这里使用CDN链接，也可下载后本地引入 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <style>
        #box {
            width: 100px;
            height: 100px;
            background-color: yellow;
            margin: 100px auto;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="box"></div>
    <script>
        // 选择要应用动画的元素
        const box = document.getElementById('box');
        // 创建一个补间动画
        const tween = gsap.to(box, {
            scale: 1.5,
            rotation: 360,
            backgroundColor: 'purple',
            duration: 1,
            ease: 'Power4.easeInOut'
        });
        // 鼠标悬停时播放动画
        box.addEventListener('mouseenter', () => {
            tween.play();
        });
        // 鼠标移开时反向播放动画
        box.addEventListener('mouseleave', () => {
            tween.reverse();
        });
    </script>
</body>

</html>
```


![image](https://github.com/user-attachments/assets/5df83247-000f-4c7a-9835-6aa0f833ca0e)


这些示例可以帮助你快速了解GSAP的基本用法，通过修改参数和添加更多元素，能创建出更复杂多样的动画效果。

## 插件

免费插件生态：

![image](https://github.com/user-attachments/assets/fcc82bbf-2fe0-4fee-9989-08ac9d43dec8)


付费插件生态：

![image](https://github.com/user-attachments/assets/9606f2ef-36f6-4138-a522-241e18a931af)
