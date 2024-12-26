const {
  PutObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3"); // ES Modules import
const { send, Bucket } = require("./send");

const createFolder = Key => send(new PutObjectCommand({ Bucket, Key }));
const existsFolder = createFolder.existsFolder = Key => send(new HeadObjectCommand({ Bucket, Key }));

createFolder.createFolderIfNotExist = async Key => (
  await existsFolder(Key) && createFolder(Key) || Promise.reject(Error(`${Key} already exists`))
);

// Export.
module.exports = Object.freeze(Object.defineProperty(createFolder, "createFolder", {
  value: createFolder
}));