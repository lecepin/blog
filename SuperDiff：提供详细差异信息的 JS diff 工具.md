<img width="673" alt="image" src="https://github.com/user-attachments/assets/61543a8f-e0b0-427d-b7f9-48fd8958a5e8" />

Superdiff 是一个专门用于处理对象和数组差异比较的工具库。在日常的开发工作中，我们经常会遇到需要比较两个对象或者数组是否相同，以及找出它们之间具体差异的场景。例如，在前端开发中，当我们需要更新页面数据时，就需要知道哪些数据发生了变化；在后端开发中，数据的同步和更新也离不开对数据差异的精确判断。Superdiff 正是为了解决这些问题而诞生的。

## 丰富的功能特性

Superdiff 提供了一系列强大的功能，让我们来逐一了解。

**getObjectDiff(prevObject, nextObject)**

```js
import { getObjectDiff } from "@donedeal0/superdiff";
```

这个函数可以比较两个对象，并返回每个值及其可能的子值的差异。它对任何值类型的深度嵌套对象都提供了支持。想象一下，你有一个复杂的配置对象，在不同的环境下可能会有细微的变化。使用 `getObjectDiff` 函数，你可以轻松地找出这些变化，而无需手动逐行比较。这不仅节省了时间，还大大降低了出错的可能性。

**getListDiff(prevList, nextList)**

```ts
// Returns a complete diff of two arrays
getListDiff(prevList, nextList)
```

对于数组的比较，`getListDiff` 函数可以帮助我们获取两个数组之间的完整差异。在处理列表数据时，我们经常需要知道哪些元素被添加、删除或修改了。这个函数就像是一个智能的小助手，能够准确地告诉你这些信息。比如在一个待办事项列表应用中，当用户对列表进行操作后，我们可以使用 `getListDiff` 来更新数据库中的数据，确保数据的一致性。

**streamListDiff(prevList, nextList, referenceProperty)**

```ts
// Streams the diff of two object lists, ideal for large lists and maximum performance
streamListDiff(prevList, nextList, referenceProperty)
```

当我们需要处理大型列表时，传统的比较方法可能会导致性能问题。而 `streamListDiff` 函数则采用了流式处理的方式，特别适合处理大型列表，能够提供最大的性能优化。它可以逐步输出差异信息，而不是一次性加载整个列表进行比较。这就好比是喝水，我们可以一口一口地喝，而不是一下子把整杯水都灌下去。这种方式不仅减少了内存的占用，还提高了处理速度。

**isEqual(dataA, dataB)**

```js
import { isEqual } from "@donedeal0/superdiff";
```

在很多情况下，我们只需要知道两个值是否相等，而不需要详细的差异信息。`isEqual` 函数就可以满足这个需求，它能够快速判断两个值是否相等。这在数据验证和条件判断中非常有用。比如在表单提交时，我们可以使用 `isEqual` 来检查用户输入的数据是否与之前保存的数据相同，从而决定是否需要更新数据库。

**isObject(data)**

```js
import { isObject } from "@donedeal0/superdiff";
```

有时候，我们需要判断一个值是否是对象。`isObject` 函数就可以帮助我们轻松完成这个任务。在编写一些通用的工具函数时，这个函数可以帮助我们进行类型检查，避免出现意外的错误。

## 安装

```
npm install @donedeal0/superdiff
```

## Diff 示例

输入：

```
getObjectDiff(
  {
    id: 54,
    user: {
      name: "joe",
-     member: true,
-     hobbies: ["golf", "football"],
      age: 66,
    },
  },
  {
    id: 54,
    user: {
      name: "joe",
+     member: false,
+     hobbies: ["golf", "chess"],
      age: 66,
    },
  }
);
```

输出：

```js
{
      type: "object",
+     status: "updated",
      diff: [
        {
          property: "id",
          previousValue: 54,
          currentValue: 54,
          status: "equal",
        },
        {
          property: "user",
          previousValue: {
            name: "joe",
            member: true,
            hobbies: ["golf", "football"],
            age: 66,
          },
          currentValue: {
            name: "joe",
            member: false,
            hobbies: ["golf", "chess"],
            age: 66,
          },
+         status: "updated",
          diff: [
            {
              property: "name",
              previousValue: "joe",
              currentValue: "joe",
              status: "equal",
            },
+           {
+             property: "member",
+             previousValue: true,
+             currentValue: false,
+             status: "updated",
+           },
+           {
+             property: "hobbies",
+             previousValue: ["golf", "football"],
+             currentValue: ["golf", "chess"],
+             status: "updated",
+           },
            {
              property: "age",
              previousValue: 66,
              currentValue: 66,
              status: "equal",
            },
          ],
        },
      ],
    }
```

输入：

```js
getListDiff(
  -["mbappe", "mendes", "verratti", "ruiz"],
  +["mbappe", "messi", "ruiz"]
);
```

输出：

```js
{
      type: "list",
+     status: "updated",
      diff: [
        {
          value: "mbappe",
          prevIndex: 0,
          newIndex: 0,
          indexDiff: 0,
          status: "equal",
        },
-       {
-         value: "mendes",
-         prevIndex: 1,
-         newIndex: null,
-         indexDiff: null,
-         status: "deleted",
-       },
-       {
-         value: "verratti",
-         prevIndex: 2,
-         newIndex: null,
-         indexDiff: null,
-         status: "deleted",
-       },
+       {
+         value: "messi",
+         prevIndex: null,
+         newIndex: 1,
+         indexDiff: null,
+         status: "added",
+       },
+       {
+         value: "ruiz",
+         prevIndex: 3,
+         newIndex: 2,
+         indexDiff: -1,
+         status: "moved",
+        },
      ],
    }
```

输入：

```js
const diff = streamListDiff(
  [
    -{ id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ],
  [
    +{ id: 0, name: "Item 0" },
    { id: 2, name: "Item 2" },
    +{ id: 3, name: "Item Three" },
  ],
  "id",
  { chunksSize: 2 }
);
```

输出：

```js
diff.on("data", (chunk) => {
      // first chunk received (2 object diffs)
      [
+       {
+         previousValue: null,
+         currentValue: { id: 0, name: 'Item 0' },
+         prevIndex: null,
+         newIndex: 0,
+         indexDiff: null,
+         status: 'added'
+       },
-       {
-         previousValue: { id: 1, name: 'Item 1' },
-         currentValue: null,
-         prevIndex: 0,
-         newIndex: null,
-         indexDiff: null,
-         status: 'deleted'
-       }
      ]
    // second chunk received (2 object diffs)
      [
        {
          previousValue: { id: 2, name: 'Item 2' },
          currentValue: { id: 2, name: 'Item 2' },
          prevIndex: 1,
          newIndex: 1,
          indexDiff: 0,
          status: 'equal'
        },
+       {
+         previousValue: { id: 3, name: 'Item 3' },
+         currentValue: { id: 3, name: 'Item Three' },
+         prevIndex: 2,
+         newIndex: 2,
+         indexDiff: 0,
+         status: 'updated'
+       },
     ]
});

diff.on("finish", () => console.log("The full diff is available."))
diff.on("error", (err) => console.log(err))
```

## 底层实现

diff 的实现主要是通过比较两个对象或数组的结构和内容来确定它们之间的差异。以下是实现原理的简要概述：

1. **类型检查**：首先，函数会检查输入的两个对象或数组的类型。如果它们的类型不同，则直接返回不相等。

2. **数组比较**：如果输入是数组，函数会检查它们的长度是否相同。如果长度不同，则返回不相等。如果长度相同，函数会根据 `ignoreArrayOrder` 选项决定是否忽略数组的顺序进行比较。

3. **对象比较**：对于对象，函数会遍历对象的每个属性，递归地比较每个属性的值。如果属性的值是对象，则会进一步调用 diff 函数进行深度比较。

4. **状态标记**：在比较过程中，函数会为每个属性或元素生成一个状态标记（如 "added"、"deleted"、"updated"、"equal"），以便在最终结果中返回。

5. **结果构建**：最后，函数会将所有的差异收集到一个数组中，并返回这个数组，表示两个输入之间的差异。

```js
function isEqual(t, e, options = { ignoreArrayOrder: false }) {
  if (typeof t !== typeof e) return false;
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return false;
    return options.ignoreArrayOrder
      ? t.every((item) =>
          e.some((i) => JSON.stringify(i) === JSON.stringify(item))
        )
      : t.every(
          (item, index) => JSON.stringify(item) === JSON.stringify(e[index])
        );
  }
  if (typeof t === "object") {
    return JSON.stringify(t) === JSON.stringify(e);
  }
  return t === e;
}

function getObjectDiff(t, e, options) {
  let diff = [];
  for (let [key, value] of Object.entries(t)) {
    if (!(key in e)) {
      diff.push({
        property: key,
        previousValue: value,
        currentValue: undefined,
        status: "deleted",
      });
    } else if (!isEqual(value, e[key], options)) {
      diff.push({
        property: key,
        previousValue: value,
        currentValue: e[key],
        status: "updated",
      });
    }
  }
  for (let key in e) {
    if (!(key in t)) {
      diff.push({
        property: key,
        previousValue: undefined,
        currentValue: e[key],
        status: "added",
      });
    }
  }
  return diff;
}
```
