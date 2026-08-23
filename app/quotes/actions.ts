"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import {
  DEFAULT_TERMS,
  QUOTE_STATUSES,
  normalizeLineItems,
  toNumber,
  type QuoteStatus,
} from "@/lib/quotes";

export type SaveQuoteInput = {
  id: string;
  status: string;
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone: string;
  project_title: string;
  summary: string;
  line_items: unknown;
  tax_rate: unknown;
  discount: unknown;
  deposit_percent: unknown;
  notes: string;
  terms: string;
  issued_on: string;
  valid_until: string;
};

/** Empty string from an <input type="date"> must become NULL, not ''. */
function nullableDate(value: string): string | null {
  return value.trim() === "" ? null : value;
}

function nullableText(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export async function createQuote() {
  const user = await requireOwner();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      owner_id: user.id,
      terms: DEFAULT_TERMS,
      line_items: [],
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Could not create quote: ${error.message}`);
  }

  revalidatePath("/quotes");
  redirect(`/quotes/${data.id}`);
}

export async function saveQuote(input: SaveQuoteInput) {
  const user = await requireOwner();
  const supabase = await createClient();

  const status: QuoteStatus = QUOTE_STATUSES.includes(input.status as QuoteStatus)
    ? (input.status as QuoteStatus)
    : "draft";

  const { error } = await supabase
    .from("quotes")
    .update({
      status,
      client_name: nullableText(input.client_name),
      client_company: nullableText(input.client_company),
      client_email: nullableText(input.client_email),
      client_phone: nullableText(input.client_phone),
      project_title: nullableText(input.project_title),
      summary: nullableText(input.summary),
      line_items: normalizeLineItems(input.line_items),
      tax_rate: Math.max(toNumber(input.tax_rate), 0),
      discount: Math.max(toNumber(input.discount), 0),
      deposit_percent: Math.min(Math.max(toNumber(input.deposit_percent), 0), 100),
      notes: nullableText(input.notes),
      terms: nullableText(input.terms),
      issued_on: nullableDate(input.issued_on) ?? undefined,
      valid_until: nullableDate(input.valid_until),
    })
    // Redundant with RLS, but keeps a bad id from ever matching another row.
    .eq("id", input.id)
    .eq("owner_id", user.id);

  if (error) {
    return { ok: false as const, message: error.message };
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${input.id}`);
  return { ok: true as const, savedAt: new Date().toISOString() };
}

export async function deleteQuote(id: string) {
  const user = await requireOwner();
  const supabase = await createClient();

  const { error } = await supabase
    .from("quotes")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    throw new Error(`Could not delete quote: ${error.message}`);
  }

  revalidatePath("/quotes");
  redirect("/quotes");
}

export async function duplicateQuote(id: string) {
  const user = await requireOwner();
  const supabase = await createClient();

  const { data: source, error: readError } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (readError || !source) {
    throw new Error(`Could not read quote: ${readError?.message ?? "not found"}`);
  }

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      owner_id: user.id,
      status: "draft",
      client_name: source.client_name,
      client_company: source.client_company,
      client_email: source.client_email,
      client_phone: source.client_phone,
      project_title: source.project_title
        ? `${source.project_title} (copy)`
        : null,
      summary: source.summary,
      line_items: source.line_items,
      tax_rate: source.tax_rate,
      discount: source.discount,
      deposit_percent: source.deposit_percent,
      notes: source.notes,
      terms: source.terms,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Could not duplicate quote: ${error.message}`);
  }

  revalidatePath("/quotes");
  redirect(`/quotes/${data.id}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
