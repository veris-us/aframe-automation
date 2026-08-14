import type { SectionProps } from "./types";

export default function TrustSection({
  primary,
  secondary,
  tertiary,
  isDark,
  themeStyle,
  architecture,
}: SectionProps) {
  return (
    <section
      className={themeStyle.sectionPadding}
      style={{
        backgroundColor: isDark ? "#050505" : tertiary,
      }}
    >
      <p
        className="text-center text-sm font-bold uppercase tracking-[0.25em]"
        style={{
          color: secondary,
        }}
      >
        Why Choose Us
      </p>

      <h2
        className="mt-3 text-center text-3xl font-black"
        style={{
          color: isDark ? "#fff" : primary,
        }}
      >
        Trusted By Our Customers
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-4">
        {architecture.trustItems.map((item) => (
          <div
            key={item}
            className={`
              flex
              min-h-[130px]
              items-center
              justify-center
              text-center
              font-bold
              transition-all
              duration-300
              hover:-translate-y-1
              ${themeStyle.radius}
              ${themeStyle.borderWidth}
              ${themeStyle.cardPadding}
              ${themeStyle.cardShadow}
            `}
            style={{
              borderColor: secondary,
              backgroundColor: isDark ? "#0b0b0b" : "#ffffff",
              color: isDark ? "#ffffff" : primary,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}