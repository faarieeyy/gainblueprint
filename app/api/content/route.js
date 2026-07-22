
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    return NextResponse.json({ success: true, message: 'Content API ready' });
}
