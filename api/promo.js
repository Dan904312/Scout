// api/promo.js — Vercel serverless function
// Set your secret promo codes in Vercel Environment Variables as:
// PROMO_CODES = "MYCODE1,MYCODE2,MYCODE3"

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body || {};

  if (!code) {
    return res.status(400).json({ valid: false });
  }

  // Load promo codes from environment variable (comma separated)
  // e.g. in Vercel dashboard: PROMO_CODES = "PRESHOOTFREE,DEVACCESS,YOURCODE"
  const rawCodes = process.env.PROMO_CODES || '';
  const validCodes = rawCodes
    .split(',')
    .map(c => c.trim().toUpperCase())
    .filter(Boolean);

  const isValid = validCodes.includes(code.trim().toUpperCase());

  return res.status(200).json({ valid: isValid });
}
