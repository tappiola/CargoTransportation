export function throttle(fn, ms) {
  let isWaiting = false;

  return function wrapper(...args) {
    if (!isWaiting) {
      fn.apply(this, args);
      isWaiting = true;
      setTimeout(() => { isWaiting = false; }, ms);
    }
  };
}
