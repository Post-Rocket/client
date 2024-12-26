const { HeadBucketCommand } = require("@aws-sdk/client-s3");
const { send, Bucket } = require("./send");

// Helper function to test a connection.
const testConnection = send.create(new HeadBucketCommand({ Bucket }));

// Export.
module.exports = Object.freeze(Object.defineProperty(testConnection, "testConnection", {
  value: testConnection
}));