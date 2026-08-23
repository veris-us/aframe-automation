"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { deleteQuote, duplicateQuote, saveQuote } from "@/app/quotes/actions";
import {
  QUOTE_STATUSES,
  computeTotals,
  emptyLineItem,
  formatMoney,
  lineTotal,
  statusStyles,
  toNumber,
  type LineItem,
  type Quote,
  type QuoteStatus,
} from "@/lib/quotes";

type Props = { quote: Quote };

export default function QuoteEditor({ quote }: Props) {
  const [status, setStatus] = useState<QuoteStatus>(quote.status);
  const [clientName, setClientName] = useState(quote.client_name ?? "");
  const [clientCompany, setClientCompany] = useState(quote.client_company ?? "");
  const [clientEmail, setClientEmail] = useState(quote.client_email ?? "");
  const [clientPhone, setClientPhone] = useState(quote.client_phone ?? "");
  const [projectTitle, setProjectTitle] = useState(quote.project_title ?? "");
  const [summary, setSummary] = useState(quote.summary ?? "");
  const [items, setItems] = useState<LineItem[]>(
    quote.line_items.length > 0 ? quote.line_items : [emptyLineItem()],
  );
  const [taxRate, setTaxRate] = useState(String(quote.tax_rate ?? 0));
  const [discount, setDiscount] = useState(String(quote.discount ?? 0));
  const [depositPercent, setDepositPercent] = useState(
    String(quote.deposit_percent ?? 0),
  );
  const [notes, setNotes] = useState(quote.notes ?? "");
  const [terms, setTerms] = useState(quote.terms ?? "");
  const [issuedOn, setIssuedOn] = useState(quote.issued_on ?? "");
  const [validUntil, setValidUntil] = useState(quote.valid_until ?? "");

  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [isBusy, startBusy] = useTransition();

  const totals = useMemo(
    () =>
      computeTotals(items, {
        discount: toNumber(discount),
        taxRate: toNumber(taxRate),
        depositPercent: toNumber(depositPercent),
      }),
    [items, discount, taxRate, depositPercent],
  );

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    setItems((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleSave() {
    setMessage(null);

    startSaving(async () => {
      const result = await saveQuote({
        id: quote.id,
        status,
        client_name: clientName,
        client_company: clientCompany,
        client_email: clientEmail,
        client_phone: clientPhone,
        project_title: projectTitle,
        summary,
        line_items: items,
        tax_rate: taxRate,
        discount,
        deposit_percent: depositPercent,
        notes,
        terms,
        issued_on: issuedOn,
        valid_until: validUntil,
      });

      setMessage(
        result.ok
          ? "Saved."
          : `Could not save: ${result.message}`,
      );
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2528]">
      <header className="sticky top-0 z-40 border-b border-[#ded4c3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/quotes"
              className="text-sm font-semibold text-[#1f6f8b] hover:underline"
            >
              ← All quotes
            </Link>
            <div>
              <div className="text-lg font-bold">{quote.quote_number}</div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {message && (
              <span
                className={`text-sm font-medium ${
                  message === "Saved." ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </span>
            )}

            <Link
              href={`/quotes/${quote.id}/print`}
              className="rounded-full border border-[#ded4c3] px-5 py-2 text-sm font-semibold hover:bg-[#f7f4ef]"
            >
              Print / PDF
            </Link>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => startBusy(() => duplicateQuote(quote.id))}
              className="rounded-full border border-[#ded4c3] px-5 py-2 text-sm font-semibold hover:bg-[#f7f4ef] disabled:opacity-60"
            >
              Duplicate
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                if (confirm(`Delete ${quote.quote_number}? This cannot be undone.`)) {
                  startBusy(() => deleteQuote(quote.id));
                }
              }}
              className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full bg-[#1f6f8b] px-6 py-2 text-sm font-semibold text-white hover:bg-[#195a70] disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="grid gap-6">
          {/* Client */}
          <Card title="Client">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contact name">
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Business name">
                <input
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </Card>

          {/* Project */}
          <Card title="Project">
            <div className="grid gap-4">
              <Field label="Project title">
                <input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Customer portal + website rebuild"
                  className={inputClass}
                />
              </Field>

              <Field label="Summary">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="One short paragraph describing what you're delivering."
                  className={inputClass}
                />
              </Field>
            </div>
          </Card>

          {/* Line items */}
          <Card title="Line items">
            <div className="grid gap-3">
              <div className="hidden gap-3 px-1 text-xs font-semibold uppercase tracking-wider text-[#5f6b70] sm:grid sm:grid-cols-[1fr_80px_120px_110px_72px]">
                <div>Description</div>
                <div className="text-right">Qty</div>
                <div className="text-right">Unit price</div>
                <div className="text-right">Amount</div>
                <div />
              </div>

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-3 rounded-xl border border-[#ede6da] p-3 sm:grid-cols-[1fr_80px_120px_110px_72px] sm:items-center sm:border-0 sm:p-0"
                >
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, { description: e.target.value })
                    }
                    rows={2}
                    placeholder="What this line covers"
                    className={inputClass}
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, { quantity: toNumber(e.target.value) })
                    }
                    className={`${inputClass} text-right`}
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(item.id, {
                        unitPrice: toNumber(e.target.value),
                      })
                    }
                    className={`${inputClass} text-right`}
                  />

                  <div className="text-right font-semibold">
                    {formatMoney(lineTotal(item))}
                  </div>

                  <div className="flex justify-end gap-1">
                    <IconButton
                      label="Move up"
                      disabled={index === 0}
                      onClick={() => moveItem(index, -1)}
                    >
                      ↑
                    </IconButton>
                    <IconButton
                      label="Move down"
                      disabled={index === items.length - 1}
                      onClick={() => moveItem(index, 1)}
                    >
                      ↓
                    </IconButton>
                    <IconButton
                      label="Remove line"
                      onClick={() =>
                        setItems((current) =>
                          current.filter((row) => row.id !== item.id),
                        )
                      }
                    >
                      ×
                    </IconButton>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setItems((current) => [...current, emptyLineItem()])
                }
                className="justify-self-start rounded-full border border-[#ded4c3] px-5 py-2 text-sm font-semibold hover:bg-[#f7f4ef]"
              >
                + Add line
              </button>
            </div>
          </Card>

          {/* Notes */}
          <Card title="Notes & terms">
            <div className="grid gap-4">
              <Field label="Notes to client">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </Field>

              <Field label="Terms">
                <textarea
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  rows={4}
                  className={inputClass}
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="grid gap-6 lg:sticky lg:top-24">
          <Card title="Settings">
            <div className="grid gap-4">
              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as QuoteStatus)}
                  className={inputClass}
                >
                  {QUOTE_STATUSES.map((option) => (
                    <option key={option} value={option}>
                      {option[0].toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Issued on">
                <input
                  type="date"
                  value={issuedOn}
                  onChange={(e) => setIssuedOn(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Valid until">
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Discount ($)">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Tax rate (%)">
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Deposit (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </Card>

          <Card title="Totals">
            <dl className="grid gap-2 text-sm">
              <Row label="Subtotal" value={formatMoney(totals.subtotal)} />
              {totals.discount > 0 && (
                <Row
                  label="Discount"
                  value={`− ${formatMoney(totals.discount)}`}
                />
              )}
              {totals.tax > 0 && (
                <Row
                  label={`Tax (${toNumber(taxRate)}%)`}
                  value={formatMoney(totals.tax)}
                />
              )}

              <div className="mt-2 flex justify-between border-t border-[#ded4c3] pt-3 text-lg font-bold">
                <dt>Total</dt>
                <dd>{formatMoney(totals.total)}</dd>
              </div>

              {totals.deposit > 0 && (
                <div className="mt-2 rounded-xl bg-[#f7f4ef] p-3">
                  <Row
                    label={`Deposit (${toNumber(depositPercent)}%)`}
                    value={formatMoney(totals.deposit)}
                  />
                  <Row
                    label="Balance at launch"
                    value={formatMoney(totals.balance)}
                  />
                </div>
              )}
            </dl>
          </Card>
        </aside>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#ded4c3] bg-white p-3 text-sm outline-none focus:border-[#1f6f8b]";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#ded4c3] bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#5f6b70]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[#5f6b70]">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 rounded-lg border border-[#ded4c3] text-sm hover:bg-[#f7f4ef] disabled:opacity-30"
    >
      {children}
    </button>
  );
}
