import crypto from 'crypto';

export interface ReviewInvitePayload {
  accountId: string;
  productId: string;
  slug: string;
  exp: number; // epoch seconds
}

const getSecret = () => {
  const secret = process.env.REVIEW_INVITE_SECRET || process.env.SWELL_SECRET_KEY || '';
  if (!secret) {
    console.warn('Missing REVIEW_INVITE_SECRET (or SWELL_SECRET_KEY) for review invite signing');
  }
  return secret;
};

export function signInvite(payload: ReviewInvitePayload): string {
  const secret = getSecret();
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyInvite(token: string): { valid: boolean; reason?: string; payload?: ReviewInvitePayload } {
  try {
    const secret = getSecret();
    const [body, sig] = token.split('.');
    if (!body || !sig) return { valid: false, reason: 'Malformed token' };
    const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return { valid: false, reason: 'Bad signature' };
    }
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (typeof payload.exp !== 'number' || Date.now() / 1000 > payload.exp) {
      return { valid: false, reason: 'Token expired' };
    }
    return { valid: true, payload };
  } catch (e: any) {
    return { valid: false, reason: 'Verification error' };
  }
}
