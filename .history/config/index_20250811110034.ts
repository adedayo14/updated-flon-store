const dev = process.env.NODE_ENV !== 'production';

// In development, detect the current port or default to 3000
const getDevApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current host
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Server-side: check if we're in Next.js context and get the port from the request
  // For now, use port 3001 since that's what the server started on
  return `http://localhost:3001`;
};

export const API_BASE_URL = dev
  ? getDevApiUrl()
  : process.env.NEXT_PUBLIC_API_BASE_URL;
