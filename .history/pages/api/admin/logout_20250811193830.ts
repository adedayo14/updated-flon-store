import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Clear the admin token
  const cookie = serialize('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/admin',
  });

  // Clear the stored token hash
  delete process.env.ADMIN_TOKEN_HASH;

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ message: 'Logout successful' });
}
