import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, method } = req.nextUrl;

  // ✅ Allow preflight
  if (method === "OPTIONS") {
    return NextResponse.next();
  }

  // ✅ Always allow API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
