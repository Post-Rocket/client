const clear = require("./clear");
const upload = require("./upload");
const promisify = require("./promisify");
const createFolder = require("./createFolder");

// Helper function to deploy the client.
const deploy = promisify(async (input) => {
  try {
    await clear();
    await createFolder("logs/");
    await upload(input);
  } catch (error) {
    throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(deploy, "deploy", {
  value: deploy
}));