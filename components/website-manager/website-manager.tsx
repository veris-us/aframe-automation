"use client";

import { useEffect, useState } from "react";
import { BuilderProvider } from "@/components/website-manager/BuilderContext";
import BuilderTopbar from "@/components/website-manager/BuilderTopbar";
import LivePreview from "@/components/website-manager/LivePreview";
import ContentStudio from "@/components/website-manager/ContentStudio";
import MediaStudio from "@/components/website-manager/MediaStudio";
import PublishStudio from "@/components/website-manager/PublishStudio";
import { supabase } from "@/lib/supabase";
import type { DemoContent } from "@/components/builder/types";

type Panel = "dashboard" | "content" | "media" | "publish";

export default function WebsiteManager() {
  const [activePanel, setActivePanel] = useState<Panel>("dashboard");
  const [initialContent, setInitialContent] = useState<DemoContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase
        .from("demo_site_content")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setInitialContent(data as DemoContent);
      setLoading(false);
    }

    loadContent();
  }, []);

  if (loading) {
    return (
      <main className="grid h-screen place-items-center bg-[#f7f4ef] text-[#1f2528]">
        Loading Website Manager...
      </main>
    );
  }

  if (!initialContent) {
    return (
      <main className="grid h-screen place-items-center bg-[#f7f4ef] text-[#1f2528]">
        Website content not found.
      </main>
    );
  }

  function renderPanel() {
    if (activePanel === "dashboard") return <Dashboard />;
    if (activePanel === "content") return <ContentStudio />;
    if (activePanel === "media") return <MediaStudio />;
    if (activePanel === "publish") return <PublishStudio />;

    return <Dashboard />;
  }

  return (
    <BuilderProvider initialContent={initialContent}>
      <main className="h-screen overflow-hidden bg-[#f7f4ef] text-[#1f2528]">
        <BuilderTopbar />

        <div className="grid h-[calc(100vh-64px)] grid-cols-[220px_420px_1fr]">
          <aside className="border-r border-[#ded4c3] bg-white p-4">
            <h2 className="text-lg font-black">Website Manager</h2>
            <p className="mt-1 text-xs text-[#5f6b70]">
              Edit your site content and photos.
            </p>

            <nav className="mt-6 grid gap-2">
              <SidebarButton label="Dashboard" icon="🏠" active={activePanel === "dashboard"} onClick={() => setActivePanel("dashboard")} />
              <SidebarButton label="Content" icon="📝" active={activePanel === "content"} onClick={() => setActivePanel("content")} />
              <SidebarButton label="Media" icon="🖼️" active={activePanel === "media"} onClick={() => setActivePanel("media")} />
              <SidebarButton label="Publish" icon="🚀" active={activePanel === "publish"} onClick={() => setActivePanel("publish")} />
            </nav>
          </aside>

          <section className="overflow-y-auto border-r border-[#ded4c3] bg-white p-6">
            {renderPanel()}
          </section>

          <section className="overflow-hidden p-6">
            <LivePreview />
          </section>
        </div>
      </main>
    </BuilderProvider>
  );
}

function SidebarButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${
        active
          ? "bg-[#1f6f8b] text-white"
          : "text-[#1f2528] hover:bg-[#f7f4ef]"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}

function Dashboard() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-black">Website Manager</h1>

      <div className="mt-8 grid gap-4">
        <InfoCard label="Website Status" value="🟢 Live" />
        <InfoCard label="Editing Access" value="Text and photos" />
        <InfoCard label="Design Locked" value="Yes" />
        <InfoCard label="Ownership" value="Your domain. Your website." />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#ded4c3] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f6b70]">
        {label}
      </p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}