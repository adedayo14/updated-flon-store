import { GetServerSideProps } from 'next';
import { validateAdminSession } from 'lib/auth/adminAuth';

// This component won't be rendered because we always redirect
const AdminIndex = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Check if user is authenticated
    const sessionId = context.req.cookies['admin-session'];
    
    if (sessionId && validateAdminSession(sessionId)) {
      // Redirect authenticated users to reviews
      return {
        redirect: {
          destination: '/admin/reviews',
          permanent: false,
        },
      };
    }
    
    // Redirect unauthenticated users to login
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Error in admin index:', error);
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
};

export default AdminIndex;
