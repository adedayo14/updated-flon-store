import { GetServerSideProps } from 'next';

// Admin dashboard - redirect to reviews page where the actual admin functionality is
const AdminDashboard = () => {
  return null; // This won't be rendered as we redirect server-side
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Redirect to the reviews admin page where the actual functionality is
  return {
    redirect: {
      destination: '/admin/reviews',
      permanent: false,
    },
  };
};

export default AdminDashboard;