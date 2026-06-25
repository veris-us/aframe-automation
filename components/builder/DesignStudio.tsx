import { useBuilder } from "@/components/builder/BuilderContext";
import { designKits } from "@/components/builder/designKits";

const architectureOptions = [
  { value: "restaurant", label: "Restaurant" },
  { value: "service", label: "Service" },
  { value: "industrial", label: "Industrial" },
  { value: "data_management", label: "Data" },
  { value: "medical", label: "Medical" },
  { value: "professional", label: "Professional" },
  { value: "nonprofit", label: "Nonprofit" },
];

const colorThemeOptions = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "luxury", label: "Luxury" },
  { value: "industrial", label: "Industrial" },
  { value: "high_contrast", label: "High Contrast" },
  { value: "custom", label: "Custom" },
];

const layoutOptions = [
  { value: "split_screen", label: "Split", shape: "split" },
  { value: "featured_media", label: "Featured", shape: "featured" },
  { value: "asymmetrical", label: "Asymmetrical", shape: "asymmetrical" },
  { value: "centered", label: "Centered", shape: "centered" },
  { value: "showcase", label: "Showcase", shape: "showcase" },
  { value: "card_block", label: "Cards", shape: "cards" },
  { value: "masonry", label: "Masonry", shape: "masonry" },
  { value: "magazine", label: "Magazine", shape: "magazine" },
];

export default function DesignStudio() {
  const { content, updateContent } = useBuilder();

  function applyDesignKit(kit: (typeof designKits)[number]) {
    updateContent("industry_architecture", kit.industry_architecture);
    updateContent("color_theme", kit.color_theme);
    updateContent("layout_preset", kit.layout_preset);
    updateContent("primary_color", kit.primary_color);
    updateContent("secondary_color", kit.secondary_color);
    updateContent("tertiary_color", kit.tertiary_color);
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Design Studio
      </p>

      <h2 className="mt-3 text-3xl font-bold">Visual design system</h2>

      <div className="mt-8 grid gap-6">
        <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
          <h3 className="font-bold">Design Kits</h3>
          <p className="mt-2 text-sm text-[#5f6b70]">
            One-click starting points for industry, style, layout, and colors.
          </p>

          <div className="mt-5 grid gap-4">
            {designKits.map((kit) => {
              const active =
                content.industry_architecture === kit.industry_architecture &&
                content.color_theme === kit.color_theme &&
                content.layout_preset === kit.layout_preset &&
                content.primary_color === kit.primary_color &&
                content.secondary_color === kit.secondary_color &&
                content.tertiary_color === kit.tertiary_color;

              return (
                <button
                  key={kit.id}
                  onClick={() => applyDesignKit(kit)}
                  className={`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    active
                      ? "border-[#1f6f8b] bg-[#e6f3f8]"
                      : "border-[#ded4c3] bg-white"
                  }`}
                >
                  <MiniSitePreview
                    primary={kit.primary_color}
                    secondary={kit.secondary_color}
                    tertiary={kit.tertiary_color}
                    dark={kit.color_theme === "dark"}
                  />

                  <div className="p-4">
                    <p className="font-bold">{kit.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5f6b70]">
                      {kit.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-1">
                        <ColorDot color={kit.primary_color} />
                        <ColorDot color={kit.secondary_color} />
                        <ColorDot color={kit.tertiary_color} />
                      </div>

                      <span className="rounded-full bg-[#f7f4ef] px-3 py-1 text-xs font-semibold text-[#3f4a4f]">
                        {kit.layout_preset.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <VisualOptionPanel
          title="Industry Architecture"
          description="Sets business-specific messaging and section language."
          options={architectureOptions}
          activeValue={content.industry_architecture ?? "service"}
          onSelect={(value) => updateContent("industry_architecture", value)}
        />

        <VisualOptionPanel
          title="Style Theme"
          description="Controls visual personality: spacing, shadows, radius, borders, and buttons."
          options={colorThemeOptions}
          activeValue={content.color_theme ?? "modern"}
          onSelect={(value) => updateContent("color_theme", value)}
        />

        <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
          <h3 className="font-bold">Color Scheme</h3>
          <p className="mt-2 text-sm text-[#5f6b70]">
            Colors are separate from style. Use these to fully rebrand the site.
          </p>

          <div className="mt-5 grid gap-4">
            <ColorInput
              label="Primary"
              value={content.primary_color ?? "#0b2a5b"}
              onChange={(value) => updateContent("primary_color", value)}
            />
            <ColorInput
              label="Secondary"
              value={content.secondary_color ?? "#f5b400"}
              onChange={(value) => updateContent("secondary_color", value)}
            />
            <ColorInput
              label="Tertiary"
              value={content.tertiary_color ?? "#ffffff"}
              onChange={(value) => updateContent("tertiary_color", value)}
            />

            <div className="overflow-hidden rounded-2xl border border-[#ded4c3]">
              <div
                className="h-12"
                style={{ backgroundColor: content.primary_color ?? "#0b2a5b" }}
              />
              <div
                className="h-12"
                style={{
                  backgroundColor: content.secondary_color ?? "#f5b400",
                }}
              />
              <div
                className="h-12"
                style={{
                  backgroundColor: content.tertiary_color ?? "#ffffff",
                }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
          <h3 className="font-bold">Layout Preset</h3>
          <p className="mt-2 text-sm text-[#5f6b70]">
            Choose the overall structure of the page.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {layoutOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateContent("layout_preset", option.value)}
                className={`rounded-2xl border p-3 text-left transition hover:bg-[#f7f4ef] ${
                  (content.layout_preset ?? "split_screen") === option.value
                    ? "border-[#1f6f8b] bg-[#e6f3f8]"
                    : "border-[#ded4c3]"
                }`}
              >
                <LayoutThumbnail shape={option.shape} />
                <p className="mt-3 text-sm font-bold">{option.label}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MiniSitePreview({
  primary,
  secondary,
  tertiary,
  dark,
}: {
  primary: string;
  secondary: string;
  tertiary: string;
  dark: boolean;
}) {
  return (
    <div
      className="border-b border-[#ded4c3] p-3"
      style={{ backgroundColor: dark ? "#020617" : tertiary }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className="h-4 w-16 rounded-full"
          style={{ backgroundColor: primary }}
        />
        <div
          className="h-3 w-10 rounded-full"
          style={{ backgroundColor: secondary }}
        />
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-2">
        <div>
          <div
            className="mb-2 h-3 w-20 rounded-full"
            style={{ backgroundColor: secondary }}
          />
          <div
            className="mb-2 h-5 w-full rounded-md"
            style={{ backgroundColor: primary }}
          />
          <div
            className="h-5 w-3/4 rounded-md"
            style={{ backgroundColor: primary }}
          />
        </div>

        <div
          className="h-20 rounded-xl border"
          style={{ borderColor: secondary, backgroundColor: "#fff" }}
        />
      </div>
    </div>
  );
}

function ColorDot({ color }: { color: string }) {
  return (
    <span
      className="h-5 w-5 rounded-full border border-[#ded4c3]"
      style={{ backgroundColor: color }}
    />
  );
}

function VisualOptionPanel({
  title,
  description,
  options,
  activeValue,
  onSelect,
}: {
  title: string;
  description: string;
  options: { value: string; label: string }[];
  activeValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm text-[#5f6b70]">{description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`rounded-xl border p-3 text-left text-sm font-semibold ${
              activeValue === option.value
                ? "border-[#1f6f8b] bg-[#e6f3f8] text-[#1f6f8b]"
                : "border-[#ded4c3] hover:bg-[#f7f4ef]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function LayoutThumbnail({ shape }: { shape: string }) {
  if (shape === "featured") {
    return (
      <div className="rounded-xl border border-[#ded4c3] p-2">
        <div className="mx-auto mb-2 h-3 w-16 rounded-full bg-[#1f6f8b]" />
        <div className="mx-auto mb-3 h-3 w-24 rounded-full bg-[#c9bda9]" />
        <div className="h-14 rounded-lg bg-[#ded4c3]" />
      </div>
    );
  }

  if (shape === "centered") {
    return (
      <div className="rounded-xl border border-[#ded4c3] p-2 text-center">
        <div className="mx-auto mb-2 h-3 w-20 rounded-full bg-[#1f6f8b]" />
        <div className="mx-auto mb-2 h-3 w-28 rounded-full bg-[#c9bda9]" />
        <div className="mx-auto h-6 w-16 rounded-full bg-[#1f6f8b]" />
      </div>
    );
  }

  if (shape === "masonry") {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#ded4c3] p-2">
        <div className="h-16 rounded-lg bg-[#1f6f8b]" />
        <div className="h-10 rounded-lg bg-[#c9bda9]" />
        <div className="h-10 rounded-lg bg-[#c9bda9]" />
        <div className="h-16 rounded-lg bg-[#1f6f8b]" />
      </div>
    );
  }

  if (shape === "cards") {
    return (
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-[#ded4c3] p-2">
        <div className="h-12 rounded-lg bg-[#1f6f8b]" />
        <div className="h-12 rounded-lg bg-[#c9bda9]" />
        <div className="h-12 rounded-lg bg-[#1f6f8b]" />
      </div>
    );
  }

  if (shape === "magazine") {
    return (
      <div className="grid grid-cols-[1.3fr_0.7fr] gap-2 rounded-xl border border-[#ded4c3] p-2">
        <div className="h-20 rounded-lg bg-[#1f6f8b]" />
        <div className="grid gap-2">
          <div className="h-9 rounded-lg bg-[#c9bda9]" />
          <div className="h-9 rounded-lg bg-[#c9bda9]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#ded4c3] p-2">
      <div className="h-16 rounded-lg bg-[#1f6f8b]" />
      <div className="h-16 rounded-lg bg-[#c9bda9]" />
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-16 rounded-lg border border-[#ded4c3]"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 rounded-xl border border-[#ded4c3] p-3"
        />
      </div>
    </label>
  );
}