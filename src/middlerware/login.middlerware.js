const jwt = require("jsonwebtoken");

const md5password = require("../utils/password-handle");
const userService = require("../service/user.service");
const errorType = require("../constans/error-type");
const { PUBLICK_KEY } = require("../app/config");
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
  ctx.userData = userData[0];
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("鉴权验证通过~");
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  try {
    const userData = jwt.verify(token, PUBLICK_KEY, {
      algorithms: ["RS256"],
    });
    ctx.userData = userData;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx, err.message);
  }
};

module.exports = {
  verifyUser,
  verifyAuth,
};
