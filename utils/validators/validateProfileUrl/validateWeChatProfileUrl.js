'use strict';

// Helper function to validate a WeChat profile url.
export const RE = /^(https:\/\/|)(www.|)(u.|)wechat.com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateWeChatProfileUrl = url => RE.test(url) && 'wechat';

// Exports.
Object.defineProperty(validateWeChatProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateWeChatProfileUrl, 'validateWeChatProfileUrl', {
  value: validateWeChatProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateWeChatProfileUrl;
} catch {}