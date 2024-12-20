const { website: credentials } = require("../secrets/dev.json");
const {
  accessKeyId,
  secretAccessKey,
  region,
  bucketName,
  bucket = bucketName,
  Bucket = bucket
} = credentials;

// Create s3 client.
const S3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region
});

const Globals = {
  S3: "server",
  Bucket,
  INPUT: [
    "./assets",
    "./dist",
    "./pages",
    "./ads.txt",
    "./CNAME",
    "./index.html",
    "./robots.txt",
    "./sitemap.xml",
  ]
}

// Export.
module.exports = Object.freeze(Object.defineProperty(Globals, "Globals", {
  value: Globals
}));