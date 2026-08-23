import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/quotes/LoginForm";

export const metadata = {
  title: "Sign In — A Frame Automation",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f4ef] px-6 py-16 text-[#1f2528]">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/A Frame Automation Logo.png"
            alt="A Frame Automation logo"
            width={48}
            height={48}
            className="rounded-xl"
          />
          <div>
            <div className="font-bold">A Frame Automation</div>
            <div className="text-sm text-[#5f6b70]">Internal Tools</div>
          </div>
        </Link>

        <div className="mt-8 rounded-2xl border border-[#ded4c3] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-[#5f6b70]">
            This area is restricted to A Frame Automation staff.
          </p>

          <Suspense fallback={<div className="mt-6 h-64" />}>
            <LoginForm />
          </Suspense>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[#1f6f8b] hover:underline"
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
