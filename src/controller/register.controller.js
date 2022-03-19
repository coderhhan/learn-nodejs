const { queryCodeByEmail } = require("../service/user.service");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");

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
      return (ctx.body = {
        code: 500,
        message: "账号已存在，请更换账号",
      });
    }
    if (emailData.length > 0) {
      return (ctx.body = {
        code: 500,
        message: "该邮箱已经被注册，请更换邮箱",
      });
    }

    if (userAccount === "" || userAccount == undefined) {
      return (ctx.body = {
        code: 500,
        message: "请输入账号",
      });
    }
    if (password === "" || password == undefined) {
      return (ctx.body = {
        code: 500,
        message: "请输入密码",
      });
    }
    //判断发送的验证码是否是注册的验证码
    const queryCode = await queryCodeByEmail(email);
    if (queryCode !== verifyCode) {
      return (ctx.body = {
        code: 500,
        message: "验证码错误，注册失败",
      });
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
