import type { SectionProps } from "./types";

export default function TestimonialsSection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  layoutPreset,
  themeStyle,
}: SectionProps) {
  const testimonials = [
    {
      name: content.testimonial_1_name,
      text: content.testimonial_1_text,
    },
    {
      name: content.testimonial_2_name,
      text: content.testimonial_2_text,
    },
    {
      name: content.testimonial_3_name,
      text: content.testimonial_3_text,
    },
  ].filter((item) => item.name || item.text);

  const isMasonry = layoutPreset === "masonry";
  const isShowcase = layoutPreset === "showcase";
  const isMagazine = layoutPreset === "magazine";
  const isCardBlock = layoutPreset === "card_block";
  const isCentered = layoutPreset === "centered";

  return (
    <section
      className={themeStyle.sectionPadding}
      style={{
        backgroundColor: isDark ? "#09090b" : tertiary,
      }}
    >
      <div className={isCentered || isShowcase ? "mx-auto max-w-4xl text-center" : ""}>
        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: secondary }}
        >
          Reviews
        </p>

        <h2
          className={isShowcase ? "mt-3 text-5xl font-black" : "mt-3 text-3xl font-black"}
          style={{ color: isDark ? "#fff" : primary }}
        >
          What Customers Say
        </h2>
      </div>

      <div
        className={`mt-8 grid gap-4 ${
          isMasonry
            ? "md:grid-cols-2"
            : isMagazine
            ? "md:grid-cols-[1.3fr_0.9fr]"
            : "md:grid-cols-3"
        }`}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`
              ${themeStyle.radius}
              ${themeStyle.borderWidth}
              ${themeStyle.cardPadding}
              ${
                isCardBlock || isShowcase
                  ? themeStyle.cardShadow
                  : ""
              }
              ${
                isMagazine && index === 0
                  ? "md:row-span-2"
                  : ""
              }
            `}
            style={{
              borderColor: secondary,
              backgroundColor: isDark ? "#000" : "#fff",
              minHeight:
                isMasonry && index % 2 === 0
                  ? "240px"
                  : isMagazine && index === 0
                  ? "260px"
                  : undefined,
            }}
          >
            <div
              className={`
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                font-black
                ${themeStyle.buttonRadius}
              `}
              style={{
                backgroundColor: secondary,
                color: "#111",
              }}
            >
              ★
            </div>

            <p
              className={`text-lg leading-8 ${
                isDark ? "text-zinc-300" : "text-[#1f2528]"
              }`}
            >
              “{item.text}”
            </p>

            <p
              className="mt-4 font-bold"
              style={{
                color: isDark ? "#fff" : primary,
              }}
            >
              — {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}