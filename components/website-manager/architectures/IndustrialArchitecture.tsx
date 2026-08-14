import type { ArchitectureProps } from "./types";

export default function IndustrialArchitecture({
  content,
  primary,
  secondary,
}: ArchitectureProps) {
  return (
    <>
      <section className="grid gap-8 bg-[#101418] px-6 py-14 text-white md:grid-cols-2 md:items-center">
        <div>
          <p
            className="mb-4 inline-flex rounded-md px-4 py-2 text-sm font-bold uppercase"
            style={{ backgroundColor: secondary, color: "#111" }}
          >
            Capabilities • Safety • Operations
          </p>

          <h2 className="text-5xl font-black uppercase leading-tight">
            {content.hero_headline}
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            {content.hero_subheadline}
          </p>

          <button
            className="mt-7 rounded-md px-6 py-3 font-bold uppercase text-white"
            style={{ backgroundColor: primary }}
          >
            Request Service
          </button>
        </div>

        <div
          className="overflow-hidden rounded-2xl border bg-black"
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
            <div className="grid h-full place-items-center text-center text-zinc-400">
              <div>
                <div className="text-5xl">⚙️</div>
                <p className="mt-3 font-semibold">Industrial image placeholder</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#181d22] px-6 py-14 text-white">
        <h2 className="text-3xl font-black">Core Capabilities</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [content.service_1_title, content.service_1_text],
            [content.service_2_title, content.service_2_text],
            [content.service_3_title, content.service_3_text],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-black p-5"
            >
              <h3 className="font-bold" style={{ color: secondary }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 text-white" style={{ backgroundColor: primary }}>
        <div className="grid gap-4 md:grid-cols-4">
          {["Safety", "Quality", "Reliable", "Experienced"].map((item) => (
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