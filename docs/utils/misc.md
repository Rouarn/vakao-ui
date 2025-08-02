# 其他工具 (Misc)

提供了一些未归类的、但同样实用的工具函数。

## sleep

异步等待指定的时间（毫秒）。这在需要延迟执行某些操作时非常有用，例如在测试或模拟异步行为时。

- **定义**: `(ms: number): Promise<void>`
- **示例**:

  ```ts
  import { sleep } from "vakao-ui/utils";

  async function doSomething() {
    console.log("Start");
    await sleep(1000); // 等待 1 秒
    console.log("End after 1 second");
  }

  doSomething();
  ```
