import { useState } from "react";
import { useBuilder } from "@/components/website-manager/BuilderContext";
import { supabase } from "@/lib/supabase";

export default function BuilderTopbar() {
  const { content } = useBuilder();
  const [saving, setSaving] = useState(false);

  async function publishChanges() {
    setSaving(true);

    const { error } = await supabase
      .from("demo_site_content")
      .update({
        business_name: content.business_name,
        hero_headline: content.hero_headline,
        hero_subheadline: content.hero_subheadline,
        about_text: content.about_text,
        phone: content.phone,
        hours: content.hours,

        service_1_title: content.service_1_title,
        service_1_text: content.service_1_text,
        service_2_title: content.service_2_title,
        service_2_text: content.service_2_text,
        service_3_title: content.service_3_title,
        service_3_text: content.service_3_text,

        logo_url: content.logo_url,
        hero_image_url: content.hero_image_url,

        gallery_image_1_url: content.gallery_image_1_url,
        gallery_image_2_url: content.gallery_image_2_url,
        gallery_image_3_url: content.gallery_image_3_url,

        testimonial_1_name: content.testimonial_1_name,
        testimonial_1_text: content.testimonial_1_text,
        testimonial_2_name: content.testimonial_2_name,
        testimonial_2_text: content.testimonial_2_text,
        testimonial_3_name: content.testimonial_3_name,
        testimonial_3_text: content.testimonial_3_text,

        faq_1_question: content.faq_1_question,
        faq_1_answer: content.faq_1_answer,
        faq_2_question: content.faq_2_question,
        faq_2_answer: content.faq_2_answer,
        faq_3_question: content.faq_3_question,
        faq_3_answer: content.faq_3_answer,

        updated_at: new Date().toISOString(),
      })
      .eq("id", content.id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Failed to publish changes.");
      return;
    }

    alert("Published successfully.");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#ded4c3] bg-white px-6">
      <div>
        <h1 className="text-xl font-bold">Website Manager</h1>
        <p className="text-xs text-[#5f6b70]">
          Manage your website content: {content.business_name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/demo"
          target="_blank"
          className="rounded-full border border-[#1f6f8b] px-4 py-2 text-sm font-semibold text-[#1f6f8b]"
        >
          Preview Website
        </a>

        <button
          onClick={publishChanges}
          disabled={saving}
          className="rounded-full bg-[#1f6f8b] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Publishing..." : "Publish Website"}
        </button>
      </div>
    </header>
  );
}