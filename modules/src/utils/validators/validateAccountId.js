'use strict';

// Helper function to validate an account id string.
// Example:
// validateAccounId('1234567890') will return false (i.e. not validated)
export const RE = /[A-Fa-f0-9]{24}/;
export const validateAccounId = accountId => (
  accountId && typeof accountId === 'string' && RE.test(accountId.replace(/s+/g, ''))
);

// Exports.
Object.defineProperty(validateAccounId, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validateAccounId, 'validateAccounId', {
  value: validateAccounId
}));

// Node.js exports.
try {
  module.exports = validateAccounId;
} catch {}