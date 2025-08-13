// Simple admin authentication utility
// Stateless HMAC-signed token for serverless compatibility (no shared state required)

import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adedayo01';
const SESSION_TTL_SECONDS = Number(process.env.ADMIN_SESSION_TTL || 60 * 60); // default 1 hour
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET || 'change-me-in-prod';

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

// base64url helpers
function b64urlEncode(data: Buffer | string): string {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function b64urlDecode(str: string): Buffer {
  const pad = 4 - (str.length % 4 || 4);
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad === 4 ? 0 : pad);
  return Buffer.from(base64, 'base64');
}

function sign(input: string): string {
  return b64urlEncode(crypto.createHmac('sha256', SESSION_SECRET).update(input).digest());
}

type TokenPayload = {
  sub: string; // subject (username)
  iat: number; // issued at (seconds)
  exp: number; // expiry (seconds)
  ver: 1; // token version
};

export function authenticateAdmin(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Create a stateless signed token
export function createAdminSession(): string {
  const iat = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    sub: 'admin',
    iat,
    exp: iat + SESSION_TTL_SECONDS,
    ver: 1,
  };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64urlEncode(payloadStr);
  const sig = sign(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function validateAdminSession(token: string): boolean {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [payloadB64, sig] = token.split('.', 2);
  const expectedSig = sign(payloadB64);
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return false;

  try {
    const payloadJson = b64urlDecode(payloadB64).toString('utf8');
    const payload = JSON.parse(payloadJson) as TokenPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.ver !== 1) return false;
    if (payload.sub !== 'admin') return false;
    if (payload.exp <= now) return false;
    return true;
  } catch {
    return false;
  }
}

// For stateless tokens, logout is a client-side cookie clear. Provide a no-op.
export function removeAdminSession(): void {
  // no-op for stateless tokens
}