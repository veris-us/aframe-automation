import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase-server";

/**
 * Optional second lock. Supabase Auth alone lets anyone who can create an
 * account reach the UI (RLS still hides the data). Setting QUOTES_OWNER_EMAIL
 * narrows access to exactly one address.
 */
function isOwner(user: User): boolean {
  const allowed = process.env.QUOTES_OWNER_EMAIL?.trim().toLowerCase();
  if (!allowed) return true;
  return user.email?.toLowerCase() === allowed;
}

/**
 * The real gate. Every server component and server action that touches quote
 * data calls this first — proxy.ts is only an optimistic pre-filter.
 *
 * Uses getUser(), which revalidates the token with Supabase. Never trust
 * getSession() for authorization: it reads the cookie without verifying it.
 */
export const requireOwner = cache(async (): Promise<User> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isOwner(user)) {
    redirect("/login?error=not-authorized");
  }

  return user;
});
