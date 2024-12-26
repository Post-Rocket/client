const { DeleteObjectsCommand } = require("@aws-sdk/client-s3"); // ES Modules import
const { send, Bucket } = require("./send");

const deleteContent = async (...content) => {
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
  return send(new DeleteObjectsCommand(params));
};

// Export.
module.exports = Object.freeze(Object.defineProperty(deleteContent, "deleteContent", {
  value: deleteContent
}));