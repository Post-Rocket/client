'use strict';

// Utility function to get a url string.
export const getUrlString = url => {
  typeof url === 'string' || (url && (url = `${url}`)) || (url = '');
  return url.toLowerCase().replace(/\s+/g, '');
}

// Exports.
export default Object.freeze(Object.defineProperty(getUrlString, 'getUrlString', {
  value: getUrlString
}));

// Node.js exports.
try {
  module.exports = getUrlString;
} catch {}