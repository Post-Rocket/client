const deleteContent = require("./deleteContent");
const listContent = require("./listContent");

const clear = async () => new Promise(async (resolve, reject) => {
  try {
    const toDelete = await listContent(),
      res = await deleteContent(toDelete.Contents);
    resolve && resolve(res);
  } catch (error) {
    if (reject) reject(error);
    else throw Error(error);
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(clear, "clear", {
  value: clear
}));