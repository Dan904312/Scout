// api/webhook.js — Vercel serverless function
// Handles Stripe webhook events to confirm real payments
// Set STRIPE_WEBHOOK_SECRET in Vercel env vars after creating the webhook in Stripe dashboard

import Stripe from 'stripe';

export const config = {
  api: { bodyParser: false }
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: 'Webhook signature invalid' });
  }

  // When checkout is completed successfully, you can log/store the customer
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    console.log('New Pro subscriber:', customerEmail);
    // If you add a database later, store the email here to persist Pro status
  }

  return res.status(200).json({ received: true });
}
