'use strict';

// Helper function to validate a Instagram profile url.
export const RE = /^(https:\/\/|)(www.|)instagram.com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateInstagramProfileUrl = url => RE.test(url) && 'instagram';

// Exports.
Object.defineProperty(validateInstagramProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateInstagramProfileUrl, 'validateInstagramProfileUrl', {
  value: validateInstagramProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateInstagramProfileUrl;
} catch {}