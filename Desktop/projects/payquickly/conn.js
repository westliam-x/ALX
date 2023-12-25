const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "payquickly",
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
});

const connectToDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
};

module.exports = { connection, connectToDatabase };

