const KoaRouter = require("koa-router");
const { sendCode, loginUser } = require("../controller/login.controller");
const { verifyUser } = require("../middlerware/login.middlerware");

const loginRouter = new KoaRouter();
//注册发送验证码
loginRouter.post("/login/SendCode", sendCode);

loginRouter.post("/login/user", verifyUser, loginUser);
module.exports = loginRouter;
