const path = require("path");

module.exports = {
  entry: {
    "modules/loaded/accountCreationLoaded": "./modules/loaded/accountCreationLoaded.js",
    "modules/loaded/accountLoginLoaded": "./modules/loaded/accountLoginLoaded.js",
    "modules/loaded/mainLoaded": "./modules/loaded/mainLoaded.js",
    "modules/loaded/pageLoaded": "./modules/loaded/pageLoaded.js",
    "modules/components/CopyrightLine": "./modules/components/CopyrightLine.js",
    "modules/components/YoutubeVideo": "./modules/components/YoutubeVideo.js",
    "css/flexbox": "./css/flexbox.css",
    "css/login-registration": "./css/login-registration.css",
    "css/main": "./css/main.css",
    "css/page": "./css/page.css"
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  }
};