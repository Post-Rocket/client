const clear = require("../clear");
const upload = require("../upload");
const { INPUT } = require("../globals");

// Deploy.
(async () => {
  await clear();
  await upload(INPUT);
})();