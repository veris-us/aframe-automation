import { createBrowserClient } from "@supabase/ssr";

/**
 * Cookie-backed Supabase client for client components. Sessions live in cookies
 * (not localStorage) so the server, proxy, and browser all read the same one.
 *
 * Note: lib/supabase.ts is the older anon-only client still used by the
 * admin/builder pages. This one is for anything that needs a logged-in user.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
