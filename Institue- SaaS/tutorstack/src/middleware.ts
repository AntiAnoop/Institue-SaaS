import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // 1. Get Hostname
  let hostname = req.headers.get("host") || "localhost:3000";

  // 2. Clean Hostname (remove port)
  const hostnameWithPort = hostname; 
  if (hostname.includes(":")) {
    hostname = hostname.split(":")[0];
  }

  // 3. Define Root Domain
  // In development, we force this to 'localhost' to avoid env var issues
  const rootDomain = process.env.NODE_ENV === "development" ? "localhost" : (process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost");

  console.log(`--- Middleware Debug ---`);
  console.log(`Original Host: ${hostnameWithPort}`);
  console.log(`Clean Host:    ${hostname}`);
  console.log(`Root Domain:   ${rootDomain}`);
  console.log(`Path:          ${url.pathname}`);

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // --- ROUTING LOGIC ---

  // Case A: Admin Dashboard (app.localhost)
  if (hostname === `app.${rootDomain}`) {
    console.log(">> Routing to /app (Admin Dashboard)");
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // Case B: Landing Page (localhost or 127.0.0.1)
  // We explicitly check for 'localhost' to be safe
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === rootDomain
  ) {
    console.log(">> Routing to /home (Landing Page)");
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url)
    );
  }

  // Case C: Tenant Sites (pinkal.localhost)
  // If it's not app.localhost and not localhost, it must be a tenant
  console.log(`>> Routing to /${hostname} (Tenant Site)`);
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}