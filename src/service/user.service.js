const connections = require("../app/database");

class registerService {
  async query(user) {
    const { phone, account } = user;
    const statement = `SELECT * FROM coderhhan.user where name = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async queryByAccount(account) {
    console.log(account);
    const statement = `SELECT * FROM coderhhan.user where name = ?`;
    const result = await connections.execute(statement, [account]);
    return result[0];
  }
  async queryByPhone(phone) {
    const statement = `SELECT * FROM coderhhan.user where phone = ?`;
    const result = await connections.execute(statement, [phone]);
    return result[0];
  }
  async insertUser(name, password) {
    const statement = `INSERT INTO coderhhan.user (name,password) VALUES (?,?)`;
    const result = await connections.execute(statement, [name, password]);
    return result;
  }
}

module.exports = new registerService();
