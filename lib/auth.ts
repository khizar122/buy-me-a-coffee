// lib/auth.ts
import { jwtVerify } from 'jose';

/**
 * Returns the JWT secret key from environment variables
 */
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set in environment variables');
  }

  return new TextEncoder().encode(secret);
}

/**
 * Verifies the JWT token and returns the payload if valid
 */
export async function verifyAuth(token: string) {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    // Ensure payload is an object with required fields
    if (
      !payload ||
      typeof payload !== 'object' ||
      !payload.id ||
      !payload.email
    ) {
      throw new Error('Invalid token payload');
    }

    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Your token has expired or is invalid');
  }
}

/**
 * Gets the current authenticated user from cookies
 */
export async function getCurrentUser(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAuth(token);
    return {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
      isCreator: payload.isCreator as boolean
    };
  } catch (error) {
    return null;
  }
}
