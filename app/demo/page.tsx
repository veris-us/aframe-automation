import { supabase } from "@/lib/supabase";
import WebsiteRenderer from "@/components/builder/website/WebsiteRenderer";
import type { DemoContent } from "@/components/builder/types";

async function getDemoContent() {
  const { data, error } = await supabase
    .from("demo_site_content")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as DemoContent;
}

export default async function DemoPage() {
  const content = await getDemoContent();

  if (!content) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f4ef] p-10 text-[#1f2528]">
        <div>
          <h1 className="text-3xl font-bold">Demo content not found.</h1>
          <p className="mt-3 text-[#5f6b70]">
            Add a row to demo_site_content in Supabase.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <WebsiteRenderer content={content} />
    </main>
  );
}