'use strict';

// Helper function to validate a Pinterest profile url.
export const RE = /^(https:\/\/|)(www.|)(pinterest.com|pin.it)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validatePinterestProfileUrl = url => RE.test(url) && 'pinterest';

// Exports.
Object.defineProperty(validatePinterestProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validatePinterestProfileUrl, 'validatePinterestProfileUrl', {
  value: validatePinterestProfileUrl
}));

// Node.js exports.
try {
  module.exports = validatePinterestProfileUrl;
} catch {}