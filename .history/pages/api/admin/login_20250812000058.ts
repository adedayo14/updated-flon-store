import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adedayo01'; // Set this in your .env.local
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'your-secret-key-change-in-production'; // Set this in your .env.local

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('Admin login attempt:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body;

  console.log('Received password:', password);
  console.log('Expected password:', ADMIN_PASSWORD);
  console.log('Environment ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (password !== ADMIN_PASSWORD) {
    console.log('Password mismatch - returning 401');
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Create a simple token (in production, use JWT or similar)
  const token = crypto
    .createHmac('sha256', ADMIN_TOKEN_SECRET)
    .update('admin-authenticated')
    .digest('hex');

  // Set secure cookie
  const cookie = serialize('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/admin',
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ message: 'Login successful' });
}
