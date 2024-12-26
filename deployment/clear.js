const deleteContent = require("./deleteContent");
const listContent = require("./listContent");
const promisify = require("./promisify");

const clear = promisify(async () => {
  try {
    const toDelete = await listContent();
    return await deleteContent(toDelete.Contents);
  } catch (error) {
    throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(clear, "clear", {
  value: clear
}));