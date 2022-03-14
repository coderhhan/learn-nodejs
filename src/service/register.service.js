const connections = require("../app/database");

class registerService {
  async query(user) {
    const { phone, account } = user;
    const statement = `SELECT * FROM coderhhan.user where name = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async isExistAccount(account) {
    const statement = `SELECT * FROM coderhhan.user where name = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async isExistPhone(phone) {
    const statement = `SELECT * FROM coderhhan.user where phone = ?`;
    const result = await connections.execute(statement, [phone]);
    return result[0];
  }
}

module.exports = new registerService();
