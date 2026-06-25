import { useState } from "react";
import { useBuilder } from "@/components/builder/BuilderContext";
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
        announcement: content.announcement,
        phone: content.phone,
        hours: content.hours,

        service_1_title: content.service_1_title,
        service_1_text: content.service_1_text,
        service_2_title: content.service_2_title,
        service_2_text: content.service_2_text,
        service_3_title: content.service_3_title,
        service_3_text: content.service_3_text,
        
        industry_architecture: content.industry_architecture,
        color_theme: content.color_theme,
        layout_preset: content.layout_preset,
        secondary_color: content.secondary_color,
        tertiary_color: content.tertiary_color,

        selected_theme: content.selected_theme,
        hero_layout: content.hero_layout,
        primary_color: content.primary_color,
        accent_color: content.accent_color,

        logo_url: content.logo_url,
        logo_width: content.logo_width,
        logo_position_x: content.logo_position_x,
        logo_position_y: content.logo_position_y,
        logo_border_radius: content.logo_border_radius,

        hero_image_url: content.hero_image_url,
        hero_media_type: content.hero_media_type,
        hero_video_url: content.hero_video_url,
        hero_image_height: content.hero_image_height,
        hero_image_zoom: content.hero_image_zoom,
        hero_image_position_x: content.hero_image_position_x,
        hero_image_position_y: content.hero_image_position_y,

        gallery_title: content.gallery_title,

        gallery_image_1_url: content.gallery_image_1_url,
        gallery_image_2_url: content.gallery_image_2_url,
        gallery_image_3_url: content.gallery_image_3_url,

        nav_button_text: content.nav_button_text,
        nav_button_link: content.nav_button_link,

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

        cta_headline: content.cta_headline,
        cta_description: content.cta_description,
        cta_button_text: content.cta_button_text,

        footer_tagline: content.footer_tagline,
        footer_show_powered_by: content.footer_show_powered_by,

        enabled_sections: content.enabled_sections,
        section_order: content.section_order,

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
        <h1 className="text-xl font-bold">A Frame Studio</h1>
        <p className="text-xs text-[#5f6b70]">
          Editing: {content.business_name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/demo"
          target="_blank"
          className="rounded-full border border-[#1f6f8b] px-4 py-2 text-sm font-semibold text-[#1f6f8b]"
        >
          View Live Site
        </a>

        <button
          onClick={publishChanges}
          disabled={saving}
          className="rounded-full bg-[#1f6f8b] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>
    </header>
  );
}