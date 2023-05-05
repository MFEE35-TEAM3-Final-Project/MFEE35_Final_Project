const mysql = require('mysql2');
require('dotenv').config({ path: '../.env.local' });
const connection = mysql.createConnection({
  host: process.env.LOCAL_HOSTNAME,
  port: process.env.LOCAL_PORT,
  user: process.env.LOCAL_USERNAME,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
    return;
  }
  console.log('Connected to database.');
});

module.exports = {
  connection: connection
};