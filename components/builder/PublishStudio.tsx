import { useBuilder } from "@/components/builder/BuilderContext";

export default function PublishStudio() {
  const { content } = useBuilder();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Publish
      </p>

      <h2 className="mt-3 text-3xl font-bold">Review & Publish</h2>

      <div className="mt-6 rounded-2xl border border-[#ded4c3] p-5">
        <p className="font-semibold">Website:</p>
        <p className="mt-2 text-[#5f6b70]">{content.business_name}</p>
      </div>
    </div>
  );
}