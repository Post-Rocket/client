const clear = require("./clear");
const upload = require("./upload");
const promisify = require("./promisify");
const { createFolder } = require("./folderUtils");

// Helper function to deploy the client.
const deploy = promisify(async (input) => {
  try {
    await clear();
    try {
      await createFolder("logs/", true, false);
    } catch (error) {
      if (!/exist/i.test(`${error}`)) throw error;
    };
    await upload(input);
  } catch (error) {
    throw error;
  }
});

// Export.
module.exports = Object.freeze(Object.defineProperty(deploy, "deploy", {
  value: deploy
}));