export type QuoteStatus = "draft" | "sent" | "accepted" | "declined";

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Quote = {
  id: string;
  owner_id: string;
  quote_number: string;
  status: QuoteStatus;
  client_name: string | null;
  client_company: string | null;
  client_email: string | null;
  client_phone: string | null;
  project_title: string | null;
  summary: string | null;
  line_items: LineItem[];
  tax_rate: number;
  discount: number;
  deposit_percent: number;
  notes: string | null;
  terms: string | null;
  issued_on: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
};

export const QUOTE_STATUSES: QuoteStatus[] = [
  "draft",
  "sent",
  "accepted",
  "declined",
];

export const statusStyles: Record<QuoteStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

export const DEFAULT_TERMS =
  "50% deposit due to begin work, remaining balance due at launch. Quote valid for 30 days from the issue date. Scope changes are quoted separately before any additional work begins.";

/** Round to cents. Avoids float drift like 0.1 + 0.2 showing up in totals. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Coerce anything that arrives from a form or the DB into a finite number. */
export function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number.parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

export function lineTotal(item: LineItem): number {
  return round2(toNumber(item.quantity) * toNumber(item.unitPrice));
}

export type Totals = {
  subtotal: number;
  discount: number;
  taxable: number;
  tax: number;
  total: number;
  deposit: number;
  balance: number;
};

export function computeTotals(
  items: LineItem[],
  opts: { discount?: number; taxRate?: number; depositPercent?: number } = {},
): Totals {
  const subtotal = round2(
    items.reduce((sum, item) => sum + lineTotal(item), 0),
  );

  // Never discount below zero — a typo shouldn't produce a negative invoice.
  const discount = Math.min(Math.max(toNumber(opts.discount), 0), subtotal);
  const taxable = round2(subtotal - discount);
  const tax = round2(taxable * (toNumber(opts.taxRate) / 100));
  const total = round2(taxable + tax);
  const deposit = round2(total * (toNumber(opts.depositPercent) / 100));

  return {
    subtotal,
    discount,
    taxable,
    tax,
    total,
    deposit,
    balance: round2(total - deposit),
  };
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(value: number): string {
  return currency.format(toNumber(value));
}

export function formatDate(value: string | null): string {
  if (!value) return "—";
  // Dates come back as YYYY-MM-DD; parse as local so the day doesn't shift back.
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function emptyLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    quantity: 1,
    unitPrice: 0,
  };
}

/** line_items is jsonb, so it can be anything until we check it. */
export function normalizeLineItems(value: unknown): LineItem[] {
  if (!Array.isArray(value)) return [];

  return value.map((raw) => {
    const item = (raw ?? {}) as Partial<LineItem>;
    return {
      id: typeof item.id === "string" ? item.id : crypto.randomUUID(),
      description: typeof item.description === "string" ? item.description : "",
      quantity: toNumber(item.quantity),
      unitPrice: toNumber(item.unitPrice),
    };
  });
}
