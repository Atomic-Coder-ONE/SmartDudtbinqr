import { NextResponse } from 'next/server';
import { getDb } from '../db';

export async function GET() {
    const db = getDb();
    const sql = `SELECT * FROM reports ORDER BY timestamp DESC`;

    return new Promise((resolve) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
                resolve(NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ reports: rows }, { status: 200 }));
            }
        });
    });
}
