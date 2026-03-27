import { NextResponse } from 'next/server';
import { getDb } from '../../db';

export async function POST(request) {
    try {
        const { bin_id } = await request.json();
        if (!bin_id) {
            return NextResponse.json({ error: 'bin_id is required' }, { status: 400 });
        }

        const db = getDb();
        const sql = `INSERT INTO reports (bin_id, report_type) VALUES (?, 'full')`;
        
        return new Promise((resolve) => {
            db.run(sql, [bin_id], function(err) {
                if (err) {
                    console.error(err);
                    resolve(NextResponse.json({ error: 'Failed to insert report' }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ id: this.lastID, message: 'Full bin report received' }, { status: 201 }));
                }
            });
        });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
