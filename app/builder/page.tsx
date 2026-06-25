"use client";

import { useEffect, useState } from "react";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import BuilderTopbar from "@/components/builder/BuilderTopbar";
import LivePreview from "@/components/builder/LivePreview";
import DesignStudio from "@/components/builder/DesignStudio";
import ContentStudio from "@/components/builder/ContentStudio";
import LayoutStudio from "@/components/builder/LayoutStudio";
import MediaStudio from "@/components/builder/MediaStudio";
import PublishStudio from "@/components/builder/PublishStudio";
import { BuilderProvider } from "@/components/builder/BuilderContext";
import { supabase } from "@/lib/supabase";
import type { DemoContent } from "@/components/builder/types";

export type StudioPanel = "design" | "content" | "layout" | "media" | "publish";

export default function BuilderPage() {
  const [activePanel, setActivePanel] = useState<StudioPanel>("design");
  const [content, setContent] = useState<DemoContent | null>(null);
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
      } else {
        setContent(data as DemoContent);
      }

      setLoading(false);
    }

    loadContent();
  }, []);

  function renderPanel() {
    if (activePanel === "design") return <DesignStudio />;
    if (activePanel === "content") return <ContentStudio />;
    if (activePanel === "layout") return <LayoutStudio />;
    if (activePanel === "media") return <MediaStudio />;
    if (activePanel === "publish") return <PublishStudio />;
    return <DesignStudio />;
  }

  if (loading) {
    return (
      <main className="grid h-screen place-items-center bg-[#f7f4ef] text-[#1f2528]">
        Loading A Frame Studio...
      </main>
    );
  }

  if (!content) {
    return (
      <main className="grid h-screen place-items-center bg-[#f7f4ef] text-[#1f2528]">
        Builder content not found.
      </main>
    );
  }

  return (
    <BuilderProvider initialContent={content}>
      <main className="h-screen overflow-hidden bg-[#f7f4ef] text-[#1f2528]">
        <BuilderTopbar />

        <div className="grid h-[calc(100vh-64px)] grid-cols-[220px_420px_1fr]">
          <BuilderSidebar
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />

          <section className="overflow-y-auto border-r border-[#ded4c3] bg-white p-6">
            {renderPanel()}
          </section>

          <section className="overflow-hidden bg-[#e8dfd0] p-6">
            <LivePreview />
          </section>
        </div>
      </main>
    </BuilderProvider>
  );
}