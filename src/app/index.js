const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const reigsterRouter = require("../router/register.router");
const useRoutes = require("../router/index");
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
// app.use(reigsterRouter.routes());
// app.use(reigsterRouter.allowedMethods());

module.exports = app;
