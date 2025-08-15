import type { NextApiRequest, NextApiResponse } from 'next';
import { initSwell } from 'lib/swell/swell-node';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body as { email?: string };
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const swell = initSwell();

    // Look for existing account
    const found = await swell.get('/accounts', {
      where: { email: { $eq: email } },
      limit: 1,
      page: 1,
    });

    const existing = found?.results?.[0];

    if (existing) {
      // Update existing account to opt-in to marketing/newsletter
      const updated = await swell.put(`/accounts/${existing.id}`, {
        accepts_marketing: true,
        email_optin: true,
        marketing_consent: true,
        email,
      });
      console.log('Updated existing account for newsletter:', { id: existing.id, email, accepts_marketing: updated?.accepts_marketing });
    } else {
      // Create a new account with marketing opt-in
      const created = await swell.post('/accounts', {
        email,
        accepts_marketing: true,
        email_optin: true,
        marketing_consent: true,
        type: 'newsletter_subscriber',
      });
      console.log('Created new account for newsletter:', { id: created?.id, email, accepts_marketing: created?.accepts_marketing });
    }

    return res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
