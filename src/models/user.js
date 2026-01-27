const mysql = require("mysql2");
const db = require("../config/db"); // пулл соединений
console.log("Before Connection");

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static async myTest() {
    const rows = "SELECT name FROM mytable";
    console.log(rows); // [{ name: 'John' }, { name: 'Maria' }, ...]
    return await db.getall(rows);
  }

  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return await db.execute(sql);
  }
  static async getAll() {
    db.execute("SELECT * FROM users", function (err, data) {
      if (err) return console.log(err);
      console.log(`Data: ${data}`);
      return data;
    });
    // const query = "SELECT * FROM users";
    // const rows = await db.execute(query);
    // return rows;
  }

  static async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0] ? new User(rows[0].name, rows[0].age) : null;
  }

  async save() {
    const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    const [result] = await db.execute(sql, [this.name, this.age]);
    this.id = result.insertId;
    return this;
  }
}

module.exports = User;

// const Schema = mongoose.Schema;
// // установка схемы
// const userScheme = new Schema({
//     name: String,
//     age: Number
// });
// module.exports = mongoose.model("User", userScheme);
