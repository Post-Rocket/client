'use strict';

// Helper function to validate a Discord profile url.
export const RE = /^(https:\/\/|)(www.|)discord(app|).com(\/users|)\/[a-z0-9\-\_\@\+\%]+(\?[a-z0-9\-\_\@\&\=\#\^\~\+\%\!]+$|$)/i;
export const validateDiscordProfileUrl = url => RE.test(url) && 'discord';

// Exports.
Object.defineProperty(validateDiscordProfileUrl, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateDiscordProfileUrl, 'validateDiscordProfileUrl', {
  value: validateDiscordProfileUrl
}));

// Node.js exports.
try {
  module.exports = validateDiscordProfileUrl;
} catch {}