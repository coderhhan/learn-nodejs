const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const reigsterRouter = require("../router/register.router");
const useRoutes = require("../router/index");
const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.set("Access-Control-Allow-Origin", "*");
  // ctx.set("Access-Control-Allow-Headers", "*");
  await next();
});

app.use(bodyParser());
useRoutes(app);

module.exports = app;
