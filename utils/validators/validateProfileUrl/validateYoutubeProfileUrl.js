'use strict';

// Helper function to validate a Youtube profile url.
export const RE = /^(https:\/\/|)(www.|)youtube.com\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateYoutubeProfileUrl = url => RE.test(url) && 'youtube';

// Exports.
Object.defineProperty(validateYoutubeProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateYoutubeProfileUrl, 'validateYoutubeProfileUrl', {
  value: validateYoutubeProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateYoutubeProfileUrl;
} catch {}