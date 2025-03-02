import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// protected routes
const protectedRoutes = ["/events"];

// auth-related routes
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If no token and trying to access protected routes, redirect to sign-in
  if (!token) {
    if (
      protectedRoutes.some((route) =>
        url.pathname.startsWith(route)
      )
    ) {
      return NextResponse.redirect(
        new URL("/sign-in", request.url)
      );
    }
  } else {
    // If the user is on an auth route and they are already authenticated, redirect to home
    if (
      authRoutes.some((route) =>
        url.pathname.startsWith(route)
      )
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      ); // Redirect to home
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/events/:path*", // Match all events-related paths
    "/sign-in",
    "/sign-up",
    "/:path*", // Match all other paths (e.g., home, etc.)
  ],
};
