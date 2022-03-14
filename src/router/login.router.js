const KoaRouter = require("koa-router");
const Mailer = require("../utils/mailer");
const loginRouter = new KoaRouter();
loginRouter.post("/sendCode", async (ctx) => {
  const { email } = ctx.request.body;
  console.log(email);
  try {
    const res = await Mailer(email, 1234);
    if (res.response === "250 OK: queued as.") {
      return (ctx.body = {
        code: 200,
        message: "操作成功",
      });
    } else {
      //发送失败执行的操作
      console.log("发送失败了，错误为：" + res.rejected); //也是个数组
      return (ctx.body = {
        code: 500,
        message: res.rejected,
      });
    }
  } catch (err) {
    return (ctx.body = {
      code: 500,
      message: err,
    });
  }
});

module.exports = loginRouter;
