import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import PrintButton from "@/components/quotes/PrintButton";
import {
  computeTotals,
  formatDate,
  formatMoney,
  lineTotal,
  normalizeLineItems,
  toNumber,
  type Quote,
} from "@/lib/quotes";

export const metadata = {
  title: "Quote — A Frame Automation",
  robots: { index: false, follow: false },
};

export default async function QuotePrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireOwner();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const quote = data as Quote;
  const items = normalizeLineItems(quote.line_items);
  const totals = computeTotals(items, {
    discount: quote.discount,
    taxRate: quote.tax_rate,
    depositPercent: quote.deposit_percent,
  });

  return (
    <main className="min-h-screen bg-[#f7f4ef] py-10 text-[#1f2528] print:bg-white print:py-0">
      {/* Toolbar — hidden in the printed output */}
      <div className="mx-auto mb-6 flex max-w-[8.5in] items-center justify-between gap-4 px-6 print:hidden">
        <Link
          href={`/quotes/${quote.id}`}
          className="text-sm font-semibold text-[#1f6f8b] hover:underline"
        >
          ← Back to editor
        </Link>
        <PrintButton />
      </div>

      <div className="mx-auto max-w-[8.5in] bg-white p-12 shadow-sm print:max-w-none print:p-0 print:shadow-none">
        {/* Letterhead */}
        <div className="flex items-start justify-between gap-8 border-b border-[#ded4c3] pb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/A Frame Automation Logo.png"
              alt="A Frame Automation logo"
              width={64}
              height={64}
              className="rounded-xl"
            />
            <div>
              <div className="text-xl font-bold">A Frame Automation</div>
              <div className="text-sm text-[#5f6b70]">
                Enterprise Software Solutions
              </div>
              <div className="mt-1 text-sm text-[#5f6b70]">
                Broken Bow, Oklahoma
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold uppercase tracking-wide">
              Quote
            </div>
            <div className="mt-1 font-semibold text-[#1f6f8b]">
              {quote.quote_number}
            </div>
            <div className="mt-3 text-sm text-[#5f6b70]">
              Issued {formatDate(quote.issued_on)}
            </div>
            {quote.valid_until && (
              <div className="text-sm text-[#5f6b70]">
                Valid until {formatDate(quote.valid_until)}
              </div>
            )}
          </div>
        </div>

        {/* Client + project */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5f6b70]">
              Prepared for
            </div>
            <div className="mt-2 font-bold">
              {quote.client_company || quote.client_name || "—"}
            </div>
            {quote.client_company && quote.client_name && (
              <div className="text-sm text-[#5f6b70]">{quote.client_name}</div>
            )}
            {quote.client_email && (
              <div className="text-sm text-[#5f6b70]">{quote.client_email}</div>
            )}
            {quote.client_phone && (
              <div className="text-sm text-[#5f6b70]">{quote.client_phone}</div>
            )}
          </div>

          {quote.project_title && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5f6b70]">
                Project
              </div>
              <div className="mt-2 font-bold">{quote.project_title}</div>
            </div>
          )}
        </div>

        {quote.summary && (
          <p className="mt-8 leading-7 text-[#3f4a4f]">{quote.summary}</p>
        )}

        {/* Line items */}
        <table className="mt-8 w-full text-left">
          <thead>
            <tr className="border-b-2 border-[#1f2528] text-xs uppercase tracking-wider">
              <th className="py-2">Description</th>
              <th className="w-20 py-2 text-right">Qty</th>
              <th className="w-32 py-2 text-right">Unit price</th>
              <th className="w-32 py-2 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#ede6da] align-top break-inside-avoid"
              >
                <td className="py-3 whitespace-pre-line">
                  {item.description || "—"}
                </td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">
                  {formatMoney(item.unitPrice)}
                </td>
                <td className="py-3 text-right font-medium">
                  {formatMoney(lineTotal(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-6 flex justify-end break-inside-avoid">
          <dl className="w-full max-w-xs grid gap-2 text-sm">
            <TotalRow label="Subtotal" value={formatMoney(totals.subtotal)} />

            {totals.discount > 0 && (
              <TotalRow
                label="Discount"
                value={`− ${formatMoney(totals.discount)}`}
              />
            )}

            {totals.tax > 0 && (
              <TotalRow
                label={`Tax (${toNumber(quote.tax_rate)}%)`}
                value={formatMoney(totals.tax)}
              />
            )}

            <div className="mt-2 flex justify-between border-t-2 border-[#1f2528] pt-3 text-lg font-bold">
              <dt>Total</dt>
              <dd>{formatMoney(totals.total)}</dd>
            </div>

            {totals.deposit > 0 && (
              <div className="mt-3 rounded-xl bg-[#f7f4ef] p-4 print:bg-transparent print:p-0 print:pt-3">
                <TotalRow
                  label={`Deposit due (${toNumber(quote.deposit_percent)}%)`}
                  value={formatMoney(totals.deposit)}
                />
                <TotalRow
                  label="Balance at launch"
                  value={formatMoney(totals.balance)}
                />
              </div>
            )}
          </dl>
        </div>

        {quote.notes && (
          <div className="mt-10 break-inside-avoid">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5f6b70]">
              Notes
            </div>
            <p className="mt-2 leading-7 whitespace-pre-line text-[#3f4a4f]">
              {quote.notes}
            </p>
          </div>
        )}

        {quote.terms && (
          <div className="mt-8 break-inside-avoid border-t border-[#ded4c3] pt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5f6b70]">
              Terms
            </div>
            <p className="mt-2 text-sm leading-6 whitespace-pre-line text-[#5f6b70]">
              {quote.terms}
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-[#ded4c3] pt-6 text-sm text-[#5f6b70]">
          Questions about this quote? Reply to the email this was sent from and
          we'll walk through it together.
        </div>
      </div>
    </main>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[#5f6b70]">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
