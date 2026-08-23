import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next.js 16 renamed Middleware to Proxy. Same behavior, new filename.
 *
 * Two jobs here:
 *  1. Refresh the Supabase session on every matched request so tokens don't
 *     expire mid-session (this is why setAll must write to the response).
 *  2. Optimistically redirect signed-out visitors away from /quotes.
 *
 * This is NOT the security boundary — lib/auth.ts and Postgres RLS are.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (path.startsWith("/quotes") && !user) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  if (path === "/login" && user) {
    return NextResponse.redirect(new URL("/quotes", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/quotes/:path*", "/login"],
};
