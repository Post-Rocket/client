'use strict';

// Helper function to validate a Reddit profile url.
export const RE = /^(https:\/\/|)(www.|)reddit.com\/[a-z0-9\-\_\@\+\%\/]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateRedditProfileUrl = url => RE.test(url) && 'reddit';

// Exports.
Object.defineProperty(validateRedditProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateRedditProfileUrl, 'validateRedditProfileUrl', {
  value: validateRedditProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateRedditProfileUrl;
} catch {}