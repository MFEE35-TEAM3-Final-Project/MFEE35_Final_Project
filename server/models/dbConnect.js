const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
