import type { NextApiRequest } from 'next';

interface AdminSession {
  isAdmin: boolean;
  accountId: string;
  email: string;
}

/**
 * Simple admin authentication using cookie token
 * Validates admin cookie token set by login
 */
export const validateAdminSession = async (
  req: NextApiRequest,
): Promise<AdminSession | null> => {
  try {
    const adminToken = req.cookies['admin-token'];
    
    if (!adminToken) {
      return null;
    }

    // Check if token matches the stored hash
    if (adminToken !== process.env.ADMIN_TOKEN_HASH) {
      return null;
    }

    return {
      isAdmin: true,
      accountId: 'admin',
      email: 'admin@store.local'
    };
  } catch (error) {
    console.error('Admin auth validation error:', error);
    return null;
  }
};

/**
 * Middleware to check admin access for API routes
 */
export const requireAdminAuth = async (req: any, res: any) => {
  try {
    const adminSession = await validateAdminSession(req);
    
    if (!adminSession) {
      return res.status(401).json({ 
        message: 'Admin authentication required' 
      });
    }

    return adminSession;
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return res.status(500).json({ 
      message: 'Authentication error' 
    });
  }
};
