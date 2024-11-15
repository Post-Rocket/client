'use strict';

// Helper function to validate a Messenger profile url.
export const RE = /^(https:\/\/|)(www.|)m.me\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateMessengerProfileUrl = url => RE.test(url) && 'messenger';

// Exports.
Object.defineProperty(validateMessengerProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateMessengerProfileUrl, 'validateMessengerProfileUrl', {
  value: validateMessengerProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateMessengerProfileUrl;
} catch {}