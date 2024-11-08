'use strict';

// Utility function to make a function async.
export const asyncify = func => (
  typeof func === 'function'
  && !func.constructor.name.toLowerCase().includes('async')
  && async function(...args) { return func(...args); }
  || func
);

// Exports.
export default Object.freeze(Object.defineProperty(asyncify, 'asyncify', {
  value: asyncify
}));

// Node.js exports.
try {
  module.exports = asyncify;
} catch {}
