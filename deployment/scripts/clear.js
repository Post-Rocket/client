const clear = require("../clear");

clear()
  .then(res => res.map(({toDelete, data}) => (
    console.log(`✅ ${data}\n\nContent:\n------\n${toDelete.join("\n")}`)))
  )
  .catch(error => console.error(error));