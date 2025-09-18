// index.js
import express from 'express';
import cors from 'cors';
import db from './db.js';
import { body, validationResult } from 'express-validator';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET doctors (optional ?q=search)
app.get('/api/doctors', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  let rows;
  if (q) {
    rows = db.prepare('SELECT * FROM doctors WHERE lower(name) LIKE ? OR lower(specialization) LIKE ? OR lower(location) LIKE ?')
      .all(`%${q}%`, `%${q}%`, `%${q}%`);
  } else {
    rows = db.prepare('SELECT * FROM doctors').all();
  }
  res.json(rows);
});

// GET single doctor
app.get('/api/doctors/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM doctors WHERE id=?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Doctor not found' });
  res.json(row);
});

// GET appointments
app.get('/api/appointments', (req, res) => {
  const rows = db.prepare(`
    SELECT a.*, d.name as doctor_name, d.specialization, d.location
    FROM appointments a JOIN doctors d ON a.doctor_id = d.id
    ORDER BY a.slot ASC
  `).all();
  res.json(rows);
});

// POST appointment
app.post('/api/appointments',
  body('doctor_id').isInt(),
  body('patient_name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('phone').isLength({ min: 7 }),
  body('slot').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { doctor_id, patient_name, email, phone, reason, slot } = req.body;
    const stmt = db.prepare('INSERT INTO appointments (doctor_id, patient_name, email, phone, reason, slot) VALUES (?,?,?,?,?,?)');
    const info = stmt.run(doctor_id, patient_name, email, phone, reason || '', slot);
    const appointment = db.prepare('SELECT a.*, d.name as doctor_name FROM appointments a JOIN doctors d ON a.doctor_id=d.id WHERE a.id=?').get(info.lastInsertRowid);
    res.status(201).json(appointment);
  }
);

// DELETE appointment
app.delete('/api/appointments/:id', (req, res) => {
  const info = db.prepare('DELETE FROM appointments WHERE id=?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Appointment not found' });
  res.json({ success: true });
});

// Serve client (optional) - if you build client into /client/dist
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req,res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
