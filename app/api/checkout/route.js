// app/api/checkout/route.js
import Stripe from 'stripe';
import { currentUser } from '@clerk/nextjs/server';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
   
    const user= await currentUser()
    const email = user.emailAddresses[0]?.emailAddress;
     // Optional: pass metadata or user email
    const {plan} = await req.json()


    let priceId;
    if (plan === 'monthly') {
      priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
    } else if (plan === 'yearly') {
      priceId = process.env.STRIPE_YEARLY_PRICE_ID;
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid plan selected' }),
        { status: 400 }
      );
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Replace with your actual price ID from Stripe
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      customer_email: email, // Optional: auto-fill email field
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (err) {
    console.error('Stripe error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 }
    );
  }
}

