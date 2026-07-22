
import { NextResponse } from 'next/server';
import db from '../../../../db/db';

export async function GET() {
    return NextResponse.json({ success: true, users: db.getUsers() });
}
