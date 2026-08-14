import type { SectionProps, ThemeStyle } from "./types";

export default function ServicesSection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  layoutPreset,
  themeStyle,
  architecture,
}: SectionProps) {
  const services = [
    [content.service_1_title, content.service_1_text],
    [content.service_2_title, content.service_2_text],
    [content.service_3_title, content.service_3_text],
  ].filter(([title, text]) => title || text);

  const isMasonry = layoutPreset === "masonry";
  const isCardBlock = layoutPreset === "card_block";
  const isShowcase = layoutPreset === "showcase";
  const isSplit = layoutPreset === "split_screen";
  const isMagazine = layoutPreset === "magazine";

  const sectionBg = isDark ? "#09090b" : isShowcase ? tertiary : "#ffffff";

  if (isSplit || isMagazine) {
    return (
      <section
        className={`grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start ${themeStyle.sectionPadding}`}
        style={{ backgroundColor: sectionBg }}
      >
        <div>
          <p
            className="text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color: secondary }}
          >
            Services
          </p>

          <h2
            className="mt-3 text-4xl font-black"
            style={{ color: isDark ? "#fff" : primary }}
          >
            {architecture.servicesTitle}
          </h2>

          <p
            className={`mt-5 leading-7 ${
              isDark ? "text-zinc-400" : "text-[#5f6b70]"
            }`}
          >
            Choose this layout when the business needs a strong service overview
            with detailed cards beside it.
          </p>
        </div>

        <div className="grid gap-4">
          {services.map(([title, text], index) => (
            <ServiceCard
              key={index}
              title={title}
              text={text}
              primary={primary}
              secondary={secondary}
              isDark={isDark}
              variant={isMagazine ? "magazine" : "horizontal"}
              index={index}
              themeStyle={themeStyle}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={themeStyle.sectionPadding}
      style={{ backgroundColor: sectionBg }}
    >
      <div className={isShowcase ? "mx-auto max-w-5xl text-center" : ""}>
        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: secondary }}
        >
          Services
        </p>

        <h2
          className={`mt-3 font-black ${
            isShowcase ? "text-5xl" : "text-3xl"
          }`}
          style={{ color: isDark ? "#fff" : primary }}
        >
          {architecture.servicesTitle}
        </h2>
      </div>

      <div
        className={`mt-8 grid gap-4 ${
          isMasonry ? "md:grid-cols-2" : "md:grid-cols-3"
        }`}
      >
        {services.map(([title, text], index) => (
          <ServiceCard
            key={index}
            title={title}
            text={text}
            primary={primary}
            secondary={secondary}
            isDark={isDark}
            variant={isCardBlock || isShowcase ? "elevated" : "standard"}
            index={index}
            masonry={isMasonry}
            themeStyle={themeStyle}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  text,
  primary,
  secondary,
  isDark,
  variant,
  index,
  themeStyle,
  masonry = false,
}: {
  title: string | null;
  text: string | null;
  primary: string;
  secondary: string;
  isDark: boolean;
  variant: "standard" | "elevated" | "horizontal" | "magazine";
  index: number;
  themeStyle: ThemeStyle;
  masonry?: boolean;
}) {
  const baseBg = isDark ? "#000" : "#f7f4ef";
  const elevatedBg = isDark ? "#111827" : "#ffffff";

  return (
    <div
      className={`${themeStyle.radius} ${themeStyle.borderWidth} ${
        themeStyle.cardPadding
      } ${
        variant === "elevated" ? themeStyle.cardShadow : ""
      } ${
        variant === "horizontal" || variant === "magazine"
          ? "md:flex md:gap-5"
          : ""
      }`}
      style={{
        borderColor: secondary,
        backgroundColor: variant === "elevated" ? elevatedBg : baseBg,
        minHeight: masonry && index % 2 === 0 ? "220px" : undefined,
      }}
    >
      <div
        className={`mb-4 flex h-12 w-12 shrink-0 items-center justify-center font-black ${themeStyle.buttonRadius}`}
        style={{
          backgroundColor: secondary,
          color: "#111",
        }}
      >
        {index + 1}
      </div>

      <div>
        <h3
          className="font-bold"
          style={{ color: isDark ? "#fff" : primary }}
        >
          {title}
        </h3>

        <p
          className={`mt-3 text-sm leading-6 ${
            isDark ? "text-zinc-400" : "text-[#5f6b70]"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}