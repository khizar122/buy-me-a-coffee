import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Helper function to get the JWT secret key
function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set in environment variables');
  }

  return new TextEncoder().encode(secret);
}

// Helper function to verify JWT token
async function verifyAuth(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    // Check that the token is not expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      console.log('Token has expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password'
  ];

  // Define static asset paths that should be accessible without authentication
  const staticPaths = [
    '/_next',
    '/favicon.ico',
    '/images',
    '/public',
    '/icons',
    '/fonts'
  ];

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

  // Check if the current path is a static asset path
  const isStaticPath = staticPaths.some((staticPath) =>
    path.startsWith(staticPath)
  );

  // If it's a static asset, allow access
  if (isStaticPath) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value;

  // Debug logs
  console.log(`Middleware - Path: ${path}`);
  console.log(`Middleware - Auth token present: ${!!authToken}`);

  // Verify the token
  const user = authToken ? await verifyAuth(authToken) : null;
  console.log(`Middleware - User authenticated: ${!!user}`);

  // Handle authentication logic
  if (!user) {
    // User is NOT authenticated

    // Allow access to public paths
    if (isPublicPath) {
      return NextResponse.next();
    }

    // If root path, redirect to signin
    if (path === '/') {
      console.log('Middleware - Redirecting from root to signin');
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    // For all other paths, redirect to signin
    console.log(
      `Middleware - Unauthenticated access to ${path}, redirecting to signin`
    );
    const redirectUrl = new URL('/signin', request.url);
    return NextResponse.redirect(redirectUrl);
  } else {
    // User IS authenticated

    // Redirect from auth pages to dashboard
    if (isPublicPath) {
      console.log(
        'Middleware - Authenticated user on auth page, redirecting to dashboard'
      );
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If root path, redirect to dashboard
    if (path === '/') {
      console.log('Middleware - Redirecting from root to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow access to all other paths
    console.log(`Middleware - Authenticated access to ${path} granted`);
    return NextResponse.next();
  }
}

export const config = {
  // Match all paths
  matcher: ['/((?!api).*)']
};
