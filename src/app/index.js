const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router/index");
const errorHandler = require("./error-handler");
const successHandler = require("./success-handler");
const app = new Koa();

app.use(async (ctx, next) => {
  console.log("22");
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "*");
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //跨域允许的请求方式
  await next();
});

app.use(bodyParser());
useRoutes(app);
app.on("error", errorHandler);
app.on("success", successHandler);

module.exports = app;
