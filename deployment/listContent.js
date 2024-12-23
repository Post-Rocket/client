const { ListObjectsCommand } = require("@aws-sdk/client-s3"); // ES Modules import
const { client, Bucket } = require("./globals");

const listContent = async () => new Promise(async (resolve, reject) => {
  try {
    const res = await client.send(new ListObjectsCommand({ Bucket })) || [];
    resolve && resolve(res);
  } catch (error) {
    if (reject) reject(error);
    else throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(listContent, "listContent", {
  value: listContent
}));