const { HeadBucketCommand } = require("@aws-sdk/client-s3");
const { client, Bucket } = require("./globals");

// Helper function to test a connection.
const testConnection = async () => new Promise(async (resolve, reject) => {
  try {
    const res = await client.send(new HeadBucketCommand({
      Bucket
    }));
    resolve && resolve(res);
  } catch (error) {
    if (reject) reject(error);
    else throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(testConnection, "testConnection", {
  value: testConnection
}));