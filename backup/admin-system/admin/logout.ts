import { NextApiRequest, NextApiResponse } from 'next';
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
    
    if (sessionId) {
      removeAdminSession(sessionId);
    }
    
    // Clear the session cookie
    res.setHeader('Set-Cookie', 'admin-session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
    
    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}