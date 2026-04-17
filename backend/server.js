const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cab Assignment Backend Running 🚀");
});

app.get('/drivers', (req, res) => {
  const drivers = db.prepare('SELECT * FROM drivers').all();
  res.json(drivers);
});

app.post('/drivers', (req, res) => {
  const { name, x, y } = req.body;
  const result = db.prepare('INSERT INTO drivers (name, x, y) VALUES (?, ?, ?)').run(name, x, y);
  res.json({ id: result.lastInsertRowid, name, x, y, available: 1 });
});

app.post('/rides/request', (req, res) => {
  const { user_name, user_x, user_y } = req.body;

  const drivers = db.prepare('SELECT * FROM drivers WHERE available = 1').all();

  if (drivers.length === 0) {
    return res.status(400).json({ error: 'No drivers available' });
  }

  let nearest = null;
  let minDistance = Infinity;

  for (const driver of drivers) {
    const dist = Math.sqrt((driver.x - user_x) ** 2 + (driver.y - user_y) ** 2);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = driver;
    }
  }

  db.prepare('UPDATE drivers SET available = 0 WHERE id = ?').run(nearest.id);
  const result = db.prepare(
    'INSERT INTO rides (user_name, user_x, user_y, driver_id, status) VALUES (?, ?, ?, ?, ?)'
  ).run(user_name, user_x, user_y, nearest.id, 'assigned');

  res.json({
    ride_id: result.lastInsertRowid,
    user_name,
    assigned_driver: nearest.name,
    driver_x: nearest.x,
    driver_y: nearest.y,
    distance: minDistance.toFixed(2)
  });
});

app.get('/rides', (req, res) => {
  const rides = db.prepare(`
    SELECT rides.*, drivers.name as driver_name 
    FROM rides LEFT JOIN drivers ON rides.driver_id = drivers.id
  `).all();
  res.json(rides);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});