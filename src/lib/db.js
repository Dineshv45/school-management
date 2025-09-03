import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",   // change if needed
  password: "root",   // your MySQL password
  database: "school_db"
});

export default db;
