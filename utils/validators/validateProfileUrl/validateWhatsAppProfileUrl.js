'use strict';

// Helper function to validate a WhatsApp profile url.
export const RE = /^(https:\/\/|)(www.|)wa.me(\/qr|)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateWhatsAppProfileUrl = url => RE.test(url) && 'whatsapp';

// Exports.
Object.defineProperty(validateWhatsAppProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateWhatsAppProfileUrl, 'validateWhatsAppProfileUrl', {
  value: validateWhatsAppProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateWhatsAppProfileUrl;
} catch {}