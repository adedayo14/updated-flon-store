import type { NextApiRequest, NextApiResponse } from 'next';
import { removeAdminSession } from 'lib/auth/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
  const sessionId = req.cookies['admin-session'];
  if (sessionId) removeAdminSession();

    const isProduction = process.env.NODE_ENV === 'production';
    const clearCookies = isProduction
      ? [
          // Clear potential legacy domain-scoped cookies
          'admin-session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Domain=flon.co.uk',
          'admin-session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Domain=.flon.co.uk',
          // Clear new host-only cookie
          'admin-session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
        ]
      : ['admin-session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'];

    res.setHeader('Set-Cookie', clearCookies);
    
    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}