const dev = process.env.NODE_ENV !== 'production';

// In development, detect the current port or default to 3000
const getDevApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current host
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Server-side: use environment port or default
  return `http://localhost:${process.env.PORT || 3000}`;
};

export const API_BASE_URL = dev
  ? getDevApiUrl()
  : process.env.NEXT_PUBLIC_API_BASE_URL;
