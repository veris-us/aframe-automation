import Link from "next/link";
import { requireOwner } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import { createQuote, signOut } from "./actions";
import {
  computeTotals,
  formatDate,
  formatMoney,
  normalizeLineItems,
  statusStyles,
  type Quote,
} from "@/lib/quotes";

export const metadata = {
  title: "Quotes — A Frame Automation",
  robots: { index: false, follow: false },
};

export default async function QuotesPage() {
  const user = await requireOwner();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  const quotes = (data ?? []) as Quote[];

  const openValue = quotes
    .filter((q) => q.status === "sent")
    .reduce(
      (sum, q) =>
        sum +
        computeTotals(normalizeLineItems(q.line_items), {
          discount: q.discount,
          taxRate: q.tax_rate,
          depositPercent: q.deposit_percent,
        }).total,
      0,
    );

  const acceptedValue = quotes
    .filter((q) => q.status === "accepted")
    .reduce(
      (sum, q) =>
        sum +
        computeTotals(normalizeLineItems(q.line_items), {
          discount: q.discount,
          taxRate: q.tax_rate,
          depositPercent: q.deposit_percent,
        }).total,
      0,
    );

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2528]">
      <header className="border-b border-[#ded4c3] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Quote Builder</h1>
            <p className="text-sm text-[#5f6b70]">
              Signed in as {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#ded4c3] px-5 py-2 text-sm font-semibold hover:bg-[#f7f4ef]"
            >
              View site
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-[#ded4c3] px-5 py-2 text-sm font-semibold hover:bg-[#f7f4ef]"
              >
                Sign out
              </button>
            </form>

            <form action={createQuote}>
              <button
                type="submit"
                className="rounded-full bg-[#1f6f8b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#195a70]"
              >
                + New quote
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            Could not load quotes: {error.message}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total quotes" value={String(quotes.length)} />
          <StatCard label="Out for signature" value={formatMoney(openValue)} />
          <StatCard label="Accepted" value={formatMoney(acceptedValue)} />
        </div>

        {quotes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#c9bda9] bg-white p-12 text-center">
            <h2 className="text-xl font-bold">No quotes yet</h2>
            <p className="mx-auto mt-2 max-w-md leading-7 text-[#5f6b70]">
              Create your first quote and it will show up here with its status
              and total.
            </p>
            <form action={createQuote} className="mt-6">
              <button
                type="submit"
                className="rounded-full bg-[#1f6f8b] px-6 py-3 font-semibold text-white hover:bg-[#195a70]"
              >
                Create a quote
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#ded4c3] bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-[#ded4c3] bg-[#f7f4ef] text-xs uppercase tracking-wider text-[#5f6b70]">
                <tr>
                  <th className="px-5 py-3">Quote</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Issued</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {quotes.map((quote) => {
                  const totals = computeTotals(
                    normalizeLineItems(quote.line_items),
                    {
                      discount: quote.discount,
                      taxRate: quote.tax_rate,
                      depositPercent: quote.deposit_percent,
                    },
                  );

                  return (
                    <tr
                      key={quote.id}
                      className="border-b border-[#ede6da] last:border-0 hover:bg-[#fbf9f5]"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/quotes/${quote.id}`}
                          className="font-semibold text-[#1f6f8b] hover:underline"
                        >
                          {quote.quote_number}
                        </Link>
                        <div className="text-sm text-[#5f6b70]">
                          {quote.project_title || "Untitled project"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-medium">
                          {quote.client_company || quote.client_name || "—"}
                        </div>
                        {quote.client_company && quote.client_name && (
                          <div className="text-sm text-[#5f6b70]">
                            {quote.client_name}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#5f6b70]">
                        {formatDate(quote.issued_on)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[quote.status]}`}
                        >
                          {quote.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right font-semibold">
                        {formatMoney(totals.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#ded4c3] bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-[#5f6b70]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
