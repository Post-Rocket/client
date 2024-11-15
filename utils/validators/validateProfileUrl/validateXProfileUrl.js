'use strict';

// Helper function to validate a X profile url.
export const RE = /^(https:\/\/|)(www.|)(twitter|x).com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateXProfileUrl = url => RE.test(url) && 'x';

// Exports.
Object.defineProperty(validateXProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateXProfileUrl, 'validateXProfileUrl', {
  value: validateXProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateXProfileUrl;
} catch {}