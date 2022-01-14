![](https://img-blog.csdnimg.cn/img_convert/27c2fa012670eb87051ba7611d9335b1.png)

# 1. 前置说明
这次再说明下自己对状态图的看法。状态图虽然有非常多的优势（[参考上篇文章](https://github.com/lecepin/blog/blob/main/%E9%99%8D%E4%BD%8E%E5%89%8D%E7%AB%AF%E4%B8%9A%E5%8A%A1%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%96%B0%E8%A7%86%E8%A7%92%EF%BC%9A%E7%8A%B6%E6%80%81%E6%9C%BA%E8%8C%83%E5%BC%8F.md)），如果你想使用，关于是否对整个旧项目进行全量状态图化，这里给一个适应范围是：项目中复杂的部分进行状态图建模是非常合适的。如果你有精力是可以尝试对整个项目进行状态图化的。

## 1.1 状态图
再回顾一下什么是状态图。
状态图的前身是状态机（FSM），FSM 使用过程中会暴露一些问题，如：
- 状态爆炸
- 层次表达能力弱

项目复杂起来，到后期 FSM 会很难维护。

针对这些问题，计算机科学家 David Harel 在 1984 年对 FSM 进行了扩展，发明了 状态图（SC）来解决 FSM 中的问题。（[论文地址](http://www.inf.ed.ac.uk/teaching/courses/seoc/2005_2006/resources/statecharts.pdf)）

SC 不仅仅是更好的可视化了 FSM，而且它是可执行的。现在的大多数状态机工具库，更确切的说应该是状态图工具库。

SC 定义为一个分层有向图（S，T，R，In，Out），比 FSM 多了一个 R（Orthogonal 正交）的概念。

SC 设计了一套非常复杂且非常精确的符号系统，增强了结构层次的表达能力和有向图的连通表达能力。目前也是 UML 的首选控制模型。

## 1.2 SCXML
SCXML 全称 State Chart XML，用于控制抽象的状态机表示法。

SCXML 是基于上面说的 David Harel 状态图 和 CCXML（Call Control eXtensible Markup Language） 进行扩展的一套规范。

从 2005 年到 2015 年经历 10 年定制的规范，成为 W3C 推荐规范。目前大部分编程语言的状态机工具都是基于此规范实施的。

## 1.3 XState
XState 是一个前端的状态图工具库，由微软工程师 David Khourshid 开发。目前是前端状态机里面 Star 最多的，本人体验下来感觉也很不错（本人很高兴在此仓库贡献了 14.7k 行 ）。下图是 XState Github Star 记录：

![](https://img-blog.csdnimg.cn/img_convert/63d39467a2b6fe5835c3a9045ce79a7a.png)

# 2. 组织说明
XState 的文档写的并不是很好懂，很多概念跳来跳去（当然 大多数国外的文档都有这种问题，作者肯定很想表达清楚，但并不容易做），如果读者对状态机没有概念，突如其来的一堆新的概念会让你措手不及，学习曲线剧增，使用上也不知该如何下手。

如果想要对这些概念有更好的认识和组织，那用 SCXML 和 XState 去对照着看，或许是比较合适的。

## 2.1 SCXML 的组织
主要有以下部分：
- 核心
  - `<scxml>`
  - `<state>`
  - `<transition>`
  - `<initial>`
  - `<parallel>`
  - `<final>`
  - `<history>`
  - `<onentry>`
  - `<onexit>`
- 可执行内容
  - `<raise>`
  - `<foreach>`
  - `<log>`
  - `<if>`
  - `<elseif>`
  - `<else>`
- 数据模型和数据操作
  - `<datamodel>`
  - `<data>`
  - `<content>`
  - `<param>`
  - `<donedata>`
  - `<script>`
  - `<assign>`
- 外部通讯
  - `<send>`
  - `<cancel>`
  - `<invoke>`
  - `<finalize>`

## 2.2 XState 的组织
主要有以下部分：
- Machine
- State
- State Node
- Event
- Transition
- Parallel State
- Final State
- History State
- Effects
  - Invoke
  - Actions
    - send
    - raise
    - respond
    - forwardTo
    - escalate
    - log
    - choose
    - pure
    - assign
  - Activities
- Context
- Guard
- Delay
- Interpret
- Identify
- Actor
- Model

# 3. 对应关系

下面以 SCXML 为主线去做对应描述。

## 3.1 核心元素
按照 SCXML 的分类，先从核心部分的元素进行对应说明。

### 3.1.1   `<scxml>`
 `<scxml>`，最外层的状态机包裹元素，携带版本信息，状态机是由它的 children 组成的。

属性字段描述如下：

| 名称        | 必填    | 属性约束 | 类型      | 默认值               | 有效值                                      | 描述                                                                                 |
| --------- | ----- | ---- | ------- | ----------------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| initial   | false | none | IDREFS  | none              | 合法的状态规范                                  | 状态机的初始状态的 id。如果未指定，则默认初始状态是文档顺序中的第一个子状态                                            |
| name      | false | none | NMTOKEN | none              | 任何有效的NMTOKEN                             | 此状态机的名称。它纯粹是为了提供信息                                                                 |
| xmlns     | true  | none | URI     | none              | http://www.w3.org/2005/07/scxml          |                                                                                    |
| version   | true  | none | decimal | none              | 必须 "1.0"                                 |                                                                                    |
| datamodel | false | none | NMTOKEN | platform-specific | "null", "ecmascript", "xpath" 或者其他平台定义的值 | 本文档所需的数据模型。 “null”表示 Null 数据模型，“ecmascript”表示 ECMAScript 数据模型，“xpath”表示 XPath 数据模型 |
| binding   | false | none | enum    | "early"           | "early", "late"                          | 要使用的数据绑定                                                                           |

children 可以包含：
- `<state>`
- `<parallel>`
- `<final>`
- `<datamodel>`
- `<script>`

对应 XState 是 Machine，Machine 的部分属性描述如下（[详情](https://github.com/statelyai/xstate/blob/xstate%404.27.0/packages/core/src/types.ts#L763)）：

```json
{
  "id": "",
  "initial": "",
  "context": {},
  "states": {}
}
```

### 3.1.2   `<state>`
`<state>`，用来描述状态机中的状态。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
	<state id="状态A"/>
</scxml>
```

属性字段描述如下：

| 名称      | 必填    | 属性约束                             | 类型     | 默认值  | 有效值 | 描述         |
| ------- | ----- | -------------------------------- | ------ | ---- | --- | ---------- |
| id      | false | none                             | ID     | none |     | 状态 ID      |
| initial | false | 不得与 <initial> 元素一起指定。绝不能以原子状态出现。 | IDREFS | none |     | 此状态的默认初始状态 |

children 可以包含：
- `<onentry>`
- `<onexit>`
- `<transition>`
- `<initial>`
- `<state>`
- `<parallel>`
- `<final>`
- `<history>`
- `<datamodel>`
- `<invoke>`

对应XState 的 State Node。不过 State Node 是一个 SCXML 多个元素组成的一个属性。由 `<state>`、`<initial>`、`<parallel>`、`<final>`、`<history>`组成。

State Node 的部分属性描述如下（[详情](https://github.com/statelyai/xstate/blob/xstate%404.27.0/packages/core/src/types.ts#L505)）：

```json
{
  "id": "",
  "states": {},
  "invoke": {},
  "on": {},
  "onEntry": {},
  "onExit": {},
  "onDone": {},
  "always": {},
  "after": {},
  "tags": [],
  "type": ""
}
```

示例：
```js
Machine({
  id: "状态机",
  states: {
    状态A: {
      id: "状态A",
    },
  },
})
```
![](https://img-blog.csdnimg.cn/img_convert/653446335127b40b22b1f028dce9797b.png)

### 3.1.3 `<transition>`
状态之间进行转换。由事件触发，通过条件判断后进行转换。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <state id="打开">
    <transition cond="_event.data==1" event="点击" target="关闭" />
  </state>
  <state id="关闭" />
</scxml>
```

属性字段描述如下：

| 名称     | 必填    | 属性约束 | 类型                   | 默认值        | 有效值                   | 描述                   |
| ------ | ----- | ---- | -------------------- | ---------- | --------------------- | -------------------- |
| event  | false |      | EventsTypes.datatype | none       | 以空格分隔的事件描述符列表         | 触发此转换的事件指示符列表        |
| cond   | false |      | Boolean expression   | 'true'     | 布尔表达式                 | 转换条件                 |
| target | false |      | IDREFS               | none       | 要跳转到的状态               | 要转换到的状态或并行区域的标识符     |
| type   | false |      | enum                 | "external" | "internal" "external" | 确定目标状态是来自于内部转换还是外部转换 |

children 可以包含 可执行内容。

对应XState 的 Event、Transition、Guard。部分属性描述如下（[详情](https://github.com/statelyai/xstate/blob/xstate%404.27.0/packages/core/src/types.ts#L445)）：

```json
{
  "on": {
    "": {},
    "*": {},
    "自定义事件": {
      "target": "目标状态",
      "cond": "条件判断",
      "actions": "可执行内容",
      "in": "只能从这个状态过来",
      "internal": "内部转换",
      "meta": {},
      "description": ""
    }
  }
}
```

示例：
```js
Machine({
  id: "状态机",
  states: {
    打开: {
      on: {
        点击: {
          target: "关闭",
          cond: (ctx, event) => event.data == 1,
        },
      },
    },
    关闭: {},
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/96bb0da3a02a74670c169bf393a7f217.png)

### 3.1.4 `<initial>`

`<initial>`，表示复杂 <state> 元素（即包含子 <state> 或 <parallel> 元素的元素）的默认初始状态。并不是一个状态，只是一个指向状态的作用。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <state id="打开">
    <initial>
      <transition target="写入" />
    </initial>
    <state id="写入" />
    <state id="读取" />
  </state>
</scxml>
```

必须和 `<transition>` 一起使用，进行状态指定。

children 包含 `<transition>`。

XState 可以直接在 State Node 的 `initail` 进行指定实现。

示例：

```js
Machine({
  id: "状态机",
  states: {
    打开: {
      initial: "读取",
      states: {
        读取: {},
        写入: {},
      },
    },
  },
});
```
![](https://img-blog.csdnimg.cn/img_convert/324e1c43109106f20f9fc89e5a6dd88d.png)

### 3.1.5 `<parallel>`
该元素表示一个状态，其子项并行执行。当父元素处于活动状态时，子项同时处于活动状态。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <parallel id="网盘">
    <state id="写入" />
    <state id="读取" />
  </parallel>
</scxml>
```

属性字段描述如下：

| 名称  | 必填    | 属性约束 | 类型  | 默认值  | 有效值                  | 描述    |
| --- | ----- | ---- | --- | ---- | -------------------- | ----- |
| id  | false | none | ID  | none | XML Schema 中定义的有效 id | 状态 ID |

children 可以包含：
- `<onentry>`
- `<onexit>`
- `<transition>`
- `<state>`
- `<parallel>`
- `<history>`
- `<datamodel>`
- `<invoke>`

XState 可以直接在 State Node 的 `type: parallel` 进行指定实现。

示例：
```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="网盘">
  <parallel id="网盘">
    <state id="上传">
      <initial>
        <transition target="空闲" />
      </initial>
      <state id="空闲">
        <transition target="上传中" event="开始" />
      </state>
      <state id="上传中">
        <transition target="成功" event="完在" />
      </state>
      <state id="成功"></state>
    </state>
    <state id="下载">
      <initial>
        <transition target="下载.空闲" />
      </initial>
      <state id="下载.空闲">
        <transition target="下载.下载中" event="开始" />
      </state>
      <state id="下载.下载中">
        <transition target="下载.成功" event="完在" />
      </state>
      <state id="下载.成功"></state>
    </state>
  </parallel>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "网盘",
  states: {
    网盘: {
      type: "parallel",
      states: {
        下载: {
          initial: "空闲",
          states: {
            空闲: {
              on: {
                开始: "下载中",
              },
            },
            下载中: {
              on: {
                完成: "成功",
              },
            },
            成功: {},
          },
        },
        上传: {
          initial: "空闲",
          states: {
            空闲: {
              on: {
                开始: "上传中",
              },
            },
            上传中: {
              on: {
                完成: "成功",
              },
            },
            成功: {},
          },
        },
      },
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/00a0c7158d595d9e18f75227f1273a04.png)

### 3.1.6 `<final>`

`<final>` 表示 `<scxml>` 或复合 `<state>` 元素的最终状态。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <state id="下载中">
    <transition event="完成" target="成功" />
  </state>
  <final id="成功" />
</scxml>
```

属性字段描述如下：

| 名称  | 必填    | 属性约束 | 类型  | 默认值  | 有效值                  | 描述    |
| --- | ----- | ---- | --- | ---- | -------------------- | ----- |
| id  | false | none | ID  | none | XML Schema 中定义的有效 id | 状态 ID |

children 可以包含：
- `<onentry>`
- `<onexit>`
- `<donedata>`

XState 可以直接在 State Node 的 `type: final` 进行指定实现。

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <initial>
    <transition target="工作" />
  </initial>
  <state id="工作">
    <initial>
      <transition target="正在完成任务" />
    </initial>
    <!-- 子状态为 final 时，父状态触发 don.state 事件 -->
    <transition event="done.state.工作" target="工作完成" />
    <state id="正在完成任务">
      <transition event="完成" target="任务完成" />
    </state>
    <final id="任务完成"></final>
  </state>
  <final id="工作完成" />
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "工作",
  states: {
    工作: {
      initial: "正在完成任务",
      states: {
        正在完成任务: {
          on: {
            完成: "任务完成",
          },
        },
        任务完成: {
          type: "final",
        },
      },
      onDone: "工作完成",
    },
    工作完成: {},
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/8a24c8fd183f18cf55a74a2b0ec0b395.png)

### 3.1.7 `<history>`

`<history>` 伪状态允许状态机记住它的状态配置。以 `<history>` 状态为目标的 `<transition>` 会将状态机返回到此记录的配置。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml">
  <history id="历史状态" type="shallow">
    <transition target="状态A" />
  </history>
  <state id="状态A"></state>
</scxml>
```

属性字段描述如下：

| 名称   | 必填    | 属性约束 | 类型   | 默认值       | 有效值                  | 描述                              |
| ---- | ----- | ---- | ---- | --------- | -------------------- | ------------------------------- |
| id   | false | none | ID   | none      | XML Schema 中定义的有效 id | 状态 ID                           |
| type | false | none | enum | "shallow" | "deep" 或 "shallow"   | 确定是记录当前状态的活动原子子状态还是仅记录其直接活动子状态。 |

children 可以包含 `<transition>`。

`<transition>` 'target' 指定默认历史配置的转换。 仅发生一次。 在符合标准的 SCXML 文档中，此转换不得包含“cond”或“事件”属性，并且必须指定一个非空“target”。此转换可能包含可执行内容。 如果 'type' 是“shallow”，那么这个 `<transition>` 的 'target' 必须只包含父状态的直接子级。 否则，它必须只包含父级的后代。

XState 可以直接在 State Node 的 `type: history` 进行指定实现。多了一些额外属性：

```json 
{
  "type": "history",
  "history": "shallow",
  "target": "默认指定到父状态"
}
```

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="新建">
  <state id="新建">
    <initial>
      <transition target="编写中"></transition>
    </initial>

    <transition target="中断" event="暂停"></transition>

    <state id="编写中">
      <transition target="预览中" event="下一步"></transition>
    </state>

    <state id="预览中">
      <transition target="提交中" event="下一步"></transition>
    </state>

    <state id="提交中"></state>

    <history id="历史状态" type="shallow"></history>
  </state>

  <state id="中断">
    <transition target="历史状态" event="恢复"></transition>
  </state>

</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "新建",
  states: {
    新建: {
      initial: "编写中",
      on: {
        暂停: "中断",
      },
      states: {
        编写中: {
          on: {
            下一步: "预览中",
          },
        },
        预览中: {
          on: {
            下一步: "提交中",
          },
        },
        提交中: {},
        历史状态: {
          type: "history",
        },
      },
    },
    中断: {
      on: {
        恢复: "新建.历史状态",
      },
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/c7c4373563471d54c70c0ae37c9313e2.png)

### 3.1.8 `<onentry>`

`<onentry>`，一个包装元素，包含进入状态时要执行的可执行内容。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onentry>
      <log expr="'欢迎进入状态A'" />
    </onentry>
  </state>
</scxml>
```

同 `<transition>`，children 只能包含 可执行内容。

XState 可以直接在 State Node 的 `onEntry` 进行定义。

示例：

```js
Machine({
  id: "状态机",
  initial: "状态A",
  states: {
    状态A: {
      onEntry: actions.log("欢迎进入状态A"),
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/14f96f1e11809beff91c56dbfa85d950.png)

### 3.1.9 `<onexit>`

`<onexit>`，一个包装元素，包含退出状态时要执行的可执行内容。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onexit>
      <log expr="'欢迎下次再来状态A'" />
    </onexit>
  </state>
</scxml>
```

同 <transition>，children 只能包含 可执行内容。

XState 可以直接在 State Node 的 `onExit` 进行定义。

示例：

```js
Machine({
  id: "状态机",
  initial: "状态A",
  states: {
    状态A: {
      onExit: actions.log("欢迎下次再来状态A"),
    },
  },
});
```
![](https://img-blog.csdnimg.cn/img_convert/82c09cb7cfa7d220283b3e69f1e74c50.png)

## 3.2 可执行内容
可执行内容，只能在 `<onentry>`、`<onexit>` 和 `<transition>` 中使用。它提供了允许 SCXML 会话修改其数据模型并与外部实体交互的钩子。

不仅包括了 `<raise>`、`<foreach>`、`<log>`、`<if>`、`<elseif>`、`<else>`，还包含了其他分组下的 `<script>` 、`<assign>`、`<send>` 、`<cancel>`。当然 下面我们还是按照规范文档中的分类进行对应说明。

在 XState 中，所有的在 SCXML 中的“可执行内容”统称为 action。所以对应的这些“可执行内容”都在 XState 的 actions 包中。

### 3.2.1 `<raise>`

`<raise>` 元素在当前 SCXML 会话中引发一个事件。可以触发 `<transition>` 中的 event。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onentry>
      <raise event="跳转" />
    </onentry>
  </state>
</scxml>
```

属性字段描述如下：

| 名称    | 必填   | 属性约束 | 类型      | 默认值  | 有效值 | 描述                       |
| ----- | ---- | ---- | ------- | ---- | --- | ------------------------ |
| event | true |      | NMTOKEN | none |     | 指定事件的名称。这将与转换的“event”属性相匹配。 |

对应 XState 的 `actions.raise` 函数。示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <transition target="状态B" event="跳转"></transition>
    <onentry>
      <raise event="跳转" />
    </onentry>
  </state>
  <state id="状态B"></state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "状态A",
  states: {
    状态A: {
      onEntry: actions.raise("跳转"),
      on: {
        跳转: "状态B",
      },
    },
    状态B: {},
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/ec8ac4bf5b069902890cc681cf1070f2.png)


### 3.2.2 `<foreach>`
`<foreach>` 元素允许 SCXML 应用程序遍历 `<datamodel>` 中的集合，并为集合中的每个项目执行其中包含的 可执行内容。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <datamodel>
    <data expr="[ 10, 20, 30 ]" id="dataArr" />
  </datamodel>
  
  <state id="状态A">
    <onentry>
      <foreach array="dataArr" index="varIndex" item="varItem">
        <log expr="varIndex" />
        <log expr="varItem" />
      </foreach>
    </onentry>
  </state>
</scxml>
```

属性字段描述如下：

| 名称    | 必填    | 属性约束 | 类型               | 默认值  | 有效值                            | 描述                            |
| ----- | ----- | ---- | ---------------- | ---- | ------------------------------ | ----------------------------- |
| array | true  |      | Value expression | none | 计算结果为可迭代集合的值表达式    `<foreach>` | 元素将遍历此集合的浅表副本                 |
| item  | true  |      | xsd:string       | none | 在指定数  `<datamodel>` 中有效的任何变量名  | 在循环的每次迭代中存储集合的不同项的变量          |
| index | false |      | xsd:string       | none | 在指定数  `<datamodel>` 中有效的任何变量名  | 在 foreach 循环的每次迭代中存储当前迭代索引的变量 |

children 由一个或多个 可执行内容组成。

可以对应 XState 的 `actions.pure` 函数，它也可以返回一个或者一组 action，或者什么也不返回。当然这个函数更灵活。示例：

```js
Machine({
  id: "状态机",
  initial: "状态A",
  context: {
    dataArr: [10, 20, 30],
  },
  states: {
    状态A: {
      onEntry: actions.pure((context, event) => {
        const _actions = [];

        context.dataArr.map((varItem, varIndex) => {
          _actions.push(actions.log(varIndex.toString()));
          _actions.push(actions.log(varItem.toString()));
        });

        return _actions;
      }),
    },
  },
});
```
![](https://img-blog.csdnimg.cn/img_convert/2c1ed2afa94f665b48b1df13c6a82f59.png)

### 3.2.3 `<log>`

`<log>` 允许应用程序生成日志记录或调试消息。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onentry>
      <log expr="'欢迎进入状态A'" />
    </onentry>
  </state>
</scxml>
```

属性字段描述如下：

| 名称  | 必填  | 属性约束 | 类型             | 默认值 | 有效值                 | 描述                                                                         |
| ----- | ----- | -------- | ---------------- | ------ | ---------------------- | ---------------------------------------------------------------------------- |
| label | false |          | string           | 空字符串|                 | 具有依赖于实现的解释的字符串。它旨在提供有关“expr”指定的日志字符串的元数据。 |
| expr  | false |          | 值表达式 | none  | | 返回要记录的值的表达式 |

对应 XState 的 `actions.log`。示例：

```js
Machine({
  id: "状态机",
  initial: "状态A",
  states: {
    状态A: {
      onEntry: actions.log("欢迎进入状态A"),
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/37f22772ca70fc86d700bc82c4c75c23.png)

### 3.2.4 `<if>`、`<elseif>`、`<else>`

`<if>` 是条件执行元素的容器。
`<elseif>` 是一个空元素，它对 `<if>` 的内容进行分区，并提供一个判断是否执行分区的条件。
`<else>` 是一个空元素，用于划分 `<if>` 的内容。它等价于一个带有“cond”的 `<elseif>`，它总是计算为真。

```xml
<if cond="cond1">
  	<log expr="'cond1==true'" />
  <elseif cond="cond2" />
  	<log expr="'cond2==true'" />
  <elseif cond="cond3" />
  	<log expr="'cond3==true'" />
  <else />
  	<log expr="'其他情况'" />
</if>
```

属性字段描述如下：

| 名称 | 必填 | 属性约束 | 类型       | 默认值 | 有效值           | 描述           |
| ---- | ---- | -------- | ---------- | ------ | ---------------- | -------------- |
| cond | true |          | 条件表达式 | none   | 有效的条件表达式 | 一个布尔表达式 |

XState 中有很多方法可以实现类似的能力，如果非要对标的话就是 `actions.choose` 函数了。示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <datamodel>
    <data expr="2" id="value" />
  </datamodel>
  <state id="状态A">
    <onentry>
      <if cond="value == 1">
        <log expr="'value === 1'" />

        <elseif cond="value == 2" />
        <log expr="'value === 2'" />

        <else />
        <log expr="'value != 1 && value != 2'" />
      </if>
    </onentry>
  </state>
</scxml>
```

```js
Machine(
  {
    id: "状态机",
    initial: "状态A",
    context: {
      value: 2,
    },
    states: {
      状态A: {
        onEntry: actions.choose([
          {
            cond: (context, event) => context.value === 1,
            actions: [actions.log("value === 1")],
          },
          {
            cond: "equal2",
            actions: [actions.log("value === 2")],
          },
          {
            actions: [actions.log("value != 1 && value != 2")],
          },
        ]),
      },
    },
  },
  {
    guards: {
      equal2: (context) => context.value === 2,
    },
  }
);
```

![](https://img-blog.csdnimg.cn/img_convert/e5cab68aa95d57de4402260ced6812f3.png)

## 3.3 数据模型和数据操作

这部分是状态之外的数据部分的定义和操作。

数据模型通过 `<datamodel>` 元素定义，该元素包含零个或多个 `<data>` 元素，每个元素定义一个数据元素并为其分配一个初始值。 这些值可以在线指定或从外部源加载。 然后可以通过 `<assign>` 元素更新它们。 `<donedata>`、`<content>` 和 `<param>` 元素可用于将数据合并到与外部实体的通信中。 最后，`<script>` 元素允许结合脚本。

### 3.3.1 `<datamodel>`

`<datamodel>` 是一个包装器元素，它封装了任意数量的 `<data>` 元素，每个元素都定义了一个数据对象。

children 只能包含 `<data>`。

对应 XState 的顶层 `context`。

### 3.3.2 `<data>`

`<data>` 元素用于声明和填充数据模型的部分。

```xml
<datamodel>
  <data expr="true" id="VarBool" />
  <data expr="1" id="VarInt" />
  <data expr="'这是字符串'" id="VarString" />
</datamodel>
```

属性字段描述如下：

| 名称 | 必填  | 属性约束 | 类型       | 默认值 | 有效值           | 描述                         |
| ---- | ----- | -------- | ---------- | ------ | ---------------- | ---------------------------- |
| id   | true  |          | ID         | none   |                  | 数据项的名称                 |
| src  | false |          | URI        | none   |                  | 给出应从中获取数据对象的位置 |
| expr | false |          | Expression | none   | 有效的条件表达式 | 执行以提供数据项的值         |

在符合标准的 SCXML 文档中，`<data>` 元素可以具有“src”或“expr”属性，但不能 同时具有。此外，如果任一属性存在，`<data>` 元素 绝不能有 children。因此，'src'、'expr' 和 children 在 `<data>` 元素中是互斥的。

在 XState 中直接作为 `context` 字段的值存在。

示例：
```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <datamodel>
    <data expr="true" id="VarBool" />
    <data expr="1" id="VarInt" />
    <data expr="'这是字符串'" id="VarString" />
  </datamodel>
  <state id="状态A">
    <onentry>
      <log expr="VarBool" />
      <log expr="VarInt" />
      <log expr="VarString" />
    </onentry>
  </state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "状态A",
  context: {
    varBool: true,
    varInt: 1,
    varString: "这是字符串",
  },
  states: {
    状态A: {
      onEntry: [
        actions.log((context) => context.varBool),
        actions.log((context) => context.varInt),
        actions.log((context) => context.varString),
      ],
    },
  },
});
```
![](https://img-blog.csdnimg.cn/img_convert/474ab5bc3f36d13605d0f5218db22a22.png)

### 3.3.3 `<assign>`

`<assign>` 元素用于修改数据模型。

```xml
<assign location="Var1" expr="5"/>
```

属性字段描述如下：

| 名称     | 必填  | 属性约束                                       | 类型       | 默认值 | 有效值           | 描述                       |
| -------- | ----- | ---------------------------------------------- | ---------- | ------ | ---------------- | -------------------------- |
| location | true  |                                                | 路径表达式 | none   | 有效的路径表达式 | 数据模型中要插入新值的位置 |
| expr     | false | 此属性不得出现在具有子元素的 `<assign>` 元素中 | 值表达     | none   | 有效的值表达式   | 返回要分配的值的表达式     |

在 XState 中用 `actions.assign` 函数表示。

示例：
```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <datamodel>
    <data expr="1" id="VarInt" />
    <data expr="'这是字符串'" id="VarString" />
  </datamodel>
  <state id="状态A">
    <onentry>
      <assign expr="5" location="VarInt" />
      <assign expr="'新的字符串'" location="VarString" />
    </onentry>
  </state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "状态A",
  context: {
    varInt: 1,
    varString: "这是字符串",
  },
  states: {
    状态A: {
      onEntry: actions.assign({
        varInt: 5,
        varString: "新的字符串",
      }),
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/349727c3303f6c38d30dff404c35d448.png)

### 3.3.4 `<script>`
`<script>` 元素将脚本功能添加到状态机。

```xml
<script>console.log('Hello, world!')</script>
```

属性字段描述如下：

| 名称 | 必填  | 属性约束                         | 类型 | 默认值 | 有效值     | 描述                   |
| ---- | ----- | -------------------------------- | ---- | ------ | ---------- | ---------------------- |
| src  | false | 如果元素有子元素，则可能不会发生 |      | none   | 有效的 URI | 给出应该下载脚本的位置 |

`<script>` 元素的 children 内容表示要执行的脚本代码。

XState 在很多地方可以表达类似的能力，如 actions 属性是支持直接赋值函数的，在 `actions.log`、`actions.pure`、`actions.assign` 等函数都可以实现类似能力。

### 3.3.5 `<donedata>`
一个包装元素，保存进入 `<final>` 状态时要返回的数据。

```xml
<final id="最终状态">
  <donedata>
    <param expr="'value1'" name="key1" />
    <param expr="'value2'" name="key2" />
  </donedata>
</final>
```

children 可以包含：
- `<content>`：可以出现 0 次或 1次。
- `<param>`：可以出现 0 次或多次。

一个符合标准的 SCXML 文档必须指定单个 `<content>` 元素或一个或多个 `<param>` 元素作为 `<donedata>` 的子元素，但不能同时指定两者。
如果 SCXML 处理器在进入最终状态时生成“done”事件，它必须执行 `<donedata>` 元素 `<param>` 或 `<content>` 子元素并将结果数据放在 `_event.data` 字段中。

对应到 XState  State Node 的 `data` 属性字段。

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A" initial="状态A1">
    <transition target="状态B" event="done.state.状态A">
      <log expr="_event.data"></log>
    </transition>
    
    <final id="状态A1">
      <donedata>
        <param expr="1" name="finalCustomeData1" />
        <param expr="2" name="finalCustomeData2" />
      </donedata>
    </final>
  </state>
  <state id="状态B"></state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "状态A",
  context: {},
  states: {
    状态A: {
      initial: "状态A1",
      onDone: {
        actions: actions.log((context, event) => {
          return event.data;
        }),
        target: "状态B",
      },
      states: {
        状态A1: {
          type: "final",
          data: {
            finalCustomeData1: 1,
            finalCustomeData2: 2,
          },
        },
      },
    },
    状态B: {},
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/2114106169586b87591a2d350b65e549.png)

### 3.3.6 `<param>`

`<param>` 标签提供了一种识别键和动态计算值的通用方法，该值可以传递给外部服务或包含在事件中。

```xml
<final id="最终状态">
  <donedata>
    <param expr="'value1'" name="key1" />
    <param expr="'value2'" name="key2" />
  </donedata>
</final>
```

属性字段描述如下：

| 名称     | 必填  | 属性约束 | 类型       | 默认值 | 有效值         | 描述 |
| -------- | ----- | -------- | ---------- | ------ | -------------- | ---- |
| name     | true  |          | NMTOKEN    | none   | 字符串         |      |
| expr     | false |          | 值表达式   | none   | 有效值表达式   |      |
| location | false |          | 位置表达式 | none   | 有效位置表达式 |      |

类似于一个 key 一个 value 的方式定义事件数据。

XState 比较灵活，直接在事件返回处填写 Object 即可。

### 3.3.7 `<content>`
包含要传递给外部服务的数据的容器元素。

```xml
<final id="最终状态">
  <donedata>
    <content>{key1: 'value1', key2: 'value2'}</content>
  </donedata>
</final>
```

属性字段描述如下：

| 名称 | 必填  | 属性约束             | 类型     | 默认值 | 有效值       | 描述 |
| ---- | ----- | -------------------- | -------- | ------ | ------------ | ---- |
| expr | false | 不得与子内容一起出现 | 值表达式 | none   | 有效值表达式 |      |

如果“expr”属性不存在，处理器必须使用 `<content>` 的子元素作为输出。

类似于一个 Object 的方式定义事件数据。功能和 `<param>` 相似。可以在 `<donedata>`、`<send>`、`<invoke>` 中使用。

XState 比较灵活，直接在事件返回处填写 Object 即可。

## 3.4 外部通讯
外部通信功能允许 SCXML 会话从外部实体发送和接收事件，并调用外部服务。

### 3.4.1 `<send>`

`<send>` 用于将事件和数据发送到外部系统，包括外部 SCXML 解释器，或在当前 SCXML 会话中引发事件。提供“即发即弃”的能力。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onentry>
      <send event="跳转" />
    </onentry>
  </state>
</scxml>
```

属性字段描述如下：

| 名称       | 必填  | 属性约束                                                  | 类型               | 默认值 | 有效值                                                                                                       | 描述                                                                                                                                |
| ---------- | ----- | --------------------------------------------------------- | ------------------ | ------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| event      | false | 不得与“eventexpr”一起出现                                 | EventType.datatype | none   |                                                                                                              | 一个字符串，指示正在生成的消息的名称                                                                                                |
| eventexpr  | false | 不得与“event”一起出现                                     | 值表达式           | none   |                                                                                                              | “event”的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<send>` 元素时对其进行执行，并将结果视为已作为“event”的值输入      |
| target     | false | 不能与“targetexpr”一起出现                                | URI                | none   | 有效的目标 URI                                                                                               | 平台应将事件发送到的消息目标的唯一标识符                                                                                            |
| targetexpr | false | 不能与“target”一起出现                                    | 值表达式           | none   | 有效目标 URI 的表达式                                                                                        | “target”的动态替代方案。如果存在此属性，则 SCXML 处理器必须在执行父 `<send>` 元素时对其进行执行，并将结果视为已作为“target”的值输入 |
| type       | false | 不能与“typeexpr”一起出现                                  | URI                | none   |                                                                                                              | 标识消息传输机制的 URI                                                                                                              |
| typeexpr   | false | 不能与“type”一起出现                                      | 值表达式           | none   |                                                                                                              | “type”的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<send>` 元素时对其进行执行，并将结果视为已作为“type”值输入          |
| id         | false | 不得与“idlocation”一起出现                                | xml:ID             | none   |                                                                                                              | 要用作此 `<send>` 实例的标识符的字符串文字                                                                                          |
| idlocation | false | 不得与“id”一起出现                                        | 位置表达式         | none   |                                                                                                              | 任何位置表达式执行为可以存储系统生成的 id 的数据模型位置                                                                            |
| delay      | false | 不能与“delayexpr”或属性“target”具有值“\_internal”一起出现 | Duration.datatype  | none   |                                                                                                              | 指示处理器在分派消息之前应等待多长时间                                                                                              |
| delayexpr  | false | 不得出现在“delay”或属性“target”的值为“\_internal”时       | 值表达式           | none   |                                                                                                              | “delay”的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<send>` 元素时对其进行执行，并将结果视为已作为“delay”值输入        |
| namelist   | false | 不得与 `<content>` 元素一起指定 |位置表达式列表            | none               |        | 一个或多个数据模型位置的空格分隔列表，作为属性/值对包含在消息中。 （位置的名称是属性，存储在位置的值是值。） |

children 可以包含：
- `<content>`：可以出现 0 次或 1次。
- `<param>`：可以出现 0 次或多次。

符合标准的 SCXML 文档必须准确指定“event”、“eventexpr”和 `<content>` 之一。符合标准的文档不得在 `<content>` 中指定“namelist”或 `<param>`。

- SCXML 处理器必须包含 `<param>` 或 'namelist' 提供的所有属性和值，即使出现重复也是如此。
- 如果存在“idlocation”，SCXML 处理器必须在执行父 `<send>` 元素时生成一个 id 并将其存储在此位置。
- 如果通过“delay”或“delayexpr”指定延迟，SCXML 处理器必须将字符串解释为时间间隔。 它必须仅在延迟间隔过去后才发送消息。 （请注意，发送标记的执行将立即返回。）处理器必须在执行 `<send>` 元素时执行所有参数到 `<send>`，而不是在实际发送消息时执行。 如果 <send> 参数的执行产生错误，处理器必须丢弃该消息而不尝试传递它。 如果 SCXML 会话在延迟间隔过去之前终止，则 SCXML 处理器必须丢弃该消息而不尝试传递它。

对应 XState 的 `actions.send` 函数。结构类似：

```json
{
  "event": "scxml.event",
  "options": {
    "id": "scxml.id",
    "delay": "scxml.delay",
    "to": "scxml.target"
  }
}
```

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <transition target="状态B" event="跳转"></transition>
    <onentry>
      <send event="跳转" />
    </onentry>
  </state>
  <state id="状态B"></state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "状态A",
  states: {
    状态A: {
      onEntry: actions.send("跳转"),
      on: {
        跳转: "状态B",
      },
    },
    状态B: {},
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/35c27e35d6b7bf4a11e146b103585f24.png)

### 3.4.2 `<cancel>`

`<cancel>` 元素用于取消延迟的 `<send>` 事件。 SCXML 处理器不得允许 `<cancel>` 影响未在同一会话中引发的事件。 处理器应尽最大努力取消具有指定 ID 的所有延迟事件。 但是请注意，它不能保证成功，例如，如果事件在 `<cancel>` 标记执行时已经交付。

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="状态A">
  <state id="状态A">
    <onentry>
      <cancel sendid="跳转ID" />
    </onentry>
  </state>
</scxml>
```

属性字段描述如下：

| 名称       | 必填  | 属性约束                    | 类型     | 默认值 | 有效值                             | 描述                                                                                                                                |
| ---------- | ----- | --------------------------- | -------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| sendid     | false | 不得与 sendideexpr 一起出现 | IDREF    | none   | 延迟事件的 sendid                  | 要取消的事件的 ID。如果多个延迟事件有这个 sendid，处理器将全部取消                                                                  |
| sendidexpr | false | 不得与 sendid 一起出现      | 值表达式 | none   | 计算结果为延迟事件 ID 的任何表达式 | 'sendid' 的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<cancel>` 元素时对其进行执行，并将结果视为已作为“sendid”的值输入 |

对应 XState 的 `actions.cancel` 函数。

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="未登录">
  <state id="未登录">
    <transition target="已登录" event="登录"></transition>
  </state>
  <state id="已登录">
    <transition target="已登录" event="活动"></transition>
    <onentry>
      <send event="注销" delay="1000 * 60" target="未登录" id="消息ID" />
    </onentry>
    <onexit>
      <cancel sendid="消息ID"></cancel>
    </onexit>
  </state>
</scxml>
```

```js
Machine({
  id: "状态机",
  initial: "未登录",
  states: {
    未登录: {
      on: {
        登录: "已登录",
      },
    },
    已登录: {
      onEntry: actions.send("注销", {
        delay: 1000 * 60,
        id: "消息ID",
      }),
      onExit: actions.cancel("消息ID"),
      on: {
        注销: "未登录",
        活动: "已登录",
      },
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/0436a87ead5ce61a37356b7c3f337a70.png)

也可以使用 XState 的 `after` 语法糖来实现：

```js
Machine({
  id: "状态机",
  initial: "未登录",
  states: {
    未登录: {
      on: {
        登录: "已登录",
      },
    },
    已登录: {
      after: {
        [1000 * 60]: "未登录",
      },
      on: {
        活动: "已登录",
      },
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/06f2e6600fd3fe81a64e87f9278724c7.png)

### 3.4.3 `<invoke>`

`<invoke>` 元素用于创建外部服务的实例。

```xml
<invoke id="ID_SUB" src="sub.scxml">
  <param expr="3" name="i_ID" />
</invoke>
```

`<invoke>` 提供了一种更紧密耦合的通信形式，特别是能够触发平台定义的服务并将数据传递给它。 它及其子 `<finalize>` 在模拟外部服务行为的状态中很有用。 `<invoke>` 元素在状态的 `<onentry>` 元素之后执行，并导致创建外部服务的实例。 `<param>` 和 `<content>` 元素以及 'namelist' 属性可用于将数据传递给服务。 
当并行状态同时调用相同的外部服务时，将启动外部服务的单独实例。 它们可以通过与它们相关联的 id 来区分。 类似地，从外部服务返回的事件中包含的 id 可用于确定哪些事件是对哪些调用的响应。 返回的每个事件将仅由调用它的状态中的 `<finalize>` 处理，但该事件随后会像状态机接收的任何其他事件一样被处理。 因此，finalize 代码可以被认为是在将事件添加到事件队列之前应用的预处理阶段。 请注意，该事件将传递给所有并行状态以检查转换。
由于当状态机离开调用状态时调用将被取消，因此在将立即退出的状态下开始调用是没有意义的。 因此，`<invoke>` 元素在进入状态时执行，但仅在检查无事件转换和未决内部事件驱动的转换之后。 如果找到任何此类启用的转换，则立即执行该转换并立即退出该状态，而不会触发调用。 因此，只有在状态机达到稳定配置时才会触发调用，即在等待外部事件时它将停留在其中的配置。

属性字段描述如下：

| 名称        | 必填  | 属性约束                     | 类型           | 默认值 | 有效值                                                     | 描述                                                                                                                           |
| ----------- | ----- | ---------------------------- | -------------- | ------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| type        | false | 不能与“typeexpr”属性一起出现 | URI            | none   |                                                            | 指定外部服务类型的 URI                                                                                                         |
| typeexpr    | false | 不得与“type”属性一起出现     | 值表达式       | none   | 计算结果为 URI 的任何值表达式，该 URI 将是 'type' 的有效值 | “type”的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<invoke>` 元素时对其进行执行，并将结果视为已作为“type”的值输入 |
| src         | false |                              | URI            | none   |                                                            | 要传递给外部服务的 URI                                                                                                         |
| srcexpr     | false |                              | 值表达式       | none   |                                                            | 'src' 的动态替代方案。如果此属性存在，SCXML 处理器必须在执行父 `<invoke>` 元素时对其进行执行，并将结果视为已作为“src”的值输入  |
| id          | false |                              | ID             | none   |                                                            | 要用作此 `<invoke>` 实例的标识符的字符串文字                                                                                   |
| idlocation  | false |                              | 位置表达式     | none   |                                                            | 任何对数据模型位置求值的数据模型表达式                                                                                         |
| namelist    | false |                              | 位置表达式列表 | none   |                                                            | 要作为属性/值对传递给调用服务的一个或多个数据模型位置的空格分隔列表。 （位置的名称是属性，位置存储的值是值。）                 |
| autoforward | false |                              | 布尔值         | false  |                                                            | 指示是否将事件转发到调用的进程的标志                                                                                           |

children 可以包含：
- `<content>`：可以出现 0 次或 1次。
- `<param>`：可以出现 0 次或多次。
- `<finalize>`：可以出现 0 次或 1次。

当 `autoforward` 属性设置为 true 时，SCXML 处理器必须将它接收到的每个外部事件的精确副本发送到调用的进程。SCXML 处理器必须在将事件从调用会话的外部事件队列中删除以进行处理时转发该事件。

外部服务在处理时可能会返回多个事件。如果 `<invoke>` 实例中有一个 `<finalize>` 处理程序创建了生成事件的服务，则 SCXML 处理器必须在从事件队列中删除事件以进行处理之前立即执行该 `<finalize>` 处理程序中的代码。它绝不能在 `<invoke>` 的任何其他实例中执行 `<finalize>` 处理程序。一旦外部服务完成处理，它必须返回一个特殊事件 `done.invoke.id` 到调用进程的外部事件队列，其中id是对应 `<invoke>` 元素的调用ID。外部服务不得 在此完成事件之后生成任何其他事件。

#### `<invoke>` 的实现
包括父进程和子进程之间的通信，是特定于平台的，但是在被调用的进程本身是 SCXML 会话的情况下，以下要求成立：

- 如果 `<invoke>` 中的 `<param>` 元素的 `name` 与调用会话的顶级数据声明中的 `<data>` 元素的 `id` 匹配，则 SCXML 处理器必须使用 `<param >` 元素作为相应 `<data>` 元素的初始值。（顶级数据声明是包含在 `<scxml>` 子元素的 `<datamodel>` 元素中的那些声明。）（请注意，这意味着在 `<data>` 元素中指定的任何值都将被忽略。） `namelist` 类似。如果名称列表中键的值与调用会话的顶级数据模型中的 `<data>` 元素的 `id` 匹配， scxml 处理器必须使用键的值作为相应 `<data>` 元素的初始值。如果名称不匹配，处理器不得 将 `<param>` 元素或名称列表键/值对的值添加到调用会话的数据模型中。但是，处理器可以通过其他一些特定于平台的方式使这些值可用。
- 当被调用的状态机达到顶级最终状态时，处理器必须放置事件 `done.invoke.id` 上调用机，其中所述外部事件队列 ID 是用于此调用的调用ID。请注意，达到顶级最终状态对应于机器的正常终止，并且一旦处于此状态，它就无法生成或处理任何进一步的事件。
- 如上所述，如果调用状态机在接收到 `done.invoke` 之前退出包含调用的状态。id事件，它取消调用的会话。执行此操作的方法是特定于平台的。然而，当它被取消时，被调用的会话必须在下一个微步结束时退出。处理器必须为被调用会话中的所有活动状态执行 <onexit> 处理程序，但它不能 生成 `done.invoke.id` 事件。一旦取消调用的会话，处理器必须忽略它从该会话接收到的任何事件。特别是它绝不能将它们插入到调用会话的外部事件队列中。
- SCXML 处理器必须支持使用 SCXML 事件I/O 处理器在调用会话和被调用会话之间进行通信。处理器可以支持使用其他事件I/O 处理器在调用会话和被调用会话之间进行通信。

对应 XState State Node 的 `invoke` 属性。描述如下：

```json
{
  "id": "",
  "src": "",
  "autoForward": false,
  "data": {},
  "onDone": {},
  "onError": {}
}
```

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="等待中">
  <state id="等待中">
    <transition event="done.invoke.子状态机" target="时间到" />
    <invoke id="子状态机" type="http://www.w3.org/TR/scxml/">
      <content>
        <scxml name="分钟子状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="等待中" initial="激活中">
          <state id="激活中">
            <onentry>
              <send delay="60s" event="结束"></send>
            </onentry>
            <transition target="完成" event="结束"></transition>
          </state>
          <final id="完成"></final>
        </scxml>
      </content>
    </invoke>
  </state>
  <final id="时间到"></final>
</scxml>
```

```js
const minuteMachine = Machine({
  id: "分钟子状态机",
  initial: "激活中",
  states: {
    激活中: {
      after: {
        60000: { target: "完成" },
      },
    },
    完成: { type: "final" },
  },
});

Machine({
  id: "状态机",
  initial: "等待中",
  states: {
    等待中: {
      invoke: {
        src: minuteMachine,
        onDone: "时间到",
      },
    },
    时间到: {
      type: "final",
    },
  },
});
```

![](https://img-blog.csdnimg.cn/img_convert/7624324e73374ace97e91a10c774cdea.png)

### 3.4.4 `<finalize>`

`<finalize>` 元素使调用会话能够使用被调用会话返回的事件中包含的数据更新其数据模型。 

`<finalize>` 包含在执行 `<invoke>` 后外部服务返回事件时执行的可执行内容。 在系统查找与事件匹配的转换之前应用此内容。 在可执行内容中，系统变量“_event”可用于引用正在处理的事件中包含的数据。在并行状态的情况下，仅执行原始调用状态下的finalize代码。
在调用期间状态机从被调用组件接收到的任何事件都由 `<finalize>` 处理程序在选择转换之前进行预处理。 finalize> 代码用于规范化返回数据的形式，并在执行转换的“event”和“cond”子句之前更新数据模型。
在符合的SCXML文件，在<敲定>的可执行内容不得引发事件或调用外部动作。特别是，`<send>` 和 `<raise>` 元素 不得出现。

children 可以包含 可执行内容。

XState 没有对应的 API，XState 对于处理消息是非常灵活的，所以这一块能力是内置进去的。

示例：

```xml
<scxml name="状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="等待中">
  <datamodel>
    <data expr="1" id="VarValue" />
  </datamodel>
  
  <state id="等待中">
    <transition event="childToParent" cond="VarValue==2" target="结束" />
    <invoke id="子状态机" type="http://www.w3.org/TR/scxml/">
      <content>
        <scxml name="发送消息到父级子状态机" version="1.0" xmlns="http://www.w3.org/2005/07/scxml" initial="完成" initial="激活中">
          <final id="完成">
            <onentry>
              <send target="#_parent" event="childToParent">
                <param name="aParam" expr="2" />
              </send>
            </onentry>
          </final>
        </scxml>
      </content>
      <finalize>
        <assign location="VarValue" expr="_event.data.aParam"/>
      </finalize>
    </invoke>
  </state>
  <final id="结束"></final>
</scxml>
```

## 3.5 未对应 XState API

上面按照规范与 XState 进行了对应。还有一部分是 XState 特色产物。如下：
- Actor：Actor 模型，一套非常成熟的模型。用来扩展子状态机。
- Interpreter：由于 XState 的状态机是一套纯函数编写，无任何副作用。所以官方提供了一个 Interpreter 用来托管副作用。
- Model：用来改善开发人员体验，分离和组织 context 和 event，共享模型。

## 3.6 对应大图

整个对应关系，大致如下图所示：
![](https://img-blog.csdnimg.cn/img_convert/9f40e7b10a91911874fc879601648b59.png)

# 4. 最后

连续熬了一个多星期的夜，对 SCXML 和 XState 的关系进行了梳理和对齐，最终产出了这篇 4万 多字的文章。

做为一个 XState 的 “过来人”，这篇从规范到工具对应关系的文章，正是当初那个在入门产生疑惑时的我，最需要的东西。

也希望这篇文章可以帮助入门和使用状态机及 XState 的同学解除部分疑惑。

