'use strict';

// Helper function to validate a LinkedIn profile url.
export const RE = /^(https:\/\/|)(www.|)linkedin.com(\/in|)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateLinkedInProfileUrl = url => RE.test(url) && 'linkedin';

// Exports.
Object.defineProperty(validateLinkedInProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateLinkedInProfileUrl, 'validateLinkedInProfileUrl', {
  value: validateLinkedInProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateLinkedInProfileUrl;
} catch {}