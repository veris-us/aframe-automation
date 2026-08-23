"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-[#1f6f8b] px-6 py-2 text-sm font-semibold text-white hover:bg-[#195a70]"
    >
      Print / Save as PDF
    </button>
  );
}
