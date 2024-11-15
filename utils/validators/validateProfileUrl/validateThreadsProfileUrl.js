'use strict';

// Helper function to validate a Threads profile url.
export const RE = /^(https:\/\/|)(www.|)threads.(net|com)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateThreadsProfileUrl = url => RE.test(url) && 'threads';

// Exports.
Object.defineProperty(validateThreadsProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateThreadsProfileUrl, 'validateThreadsProfileUrl', {
  value: validateThreadsProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateThreadsProfileUrl;
} catch {}