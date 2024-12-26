const {
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3"); // ES Modules import
const promisify = require("./promisify");
const { send, Bucket } = require("./send");

const _createFolder = Key => send(new PutObjectCommand({ Bucket, Key }));
const existsFolder = Key => send(new HeadObjectCommand({ Bucket, Key }));
const _deleteFolder = Key => send(new DeleteObjectCommand({ Bucket, Key }));

const deleteFolder = async (Key, checkIfExists = true) => (
  (!checkIfExists || await existsFolder(Key))
    && _deleteFolder(Key)
    || Promise.reject(Error(`${Key} does not exists`))
);

const createFolder = promisify(async (Key, checkIfExists = true, deleteIfExists = false) => {
  try {
    deleteIfExists && (
      await deleteFolder(Key)
    );
    if (!deleteIfExists && checkIfExists && await existsFolder(Key)) {
      throw Error(`${Key} already exists`);
    }
    return await _createFolder(Key);
  } catch (error) {
    throw error;
  }
});

// Export.
createFolder.existsFolder = existsFolder;
createFolder.deleteFolder = deleteFolder;
module.exports = Object.freeze(Object.defineProperty(createFolder, "createFolder", {
  value: createFolder
}));