var path = require("path"),
  alias = require("./alias"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin");

var options = {
  entry: {
    "content-script": path.join(__dirname, "src", "js", "content-script.js"),
    "service-worker": path.join(__dirname, "src", "js", "service-worker.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "src", "manifest.json"),
        transform: function (content) {
          return Buffer.from(
            JSON.stringify({
              name: process.env.npm_package_name,
              author: process.env.npm_package_author_name,
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            })
          );
        },
      },
    ]),
    new WriteFilePlugin(),
  ],
};

module.exports = options;
