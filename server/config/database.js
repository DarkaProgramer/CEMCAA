// database.js - CON POOL DE CONEXIONES (CommonJS)
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cemcaa",  // ← Asegúrate que sea CEMCAA o cemcaa2
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    return;
  }
  console.log("✓ Conectado a MySQL");
  connection.release();
});

// Exportación correcta para CommonJS
module.exports = pool;
