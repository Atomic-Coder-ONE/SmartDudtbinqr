import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bin_id TEXT NOT NULL,
            report_type TEXT NOT NULL,
            issue_description TEXT,
            status TEXT DEFAULT 'pending',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) console.error('Error creating table:', err.message);
        });
    }
});

// Endpoint: Report a bin as full
app.post('/api/reports/fill', (req, res) => {
    const { bin_id } = req.body;
    if (!bin_id) {
        return res.status(400).json({ error: 'bin_id is required' });
    }

    const sql = `INSERT INTO reports (bin_id, report_type) VALUES (?, 'full')`;
    db.run(sql, [bin_id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to insert report' });
        }
        res.status(201).json({ id: this.lastID, message: 'Full bin report received' });
    });
});

// Endpoint: Report an issue
app.post('/api/reports/issue', (req, res) => {
    const { bin_id, issue_type, description } = req.body;
    if (!bin_id || !issue_type) {
        return res.status(400).json({ error: 'bin_id and issue_type are required' });
    }

    const sql = `INSERT INTO reports (bin_id, report_type, issue_description) VALUES (?, ?, ?)`;
    db.run(sql, [bin_id, issue_type, description], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to insert report' });
        }
        res.status(201).json({ id: this.lastID, message: 'Issue report received' });
    });
});

// Endpoint: Get all reports (for debugging / admin)
app.get('/api/reports', (req, res) => {
    const sql = `SELECT * FROM reports ORDER BY timestamp DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch reports' });
        }
        res.json({ reports: rows });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
