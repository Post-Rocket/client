const { HeadBucketCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { client, Bucket } = require("./globals");

// Helper function to test a connection.
const testConnection = async () => client.send(new HeadBucketCommand({
  Bucket
}));
// const testConnection = async () => client.send(new PutObjectCommand({
//   Key: "test.txt",
//   Body: "Hello world!",
//   Bucket
// }));

// Export.
module.exports = Object.freeze(Object.defineProperty(testConnection, "testConnection", {
  value: testConnection
}));