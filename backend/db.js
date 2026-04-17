const Database = require('better-sqlite3');
const db = new Database('cab.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    available INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS rides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_x INTEGER NOT NULL,
    user_y INTEGER NOT NULL,
    driver_id INTEGER,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
  );
`);

module.exports = db;