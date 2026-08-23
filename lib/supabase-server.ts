import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Per-request Supabase client for server components, server actions, and route
 * handlers. Must be created fresh on every render — never cached or shared
 * across requests, or one visitor's session leaks into another's.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server components can't write cookies. Safe to ignore: proxy.ts
            // refreshes the session on every request, so tokens stay current.
          }
        },
      },
    },
  );
}
