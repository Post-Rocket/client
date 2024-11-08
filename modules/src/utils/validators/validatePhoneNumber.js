'use strict';

// Helper function to validate a US phone number string.
// Example:
// validatePhoneNumber('12345') will return false (i.e. not validated)
export const RE = /^(\+[0-9]{1,4}(\s[\.\-]\s|[\.\-]|\s|)|)(\((\s|)|)([0-9]{10}|[0-9]{5}(\s\)|\)|)(\s[\.\-]\s|[\.\-]|\s)[0-9]{5}|[0-9]{3}(\s\)|\)|)(\s[\.\-]\s|[\.\-]|\s)[0-9]{3}(\s[\.\-]\s|[\.\-]|\s)[0-9]{4}|[0-9]{2}(\s\)|\)|)(\s[\.\-]\s|[\.\-]|\s)[0-9]{2}(\s[\.\-]\s|[\.\-]|\s)[0-9]{2}(\s[\.\-]\s|[\.\-]|\s)[0-9]{2}(\s[\.\-]\s|[\.\-]|\s)[0-9]{2})$/;
export const validatePhoneNumber = (
  phoneNumber,
  str = typeof phoneNumber === 'string' && phoneNumber || (
    typeof phoneNumber === 'number' && phoneNumber.toString()
)) => (
  str && RE.test(str.replace(/s+/g, ''))
);

// Exports.
Object.defineProperty(validatePassword, 'RE', {
  value: RE
});
export default Object.freeze(Object.defineProperty(validatePhoneNumber, 'validatePhoneNumber', {
  value: validatePhoneNumber
}));

// Node.js exports.
try {
  module.exports = validatePhoneNumber;
} catch {}