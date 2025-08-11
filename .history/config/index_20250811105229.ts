const dev = process.env.NODE_ENV !== 'production';

// In development, detect the current port or default to 3000
const getDevApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current host
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Server-side: for development, we'll handle this in the API route
  return 'http://localhost:3006'; // Temporary fix for current session
};

export const API_BASE_URL = dev
  ? getDevApiUrl()
  : process.env.NEXT_PUBLIC_API_BASE_URL;
