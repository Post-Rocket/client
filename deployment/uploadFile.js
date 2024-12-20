const fs = require("fs");
const { S3, Bucket } = require("./globals");

const uploadFile = async fileName => new Promise(
  async function (resolve, reject) {
    try {
      const params = {
        Bucket,
        Key: fileName,
        Body: await fs.readFile(fileName)
      };

      S3.upload(params, (error, data) => {
        if (err) {
          if (reject) reject(error)
          else throw Error(error);
        } else {
          if (resolve) resolve(data)
          else console.log(`File uploaded successfully. ${data.Location}`);
        }
      });
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