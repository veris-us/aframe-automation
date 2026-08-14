import type { SectionProps } from "./types";

export default function HeroSection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  layoutPreset,
  themeStyle,
  architecture,
}: SectionProps) {
  const bg = isDark ? "#050505" : tertiary;
  const textColor = isDark ? "#fff" : primary;
  const mutedText = isDark ? "text-zinc-300" : "text-[#5f6b70]";

  const heroMediaType = content.hero_media_type ?? "image";
  const hasHeroVideo = heroMediaType === "video" && content.hero_video_url;
  const hasHeroImage = content.hero_image_url;

  const mediaElement = hasHeroVideo ? (
    <video
      src={content.hero_video_url ?? ""}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      style={{
        objectPosition: `${content.hero_image_position_x ?? 50}% ${
          content.hero_image_position_y ?? 50
        }%`,
      }}
    />
  ) : hasHeroImage ? (
    <img
      src={content.hero_image_url ?? ""}
      alt="Hero"
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
    <div className="grid h-full place-items-center text-center text-[#5f6b70]">
      <div>
        <div className="text-5xl">⚡</div>
        <p className="mt-3 font-semibold">Hero media placeholder</p>
      </div>
    </div>
  );

  const image = (
    <div
      className={`overflow-hidden bg-white ${themeStyle.borderWidth} ${themeStyle.radius} ${themeStyle.cardShadow}`}
      style={{
        height: `${content.hero_image_height ?? 420}px`,
        borderColor: secondary,
      }}
    >
      {mediaElement}
    </div>
  );

  const copy = (
    <div>
      <p
        className={`mb-4 inline-flex px-4 py-2 text-sm font-semibold ${themeStyle.buttonRadius}`}
        style={{ backgroundColor: secondary, color: "#111" }}
      >
        {architecture.heroBadge}
      </p>

      <h2
        className={
          layoutPreset === "showcase" ||
          layoutPreset === "asymmetrical" ||
          layoutPreset === "full_width_overlay"
            ? "text-5xl font-black uppercase leading-tight md:text-6xl"
            : "text-4xl font-black uppercase leading-tight md:text-5xl"
        }
        style={{ color: textColor }}
      >
        {content.hero_headline}
      </h2>

      <p className={`mt-5 text-lg leading-8 ${mutedText}`}>
        {content.hero_subheadline}
      </p>

      <button
        className={`mt-7 px-6 py-3 font-bold uppercase text-white ${themeStyle.buttonRadius} ${themeStyle.cardShadow}`}
        style={{ backgroundColor: primary }}
      >
        {architecture.heroCta}
      </button>
    </div>
  );

  const overlayCopy = (
    <div className="relative z-10 mx-auto max-w-5xl text-center">
      <p
        className={`mb-4 inline-flex px-4 py-2 text-sm font-semibold ${themeStyle.buttonRadius}`}
        style={{ backgroundColor: secondary, color: "#111" }}
      >
        {architecture.heroBadge}
      </p>

      <h2 className="text-5xl font-black uppercase leading-tight text-white md:text-7xl">
        {content.hero_headline}
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/85">
        {content.hero_subheadline}
      </p>

      <button
        className={`mt-8 px-7 py-3 font-bold uppercase text-white ${themeStyle.buttonRadius} ${themeStyle.cardShadow}`}
        style={{ backgroundColor: primary }}
      >
        {architecture.heroCta}
      </button>
    </div>
  );

  if (layoutPreset === "full_width_overlay") {
    return (
      <section
        className="relative grid min-h-[620px] place-items-center overflow-hidden px-6 py-24"
        style={{ backgroundColor: "#050505" }}
      >
        <div className="absolute inset-0">{mediaElement}</div>

        <div className="absolute inset-0 bg-black/55" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(135deg, ${primary}55, transparent 45%, ${secondary}33)`,
          }}
        />

        {overlayCopy}
      </section>
    );
  }

  if (layoutPreset === "featured_media") {
    return (
      <section
        className={`text-center ${themeStyle.sectionPadding}`}
        style={{ backgroundColor: bg }}
      >
        <div className="mx-auto max-w-4xl">{copy}</div>
        <div className="mx-auto mt-10 max-w-5xl">{image}</div>
      </section>
    );
  }

  if (layoutPreset === "centered") {
    return (
      <section
        className={`text-center ${themeStyle.sectionPadding}`}
        style={{ backgroundColor: bg }}
      >
        <div className="mx-auto max-w-4xl">{copy}</div>
      </section>
    );
  }

  if (layoutPreset === "asymmetrical") {
    return (
      <section
        className={`grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center ${themeStyle.sectionPadding}`}
        style={{ backgroundColor: bg }}
      >
        <div className="md:translate-y-6">{copy}</div>
        <div className="md:-translate-y-6 md:rotate-1">{image}</div>
      </section>
    );
  }

  if (layoutPreset === "showcase") {
    return (
      <section
        className={`relative overflow-hidden ${themeStyle.sectionPadding}`}
        style={{ backgroundColor: bg }}
      >
        <div className="absolute inset-0 opacity-20">{mediaElement}</div>

        <div
          className={`relative mx-auto max-w-4xl border bg-white/90 backdrop-blur ${themeStyle.radius} ${themeStyle.cardShadow} ${themeStyle.cardPadding}`}
          style={{ borderColor: secondary }}
        >
          {copy}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`grid gap-8 md:grid-cols-2 md:items-center ${themeStyle.sectionPadding}`}
      style={{ backgroundColor: bg }}
    >
      {copy}
      {image}
    </section>
  );
}