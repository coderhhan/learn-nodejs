const Mailer = require("../utils/mailer");
const createCode = require("../utils/verify-code");
const { queryByAccount } = require("../service/user.service");
const {
  insertVerifyCode,
  updateVerifyCode,
  queryCodeByEmail,
} = require("../service/user.service");
const md5password = require("../utils/password-handle");
class LoginController {
  async sendCode(ctx, next) {
    const { email } = ctx.request.body;
    if (!email) {
      return (ctx.body = {
        code: 500,
        message: "请输入邮箱",
      });
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
  }
  async loginUser(ctx, next) {
    const { userAccount, password } = ctx.request.body;
    console.log(userAccount);
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
    const userData = await queryByAccount(userAccount);
    if (userData.length === 0) {
      return (ctx.body = {
        code: 500,
        message: "该账号不存在，请先注册",
      });
    }
    const loginPassword = md5password(password);

    if (loginPassword === userData[0].password) {
      return (ctx.body = {
        code: 200,
        message: "登陆成功",
      });
    } else {
      return (ctx.body = {
        code: 500,
        message: "账户或密码错误，登录失败",
      });
    }
  }
}

module.exports = new LoginController();
