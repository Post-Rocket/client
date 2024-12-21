const testConnection = require("../testConnection");

testConnection()
  .then(data => {
    console.log("Connection successful:", data);
  })
  .catch(error => {
    console.error("Connection failed:", error);
  });