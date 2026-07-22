
import { NextResponse } from 'next/server';
import db from '../../../../db/db';

export async function GET() {
    const sessions = db.getSessions();
    const activeUsers = Object.keys(sessions).map(userId => {
        const u = db.findUser(user => user.id === userId);
        return {
            userId,
            name: u ? u.name : 'Unknown',
            phone: u ? u.phone : '',
            ...sessions[userId]
        };
    });
    return NextResponse.json({ success: true, sessions: activeUsers });
}
