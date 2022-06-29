export const debounce = (callback: Function, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    // window.clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export const throttle = (callback: Function, limit: number) => {
  // Initially, we're not waiting
  var waiting: boolean = false;

  // We return a throttled function
  return (...args: any[]) => {
    // If we're not waiting
    if (!waiting) {
      // Execute users function
      callback.apply(null, args);

      // Prevent future invocations
      waiting = true;

      // After a period of time allow future invocations
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
};
