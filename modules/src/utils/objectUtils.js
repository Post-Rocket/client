'use strict';

// Helper function to assess if object is empty.
const isEmpty = o => {
  for (let k in o) return false;
  return true;
}
Object.isEmpty || Object.defineProperty(Object, 'isEmpty', {
  value: o => !o || isEmpty(o)
});

// Helper function to parse a json string.
Object.from || Object.defineProperty(Object, 'from', {
  value: (input, reject) => {
    if (typeof input === 'object') return input;
    try {
      return JSON.parse(input);
    } catch(e) {
      reject && reject(e);
      return input;
    }
  }
});

// Helper function to make an object deep copy.
Object.deepCopy || Object.defineProperty(Object, 'deepCopy', {
  value: (obj, options, output) => {
    // Invalid input.
    if (!obj || typeof obj !== 'object') return obj;

    // If input object is an array, deep copy all the items.
    if (Array.isArray(obj)) {
      !Array.isArray(output) && (output = new Array(obj.length));
      let i = 0, l = output.length;
      for (; i !== l; ++i) output[i] = Object.deepCopy(obj[i], options);
      for (l = obj.length; i !== l; ++i) output.push(Object.deepCopy(obj[i], options));
      output.length = obj.length;
      return output;
    }

    // Normalize input options.
    options || (options = {});

    // Init output and copy proptype keys if needed.
    output || (output = {});
    options.copyProptype && !(output instanceof obj.constructor) && (output = new obj.constructor);
    
    // Copy attributes.
    if (options.copyNonEnumerables) {
      // Copy enumerables and non-enumerables.
      const keys = Object.getOwnPropertyNames(obj);
      for (let i = 0, l = keys.length; i !== l; ++i) {
        const key = keys[i];
        output[key] = Object.deepCopy(obj[key]);
      }
    } else {
      // Copy just enumerables.
      for (let key in obj) {
        output[key] = Object.deepCopy(obj[key]);
      }
    }

    return output;
  }
});