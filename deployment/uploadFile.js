const fs = require("fs");
const { client, Bucket } = require("./globals");
const { Upload } = require("@aws-sdk/lib-storage");

const uploadFile = async fileName => new Promise(
  async function (resolve, reject) {
    try {
      const params = {
        Bucket,
        Key: fileName.replace(/$\.\//, ""),
        Body: fs.createReadStream(fileName)
      };

      // Upload data to s3.
      const res = await new Upload({
        client,
        params,
        tags: [], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      }).done();
      resolve && resolve(res);

    } catch (error) {
      if (reject) reject(error);
      else throw Error(error);
    }
  }
);

// Export.
module.exports = Object.freeze(Object.defineProperty(uploadFile, "uploadFile", {
  value: uploadFile
}));