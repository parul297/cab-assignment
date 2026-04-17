# Cab Assignment System 🚖

A simple full-stack web app that assigns the nearest available driver to a user requesting a ride. Built with Node.js, React, and SQLite.

## What it does

Pretty straightforward — you add some drivers with their locations, then when a user requests a ride, the system automatically figures out which driver is closest and assigns them. No maps involved, just basic coordinate-based distance calculation.

## Tech Stack

- **Frontend** — React (Vite)
- **Backend** — Node.js + Express
- **Database** — SQLite (via better-sqlite3)

## Getting Started

You'll need Node.js installed. That's pretty much it.

### 1. Clone the repo

```bash
git clone https://github.com/parul297/cab-assignment.git
cd cab-assignment
```

### 2. Set up the backend

```bash
cd backend
npm install
node server.js
```

Server will start on `http://localhost:5000`

### 3. Set up the frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## How to use it

1. Go to the **Add Driver** tab and add a few drivers with their X and Y coordinates
2. Switch to the **Request Ride** tab, enter your name and your coordinates
3. The system calculates the distance to every available driver and assigns the closest one

## Distance Calculation

Since there's no maps integration, locations are just points on a grid. Distance is calculated using the standard Euclidean formula:
distance = √((x2 - x1)² + (y2 - y1)²)

So if a driver is at (2, 3) and you're at (5, 7), the distance is √(9 + 16) = 5 units.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/drivers` | Get all drivers |
| POST | `/drivers` | Add a new driver |
| POST | `/rides/request` | Request a ride |
| GET | `/rides` | Get all rides |

## Project Structure
cab-assignment/
├── backend/
│   ├── db.js         # Database setup and table creation
│   ├── server.js     # Express server and API routes
│   └── package.json
│
└── frontend/
├── src/
│   ├── components/
│   │   ├── AddDriver.jsx
│   │   └── RequestRide.jsx
│   └── App.jsx
└── package.json

## Notes

- The SQLite database (`cab.db`) gets created automatically when you first run the backend — no setup needed
- Once a driver is assigned to a ride, they're marked as unavailable
- Coordinates can be any integers — think of it like a grid on graph paper
