import { db } from '@/utils/db';
import { Aioutput } from '@/utils/Schema';
import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

export async function GET(req: Request) {
    try {
        const result = await db.select().from(Aioutput).orderBy(desc(Aioutput.createdAt));
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch history' },
            { status: 500 }
        );
    }
} 