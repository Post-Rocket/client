'use strict';

// Helper function to get the clock.
export const clock = () => performance.now();

// Exports.
export default Object.freeze(Object.defineProperty(clock, 'clock', {
  value: clock
}));

// Node.js exports.
try {
  module.exports = clock;
} catch {}