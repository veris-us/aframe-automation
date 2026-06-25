import type { ArchitectureProps } from "./types";

export default function RestaurantArchitecture({
  content,
  primary,
  secondary,
}: ArchitectureProps) {
  return (
    <>
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <p
            className="mb-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: secondary, color: "#111" }}
          >
            Fresh menu • Online ordering • Events
          </p>

          <h2
            className="text-5xl font-black uppercase leading-tight"
            style={{ color: primary }}
          >
            {content.hero_headline}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#5f6b70]">
            {content.hero_subheadline}
          </p>

          <button
            className="mt-7 rounded-full px-7 py-3 font-bold uppercase text-white"
            style={{ backgroundColor: primary }}
          >
            View Menu
          </button>
        </div>

        <div
          className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border bg-white"
          style={{
            height: `${content.hero_image_height ?? 420}px`,
            borderColor: secondary,
          }}
        >
          {content.hero_image_url ? (
            <img
              src={content.hero_image_url}
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
                <div className="text-5xl">🍽️</div>
                <p className="mt-3 font-semibold">Restaurant image placeholder</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <h2 className="text-3xl font-black" style={{ color: primary }}>
          Featured Specials
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [content.service_1_title, content.service_1_text],
            [content.service_2_title, content.service_2_text],
            [content.service_3_title, content.service_3_text],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border bg-[#f7f4ef] p-6"
              style={{ borderColor: secondary }}
            >
              <h3 className="font-bold" style={{ color: primary }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5f6b70]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 text-white" style={{ backgroundColor: primary }}>
        <div className="grid gap-4 md:grid-cols-4">
          {["Fresh", "Local", "Events", "Catering"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/20 p-5 text-center font-bold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}