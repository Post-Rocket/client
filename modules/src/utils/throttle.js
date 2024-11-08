'use strict';

export const DEFAULT_DELAY = 50;

// Utility function to throttle a function call
// involved in an intensive process.
// Very useful for exmple with onmousemove and onscroll event.
export const throttle = (
  func,
  delay = DEFAULT_DELAY,
  wait = false,
  queued = false
) => delay > 0 && (
  function(...args) {
    if (wait) {
      queued = true;
      return;
    }

    func.apply(this || {}, args);
    wait = true;
    setTimeout(function() {
      queued && func.apply(this || {}, args);
      queued = wait = false;
    }, delay);
  }
) || func;

// Exports.
Object.defineProperty(throttle, 'DEFAULT_DELAY', {
  value: DEFAULT_DELAY
});
export default Object.freeze(Object.defineProperty(throttle, 'throttle', {
  value: throttle
}));

// Node.js exports.
try {
  module.exports = throttle;
} catch {}