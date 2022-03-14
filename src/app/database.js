const mysql = require("mysql2/promise");

const connections = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "coderhhan",
  password: "6593523",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connections;
