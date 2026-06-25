import type { SectionProps } from "./types";

export default function ContactSection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
}: SectionProps) {
  return (
    <section
      className="px-6 py-14"
      style={{
        backgroundColor: isDark ? "#050505" : tertiary,
      }}
    >
      <p
        className="text-sm font-bold uppercase tracking-[0.25em]"
        style={{ color: secondary }}
      >
        Contact
      </p>

      <h2
        className="mt-3 text-3xl font-black"
        style={{
          color: isDark ? "#fff" : primary,
        }}
      >
        Request a Quote
      </h2>

      <p
        className="mt-5 max-w-2xl text-lg leading-8"
        style={{
          color: isDark ? "#d4d4d8" : "#5f6b70",
        }}
      >
        This demo can be connected to quote forms, scheduling tools,
        payments, file uploads, admin portals, and customer dashboards.
      </p>

      <div
        className="mt-6 rounded-2xl border p-6"
        style={{
          borderColor: secondary,
          backgroundColor: isDark ? "#0b0b0b" : "#ffffff",
        }}
      >
        <p
          style={{
            color: isDark ? "#fff" : primary,
          }}
        >
          <strong>Phone:</strong> {content.phone}
        </p>

        <p
          className="mt-3"
          style={{
            color: isDark ? "#d4d4d8" : "#5f6b70",
          }}
        >
          <strong>Hours:</strong> {content.hours}
        </p>

        <button
          className="mt-6 rounded-xl px-5 py-3 font-bold text-white"
          style={{
            backgroundColor: primary,
          }}
        >
          {content.nav_button_text || "Request Quote"}
        </button>
      </div>
    </section>
  );
}