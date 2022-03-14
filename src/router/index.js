const path = require("path");
const fs = require("fs");

const aa = function (app) {
  console.log();
  const fileNames = fs.readdirSync(path.resolve(__dirname));
  fileNames.forEach((fileName) => {
    if (fileName !== "index.js") {
      console.log(fileName);
      const route = require(path.resolve(__dirname, fileName));
      app.use(route.routes());
      app.use(route.allowedMethods());
    }
  });
};

module.exports = aa;
