const deploy = require("../deploy");
const { INPUT } = require("../globals");

// Deploy.
deploy(INPUT)
.then(() => {
  console.log("✅ Deployment done")
})
.catch(error => console.error("⛔️ ", error));