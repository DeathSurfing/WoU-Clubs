import { NextResponse } from "next/server";

// Allowed origins for BROWSER requests
const allowedOrigins = [
  "https://woxsenstudentcouncil.com",
  "https://studentcouncil.woxsen.edu.in",
  "https://admin.woxsenstudentcouncil.com",
];

if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:3000");
}

export default async function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only apply CORS to API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");

  // SSR / internal fetch (no Origin) → allow
  if (!origin) {
    return NextResponse.next();
  }

  // Browser request: validate origin
  if (!allowedOrigins.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ error: "CORS policy violation: Origin not allowed" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  // For real browser requests, add CORS & continue routing
  const response = NextResponse.next({
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  return response;
}
