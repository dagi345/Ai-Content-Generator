import { db } from '@/utils/db';
import { Aioutput } from '@/utils/Schema';
import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';

import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: Request) {
    const user= await currentUser()

        if (!user) {
            return NextResponse.json({ error: 'No email found' }, { status: 401 });
        }
        
    try {
        const result = await db.select().from(Aioutput).where(eq(Aioutput.createdBy, user.emailAddresses[0]?.emailAddress));
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch history' },
            { status: 500 }
        );
    }
} 