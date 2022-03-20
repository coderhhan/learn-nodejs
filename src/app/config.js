const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

console.log(path.resolve(__dirname));
dotenv.config();

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);

const PUBLICK_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/publick.key")
);

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLICK_KEY = PUBLICK_KEY;
