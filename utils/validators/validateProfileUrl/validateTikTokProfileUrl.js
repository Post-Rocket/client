'use strict';

// Helper function to validate a TikTok profile url.
export const RE = /^(https:\/\/|)(www.|)tiktok.com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateTikTokProfileUrl = url => RE.test(url) && 'tiktok';

// Exports.
Object.defineProperty(validateTikTokProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateTikTokProfileUrl, 'validateTikTokProfileUrl', {
  value: validateTikTokProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateTikTokProfileUrl;
} catch {}