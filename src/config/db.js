const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//здесь ничего такого не происходит, просто создаем подключение
connection.connect((error) => {
  if (error) {
    return console.error(`Ошибка ${error.message}`)
  }
  else{
      console.log("Соединение c базой данных успешно установлено");
      // console.log(connection);
  }
});

const promiceConnection = connection.promise();

module.exports = promiceConnection;