const app = require("./app/index");
const config = require("./app/config");
console.log(config.APP_PORT);
app.listen(config.APP_PORT, () => {
  console.log("服务已经启动");
});
