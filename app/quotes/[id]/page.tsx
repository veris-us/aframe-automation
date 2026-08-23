import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import { normalizeLineItems, type Quote } from "@/lib/quotes";
import QuoteEditor from "@/components/quotes/QuoteEditor";

export const metadata = {
  title: "Edit Quote — A Frame Automation",
  robots: { index: false, follow: false },
};

export default async function QuoteEditPage({
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

  const quote = {
    ...(data as Quote),
    line_items: normalizeLineItems(data.line_items),
  };

  return <QuoteEditor quote={quote} />;
}
