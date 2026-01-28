const db = require("../config/db"); // пулл соединений

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static async getAll() {
    try {
      const sql = "SELECT * FROM users";
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  static async myTest() {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, rows) => {
      if (err) throw err;
      return console.log(rows); // [{ name: 'John' }, { name: 'Maria' }, ...]
    });
    // return await db.getall(rows);
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
