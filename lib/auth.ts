import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * Returns the JWT secret key from environment variables
 */
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  return new TextEncoder().encode(secret);
}

/**
 * Gets the auth token from cookies
 */
export function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value;
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
export async function getCurrentUser(tokenInput?: string) {
  // If no token is provided as an argument, try to get it from cookies
  const token = tokenInput || getAuthToken();

  if (!token) {
    console.log('No token provided to getCurrentUser');
    return null;
  }

  try {
    const payload = await verifyAuth(token);

    // Return user data from payload
    return {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
      isCreator: payload.isCreator as boolean
    };
  } catch (error) {
    console.error('getCurrentUser error:', error);
    // Don't throw here - return null so calling code can handle
    return null;
  }
}

/**
 * Check if user is authenticated (useful for middleware)
 * Returns true if authenticated, false otherwise
 */
export async function isAuthenticated(
  token: string | undefined
): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    await verifyAuth(token);
    return true;
  } catch (error) {
    return false;
  }
}
