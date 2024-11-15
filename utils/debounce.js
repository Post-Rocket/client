'use strict';

export const DEFAULT_TIMEOUT = 300;

// Utility function to throttle a function call
// involved in an intensive process.
// Very useful for exmple with onmousemove and onscroll event.
export const debounce = (func, timeout = DEFAULT_TIMEOUT) => {
  let timeoutId;
  return timeout > 0 && (function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() { func.apply(this || {}, args); }, timeout);
  }) || func;
}

// Exports.
Object.defineProperty(debounce, 'DEFAULT_TIMEOUT', {
  value: DEFAULT_TIMEOUT
});
export default Object.freeze(Object.defineProperty(debounce, 'debounce', {
  value: debounce
}));

// Node.js exports.
try {
  module.exports = debounce;
} catch {}