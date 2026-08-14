import { useBuilder } from "@/components/website-manager/BuilderContext";

export default function PublishStudio() {
  const { content } = useBuilder();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Publish
      </p>

      <h2 className="mt-3 text-3xl font-bold">Preview & publish</h2>

      <p className="mt-3 text-sm leading-6 text-[#5f6b70]">
        Review your updates, then publish them to your live website.
      </p>

      <div className="mt-8 grid gap-5">
        <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f6b70]">
            Website
          </p>
          <h3 className="mt-2 text-xl font-black">{content.business_name}</h3>
        </section>

        <section className="rounded-2xl border border-[#ded4c3] bg-[#f7f4ef] p-5">
          <h3 className="font-bold">Ownership Promise</h3>
          <p className="mt-3 text-sm leading-6 text-[#5f6b70]">
            This is your website. Your domain. Your content. No monthly fee is
            required just to keep your website online.
          </p>
        </section>

        <div className="grid gap-3">
          <a
            href="/demo"
            target="_blank"
            className="rounded-xl border border-[#1f6f8b] px-5 py-3 text-center text-sm font-bold text-[#1f6f8b]"
          >
            Preview Website
          </a>

          <p className="text-xs leading-5 text-[#5f6b70]">
            Use the “Publish Changes” button in the top bar when you are ready
            to push your edits live.
          </p>
        </div>
      </div>
    </div>
  );
}