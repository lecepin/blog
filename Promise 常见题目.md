![image](https://github.com/lecepin/blog/assets/11046969/6d063971-d2b7-466c-b012-38a60b783496)



## 1\. Promise 对象池

请你编写一个异步函数 `promisePool` ，它接收一个异步函数数组 `functions` 和 池限制 `n`。它应该返回一个 `promise` 对象，当所有输入函数都执行完毕后，`promise` 对象就执行完毕。

池限制 定义是一次可以挂起的最多 `promise` 对象的数量。`promisePool` 应该开始执行尽可能多的函数，并在旧的 `promise` 执行完毕后继续执行新函数。`promisePool` 应该先执行 `functions[i]`，再执行 `functions[i + 1]`，然后执行 `functions[i + 2]`，等等。当最后一个 `promise` 执行完毕时，`promisePool` 也应该执行完毕。

例如，如果 `n = 1` , `promisePool` 在序列中每次执行一个函数。然而，如果 `n = 2` ，它首先执行两个函数。当两个函数中的任何一个执行完毕后，再执行第三个函数(如果它是可用的)，依此类推，直到没有函数要执行为止。

你可以假设所有的 `functions` 都不会被拒绝。对于 `promisePool` 来说，返回一个可以解析任何值的 `promise` 都是可以接受的。

```
示例 1：

输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 2
输出：[[300,400,500],500]
解释
传递了三个函数。它们的睡眠时间分别为 300ms、 400ms 和 200ms。
在 t=0 时，执行前两个函数。池大小限制达到 2。
当 t=300 时，第一个函数执行完毕后，执行第3个函数。池大小为 2。
在 t=400 时，第二个函数执行完毕后。没有什么可执行的了。池大小为 1。
在 t=500 时，第三个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。
示例 2：

输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 5
输出：[[300,400,200],400]
解释：
在 t=0 时，所有3个函数都被执行。池的限制大小 5 永远不会满足。
在 t=200 时，第三个函数执行完毕后。池大小为 2。
在 t=300 时，第一个函数执行完毕后。池大小为 1。
在 t=400 时，第二个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。
示例 3：

输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 1
输出：[[300,700,900],900]
解释：
在 t=0 时，执行第一个函数。池大小为1。
当 t=300 时，第一个函数执行完毕后，执行第二个函数。池大小为 1。
当 t=700 时，第二个函数执行完毕后，执行第三个函数。池大小为 1。
在 t=900 时，第三个函数执行完毕后。池大小为 0，因此返回的 Promise 也执行完成。
```

实现

```ts
type F = () => Promise<any>;

function promisePool(functions: F[], n: number): Promise<any[]> {
    let fNext = 0; // 下一个要执行的函数的索引

    // 递归调用该函数以依次执行下一个函数
    const evaluateNext = async (): Promise<void> => {
        if (fNext >= functions.length) {
            // 如果所有函数都已执行，则退出
            return;
        }
        const fn = functions[fNext++]; // 获取下一个要执行的函数
        await fn(); // 执行函数并等待其完成
        await evaluateNext(); // 递归调用 evaluateNext，继续执行下一个函数
    };

    // 同时启动 n 个 evaluateNext()调用来保持 n 个异步任务并发
    const runners = new Array(n).fill(null).map(() => evaluateNext());

    // 等待所有启动的任务完成
    return Promise.all(runners)
}
```

## 2\. 两个 Promise 对象相加

给定两个 promise 对象 promise1 和 promise2，返回一个新的 promise。promise1 和 promise2 都会被解析为一个数字。返回的 Promise 应该解析为这两个数字的和。

```
示例 1：

输入：
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
输出：7
解释：两个输入的 Promise 分别解析为值 2 和 5。返回的 Promise 应该解析为 2 + 5 = 7。返回的 Promise 解析的时间不作为判断条件。
示例 2：

输入：
promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),
promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
输出：-2
解释：两个输入的 Promise 分别解析为值 10 和 -12。返回的 Promise 应该解析为 10 + -12 = -2。
```

```ts
type P = Promise<number>

async function addTwoPromises(promise1: P, promise2: P): P {

};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */
```

实现

```ts
async function addTwoPromises(promise1: Promise<number>, promise2: Promise<number>): Promise<number> {
   return await promise1 + await promise2
};

async function addTwoPromises(promise1: Promise<number>, promise2: Promise<number>): Promise<number> {
   return await Promise.all([promise1, promise2]).then(([a, b]) => a + b)
};

async function addTwoPromises(promise1: Promise<number>, promise2: Promise<number>): Promise<number> {
   const [a, b] = await Promise.all([promise1, promise2])
   return a + b
};

async function addTwoPromises(promise1: Promise<number>, promise2: Promise<number>): Promise<number> {
   return new Promise((resolve, reject) => {
       Promise.all([promise1, promise2]).then(([a, b]) => {
           resolve(a + b)
       }).catch(reject)
   })
};
```

## 3\. 有时间限制的 Promise 对象

请你编写一个函数，它接受一个异步函数 fn 和一个以毫秒为单位的时间 t。它应根据限时函数返回一个有 限时 效果的函数。函数 fn 接受提供给 限时 函数的参数。

限时 函数应遵循以下规则：

如果 fn 在 t 毫秒的时间限制内完成，限时 函数应返回结果。
如果 fn 的执行超过时间限制，限时 函数应拒绝并返回字符串 "Time Limit Exceeded" 。

```
示例 1：

输入：
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
输出：{"rejected":"Time Limit Exceeded","time":50}
解释：
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // 输出结果

提供的函数设置在 100ms 后执行完成，但是设置的超时时间为 50ms，所以在 t=50ms 时拒绝因为达到了超时时间。
示例 2：

输入：
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
输出：{"resolved":25,"time":100}
解释：
在 t=100ms 时执行 5*5=25 ，没有达到超时时间。
示例 3：

输入：
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
输出：{"resolved":15,"time":120}
解释：
在 t=120ms 时执行 5+10=15，没有达到超时时间。
示例 4：

输入：
fn = async () => {
  throw "Error";
}
inputs = []
t = 1000
输出：{"rejected":"Error","time":0}
解释：
此函数始终丢出 Error


提示：

0 <= inputs.length <= 10
0 <= t <= 1000
fn 返回一个 Promise 对象
```

实现

```ts
type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
  return async function(...args) {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);

      try {
        const result = await fn(...args);
        resolve(result);
      } catch(err) {
        reject(err);
      }
      clearTimeout(timeout);
    });
  };
};


/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
```

## 4\. 延迟每个 Promise 对象的解析

给定一个函数数组 functions 和一个数字 ms，返回一个新的函数数组。

functions 是一个返回 Promise 对象的函数数组。
ms 表示延迟的时间，以毫秒为单位。它决定了在新数组中的每个函数返回的 Promise 在解析之前等待的时间。
新数组中的每个函数应该返回一个 Promise 对象，在延迟了 ms 毫秒后解析，保持原始 functions 数组中的顺序。delayAll 函数应确保从 functions 中的每个 Promise 都被延迟执行，形成返回延迟的 Promise 的函数的新数组。

```
示例 1：

输入：
functions = [
   () => new Promise((resolve) => setTimeout(resolve, 30))
],
ms = 50
输出：[80]
解释：数组中的 Promise 在 30 毫秒后解析，但被延迟了 50 毫秒，所以总共延迟了 30 毫秒 + 50 毫秒 = 80 毫秒。
示例 2：

输入：
functions = [
    () => new Promise((resolve) => setTimeout(resolve, 50)),
    () => new Promise((resolve) => setTimeout(resolve, 80))
],
ms = 70
输出：[120,150]
解释：数组中的 Promise 在 50 毫秒和 80 毫秒后解析，但它们被延迟了 70 毫秒，所以总共延迟了 50 毫秒 + 70 毫秒 = 120 毫秒 和 80 毫秒 + 70 毫秒 = 150 毫秒。


提示：

functions 是一个返回 Promise 对象的函数数组
10 <= ms <= 500
1 <= functions.length <= 10
```

实现

```ts
type Fn = () => Promise<any>

function delayAll(functions: Fn[], ms: number): Fn[] {
    return functions.map(fn => () => new Promise(res => {
        setTimeout(() => {
            res(fn())
        }, ms)
    }))
};
```

## 5\. 转换回调函数为 Promise 函数

编写一个函数，接受另一个函数 fn ，并将基于回调函数的函数转换为基于 Promise 的函数。

promisify 函数接受一个函数 fn ，fn 将回调函数作为其第一个参数，并且还可以接受其他额外的参数。

promisfy 返回一个新函数，新函数会返回一个 Promise 对象。当回调函数被成功调用时，新函数返回的 Promise 对象应该使用原始函数的结果进行解析；当回调函数被调用出现错误时，返回的 Promise 对象应该被拒绝并携带错误信息。最终返回的基于 Promise 的函数应该接受额外的参数作为输入。

```
以下是一个可以传递给 promisify 的函数示例：

function sum(callback, a, b) {
  if (a < 0 || b < 0) {
    const err = Error('a and b must be positive');
    callback(undefined, err);
  } else {
    callback(a + b);
  }
}
这是基于 Promise 的等效代码：

async function sum(a, b) {
  if (a < 0 || b < 0) {
    throw Error('a and b must be positive');
  } else {
    return a + b;
  }
}


示例 1：

输入：
fn = (callback, a, b, c) => {
  return callback(a * b * c);
}
args = [1, 2, 3]
输出：{"resolved": 6}
解释：
const asyncFunc = promisify(fn);
asyncFunc(1, 2, 3).then(console.log); // 6

fn 以回调函数作为第一个参数和 args 作为其余参数进行调用。当使用 (1, 2, 3) 调用时，基于 Promise 的 fn 将解析为值 6。
示例 2：

输入：
fn = (callback, a, b, c) => {
  callback(a * b * c, "Promise Rejected");
}
args = [4, 5, 6]
输出：{"rejected": "Promise Rejected"}
解释：
const asyncFunc = promisify(fn);
asyncFunc(4, 5, 6).catch(console.log); // "Promise Rejected"

fn 以回调函数作为第一个参数和 args 作为其余参数进行调用。在回调函数的第二个参数中，接受一个错误消息，因此当调用 fn 时，Promise 被拒绝并携带回调函数中提供的错误消息。请注意，不管将什么作为回调函数的第一个参数传递都无关紧要。


提示：

1 <= args.length <= 100
0 <= args[i] <= 104
```

实现

```ts
type CallbackFn = (
    next: (data: number, error: string) => void,
    ...args: number[]
) => void
type Promisified = (...args: number[]) => Promise<number>

function promisify(fn: CallbackFn): Promisified {
  return async function(...args) {
    return new Promise((resolve, reject) => {
      fn((data: number, error: string) => {
        if (error) reject(error);
        resolve(data);
      }, ...args);
    });
  };
};
```

## 6\. 并行执行 Promise 以获取独有的结果

给定一个数组 functions，返回一个 promise 对象 promise。functions 是一个返回多个 promise 对象 fnPromise 的函数数组。每个 fnPromise 可以被解析（resolved）或拒绝（rejected）。

```
如果 fnPromise 被解析：

    obj = { status: "fulfilled", value: resolved value}

如果 fnPromise 被拒绝：

    obj = { status: "rejected", reason: 拒绝的原因（捕获的错误消息）}

该 promise 应该返回一个包含这些对象 obj 的数组。数组中的每个 obj 应该对应原始函数数组中的多个 promise 对象，并保持相同的顺序。

请在不使用内置方法 Promise.allSettled() 的情况下实现它。



示例 1：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
输出：{"t":100,"values":[{"status":"fulfilled","value":15}]}
解释：
const time = performance.now()
const promise = promiseAllSettled(functions);

promise.then(res => {
    const out = {t: Math.floor(performance.now() - time), values: res}
    console.log(out) // {"t":100,"values":[{"status":"fulfilled","value":15}]}
})

返回的 promise 在 100 毫秒内解析。由于函数数组中的 promise 被解析，返回的 promise 的解析值设置为[{"status":"fulfilled","value":15}]。
示例 2：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(20), 100)),
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
输出：
{
    "t":100,
    "values": [
        {"status":"fulfilled","value":20},
        {"status":"fulfilled","value":15}
    ]
}
解释：返回的 promise 在 100 毫秒内解析，因为解析时间取决于需要最长时间来解析的 promise。由于函数数组中的 promises 被解析，返回的 promise 的解析值设置为[{"status":"fulfilled","value":20},{"status":"fulfilled","value":15}]。
示例 3：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(30), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
输出：
{
    "t":200,
    "values": [
        {"status":"fulfilled","value":30},
        {"status":"rejected","reason":"Error"}
    ]
}
解释：返回的 promise 在 200 毫秒内解析，因为解析时间取决于需要最长时间来解析的 promise。由于函数数组中的一个 promise 被解析，另一个被拒绝，返回的 promise 的解析值设置为[{"status":"fulfilled","value":30},{"status":"rejected","reason":"Error"}]。数组中的每个对象对应原始函数数组中的 promise，并保持相同的顺序。


提示：

1 <= functions.length <= 10
```

实现

```ts
type FulfilledObj = {
    status: 'fulfilled';
    value: string;
}
type RejectedObj = {
    status: 'rejected';
    reason: string;
}
type Obj = FulfilledObj | RejectedObj;

function promiseAllSettled(functions: Function[]): Promise<Obj[]> {
    return new Promise((resolve) => {
    const resultArray = [];
    let completedCount = 0;
    for (let i = 0; i < functions.length; i++) {
      const fnPromise = functions[i]();

      fnPromise
        .then((value) => {
          resultArray[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          resultArray[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completedCount++;
         if (completedCount === functions.length) {
            resolve(resultArray);
          }
        });
    }
  });
};


/**
 * const functions = [
 *    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
 * ]
 * const time = performance.now()
 *
 * const promise = promiseAllSettled(functions);
 *
 * promise.then(res => {
 *     const out = {t: Math.floor(performance.now() - time), values: res}
 *     console.log(out) // {"t":100,"values":[{"status":"fulfilled","value":15}]}
 * })
 */
```

## 7\. 并行执行异步函数

给定一个异步函数数组 functions，返回一个新的 promise 对象 promise。数组中的每个函数都不接受参数并返回一个 promise。所有的 promise 都应该并行执行。

promise resolve 条件：

当所有从 functions 返回的 promise 都成功的并行解析时。promise 的解析值应该是一个按照它们在 functions 中的顺序排列的 promise 的解析值数组。promise 应该在数组中的所有异步函数并行执行完成时解析。
promise reject 条件：

当任何从 functions 返回的 promise 被拒绝时。promise 也会被拒绝，并返回第一个拒绝的原因。
请在不使用内置的 Promise.all 函数的情况下解决。

```
示例 1：

输入：functions = [
  () => new Promise(resolve => setTimeout(() => resolve(5), 200))
]
输出：{"t": 200, "resolved": [5]}
解释：
promiseAll(functions).then(console.log); // [5]

单个函数在 200 毫秒后以值 5 成功解析。
示例 2：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
输出：{"t": 100, "rejected": "Error"}
解释：由于其中一个 promise 被拒绝，返回的 promise 也在同一时间被拒绝并返回相同的错误。
示例 3：

输入：functions = [
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
]
输出：{"t": 150, "resolved": [4, 10, 16]}
解释：所有的 promise 都成功执行。当最后一个 promise 被解析时，返回的 promise 也被解析了。


提示：

函数 functions 是一个返回 promise 的函数数组
1 <= functions.length <= 10
```

实现

```ts
type Fn<T> = () => Promise<T>

async function promiseAll<T>(functions: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    if(functions.length === 0) {
      resolve([]);
      return;
    }

    const res: T[] = new Array(functions.length).fill(null);

    let resolvedCount = 0;

    functions.forEach(async (el, idx) => {
      try {
        const subResult = await el();
        res[idx] = subResult;
        resolvedCount++;
        if(resolvedCount === functions.length) {
          resolve(res);
        }
      } catch(err) {
        reject(err);
      }
    });
  });
};


/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
```

## 8\. 睡眠函数

```
请你编写一个异步函数，它接收一个正整数参数 millis ，并休眠 millis 毫秒。要求此函数可以解析任何值。



示例 1：

输入：millis = 100
输出：100
解释：
在 100ms 后此异步函数执行完时返回一个 Promise 对象
let t = Date.now();
sleep(100).then(() => {
 console.log(Date.now() - t); // 100
});
示例 2：

输入：millis = 200
输出：200
解释：在 200ms 后函数执行完时返回一个 Promise 对象


提示：

1 <= millis <= 1000
```

实现

```ts
async function sleep(millis: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, millis);
    });
}
```

## 9\. 异步任务调度器

描述：实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 limit 个。

实现

```ts
type PromiseCreator = () => Promise<void>;

class Scheduler {
    private queue: PromiseCreator[];  // 用队列保存正在执行的任务
    private runCount: number;        // 计数正在执行的任务个数
    private maxCount: number;        // 允许并发的最大个数

    constructor(limit: number) {
        this.queue = [];
        this.runCount = 0;
        this.maxCount = limit;
    }

    add(time: number, data: string) {
        const promiseCreator: PromiseCreator = () => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log(data);
                    resolve();
                }, time);
            });
        }
        this.queue.push(promiseCreator);
        // 每次添加的时候都会尝试去执行任务
        this.request();
    }

    private request() {
        // 队列中还有任务才会被执行
        if (this.queue.length && this.runCount < this.maxCount) {
            this.runCount++;
            // 执行先加入队列的函数
            this.queue.shift()!().then(() => {
                this.runCount--;
                // 尝试进行下一次任务
                this.request();
            });
        }
    }
}

// 测试
const scheduler = new Scheduler(2);

const addTask = (time: number, data: string) => {
    scheduler.add(time, data);
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 输出结果 2 3 1 4
```

## 11\. 设计可取消 Promise

实现

```ts
type CancellablePromise<T> = [Promise<T>, () => void];

function makeCancellable<T>(promise: Promise<T>): CancellablePromise<T> {
  let rejectFn: (reason?: any) => void;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    rejectFn = reject; // 保存 reject 函数引用以便后续调用

    promise.then(
      (value) => {
        if (rejectFn !== null) { // 如果没有被取消，那么解决 wrappedPromise
          resolve(value);
          rejectFn = null; // 清除 rejectFn 引用，避免内存泄漏
        }
      },
      (error) => {
        if (rejectFn !== null) { // 如果没有被取消，那么拒绝 wrappedPromise
          reject(error);
          rejectFn = null; // 清除 rejectFn 引用，避免内存泄漏
        }
      }
    );
  });

  const cancel = () => {
    if (rejectFn !== null) {
      rejectFn({ cancelled: true }); // 立即拒绝 wrappedPromise
      rejectFn = null; // 防止内存泄漏，清除 rejectFn 引用
    }
  };

  return [wrappedPromise, cancel];
}

// 使用示例
const [cancellablePromise, cancel] = makeCancellable(new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Resolved after 2 seconds");
  }, 2000);
}));

cancellablePromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    if (error && error.cancelled) {
      console.log("Promise was cancelled");
    } else {
      console.log("Promise was rejected with error:", error);
    }
  });

// 立即取消 Promise
cancel();
```

## 10\. 多个 Callback 函数 Promise 化的测试用例

```js
// Node.js 风格的 myFunction
function myFunction(cb1, cb2, cb3) {
  // 模拟异步操作，例如 I/O
  setTimeout(() => cb1(null, "result1"), Math.floor(Math.random() * 1000));
  setTimeout(() => cb2(null, "result2"), Math.floor(Math.random() * 1000));
  setTimeout(() => cb3(null, "result3"), Math.floor(Math.random() * 1000));
}

// 实现 myFunctionPromise，将 myFunction Promise 化。
// cb callback 无 error 时，则为 resolve
// 测试用例
test("a", async () => {
  try {
    const results = await myFunctionPromise();
    console.log(results); // 输出: ['result1', 'result2', 'result3']
    // 这里我们期望返回的 Promise 被成功地 resolve，并且结果按次序排列
    expect(results).toEqual(["result1", "result2", "result3"]);
  } catch (err) {
    // 这里处理可能出现的错误
    console.error(err);
  }
});
```

实现

```js
// Promise 包装器，保证次序
function myFunctionPromise() {
  return new Promise((resolve, reject) => {
    let results = new Array(3); // 创建一个长度为 3 的数组来存储结果
    let count = 0;
    let hasErrorOccurred = false;

    function createFinalCallback(index) {
      return function (err, result) {
        if (hasErrorOccurred) return;
        if (err) {
          hasErrorOccurred = true;
          return reject(err);
        }
        results[index] = result; // 根据回调的标识符存储结果
        count++;
        if (count === 3) {
          resolve(results); // 当所有回调都执行完毕时，按顺序解决 Promise
        }
      };
    }

    myFunction(
      createFinalCallback(0),
      createFinalCallback(1),
      createFinalCallback(2)
    );
  });
}
```
