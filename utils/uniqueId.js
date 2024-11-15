'use strict';

// Utility function to create a unique id with minimum collision and minimum length = 8.
export const uniqueId = (length = 16) => {
  let str = Date.now().toString(36);
  length > str.length || (length = str.length);
  while (str.length < length) {
    str += Math.random().toString(36).slice(2);
  }
  return str.slice(0, length);
};

// Exports.
export default Object.freeze(Object.defineProperty(uniqueId, 'uniqueId', {
  value: uniqueId
}));

// Node.js exports.
try {
  module.exports = uniqueId;
} catch {}