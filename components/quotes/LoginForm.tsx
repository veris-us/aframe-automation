"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "not-authorized"
      ? "That account isn't authorized for this area."
      : null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }

    // Only allow same-path redirects — an open redirect here would be handing
    // out a phishing link on your own domain.
    const next = searchParams.get("next");
    const destination = next?.startsWith("/") && !next.startsWith("//")
      ? next
      : "/quotes";

    router.replace(destination);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Email</span>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-[#ded4c3] p-3 outline-none focus:border-[#1f6f8b]"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold">Password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-[#ded4c3] p-3 outline-none focus:border-[#1f6f8b]"
        />
      </label>

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[#1f6f8b] px-6 py-3 font-semibold text-white hover:bg-[#195a70] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
