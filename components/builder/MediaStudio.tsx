import { useState } from "react";
import { useBuilder } from "@/components/builder/BuilderContext";
import { supabase } from "@/lib/supabase";

type MediaField =
  | "logo_url"
  | "hero_image_url"
  | "hero_video_url"
  | "gallery_image_1_url"
  | "gallery_image_2_url"
  | "gallery_image_3_url";

export default function MediaStudio() {
  const { content, updateContent } = useBuilder();
  const [uploading, setUploading] = useState(false);

  async function uploadMedia(
    event: React.ChangeEvent<HTMLInputElement>,
    field: MediaField
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `${field}-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("demo-assets")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("demo-assets").getPublicUrl(fileName);

    updateContent(field, publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Media Studio
      </p>

      <h2 className="mt-3 text-3xl font-bold">Images, Videos, and Uploads</h2>

      <section className="mt-8 rounded-2xl border border-[#ded4c3] bg-white p-5">
        <h3 className="text-lg font-bold">Logo</h3>

        <div className="mt-5 grid gap-4">
          <FileUpload
            label="Upload Logo"
            accept="image/*"
            uploading={uploading}
            onUpload={(event) => uploadMedia(event, "logo_url")}
          />

          <Input
            label="Logo URL"
            value={content.logo_url ?? ""}
            onChange={(value) => updateContent("logo_url", value)}
          />

          <RangeSlider
            label="Logo Size"
            min={40}
            max={300}
            value={content.logo_width ?? 90}
            onChange={(value) => updateContent("logo_width", value)}
          />

          <RangeSlider
            label="Logo Position X"
            min={-300}
            max={300}
            value={content.logo_position_x ?? 0}
            onChange={(value) => updateContent("logo_position_x", value)}
          />

          <RangeSlider
            label="Logo Position Y"
            min={-300}
            max={300}
            value={content.logo_position_y ?? 0}
            onChange={(value) => updateContent("logo_position_y", value)}
          />

          <RangeSlider
            label="Logo Border Radius"
            min={0}
            max={100}
            value={content.logo_border_radius ?? 0}
            onChange={(value) => updateContent("logo_border_radius", value)}
          />

          {content.logo_url && (
            <img
              src={content.logo_url}
              alt="Logo preview"
              className="h-28 w-28 rounded-xl object-contain"
            />
          )}

          <button
            onClick={() => updateContent("logo_url", "")}
            className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white"
          >
            Remove Logo
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#ded4c3] bg-white p-5">
        <h3 className="text-lg font-bold">Hero Media</h3>

        <div className="mt-5 grid gap-4">
          <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
            <h4 className="font-bold">Hero Media Type</h4>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateContent("hero_media_type", "image")}
                className={`rounded-xl border p-3 font-semibold ${
                  (content.hero_media_type ?? "image") === "image"
                    ? "border-[#1f6f8b] bg-[#e6f3f8] text-[#1f6f8b]"
                    : "border-[#ded4c3] bg-white"
                }`}
              >
                Image
              </button>

              <button
                type="button"
                onClick={() => updateContent("hero_media_type", "video")}
                className={`rounded-xl border p-3 font-semibold ${
                  content.hero_media_type === "video"
                    ? "border-[#1f6f8b] bg-[#e6f3f8] text-[#1f6f8b]"
                    : "border-[#ded4c3] bg-white"
                }`}
              >
                Video
              </button>
            </div>
          </div>

          <FileUpload
            label="Upload Hero Image"
            accept="image/*"
            uploading={uploading}
            onUpload={(event) => uploadMedia(event, "hero_image_url")}
          />

          <Input
            label="Hero Image URL"
            value={content.hero_image_url ?? ""}
            onChange={(value) => updateContent("hero_image_url", value)}
          />

          <FileUpload
            label="Upload Hero Video"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            uploading={uploading}
            onUpload={(event) => {
              updateContent("hero_media_type", "video");
              uploadMedia(event, "hero_video_url");
            }}
          />

          <Input
            label="Hero Video URL"
            value={content.hero_video_url ?? ""}
            onChange={(value) => updateContent("hero_video_url", value)}
          />

          <RangeSlider
            label="Hero Height"
            min={200}
            max={900}
            value={content.hero_image_height ?? 420}
            onChange={(value) => updateContent("hero_image_height", value)}
          />

          <RangeSlider
            label="Hero Zoom"
            min={1}
            max={3}
            step={0.05}
            value={content.hero_image_zoom ?? 1}
            onChange={(value) => updateContent("hero_image_zoom", value)}
          />

          <RangeSlider
            label="Hero Position X"
            min={0}
            max={100}
            value={content.hero_image_position_x ?? 50}
            onChange={(value) => updateContent("hero_image_position_x", value)}
          />

          <RangeSlider
            label="Hero Position Y"
            min={0}
            max={100}
            value={content.hero_image_position_y ?? 50}
            onChange={(value) => updateContent("hero_image_position_y", value)}
          />

          {content.hero_image_url && (
            <img
              src={content.hero_image_url}
              alt="Hero preview"
              className="h-44 w-full rounded-xl object-cover"
            />
          )}

          {content.hero_video_url && (
            <video
              src={content.hero_video_url}
              className="h-44 w-full rounded-xl object-cover"
              controls
              muted
            />
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <button
              onClick={() => updateContent("hero_image_url", "")}
              className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white"
            >
              Remove Hero Image
            </button>

            <button
              onClick={() => {
                updateContent("hero_video_url", "");
                updateContent("hero_media_type", "image");
              }}
              className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white"
            >
              Remove Hero Video
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#ded4c3] bg-white p-5">
        <h3 className="text-lg font-bold">Gallery Images</h3>

        <div className="mt-5 grid gap-5">
          <GalleryUpload
            label="Gallery Image 1"
            value={content.gallery_image_1_url ?? ""}
            uploading={uploading}
            onUpload={(event) => uploadMedia(event, "gallery_image_1_url")}
            onRemove={() => updateContent("gallery_image_1_url", "")}
          />

          <GalleryUpload
            label="Gallery Image 2"
            value={content.gallery_image_2_url ?? ""}
            uploading={uploading}
            onUpload={(event) => uploadMedia(event, "gallery_image_2_url")}
            onRemove={() => updateContent("gallery_image_2_url", "")}
          />

          <GalleryUpload
            label="Gallery Image 3"
            value={content.gallery_image_3_url ?? ""}
            uploading={uploading}
            onUpload={(event) => uploadMedia(event, "gallery_image_3_url")}
            onRemove={() => updateContent("gallery_image_3_url", "")}
          />
        </div>
      </section>
    </div>
  );
}

function FileUpload({
  label,
  accept,
  uploading,
  onUpload,
}: {
  label: string;
  accept: string;
  uploading: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>

      <input type="file" accept={accept} onChange={onUpload} />

      {uploading && <p className="text-sm text-[#5f6b70]">Uploading...</p>}
    </label>
  );
}

function GalleryUpload({
  label,
  value,
  uploading,
  onUpload,
  onRemove,
}: {
  label: string;
  value: string;
  uploading: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
      <h4 className="font-bold">{label}</h4>

      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
        className="mt-4"
      />

      {uploading && <p className="mt-2 text-sm text-[#5f6b70]">Uploading...</p>}

      {value && (
        <>
          <img
            src={value}
            alt={label}
            className="mt-4 h-36 w-full rounded-xl object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Remove Image
          </button>
        </>
      )}
    </div>
  );
}

function Input({
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

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#ded4c3] p-3"
      />
    </label>
  );
}

function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm text-[#5f6b70]">{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  );
}