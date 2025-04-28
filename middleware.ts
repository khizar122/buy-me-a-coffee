import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const publicPaths = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/dashboard',
    '/viewPage',
    '/exploreCreators',
    '/supporters',
    '/memberships'
  ];

  const isPublicPath = publicPaths.includes(path);

  // Fetch JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Debugging (remove in production)
  console.log('Requested Path:', path);
  console.log('Token Present:', !!token);

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    console.log(
      'Authenticated user accessing public path. Redirecting to /dashboard.'
    );
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users accessing protected paths
  if (!isPublicPath && !token) {
    console.log(
      'Unauthenticated user accessing protected path. Redirecting to /signin.'
    );
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Special handling for root path "/"
  // if (path === '/') {
  //   if (token) {
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   } else {
  //     return NextResponse.redirect(new URL('/signin', request.url));
  //   }
  // }

  // Allow access to all other paths
  return NextResponse.next();
}

export const config = {
  // Match all paths except Next.js internals, public assets, and API routes
  matcher: ['/((?!api|_next|fonts|icons|images|public|\\.png|\\.jpg|\\.ico).*)']
};
