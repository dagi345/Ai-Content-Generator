import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { subscriptions } from '@/utils/Schema';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';



export async function GET() {

  const user = await currentUser();
  const userEmail = user.emailAddresses[0]?.emailAddress

  if (!userEmail) {
    return NextResponse.json(
      { isSubscribed: false, message: 'Unauthorized: No user email found.' },
      { status: 401 }
    );
  }

  try {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userEmail, userEmail));

    const sub = result[0];

    if (!sub || sub.status !== 'active') {
      return NextResponse.json({ isSubscribed: false });
    }

    return NextResponse.json({
      isSubscribed: true,
      type: sub.subscriptionType, // 'month' or 'year'
    });

  } catch (err) {
    console.error('Error checking subscription:', err);
    return NextResponse.json({ isSubscribed: false, error: 'Something went wrong.' }, { status: 500 });
  }
}
