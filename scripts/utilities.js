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

// Transform a string to camel case.
const toCamelCase = (str, sep = '') => {
  let output = '', flag = false;
  for (let i = 0, l = str.length; i !== l; ++i) {
    const c = str.charAt(i);
    ((c < 'A' || c > 'z' || (c > 'Z' && c < 'a')) && (flag = true))
    || (!flag && (output += c))
    || ((output += sep + c.toUpperCase()) && (flag = false))
  }
  return output;
}

// Create data from a form.
const createFormData = (() => {
  // Check if input is an event.
  const isSubmitEvent = event => {
    if (!event || typeof event !== 'object') return false;
    else if (event.target && event.target instanceof HTMLFormElement) return true;
    try {
      return event instanceof SyntheticBaseEvent || event instanceof SubmitEvent;
    } catch {
      return event instanceof SubmitEvent;
    }
  }

  return (input, defaultOutput = {}) => {
    if (!input || typeof input !== 'object') return defaultOutput;
  
    // If input is an event instead of a form.
    input instanceof HTMLFormElement || (isSubmitEvent(input) && (input = input.target));
  
    // If we can't capture the form element.
    if (!(input instanceof HTMLFormElement)) return defaultOutput;
  
    // Format data, ignoring empty values.
    const output = {};
    input = new FormData(input);
    for (const pair of input) {
      const [key, value] = pair;
      (typeof value === 'number' || typeof value === 'boolean' || value) && (
        output[toCamelCase(key)] = value
      );
    }
  
    // Return output.
    return output;
  }
})();