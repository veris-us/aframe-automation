"use client";

import { useState } from "react";
import { useBuilder } from "@/components/builder/BuilderContext";
import WebsiteRenderer from "@/components/builder/website/WebsiteRenderer";
import { themeStyles } from "@/components/builder/themeStyles";

type PreviewMode = "desktop" | "tablet" | "mobile";

const previewWidths: Record<PreviewMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

export default function LivePreview() {
  const { content } = useBuilder();
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");

  const colorTheme = content.color_theme ?? "modern";
  const themeStyle = themeStyles[colorTheme] ?? themeStyles.modern;

  const primary = content.primary_color ?? "#0b2a5b";
  const secondary = content.secondary_color ?? "#f5b400";
  const tertiary = content.tertiary_color ?? "#ffffff";
  const isDark = colorTheme === "dark";

  const panelBackground = isDark ? "#0b0b0b" : tertiary;
  const textMuted = isDark ? "text-zinc-400" : "text-[#5f6b70]";

  return (
    <div
      className={`h-full border p-4 ${themeStyle.radius} ${themeStyle.cardShadow}`}
      style={{
        borderColor: secondary,
        backgroundColor: panelBackground,
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2
            className="font-bold"
            style={{ color: isDark ? "#fff" : primary }}
          >
            Live Preview
          </h2>
          <p className={`text-sm ${textMuted}`}>
            Updates instantly from builder controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(["desktop", "tablet", "mobile"] as PreviewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPreviewMode(mode)}
              className={`${themeStyle.buttonRadius} border px-3 py-1 text-xs font-semibold capitalize`}
              style={{
                borderColor: secondary,
                backgroundColor:
                  previewMode === mode ? primary : "transparent",
                color:
                  previewMode === mode
                    ? "#fff"
                    : isDark
                      ? "#fff"
                      : primary,
              }}
            >
              {mode}
            </button>
          ))}

          <a
            href="/demo"
            target="_blank"
            className={`${themeStyle.buttonRadius} px-3 py-1 text-xs font-semibold text-white`}
            style={{ backgroundColor: primary }}
          >
            Open
          </a>
        </div>
      </div>

      <div className="h-[calc(100%-56px)] overflow-auto rounded-2xl bg-black/5 p-4">
        <div
          className={`mx-auto h-full overflow-y-auto border transition-all duration-300 ${themeStyle.radius}`}
          style={{
            width: previewWidths[previewMode],
            maxWidth: "100%",
            borderColor: secondary,
            backgroundColor: isDark ? "#050505" : tertiary,
          }}
        >
          <WebsiteRenderer content={content} />
        </div>
      </div>
    </div>
  );
}