const path = require("path");

const alias = {
  "@": path.join(__dirname, "src"),
  "@js": path.join(__dirname, "src", "js"),
};

module.exports = alias;
