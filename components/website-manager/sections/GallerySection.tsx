import type { SectionProps } from "./types";

export default function GallerySection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  layoutPreset,
  themeStyle,
}: SectionProps) {
  const galleryImages = [
    content.gallery_image_1_url,
    content.gallery_image_2_url,
    content.gallery_image_3_url,
  ];

  const isMasonry = layoutPreset === "masonry";
  const isShowcase = layoutPreset === "showcase";
  const isMagazine = layoutPreset === "magazine";
  const isCardBlock = layoutPreset === "card_block";

  return (
    <section
      className={themeStyle.sectionPadding}
      style={{
        backgroundColor: isDark ? "#000" : isShowcase ? tertiary : "#fff",
      }}
    >
      <div className={isShowcase ? "mx-auto max-w-5xl text-center" : ""}>
        <p
          className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: secondary }}
        >
          Gallery
        </p>

        <h2
          className={isShowcase ? "mt-3 text-5xl font-black" : "mt-3 text-3xl font-black"}
          style={{
            color: isDark ? "#fff" : primary,
          }}
        >
          {content.gallery_title ?? "Project Gallery"}
        </h2>
      </div>

      <div
        className={`mt-8 grid gap-4 ${
          isMasonry
            ? "md:grid-cols-2"
            : isMagazine
            ? "md:grid-cols-[1.4fr_0.8fr]"
            : "md:grid-cols-3"
        }`}
      >
        {galleryImages.map((imageUrl, index) => (
          <div
            key={index}
            className={`
              overflow-hidden
              ${themeStyle.radius}
              ${themeStyle.borderWidth}
              ${
                isCardBlock || isShowcase
                  ? themeStyle.cardShadow
                  : ""
              }
            `}
            style={{
              borderColor: secondary,
              backgroundColor: isDark ? "#09090b" : "#f7f4ef",
              minHeight:
                isMasonry && index === 0
                  ? "300px"
                  : isMasonry
                  ? "220px"
                  : undefined,
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover"
                style={{
                  height:
                    isMagazine && index === 0
                      ? "360px"
                      : isShowcase
                      ? "260px"
                      : "176px",
                }}
              />
            ) : (
              <div
                className="grid place-items-center text-center font-semibold"
                style={{
                  height:
                    isMagazine && index === 0
                      ? "360px"
                      : isShowcase
                      ? "260px"
                      : "176px",
                }}
              >
                Gallery Image {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}