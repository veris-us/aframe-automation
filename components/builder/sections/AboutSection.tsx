import type { SectionProps } from "./types";

export default function AboutSection({
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
        backgroundColor: isDark ? "#000" : tertiary,
      }}
    >
      <p
        className="text-sm font-bold uppercase tracking-[0.25em]"
        style={{
          color: secondary,
        }}
      >
        About
      </p>

      <h2
        className="mt-3 text-3xl font-black"
        style={{
          color: isDark ? "#fff" : primary,
        }}
      >
        Local Service. Professional Results.
      </h2>

      <div
        className={`
          mt-8
          max-w-4xl
          ${themeStyle.radius}
          ${themeStyle.borderWidth}
          ${themeStyle.cardPadding}
          ${themeStyle.cardShadow}
        `}
        style={{
          borderColor: secondary,
          backgroundColor: isDark ? "#0b0b0b" : "#ffffff",
        }}
      >
        <p
          className="text-lg leading-8"
          style={{
            color: isDark ? "#d4d4d8" : "#5f6b70",
          }}
        >
          {content.about_text}
        </p>
      </div>
    </section>
  );
}