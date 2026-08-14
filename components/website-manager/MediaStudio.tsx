import { useState } from "react";
import { useBuilder } from "@/components/website-manager/BuilderContext";
import { supabase } from "@/lib/supabase";

type MediaField =
  | "logo_url"
  | "hero_image_url"
  | "gallery_image_1_url"
  | "gallery_image_2_url"
  | "gallery_image_3_url";

export default function MediaStudio() {
  const { content, updateContent } = useBuilder();
  const [uploadingField, setUploadingField] = useState<MediaField | null>(null);

  async function uploadMedia(
    event: React.ChangeEvent<HTMLInputElement>,
    field: MediaField
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingField(field);

    const fileName = `${field}-${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("demo-assets")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploadingField(null);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("demo-assets").getPublicUrl(fileName);

    updateContent(field, publicUrl);
    setUploadingField(null);
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Media
      </p>

      <h2 className="mt-3 text-3xl font-bold">Edit website photos</h2>

      <p className="mt-3 text-sm leading-6 text-[#5f6b70]">
        Upload new images for your website. The layout and design stay locked so
        your site remains polished.
      </p>

      <div className="mt-8 grid gap-6">
        <MediaCard
          title="Logo"
          description="Upload the business logo shown in the website header."
          value={content.logo_url ?? ""}
          uploading={uploadingField === "logo_url"}
          accept="image/*"
          previewType="logo"
          onUpload={(event) => uploadMedia(event, "logo_url")}
          onRemove={() => updateContent("logo_url", "")}
        />

        <MediaCard
          title="Hero Image"
          description="Upload the main image shown at the top of the website."
          value={content.hero_image_url ?? ""}
          uploading={uploadingField === "hero_image_url"}
          accept="image/*"
          previewType="wide"
          onUpload={(event) => uploadMedia(event, "hero_image_url")}
          onRemove={() => updateContent("hero_image_url", "")}
        />

        <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
          <h3 className="text-lg font-bold">Gallery Images</h3>
          <p className="mt-2 text-sm text-[#5f6b70]">
            These images appear in the website gallery section.
          </p>

          <div className="mt-5 grid gap-5">
            <MediaCard
              title="Gallery Image 1"
              description="First gallery image."
              value={content.gallery_image_1_url ?? ""}
              uploading={uploadingField === "gallery_image_1_url"}
              accept="image/*"
              previewType="wide"
              onUpload={(event) => uploadMedia(event, "gallery_image_1_url")}
              onRemove={() => updateContent("gallery_image_1_url", "")}
            />

            <MediaCard
              title="Gallery Image 2"
              description="Second gallery image."
              value={content.gallery_image_2_url ?? ""}
              uploading={uploadingField === "gallery_image_2_url"}
              accept="image/*"
              previewType="wide"
              onUpload={(event) => uploadMedia(event, "gallery_image_2_url")}
              onRemove={() => updateContent("gallery_image_2_url", "")}
            />

            <MediaCard
              title="Gallery Image 3"
              description="Third gallery image."
              value={content.gallery_image_3_url ?? ""}
              uploading={uploadingField === "gallery_image_3_url"}
              accept="image/*"
              previewType="wide"
              onUpload={(event) => uploadMedia(event, "gallery_image_3_url")}
              onRemove={() => updateContent("gallery_image_3_url", "")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function MediaCard({
  title,
  description,
  value,
  uploading,
  accept,
  previewType,
  onUpload,
  onRemove,
}: {
  title: string;
  description: string;
  value: string;
  uploading: boolean;
  accept: string;
  previewType: "logo" | "wide";
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#5f6b70]">
            {description}
          </p>
        </div>

        {value && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            Uploaded
          </span>
        )}
      </div>

      <div className="mt-5">
        {value ? (
          previewType === "logo" ? (
            <div className="grid h-36 place-items-center rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
              <img
                src={value}
                alt={title}
                className="max-h-28 max-w-full object-contain"
              />
            </div>
          ) : (
            <img
              src={value}
              alt={title}
              className="h-44 w-full rounded-xl border border-[#ded4c3] object-cover"
            />
          )
        ) : (
          <div className="grid h-36 place-items-center rounded-xl border border-dashed border-[#ded4c3] bg-[#f7f4ef] text-center text-sm font-semibold text-[#5f6b70]">
            No image uploaded
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <label className="cursor-pointer rounded-xl bg-[#1f6f8b] px-4 py-3 text-sm font-bold text-white">
          {value ? "Replace Image" : "Upload Image"}
          <input
            type="file"
            accept={accept}
            onChange={onUpload}
            className="hidden"
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
          >
            Remove
          </button>
        )}

        {uploading && (
          <p className="self-center text-sm font-semibold text-[#5f6b70]">
            Uploading...
          </p>
        )}
      </div>
    </section>
  );
}