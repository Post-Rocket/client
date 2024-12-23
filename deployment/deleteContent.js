const { DeleteObjectsCommand } = require("@aws-sdk/client-s3"); // ES Modules import
const { client, Bucket } = require("./globals");

const deleteContent = async (...content) => new Promise(async (resolve, reject) => {
  try {
    const Contents = content.flat(Infinity).map(f => f && (
      typeof f === "object" && f.Key && f || {
        Key: `${f}`
      })
    ).filter(f => f),
    params = {
      Bucket,
      Delete: {
        Objects: Contents.map(({
          Key, // "STRING_VALUE", // required
          VersionId, // "STRING_VALUE",
          ETag, // "STRING_VALUE",
          LastModifiedTime, // new Date("TIMESTAMP"),
          Size // Number("long")
        }) => ({
          Key,
          // VersionId,
          // ETag,
          // LastModifiedTime,
          // Size
        }))
      }
    };
    const res = await client.send(new DeleteObjectsCommand(params));
    resolve && resolve({ Contents, ...res });
  } catch (error) {
    if (reject) reject(error);
    else throw Error(error);
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(deleteContent, "deleteContent", {
  value: deleteContent
}));