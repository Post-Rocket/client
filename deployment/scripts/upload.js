const upload = require("../upload");
const { INPUT } = require("../globals");

upload(INPUT)
  .then(res => res.map(data => console.log("✅ ", data.Location)))
  .catch(error => {
    console.error("⛔️ ", error);
  });