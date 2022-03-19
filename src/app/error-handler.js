const errorType = require("../constans/error-type");

const errorHandler = (error, ctx, data) => {
  let status, message;

  switch (error.message) {
    case errorType.EMAIL_IS_REQUIRED: {
      status = 400;
      message = "请输入邮箱";
      break;
    }
    case errorType.EMAIL_ALREADY_EXIST: {
      status = 500;
      message = "邮箱已被注册";
      break;
    }
    case errorType.VERIFY_CODE_IS_REQUIRED: {
      status = 400;
      message = "请输入验证码";
      break;
    }
    case errorType.VERIFY_CODE_IS_INCORRECT: {
      status = 500;
      message = "验证码错误，注册失败";
      break;
    }
    case errorType.USER_ACCOUNT_ALREADY_EXIST: {
      status = 500;
      message = "账号已被注册";
      break;
    }
    case errorType.USER_ACCOUNT_IS_REQUIRED: {
      status = 400;
      message = "请输入账号";
      break;
    }
    case errorType.USER_ACCOUNT_NOT_EXIST: {
      status = 500;
      message = "账号不存在，请先注册";
      break;
    }
    case errorType.PASSWROD_IS_REQUIRED: {
      status = 400;
      message = "请输入密码";
      break;
    }
    case errorType.PASSWROD_IS_INCORRECT: {
      status = 500;
      message = "账号或密码错误，请重新输入";
      break;
    }
    default: {
      status = 500;
      message = error;
    }
  }

  ctx.status = status;
  ctx.body = {
    code: status,
    message,
    data,
  };
};

module.exports = errorHandler;
