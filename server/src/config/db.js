const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const useSSL = process.env.DB_SSL !== "false";
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: useSSL
    ? {
        rejectUnauthorized,
      }
    : undefined,
});

module.exports = pool;
