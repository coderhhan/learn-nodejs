const { queryCodeByEmail } = require("../service/user.service");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");

const errorType = require("../constans/error-type");
class RegisterController {
  async register(ctx, next) {
    const { userAccount, email, password, verifyCode } = ctx.request.body;
    console.log(ctx.request);
    let accountData = [];
    let emailData = [];
    if (userAccount !== "" && userAccount != undefined) {
      accountData = await userService.queryByAccount(userAccount);
    }
    if (email !== "" && email != undefined) {
      emailData = await userService.queryByEmail(email);
    }
    if (accountData.length > 0) {
      const error = new Error(errorType.USER_ACCOUNT_ALREADY_EXIST);
      return ctx.app.emit("error", error, ctx);
    }
    if (emailData.length > 0) {
      const error = new Error(errorType.EMAIL_ALREADY_EXIST);
      return ctx.app.emit("error", error, ctx);
    }
    if (userAccount === "" || userAccount == undefined) {
      const error = new Error(errorType.USER_ACCOUNT_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }
    if (password === "" || password == undefined) {
      const error = new Error(errorType.PASSWROD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }
    //判断发送的验证码是否是注册的验证码
    const queryCode = await queryCodeByEmail(email);
    if (queryCode !== verifyCode) {
      const error = new Error(errorType.VERIFY_CODE_IS_INCORRECT);
      return ctx.app.emit("error", error, ctx);
    }
    //插入数据到数据库中
    const formatePassword = md5password(password);
    const result = await userService.insertUser(userAccount, formatePassword);
    console.log(result);
    console.log(ctx.request.body);
    ctx.body = {
      code: 200,
      message: "注册成功",
    };
  }
}

module.exports = new RegisterController();
