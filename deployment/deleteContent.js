const { DeleteObjectsCommand } = require("@aws-sdk/client-s3"); // ES Modules import
const { client, Bucket } = require("./globals");

const deleteContent = async (...content) => new Promise(async (resolve, reject) => {
  try {
    const res = await client.send(new DeleteObjectsCommand({
      Bucket,
      Objects: content.flat(Infinity).map(f => f && (
        typeof f === "object" && f.Key && {...f, Key: f.Key.replace(/^\.\//, "")} || {
          Key: `${f}`.Key.replace(/^\.\//, "")
        })
      ).filter(f => f)
    })) || [];
    resolve && resolve(res);
  } catch (error) {
    if (reject) reject(error);
    else throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(deleteContent, "deleteContent", {
  value: deleteContent
}));