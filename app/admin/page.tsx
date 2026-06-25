"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/lib/supabase";

type DemoContent = {
  id: string;
  business_name: string;
  hero_headline: string;
  hero_subheadline: string;
  about_text: string;
  announcement: string | null;
  phone: string | null;
  hours: string | null;
  service_1_title: string | null;
  service_1_text: string | null;
  service_2_title: string | null;
  service_2_text: string | null;
  service_3_title: string | null;
  service_3_text: string | null;
  selected_theme: string | null;
  hero_layout: string | null;
  primary_color: string | null;
  accent_color: string | null;
  logo_url: string | null;
  logo_width: number | null;
  logo_position_x: number | null;
  logo_position_y: number | null;
  logo_border_radius: number | null;
  hero_image_url: string | null;
  hero_image_height: number | null;
  hero_image_zoom: number | null;
  hero_image_position_x: number | null;
  hero_image_position_y: number | null;
  enabled_sections: string[] | null;
  section_order: string[] | null;
};

const defaultSections = [
  "hero",
  "services",
  "about",
  "gallery",
  "testimonials",
  "faq",
  "trust",
  "cta",
  "contact",
]

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  services: "Services",
  about: "About",
  trust: "Trust",
  contact: "Contact",
};

const themes = {
  industrial_modern: {
    page: "bg-white text-[#061432]",
    header: "bg-white border-b border-slate-200",
    eyebrow: "text-[#0b2a5b]",
    hero: "bg-white",
    heroTitle: "text-[#061432]",
    heroText: "text-slate-700",
    button: "bg-[#0b2a5b] text-white hover:bg-[#071b3d]",
    outlineButton: "border border-[#0b2a5b] text-[#0b2a5b]",
    card: "bg-white border border-slate-200 shadow-sm",
    darkBand: "bg-[#0b2a5b] text-white",
    accent: "#f5b400",
  },
  clean_local: {
    page: "bg-[#f7f4ef] text-[#1f2528]",
    header: "bg-white border-b border-[#ded4c3]",
    eyebrow: "text-[#1f6f8b]",
    hero: "bg-[#f7f4ef]",
    heroTitle: "text-[#1f2528]",
    heroText: "text-[#5f6b70]",
    button: "bg-[#1f6f8b] text-white hover:bg-[#195a70]",
    outlineButton: "border border-[#1f6f8b] text-[#1f6f8b]",
    card: "bg-white border border-[#ded4c3] shadow-sm",
    darkBand: "bg-[#1f2528] text-white",
    accent: "#1f6f8b",
  },
  dark_storm: {
    page: "bg-black text-white",
    header: "bg-black border-b border-white/10",
    eyebrow: "text-yellow-400",
    hero: "bg-black",
    heroTitle: "text-white",
    heroText: "text-zinc-300",
    button: "bg-yellow-400 text-black hover:bg-yellow-300",
    outlineButton: "border border-yellow-400 text-yellow-400",
    card: "bg-zinc-950 border border-white/10 shadow-sm",
    darkBand: "bg-zinc-950 text-white",
    accent: "#facc15",
  },
};

type ThemeKey = keyof typeof themes;

export default function AdminPage() {
  const [content, setContent] = useState<DemoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase
        .from("demo_site_content")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error(error);
      } else {
        setContent(data as DemoContent);
      }

      setLoading(false);
    }

    loadContent();
  }, []);

  function updateField<K extends keyof DemoContent>(
    field: K,
    value: DemoContent[K]
  ) {
    if (!content) return;

    setContent({
      ...content,
      [field]: value,
    });
  }

  function toggleSection(section: string) {
    if (!content) return;

    const current = content.enabled_sections ?? defaultSections;

    const updated = current.includes(section)
      ? current.filter((item) => item !== section)
      : [...current, section];

    setContent({
      ...content,
      enabled_sections: updated,
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!content) return;

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const currentOrder = content.section_order ?? defaultSections;

    const oldIndex = currentOrder.indexOf(active.id as string);
    const newIndex = currentOrder.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) return;

    setContent({
      ...content,
      section_order: arrayMove(currentOrder, oldIndex, newIndex),
    });
  }

  async function uploadHeroImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !content) return;

    setUploading(true);

    const fileName = `hero-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("demo-assets")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      console.error(error);
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("demo-assets").getPublicUrl(fileName);

    setContent({
      ...content,
      hero_image_url: publicUrl,
    });

    setUploading(false);
  }

  async function uploadLogo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !content) return;

    setUploading(true);

    const fileName = `logo-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("demo-assets")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      console.error(error);
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("demo-assets").getPublicUrl(fileName);

    setContent({
      ...content,
      logo_url: publicUrl,
    });

    setUploading(false);
  }

  function deleteHeroImage() {
    if (!content) return;

    setContent({
      ...content,
      hero_image_url: null,
    });
  }

  function deleteLogo() {
    if (!content) return;

    setContent({
      ...content,
      logo_url: null,
    });
  }

  async function saveContent() {
    if (!content) return;

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
        hero_image_height: content.hero_image_height,
        hero_image_zoom: content.hero_image_zoom,
        hero_image_position_x: content.hero_image_position_x,
        hero_image_position_y: content.hero_image_position_y,
        enabled_sections: content.enabled_sections,
        section_order: content.section_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", content.id);

    setSaving(false);

    if (error) {
      alert("Failed to save changes.");
      console.error(error);
      return;
    }

    alert("Saved! The public /demo page now has these changes.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] p-10 text-[#1f2528]">
        Loading admin...
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] p-10 text-[#1f2528]">
        Demo content not found.
      </main>
    );
  }

  const sectionOrder = content.section_order ?? defaultSections;

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1f2528]">
      <header className="sticky top-0 z-50 border-b border-[#ded4c3] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Demo Website Admin</h1>
            <p className="text-sm text-[#5f6b70]">
              Edit content, layout, images, and website structure live.
            </p>
          </div>

          <a
            href="/demo"
            target="_blank"
            className="rounded-full border border-[#1f6f8b] px-5 py-2 font-semibold text-[#1f6f8b]"
          >
            Open Public Demo
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_520px]">
        <div className="grid gap-6">
          <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
            <h2 className="text-xl font-bold">Live Website Editor</h2>
            <p className="mt-2 text-[#5f6b70]">
              The preview on the right updates immediately as you edit. Click
              Save Changes when you're ready to publish to the public /demo page.
            </p>
          </div>

          <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
            <h3 className="text-xl font-bold">Website Style</h3>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-semibold">Theme Preset</span>
                <select
                  value={content.selected_theme ?? "clean_local"}
                  onChange={(event) =>
                    updateField("selected_theme", event.target.value)
                  }
                  className="rounded-xl border border-[#ded4c3] p-3"
                >
                  <option value="clean_local">Clean Local</option>
                  <option value="industrial_modern">Industrial Modern</option>
                  <option value="dark_storm">Dark Storm</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="font-semibold">Hero Layout</span>
                <select
                  value={content.hero_layout ?? "split"}
                  onChange={(event) =>
                    updateField("hero_layout", event.target.value)
                  }
                  className="rounded-xl border border-[#ded4c3] p-3"
                >
                  <option value="split">Split Layout</option>
                  <option value="centered">Centered Layout</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
            <h3 className="text-xl font-bold">Hero Image</h3>

            <p className="mt-2 text-[#5f6b70]">
              Upload an image, then use the sliders to resize and position it
              directly in the live preview.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={uploadHeroImage}
              className="mt-5"
            />

            {uploading && (
              <p className="mt-3 text-sm text-[#5f6b70]">Uploading...</p>
            )}

            {content.hero_image_url && (
              <div className="mt-5">
                <img
                  src={content.hero_image_url}
                  alt="Hero Preview"
                  className="h-44 w-full rounded-xl object-cover"
                />

                <button
                  type="button"
                  onClick={deleteHeroImage}
                  className="mt-3 rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete Hero Image
                </button>
              </div>
            )}

            <div className="mt-6 grid gap-5">
              <SliderControl
                label="Image Height"
                value={content.hero_image_height ?? 420}
                min={260}
                max={720}
                step={10}
                suffix="px"
                onChange={(value) =>
                  updateField("hero_image_height", value as DemoContent["hero_image_height"])
                }
              />

              <SliderControl
                label="Zoom / Resize"
                value={Number(content.hero_image_zoom ?? 1)}
                min={1}
                max={2.5}
                step={0.05}
                suffix="x"
                onChange={(value) =>
                  updateField("hero_image_zoom", value as DemoContent["hero_image_zoom"])
                }
              />

              <SliderControl
                label="Horizontal Position"
                value={content.hero_image_position_x ?? 50}
                min={0}
                max={100}
                step={1}
                suffix="%"
                onChange={(value) =>
                  updateField("hero_image_position_x", value as DemoContent["hero_image_position_x"])
                }
              />

              <SliderControl
                label="Vertical Position"
                value={content.hero_image_position_y ?? 50}
                min={0}
                max={100}
                step={1}
                suffix="%"
                onChange={(value) =>
                  updateField("hero_image_position_y", value as DemoContent["hero_image_position_y"])
                }
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
            <h3 className="text-xl font-bold">Logo Studio</h3>

            <p className="mt-2 text-[#5f6b70]">
              Upload the business logo, then resize and position it in the live preview.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={uploadLogo}
              className="mt-5"
            />

            {content.logo_url && (
              <div className="mt-5">
                <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-5">
                  <p className="mb-3 text-sm font-semibold text-[#5f6b70]">
                    Logo Preview
                  </p>

                  <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-xl bg-white p-4">
                    <img
                      src={content.logo_url}
                      alt="Logo Preview"
                      className="object-contain"
                      style={{
                        width: `${content.logo_width ?? 90}px`,
                        transform: `translate(${content.logo_position_x ?? 0}px, ${
                          content.logo_position_y ?? 0
                        }px)`,
                        borderRadius: `${content.logo_border_radius ?? 0}px`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-5">
                  <SliderControl
                    label="Logo Size"
                    value={content.logo_width ?? 90}
                    min={40}
                    max={260}
                    step={5}
                    suffix="px"
                    onChange={(value) => updateField("logo_width", value)}
                  />

                  <SliderControl
                    label="Horizontal Position"
                    value={content.logo_position_x ?? 0}
                    min={-80}
                    max={80}
                    step={1}
                    suffix="px"
                    onChange={(value) => updateField("logo_position_x", value)}
                  />

                  <SliderControl
                    label="Vertical Position"
                    value={content.logo_position_y ?? 0}
                    min={-80}
                    max={80}
                    step={1}
                    suffix="px"
                    onChange={(value) => updateField("logo_position_y", value)}
                  />

                  <SliderControl
                    label="Corner Roundness"
                    value={content.logo_border_radius ?? 0}
                    min={0}
                    max={80}
                    step={2}
                    suffix="px"
                    onChange={(value) => updateField("logo_border_radius", value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={deleteLogo}
                  className="mt-5 rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete Logo
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
            <h3 className="text-xl font-bold">Page Sections</h3>

            <p className="mt-2 text-[#5f6b70]">
              Show, hide, and drag sections to change the order of the public
              demo website.
            </p>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="font-semibold">Visible Sections</h4>

                <div className="mt-4 grid gap-3">
                  {defaultSections.map((section) => (
                    <label
                      key={section}
                      className="flex items-center gap-3 rounded-xl border border-[#ded4c3] p-3"
                    >
                      <input
                        type="checkbox"
                        checked={(content.enabled_sections ?? []).includes(
                          section
                        )}
                        onChange={() => toggleSection(section)}
                      />
                      {sectionLabels[section]}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Section Order</h4>

                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sectionOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="mt-4 grid gap-3">
                      {sectionOrder.map((section) => (
                        <SortableSectionItem
                          key={section}
                          id={section}
                          label={sectionLabels[section]}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>

          <AdminInput
            label="Business Name"
            value={content.business_name}
            onChange={(value) => updateField("business_name", value)}
          />

          <AdminInput
            label="Hero Headline"
            value={content.hero_headline}
            onChange={(value) => updateField("hero_headline", value)}
          />

          <AdminTextarea
            label="Hero Subheadline"
            value={content.hero_subheadline}
            onChange={(value) => updateField("hero_subheadline", value)}
          />

          <AdminTextarea
            label="About Text"
            value={content.about_text}
            onChange={(value) => updateField("about_text", value)}
          />

          <AdminInput
            label="Announcement"
            value={content.announcement ?? ""}
            onChange={(value) => updateField("announcement", value)}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Phone"
              value={content.phone ?? ""}
              onChange={(value) => updateField("phone", value)}
            />

            <AdminInput
              label="Hours"
              value={content.hours ?? ""}
              onChange={(value) => updateField("hours", value)}
            />
          </div>

          <ServiceEditor
            number={1}
            title={content.service_1_title ?? ""}
            text={content.service_1_text ?? ""}
            onTitleChange={(value) => updateField("service_1_title", value)}
            onTextChange={(value) => updateField("service_1_text", value)}
          />

          <ServiceEditor
            number={2}
            title={content.service_2_title ?? ""}
            text={content.service_2_text ?? ""}
            onTitleChange={(value) => updateField("service_2_title", value)}
            onTextChange={(value) => updateField("service_2_text", value)}
          />

          <ServiceEditor
            number={3}
            title={content.service_3_title ?? ""}
            text={content.service_3_text ?? ""}
            onTitleChange={(value) => updateField("service_3_title", value)}
            onTextChange={(value) => updateField("service_3_text", value)}
          />

          <button
            onClick={saveContent}
            disabled={saving}
            className="rounded-full bg-[#1f6f8b] px-8 py-4 font-semibold text-white hover:bg-[#195a70] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <div className="rounded-2xl border border-[#ded4c3] bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">Live Preview</h3>
                <p className="text-xs text-[#5f6b70]">
                  Updates immediately before saving.
                </p>
              </div>

              <a
                href="/demo"
                target="_blank"
                className="rounded-full border border-[#1f6f8b] px-3 py-2 text-xs font-semibold text-[#1f6f8b]"
              >
                Open
              </a>
            </div>

            <div className="h-[720px] overflow-y-auto rounded-xl border border-[#ded4c3] bg-white">
              <LivePreview content={content} />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function LivePreview({ content }: { content: DemoContent }) {
  const selectedTheme = (content.selected_theme ?? "clean_local") as ThemeKey;
  const theme = themes[selectedTheme] ?? themes.clean_local;

  const enabledSections = content.enabled_sections ?? defaultSections;
  const sectionOrder = content.section_order ?? defaultSections;
  const isCentered = content.hero_layout === "centered";

  const services = [
    { title: content.service_1_title, text: content.service_1_text },
    { title: content.service_2_title, text: content.service_2_text },
    { title: content.service_3_title, text: content.service_3_text },
  ];

  function renderSection(section: string) {
    if (!enabledSections.includes(section)) return null;

    if (section === "hero") {
      return (
        <section key="hero" className={`relative overflow-hidden p-6 ${theme.hero}`}>
          {selectedTheme === "dark_storm" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(250,204,21,0.18),transparent_30%),linear-gradient(120deg,rgba(0,0,0,1),rgba(12,18,32,1))]" />
          )}

          <div
            className={`relative grid gap-5 ${
              isCentered ? "text-center" : "grid-cols-1"
            }`}
          >
            <div>
              {content.announcement && (
                <p className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.card}`}>
                  {content.announcement}
                </p>
              )}

              <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.2em] ${theme.eyebrow}`}>
                Local. Trusted. Reliable.
              </p>

              <h2 className={`text-3xl font-black uppercase leading-tight ${theme.heroTitle}`}>
                {content.hero_headline}
              </h2>

              <p className={`mt-4 text-sm leading-6 ${theme.heroText}`}>
                {content.hero_subheadline}
              </p>

              <div className={`mt-5 flex flex-col gap-2 ${isCentered ? "items-center" : ""}`}>
                <span className={`rounded-md px-4 py-2 text-center text-xs font-bold uppercase ${theme.button}`}>
                  Request a Quote
                </span>
                <span className={`rounded-md px-4 py-2 text-center text-xs font-bold uppercase ${theme.outlineButton}`}>
                  Our Services
                </span>
              </div>
            </div>

            <HeroImagePreview content={content} theme={theme} selectedTheme={selectedTheme} />
          </div>
        </section>
      );
    }

    if (section === "services") {
      return (
        <section key="services" className="p-6">
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.eyebrow}`}>
            Services
          </p>
          <h2 className="mt-2 text-2xl font-black">What We Offer</h2>

          <div className="mt-5 grid gap-4">
            {services.map((service) => (
              <div key={service.title} className={`rounded-xl p-4 ${theme.card}`}>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className={`mt-2 text-sm leading-6 ${theme.heroText}`}>
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (section === "about") {
      return (
        <section key="about" className={`p-6 ${theme.darkBand}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
            About
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Local Service. Professional Results.
          </h2>
          <p className="mt-4 text-sm leading-6 opacity-80">
            {content.about_text}
          </p>
        </section>
      );
    }

    if (section === "trust") {
      return (
        <section key="trust" className="grid gap-3 p-6">
          {["Licensed", "Insured", "Experienced", content.phone ?? "Call Today"].map((item) => (
            <div key={item} className={`rounded-xl p-4 text-center text-sm font-bold ${theme.card}`}>
              {item}
            </div>
          ))}
        </section>
      );
    }

    if (section === "contact") {
      return (
        <section key="contact" className={`p-6 ${theme.darkBand}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-black">Request a Quote</h2>
          <div className="mt-5 rounded-xl bg-white p-4 text-[#1f2528]">
            <p className="text-sm">
              <strong>Phone:</strong> {content.phone}
            </p>
            <p className="mt-2 text-sm">
              <strong>Hours:</strong> {content.hours}
            </p>
          </div>
        </section>
      );
    }

    return null;
  }

  return (
    <main className={`min-h-full ${theme.page}`}>
      <header className={theme.header}>
        <div className="flex items-center gap-3 p-4">
          {content.logo_url ? (
            <img
              src={content.logo_url}
              alt={`${content.business_name} logo`}
              className="object-contain"
              style={{
                width: `${content.logo_width ?? 90}px`,
                transform: `translate(${content.logo_position_x ?? 0}px, ${
                  content.logo_position_y ?? 0
                }px)`,
                borderRadius: `${content.logo_border_radius ?? 0}px`,
              }}
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black"
              style={{
                backgroundColor: theme.accent,
                color: selectedTheme === "dark_storm" ? "#000" : "#fff",
              }}
            >
              ⚡
            </div>
          )}

          <div>
            <h1 className="text-lg font-black">{content.business_name}</h1>
            <p className={`text-xs ${theme.heroText}`}>Demo Website</p>
          </div>
        </div>
      </header>

      {sectionOrder.map((section) => renderSection(section))}

      <footer className={`${theme.header} p-4`}>
        <p className="text-sm font-bold">{content.business_name}</p>
        <p className={`text-xs ${theme.heroText}`}>
          Powered by A Frame Automation
        </p>
      </footer>
    </main>
  );
}

function HeroImagePreview({
  content,
  theme,
  selectedTheme,
}: {
  content: DemoContent;
  theme: (typeof themes)[ThemeKey];
  selectedTheme: ThemeKey;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl ${
        selectedTheme === "dark_storm"
          ? "border border-white/10"
          : "border border-slate-200"
      }`}
      style={{
        height: `${content.hero_image_height ?? 420}px`,
      }}
    >
      {content.hero_image_url ? (
        <img
          src={content.hero_image_url}
          alt={content.business_name}
          className="h-full w-full object-cover"
          style={{
            objectPosition: `${content.hero_image_position_x ?? 50}% ${
              content.hero_image_position_y ?? 50
            }%`,
            transform: `scale(${content.hero_image_zoom ?? 1})`,
            transformOrigin: `${content.hero_image_position_x ?? 50}% ${
              content.hero_image_position_y ?? 50
            }%`,
          }}
        />
      ) : (
        <div className={`flex h-full items-center justify-center p-6 text-center ${theme.card}`}>
          <div>
            <div className="text-4xl font-black">⚡</div>
            <p className="mt-3 text-sm font-semibold">Hero image placeholder</p>
            <p className="mt-2 text-xs opacity-70">Upload a hero image.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 rounded-2xl border border-[#ded4c3] bg-white p-5">
      <span className="font-semibold">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#ded4c3] p-3"
      />
    </label>
  );
}

function AdminTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 rounded-2xl border border-[#ded4c3] bg-white p-5">
      <span className="font-semibold">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 rounded-xl border border-[#ded4c3] p-3"
      />
    </label>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <span className="text-sm text-[#5f6b70]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ServiceEditor({
  number,
  title,
  text,
  onTitleChange,
  onTextChange,
}: {
  number: number;
  title: string;
  text: string;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#ded4c3] bg-white p-6">
      <h3 className="text-xl font-bold">Service {number}</h3>
      <div className="mt-5 grid gap-5">
        <AdminInput
          label={`Service ${number} Title`}
          value={title}
          onChange={onTitleChange}
        />
        <AdminTextarea
          label={`Service ${number} Text`}
          value={text}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
}

function SortableSectionItem({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex cursor-grab items-center justify-between rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4 font-semibold active:cursor-grabbing"
    >
      <span>{label}</span>
      <span className="text-[#5f6b70]">☰</span>
    </div>
  );
}
