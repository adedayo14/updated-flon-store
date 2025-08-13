import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateAdmin, createAdminSession } from 'lib/auth/adminAuth';

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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const isValid = authenticateAdmin(username, password);

    if (isValid) {
      const sessionId = createAdminSession();
      
      // Set session cookie
      res.setHeader('Set-Cookie', `admin-session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`);
      
      return res.status(200).json({
        success: true,
        message: 'Login successful'
      });
    } else {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}