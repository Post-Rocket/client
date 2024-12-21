const { S3Client } = require("@aws-sdk/client-s3");
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
const client = new S3Client({
  credentials: {
      accessKeyId,
      secretAccessKey
  },
  region,
  httpOptions: {
    timeout: 10000 // Timeout in milliseconds (e.g., 10 seconds)
  }
});

const Globals = {
  client,
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