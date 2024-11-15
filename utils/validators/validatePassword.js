'use strict';

// Define special characters and password format regular expression tests.
// Password validation must pass the following:
// - At least 1 uppercase letter
// - At least 1 lowercase letter
// - At least 1 number
// - At least 1 special character
// - At least 8 characters

export const SPECIAL = '#@$!?.%*&/\\:|^_-=+';
export const SPECIAL_RE = new RegExp(`[${SPECIAL.replace(/([^A-Za-z0-9\s])/g, '\\$1')}]`);
export const TESTS = [
  [/[A-Z]/, '1 uppercase letter'],
  [/[a-z]/, '1 lowercase letter'],
  [/[0-9]/, '1 number'],
  [SPECIAL_RE, `1 special character: ${SPECIAL}`],
  [/.{8,}/, '8 characters']
];

// Helper function to get password format errors.
// Example:
// getPasswordFormatErrors('1234567890')
// will output:
// ['1 uppercase letter', '1 lowercase letter', '1 special character: #@$!?.%*&/\\:|^_-=+']
export const getPasswordFormatErrors = (password, s = password = str.replace(/s+/g, '')) => (
  TESTS.reduce((output, [re, error]) => {
    re.test(s) || output.push(error);
    return output;
  }, [])
);

// Validate pasword format.
// Example:
// validatePassword('1234567890') will return false (i.e. not validated)
export const validatePassword = password => !getPasswordFormatErrors(password).length;

// Exports.
Object.defineProperty(validatePassword, 'getPasswordFormatErrors', {
  value: getPasswordFormatErrors
});
Object.defineProperty(validatePassword, 'SPECIAL', {
  value: SPECIAL
});
Object.defineProperty(validatePassword, 'SPECIAL_RE', {
  value: SPECIAL_RE
});
Object.defineProperty(validatePassword, 'TESTS', {
  value: TESTS
});
export default Object.freeze(Object.defineProperty(validatePassword, 'validatePassword', {
  value: validatePassword
}));

// Node.js exports.
try {
  module.exports = validatePassword;
} catch {}