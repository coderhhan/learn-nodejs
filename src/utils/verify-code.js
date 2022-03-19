const createCode = function (length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += parseInt(Math.random() * 10);
  }
  return code;
};

module.exports = createCode;
