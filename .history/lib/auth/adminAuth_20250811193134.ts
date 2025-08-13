import type { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from 'lib/utils/authentication';
import getGQLClient from 'lib/graphql/client';

interface AdminSession {
  isAdmin: boolean;
  accountId?: string;
  email?: string;
}

/**
 * Validates admin session for server-side props
 * For now, this accepts any valid session as admin for development
 * In production, you should implement proper admin role checking
 */
export const validateAdminSession = async (
  context: GetServerSidePropsContext
): Promise<AdminSession | null> => {
  try {
    const sessionToken = context.req.cookies['swell-session'];
    
    if (!sessionToken) {
      return null;
    }

    // Use your existing session validation
    const client = getGQLClient();
    const isValid = await isSessionTokenValid(sessionToken, client);
    
    if (!isValid) {
      return null;
    }

    // For development purposes, any valid session is considered admin
    // TODO: Implement proper admin role checking by querying user roles
    return {
      isAdmin: true,
      accountId: 'temp-admin-id', // This should come from actual session
      email: 'admin@example.com' // This should come from actual session
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
  const sessionToken = req.cookies['swell-session'];
  
  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized - No session' });
  }

  try {
    const client = getGQLClient();
    const isValid = await isSessionTokenValid(sessionToken, client);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Unauthorized - Invalid session' });
    }

    // For development purposes, any valid session is considered admin
    // TODO: Implement proper admin role checking
    return true;
    
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};
