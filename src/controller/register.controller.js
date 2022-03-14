const userService = require("../service/user.service");

class RegisterController {
  async register(ctx, next) {
    const { name, phone, password, verifyCode } = ctx.request.body;
    console.log(ctx.request);
    let accountData = [];
    let phoneData = [];
    if (name !== "" && name != undefined) {
      accountData = await userService.queryByAccount(name);
    }
    if (phone !== "" && phone != undefined) {
      phoneData = await userService.queryByPhone(phone);
    }
    if (accountData.length > 0) {
      return (ctx.body = {
        code: 500,
        message: "账号已存在，请更换账号",
      });
    }
    if (phoneData.length > 0) {
      return (ctx.body = {
        code: 500,
        message: "该手机号已经被注册，请更换手机号",
      });
    }

    if (name === "" || name == undefined) {
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
    //插入数据到数据库中
    const result = await userService.insertUser(name, password);
    console.log(result);
    console.log(ctx.request.body);
    ctx.body = {
      code: 200,
      message: "注册成功",
    };
  }
}

module.exports = new RegisterController();
