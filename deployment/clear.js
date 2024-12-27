const deleteContent = require("./deleteContent");
const listContent = require("./listContent");
const promisify = require("./promisify");

const clear = promisify(async () => {
  try {
    const toDelete = await listContent();
    toDelete.Contents = (toDelete.Contents || []).filter(x => x && (
      typeof x === "object" && (x = x.Key || ""),
      !(/(\/|^)logs(\/|$)/i).test(x)
    ));
    return toDelete.Contents.length && await deleteContent(toDelete.Contents);
  } catch (error) {
    throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(clear, "clear", {
  value: clear
}));