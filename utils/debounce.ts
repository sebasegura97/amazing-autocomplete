export function debounce<A = unknown, R = void>(
  callback: (args: A) => R,
  wait: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(callback(args));
      }, wait);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}
