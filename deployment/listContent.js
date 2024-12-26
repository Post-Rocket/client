const { ListObjectsCommand } = require("@aws-sdk/client-s3"); // ES Modules import
const { send, Bucket } = require("./send");

const listContent = send.create(new ListObjectsCommand({ Bucket }), {Contents: []});

// Export.
module.exports = Object.freeze(Object.defineProperty(listContent, "listContent", {
  value: listContent
}));