// Don't forget to do npm i to install all the packages
// npx webpack --config webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
  },
  entry: {
    "modules/loaded/accountCreationLoaded": "./modules/loaded/accountCreationLoaded.js",
    "modules/loaded/accountLoginLoaded": "./modules/loaded/accountLoginLoaded.js",
    "modules/loaded/mainLoaded": "./modules/loaded/mainLoaded.js",
    "modules/loaded/pageLoaded": "./modules/loaded/pageLoaded.js",
    "modules/loaded/logout": "./modules/loaded/logout.js",
    "modules/components/CopyrightLine": "./modules/components/CopyrightLine.js",
    "modules/components/YoutubeVideo": "./modules/components/YoutubeVideo.js",
    "css/flexbox": "./css/flexbox.css",
    "css/login-registration": "./css/login-registration.css",
    "css/main": "./css/main.css",
    "css/page": "./css/page.css"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new CssUrlRelativePlugin(/* options */),
    new MiniCssExtractPlugin({filename: "[name].css"})
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            }
          }
        ]
      },
    ],
  }
};