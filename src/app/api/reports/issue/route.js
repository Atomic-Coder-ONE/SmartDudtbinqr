import { NextResponse } from 'next/server';
import { getDb } from '../../db';

export async function POST(request) {
    try {
        const { bin_id, issue_type, description } = await request.json();
        if (!bin_id || !issue_type) {
            return NextResponse.json({ error: 'bin_id and issue_type are required' }, { status: 400 });
        }

        const db = getDb();
        const sql = `INSERT INTO reports (bin_id, report_type, issue_description) VALUES (?, ?, ?)`;
        
        return new Promise((resolve) => {
            db.run(sql, [bin_id, issue_type, description], function(err) {
                if (err) {
                    console.error(err);
                    resolve(NextResponse.json({ error: 'Failed to insert report' }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ id: this.lastID, message: 'Issue report received' }, { status: 201 }));
                }
            });
        });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
