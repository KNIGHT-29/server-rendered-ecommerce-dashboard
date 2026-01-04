import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Allow preflight requests
  if (method === "OPTIONS") {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/products") || pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/dashboard/:path*"],
};
