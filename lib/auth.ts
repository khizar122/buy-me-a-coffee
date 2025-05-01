// lib/auth.ts
import { jwtVerify } from 'jose';

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set in environment variables');
  }

  return new TextEncoder().encode(secret);
}

export async function verifyAuth(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    throw new Error('Your token has expired or is invalid');
  }
}
