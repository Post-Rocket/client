'use strict';

// Helper function to validate a Facebook profile url.
export const RE = /^(https:\/\/|)(www.|)facebook.com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateFacebookProfileUrl = url => RE.test(url) && 'facebook';

// Exports.
Object.defineProperty(validateFacebookProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateFacebookProfileUrl, 'validateFacebookProfileUrl', {
  value: validateFacebookProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateFacebookProfileUrl;
} catch {}