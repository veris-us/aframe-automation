import type { SectionProps } from "./types";

export default function CTASection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  themeStyle,
}: SectionProps) {
  return (
    <section
      className={themeStyle.sectionPadding}
      style={{
        backgroundColor: isDark ? "#050505" : tertiary,
      }}
    >
      <div
        className={`
          mx-auto
          max-w-5xl
          text-center
          ${themeStyle.radius}
          ${themeStyle.borderWidth}
          ${themeStyle.cardPadding}
          ${themeStyle.cardShadow}
        `}
        style={{
          backgroundColor: primary,
          borderColor: secondary,
        }}
      >
        <h2 className="text-3xl font-black text-white">
          {content.cta_headline || "Ready to get started?"}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/85">
          {content.cta_description ||
            "Contact us today and we'll help you build the right solution."}
        </p>

        <button
          className={`
            mt-8
            px-7
            py-3
            font-bold
            uppercase
            transition-all
            duration-300
            hover:scale-105
            ${themeStyle.buttonRadius}
            ${themeStyle.cardShadow}
          `}
          style={{
            backgroundColor: secondary,
            color: "#111827",
          }}
        >
          {content.cta_button_text || "Start Now"}
        </button>
      </div>
    </section>
  );
}