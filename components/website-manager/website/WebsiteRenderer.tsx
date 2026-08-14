import {
  architectureConfigs,
  ArchitectureKey,
} from "@/components/builder/architectures/config";
import HeroSection from "@/components/builder/sections/HeroSection";
import ServicesSection from "@/components/builder/sections/ServiceSection";
import TrustSection from "@/components/builder/sections/TrustSections";
import AboutSection from "@/components/builder/sections/AboutSection";
import ContactSection from "@/components/builder/sections/ContactSection";
import GallerySection from "@/components/builder/sections/GallerySection";
import TestimonialsSection from "@/components/builder/sections/TestimonialsSection";
import FAQSection from "@/components/builder/sections/FAQSection";
import CTASection from "@/components/builder/sections/CTASection";
import { themeStyles } from "@/components/builder/themeStyles";
import type { DemoContent } from "@/components/builder/types";

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
];

export default function WebsiteRenderer({
  content,
}: {
  content: DemoContent;
}) {
  const colorTheme = content.color_theme ?? "modern";
  const layoutPreset = content.layout_preset ?? "split_screen";
  const themeStyle = themeStyles[colorTheme] ?? themeStyles.modern;

  const primary = content.primary_color ?? "#0b2a5b";
  const secondary = content.secondary_color ?? "#f5b400";
  const tertiary = content.tertiary_color ?? "#ffffff";

  const isDark = colorTheme === "dark";

  const architectureKey = (content.industry_architecture ??
    "service") as ArchitectureKey;

  const architecture =
    architectureConfigs[architectureKey] ?? architectureConfigs.service;

  const sectionOrder = content.section_order ?? defaultSections;
  const enabledSections = content.enabled_sections ?? defaultSections;

  const pageBackground = isDark ? "#050505" : tertiary;
  const headerBackground = isDark ? "#050505" : tertiary;
  const textMuted = isDark ? "text-zinc-400" : "text-[#5f6b70]";

  const sectionProps = {
    content,
    primary,
    secondary,
    tertiary,
    isDark,
    layoutPreset,
    themeStyle,
    architecture,
  };

  function renderSection(section: string) {
    if (!enabledSections.includes(section)) return null;

    if (section === "hero") return <HeroSection key="hero" {...sectionProps} />;
    if (section === "services") return <ServicesSection key="services" {...sectionProps} />;
    if (section === "trust") return <TrustSection key="trust" {...sectionProps} />;
    if (section === "about") return <AboutSection key="about" {...sectionProps} />;
    if (section === "contact") return <ContactSection key="contact" {...sectionProps} />;
    if (section === "gallery") return <GallerySection key="gallery" {...sectionProps} />;
    if (section === "testimonials") return <TestimonialsSection key="testimonials" {...sectionProps} />;
    if (section === "faq") return <FAQSection key="faq" {...sectionProps} />;
    if (section === "cta") return <CTASection key="cta" {...sectionProps} />;

    return null;
  }

  return (
    <div
      style={{
        backgroundColor: pageBackground,
        color: isDark ? "#fff" : "#1f2528",
      }}
    >
      <header
        className={`${themeStyle.borderWidth} border-x-0 border-t-0 px-6 py-5`}
        style={{
          borderColor: secondary,
          backgroundColor: headerBackground,
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {content.logo_url ? (
              <img
                src={content.logo_url}
                alt="Logo"
                className="object-contain"
                style={{
                  width: `${content.logo_width ?? 90}px`,
                  height: `${content.logo_width ?? 90}px`,
                  transform: `translate(${content.logo_position_x ?? 0}px, ${
                    content.logo_position_y ?? 0
                  }px)`,
                  borderRadius: `${content.logo_border_radius ?? 0}px`,
                }}
              />
            ) : (
              <div
                className={`flex h-16 w-16 items-center justify-center text-3xl font-bold text-white ${themeStyle.radius}`}
                style={{ backgroundColor: primary }}
              >
                ⚡
              </div>
            )}

            <div>
              <h1
                className="text-xl font-black"
                style={{ color: isDark ? "#fff" : primary }}
              >
                {content.business_name}
              </h1>
              <p className={textMuted}>Demo Website</p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-xs font-bold uppercase md:flex">
            {["Home", "Services", "Gallery", "FAQ", "Contact"].map((item) => (
              <span key={item} style={{ color: isDark ? "#d4d4d8" : primary }}>
                {item}
              </span>
            ))}

            <span
              className={`${themeStyle.buttonRadius} px-4 py-2 text-white`}
              style={{ backgroundColor: primary }}
            >
              {content.nav_button_text || "Request Quote"}
            </span>
          </nav>
        </div>
      </header>

      {sectionOrder.map((section) => renderSection(section))}

      <footer
        className={`${themeStyle.borderWidth} border-x-0 border-b-0 px-6 py-8`}
        style={{
          borderColor: secondary,
          backgroundColor: headerBackground,
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-bold" style={{ color: isDark ? "#fff" : primary }}>
              {content.business_name}
            </h3>

            <p className={`mt-2 text-sm ${textMuted}`}>
              {content.footer_tagline || "Professional service. Reliable results."}
            </p>
          </div>

          <div className={`text-sm ${textMuted}`}>
            © {new Date().getFullYear()} {content.business_name}
          </div>
        </div>

        {(content.footer_show_powered_by ?? true) && (
          <div
            className={`${themeStyle.borderWidth} mt-6 border-x-0 border-b-0 pt-4 text-center text-xs`}
            style={{
              borderColor: secondary,
              color: isDark ? "#71717a" : primary,
            }}
          >
            Powered by A Frame Automation
          </div>
        )}
      </footer>
    </div>
  );
}