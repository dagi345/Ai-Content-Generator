import { db } from '@/utils/db';
import { Aioutput } from '@/utils/Schema';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formData, templateSlug, aiResponse, userEmail } = body;

        if (!userEmail) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        const result = await db.insert(Aioutput).values({
            formData: formData,
            templateSlug: templateSlug,
            airesponse: aiResponse,
            createdBy: userEmail,
            createdAt: moment().format('DD/MM/yyyy')
        });

        console.log(result)
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to save output' },
            { status: 500 }
        );
    }
} 