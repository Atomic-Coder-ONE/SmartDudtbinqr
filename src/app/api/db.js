import sqlite3 from 'sqlite3';
import { join } from 'path';
import fs from 'fs';

let db;

export function getDb() {
    if (db) return db;

    const dbDir = join(process.cwd(), 'data');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }
    const dbPath = join(dbDir, 'database.sqlite');

    // If there's an existing db in backend folder, maybe we should use that,
    // but standardizing on /data/database.sqlite is cleaner.
    // Let's check if our old database.sqlite exists in backend and move it over optionally.
    const oldDbPath = join(process.cwd(), 'backend', 'database.sqlite');
    if (!fs.existsSync(dbPath) && fs.existsSync(oldDbPath)) {
        fs.copyFileSync(oldDbPath, dbPath);
    }

    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database', err.message);
        } else {
            db.run(`CREATE TABLE IF NOT EXISTS reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bin_id TEXT NOT NULL,
                report_type TEXT NOT NULL,
                issue_description TEXT,
                status TEXT DEFAULT 'pending',
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
        }
    });
    return db;
}
