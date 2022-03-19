const KoaRouter = require("koa-router");
const { sendCode, loginUser } = require("../controller/login.controller");
const loginRouter = new KoaRouter();
//注册发送验证码
loginRouter.post("/login/SendCode", sendCode);

loginRouter.post("/login/user", loginUser);
module.exports = loginRouter;
