const dev = process.env.NODE_ENV !== 'production';

// In development, detect the current port or default to 3000
const getDevApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current host
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Server-side: For dev, use the same port as the Next.js server
  return process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3002`;
};

export const API_BASE_URL = dev
  ? getDevApiUrl()
  : process.env.NEXT_PUBLIC_API_BASE_URL;
