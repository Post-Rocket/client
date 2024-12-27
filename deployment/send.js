const promisify = require("./promisify");
const { client, Bucket } = require("./globals");

const create = (defaultCommand, defaultOuput) => (
  promisify(async (command = defaultCommand, output = defaultOuput) => {
    try {
      return await client.send(command) || output;
    } catch (error) {
      throw error;
    }
  })
);

const send = create();
send.create = create;
send.Bucket = Bucket;

// Export.
module.exports = Object.freeze(Object.defineProperty(send, "send", {
  value: send
}));