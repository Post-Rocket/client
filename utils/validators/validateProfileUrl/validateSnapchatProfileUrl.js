'use strict';

// Helper function to validate a snapchat profile url.
export const RE = /^(https:\/\/|)(www.|)snapchat.com(\/add|)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateSnapchatProfileUrl = url => RE.test(url) && 'snapchat';

// Exports.
Object.defineProperty(validateSnapchatProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateSnapchatProfileUrl, 'validateSnapchatProfileUrl', {
  value: validateSnapchatProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateSnapchatProfileUrl;
} catch {}