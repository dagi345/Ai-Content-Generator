import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/utils/db';
import { subscriptions } from '@/utils/Schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList =await headers();
  const signature = headersList.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.subscription) {
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : 'id' in session.subscription
              ? session.subscription.id
              : null;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          const subscriptionData = {
            id: crypto.randomUUID(),
            customerId: subscription.customer as string,
            userEmail: session.customer_details?.email ?? '',
            status: subscription.status,
            priceAmount: subscription.items.data[0]?.price.unit_amount || 0,
            currency: subscription.items.data[0]?.price.currency || '',
            subscriptionType:
              subscription.items.data[0]?.price.recurring?.interval || '',
            currentPeriodStart: new Date(subscription.start_date * 1000).toISOString(),
            currentPeriodEnd: new Date(
              (subscription as any).current_period_end * 1000
            ).toISOString(),
            createdAt: new Date(subscription.created * 1000).toISOString(),
          };

          await db.insert(subscriptions).values(subscriptionData).onConflictDoUpdate({
            target: subscriptions.customerId,
            set: {
              userEmail: subscriptionData.userEmail,
              status: subscriptionData.status,
              priceAmount: subscriptionData.priceAmount,
              currency: subscriptionData.currency,
              subscriptionType: subscriptionData.subscriptionType,
              currentPeriodStart: subscriptionData.currentPeriodStart,
              currentPeriodEnd: subscriptionData.currentPeriodEnd,
              createdAt: subscriptionData.createdAt,
            },
          });

          console.log('Upserted subscription:', subscriptionData);
        }
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
