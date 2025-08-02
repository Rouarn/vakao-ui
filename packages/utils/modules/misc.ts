/**
 * 异步等待指定的时间
 * @param ms - 要等待的毫秒数
 * @returns 一个在指定时间后 resolve 的 Promise
 * @example
 * async function doSomething() {
 *   console.log('Start');
 *   await sleep(1000);
 *   console.log('End after 1 second');
 * }
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
