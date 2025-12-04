// Allowed origins for BROWSER requests
const allowedOrigins = [
  "https://woxsenstudentcouncil.com",
  "https://studentcouncil.woxsen.edu.in",
  "https://admin.woxsenstudentcouncil.com",
];

// Add localhost during development
if (process.env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:3000");
}

export default async function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only apply CORS to API routes
  if (!pathname.startsWith("/api")) {
    return;
  }

  const origin = request.headers.get("origin");

  // Allow server-side/edge/internal fetches (no Origin header)
  // SSR, RSC, Node fetch, Next internal calls → always allowed
  if (!origin) {
    return;
  }

  // From here on, it's a browser request.

  //  Block browsers with disallowed origins
  if (!allowedOrigins.includes(origin)) {
    return new Response(
      JSON.stringify({
        error: "CORS policy violation: Origin not allowed",
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Pre-build standard CORS headers
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  return new Response(null, {
    headers: corsHeaders,
  });
}
