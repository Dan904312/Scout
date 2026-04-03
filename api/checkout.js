const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE_MONTHLY = 'price_1THmckFB2H09SHdClXVGMgqJ';
const PRICE_YEARLY = 'price_1THmckFB2H09SHdCPzurcqTR';
const SECRET_CODE = 'PRESHOOT-DANIEL-2025';
const APP_URL = 'https://preshoot.vercel.app';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', APP_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { plan, promoCode, email } = req.body;

    // Secret backdoor — grant Pro instantly
    if (promoCode && promoCode.toUpperCase().trim() === SECRET_CODE) {
      res.status(200).json({ success: true, backdoor: true, plan: 'pro' });
      return;
    }

    const priceId = plan === 'yearly' ? PRICE_YEARLY : PRICE_MONTHLY;

    const sessionConfig = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: APP_URL + '?checkout=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: APP_URL + '?checkout=cancelled',
      allow_promotion_codes: true,
    };

    if (email) sessionConfig.customer_email = email;

    const session = await stripe.checkout.sessions.create(sessionConfig);
    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } };
