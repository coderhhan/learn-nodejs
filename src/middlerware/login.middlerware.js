const md5password = require("../utils/password-handle");
const userService = require("../service/user.service");
const errorType = require("../constans/error-type");
const verifyUser = async (ctx, next) => {
  const { userAccount, password } = ctx.request.body;
  console.log(userAccount);
  if (userAccount === "" || userAccount == undefined) {
    const error = new Error(errorType.USER_ACCOUNT_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  if (password === "" || password == undefined) {
    const error = new Error(errorType.PASSWROD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  const userData = await userService.queryByAccount(userAccount);
  if (userData.length === 0) {
    const error = new Error(errorType.USER_ACCOUNT_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  }
  const loginPassword = md5password(password);

  if (loginPassword !== userData[0].password) {
    const error = new Error(errorType.PASSWROD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyUser,
};
