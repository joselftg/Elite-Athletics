const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('banco-de-dados.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      cargo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      perfil TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS esportes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      id_usuario INTEGER NOT NULL,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    )
  `);
});

module.exports = db;