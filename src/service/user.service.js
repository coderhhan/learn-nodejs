const connections = require("../app/database");

class registerService {
  async query(user) {
    const { phone, account } = user;
    const statement = `SELECT * FROM coderhhan.user where userAccount = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async queryByAccount(account) {
    console.log(account);
    const statement = `SELECT * FROM coderhhan.user where userAccount = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async queryByEmai(email) {
    const statement = `SELECT * FROM coderhhan.user where email = ?`;
    const result = await connections.execute(statement, [email]);
    return result[0];
  }
  async queryByPhone(phone) {
    const statement = `SELECT * FROM coderhhan.user where phone = ?`;
    const result = await connections.execute(statement, [phone]);
    return result[0];
  }
  async insertUser(userAccount, password, email) {
    const statement = `INSERT INTO coderhhan.user (userAccount,password,email) VALUES (?,?,?)`;
    const result = await connections.execute(statement, [
      userAccount,
      password,
      email,
    ]);
    return result;
  }
  async insertVerifyCode(email, code) {
    const statement = `INSERT INTO coderhhan.verifycode (code,email) values (?,?)`;
    const result = await connections.execute(statement, [code, email]);
    return result;
  }
  async updateVerifyCode(email, code) {
    const statement = `update coderhhan.verifycode set code = ? where email = ?`;
    const result = await connections.execute(statement, [code, email]);
    return result;
  }

  async queryCodeByEmail(email) {
    const statement = `SELECT * FROM coderhhan.verifycode where email = ?`;
    const result = await connections.execute(statement, [email]);
    return result;
  }
}

module.exports = new registerService();
