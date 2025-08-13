import { GetServerSideProps } from 'next';

// Admin dashboard - redirect to moderation page where the actual admin functionality is
const AdminDashboard = () => {
  return null; // This won't be rendered as we redirect server-side
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Redirect to the moderation admin page where the actual functionality is
  return {
    redirect: {
      destination: '/admin/moderation',
      permanent: false,
    },
  };
};

export default AdminDashboard;