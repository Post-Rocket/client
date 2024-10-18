// Utility function to throttle a function call
// involved in an intensive process.
// Very useful for exmple with onmousemove and onscroll event.
const throttle = (
  func,
  delay = 50,
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

// Clamp values in a range.
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);