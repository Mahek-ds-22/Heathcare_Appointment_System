// db.js - create/open DB and optionally seed
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data.db');
const db = new Database(DB_FILE);

// create tables if not exist
db.prepare(`
CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  location TEXT NOT NULL,
  rating REAL,
  experience INTEGER
);
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY,
  doctor_id INTEGER NOT NULL,
  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reason TEXT,
  slot TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
`).run();

// seed doctors if empty
const count = db.prepare('SELECT COUNT(*) AS cnt FROM doctors').get().cnt;
if (count === 0) {
  const insert = db.prepare('INSERT INTO doctors (name, specialization, location, rating, experience) VALUES (?,?,?,?,?)');
  const seed = [
    ['Dr. Sarah Chen','Cardiology','New York, NY',4.9,12],
    ['Dr. Amit Patel','Dermatology','San Francisco, CA',4.7,9],
    ['Dr. Emily Wong','General Physician','Chicago, IL',4.6,7],
    ['Dr. John Lee','Orthopedics','Houston, TX',4.5,10]
  ];
  const tx = db.transaction((rows)=> rows.forEach(r=>insert.run(...r)));
  tx(seed);
  console.log('Seeded doctors.');
}

console.log('DB ready at', DB_FILE);

export default db;
