'use strict';

const CHARS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
  'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', '-', '_',
  '.', ':', '!', '#', '@', '$', '%', '^',
  '~', '|', '&', '*', '+', '=', '?', ',',
  ';', '<', '>', '(', ')', '{', '}', '[',
  ']', '`', "'", '"', '\\'
];

// General function to convert to code.
const toBase = (val, charTable = CHARS, base = charTable.length, output = '') => {
  do {
    output += charTable[val - (val = parseInt(val / base)) * base];
  } while(val);
  return output;
}

// Specialized function to convert to base 16 code for input values < 1e8.
const _toBase16 = (val, charTable = CHARS) => {
  let output = charTable[(val & 15)];
  while (val >>= 4) output += charTable[val & 15];
  return output;
}

// Function to convert to base 32 code.
Number.toBase16 || Object.defineProperty(Number, 'toBase16', {
  value: (val, charTable = CHARS) => (
    (val < 1e8 && _toBase16(val, charTable)) || toBase(val, charTable, 16)
  )
});
Number.prototype.toBase16 || Object.defineProperty(Number.prototype, 'toBase16', {
  value: function(...args) {
    return Number.toBase16(this, ...args);
  }
});

// Specialized function to convert to base 32 code for input values < 1e8.
const _toBase32 = (val, charTable = CHARS) => {
  let output = charTable[(val & 31)];
  while (val >>= 5) output += charTable[val & 31];
  return output;
}

// Function to convert to base 32 code.
Number.toBase32 || Object.defineProperty(Number, 'toBase32', {
  value: (val, charTable = CHARS) => (
    (val < 1e8 && _toBase32(val, charTable)) || toBase(val, charTable, 32)
  )
});
Number.prototype.toBase32 || Object.defineProperty(Number.prototype, 'toBase32', {
  value: function(...args) {
    return Number.toBase32(this, ...args);
  }
});

// Specialized function to convert to base 64 code for input values < 1e8.
const _toBase64 = (val, charTable = CHARS) => {
  let output = charTable[(val & 63)];
  while (val >>= 6) output += charTable[val & 63];
  return output;
}

// Function to convert to base 64 code.
Number.toBase64 || Object.defineProperty(Number, 'toBase64', {
  value: (val, charTable = CHARS) => (
    (val < 1e8 && _toBase64(val, charTable)) || toBase(val, charTable, 64)
  )
});
Number.prototype.toBase64 || Object.defineProperty(Number.prototype, 'toBase64', {
  value: function(...args) {
    return Number.toBase64(this, ...args);
  }
});

// Function to overload the original toString for the base 64 case.
const _toString = Number.prototype.toString;
Object.defineProperty(Number.prototype, 'toString', {
  value: function(base, ...args) {
    return base == 64 && Number.toBase64(this, ...args) || _toString.apply(this, [base, ...args]);
  }
});


Number.toSmartPrecision || Object.defineProperty(Number, 'toSmartPrecision', {
  value: (x, coef = 1, d = 2) => isNaN(x) ? x : parseFloat((x = parseFloat(x) * coef) > 1 && x.toFixed(d) || x.toPrecision(d))
});
Number.prototype.toSmartPrecision || Object.defineProperty(Number.prototype, 'toSmartPrecision', {
  value: function(...args) {
    return Number.toSmartPrecision(this, ...args);
  }
});