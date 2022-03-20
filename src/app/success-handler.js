const successHandler = (success, ctx, data) => {
  let status, message;

  switch (success) {
    case 1: {
      break;
    }
    default: {
      status = 200;
      message = success;
    }
  }

  ctx.status = status;
  ctx.body = {
    code: 200,
    message,
    data,
  };
};

module.exports = successHandler;
