'use strict';

export const DEFAULT_MS = 0;

// Helper function for sync sleep.
export const sleep = (milliseconds = DEFAULT_MS) => {
  const t = Date.now();
  while (Date.now() - t < milliseconds);
  return true;
}

// Helper function for async sleep.
export const asyncSleep = async (milliseconds = DEFAULT_MS) => (
  new Promise(resolve => setTimeout(resolve, milliseconds))
);

// Exports.
Object.defineProperty(sleep, 'asyncSleep', {
  value: asyncSleep
});
Object.defineProperty(sleep, 'DEFAULT_MS', {
  value: DEFAULT_MS
});
export default Object.freeze(Object.defineProperty(sleep, 'sleep', {
  value: sleep
}));

// Node.js exports.
try {
  module.exports = sleep;
} catch {}