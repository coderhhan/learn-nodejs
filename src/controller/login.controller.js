const Mailer = require("../utils/mailer");
const createCode = require("../utils/verify-code");

const {
  insertVerifyCode,
  updateVerifyCode,
  queryCodeByEmail,
} = require("../service/user.service");

const errorType = require("../constans/error-type");

class LoginController {
  async sendCode(ctx, next) {
    const { email } = ctx.request.body;
    if (!email) {
      const error = new Error(errorType.EMAIL_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }
    const code = createCode();
    try {
      const queryCode = await queryCodeByEmail(email);
      if (queryCode[0].length > 0) {
        await updateVerifyCode(email, code);
      } else {
        await insertVerifyCode(email, code);
      }
      const res = await Mailer(email, code);
      if (res.response === "250 OK: queued as.") {
        return (ctx.body = {
          code: 200,
          message: "验证码发送成功",
        });
      } else {
        //发送失败执行的操作
        // console.log("发送失败了，错误为：" + res.rejected); //也是个数组
        return ctx.app.emit("error", res.rejected, ctx);
      }
    } catch (err) {
      return ctx.app.emit("error", err.message, ctx);
    }
  }
  async loginUser(ctx, next) {}
}

module.exports = new LoginController();
