// Clamp values in a range.
Math.clamp || Object.defineProperty(Math, 'clamp', {
  value: (val, min, max) => Math.min(Math.max(val, min), max)
});