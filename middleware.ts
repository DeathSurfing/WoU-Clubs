import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://woxsenstudentcouncil.com",
  "https://studentcouncil.woxsen.edu.in",
  "https://admin.woxsenstudentcouncil.com"
];

// Automatically allow localhost in dev
if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:3000");
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const pathname = request.nextUrl.pathname;

  // Only apply to API routes
  if (pathname.startsWith("/api")) {
    // 🚫 If the origin is not allowed — return 403
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(
        JSON.stringify({ error: "CORS policy violation: Origin not allowed" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = NextResponse.next();

    // ✅ If origin is allowed, set proper CORS headers
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    // ✅ Handle preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }

    return response;
  }

  return NextResponse.next();
}

// Apply only to /api routes
export const config = {
  matcher: ["/api/:path*"],
};
