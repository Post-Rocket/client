const uploadFile = require("./uploadFile");
const getFilenames = require("./getFilenames");

// Helper function to upload filenames.
const upload = async input => new Promise(
  async function (resolve, reject) {
    // Normalize input.
    Array.isArray(input) || (input = [input]);
    input = input.flat(Infinity).filter(x => x).map(x => `${x}`);

    try {
      // Get filenames.
      let filenames = [];
      for (let i = 0, l = input.length; i !== l; ++i) {
        filenames = filenames.concat(getFilenames(input[i]));
      }

      // Load.
      for (let i = 0, l = filenames.length; i !== l; ++i) {
        await uploadFile(filenames[i]);
      }
    } catch (error) {
      reject && reject(error);
    }

    // Success.
    resolve && resolve();
  }
);

// Export.
module.exports = Object.freeze(Object.defineProperty(upload, "upload", {
  value: upload
}));