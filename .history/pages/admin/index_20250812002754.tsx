import { GetServerSideProps } from 'next';

// Admin index page - redirect directly to dashboard (no password required for now)
const AdminIndex = () => {
  return null; // This won't be rendered as we redirect server-side
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Skip authentication for now - redirect directly to dashboard
  return {
    redirect: {
      destination: '/admin/dashboard',
      permanent: false,
    },
  };
};

export default AdminIndex;
