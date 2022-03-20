const KoaRouter = require("koa-router");
const { sendCode, loginUser } = require("../controller/login.controller");
const { verifyUser, verifyAuth } = require("../middlerware/login.middlerware");

const loginRouter = new KoaRouter();
//注册发送验证码
loginRouter.post("/login/SendCode", sendCode);

loginRouter.post("/login/user", verifyUser, loginUser);

loginRouter.get("/test", verifyAuth);
module.exports = loginRouter;
