const deleteContent = require("./deleteContent");
const listContent = require("./listContent");

const clear = async () => new Promise(async (resolve, reject) => {
  try {
    const toDelete = await listContent(),
      data = await deleteContent(toClear);
    resolve && resolve({
      toDelete,
      data
    });
  } catch (error) {
    if (reject) reject(error);
    else throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(clear, "clear", {
  value: clear
}));