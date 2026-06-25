"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilder } from "@/components/builder/BuilderContext";

const defaultSections = [
  "hero",
  "services",
  "about",
  "gallery",
  "testimonials",
  "faq",
  "trust",
  "cta",
  "contact",
]

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  services: "Services",
  about: "About",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  trust: "Trust",
  cta: "Call To Action",
  contact: "Contact",
};

export default function LayoutStudio() {
  const { content, updateContent } = useBuilder();

  const sectionOrder = content.section_order ?? defaultSections;
  const enabledSections = content.enabled_sections ?? defaultSections;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id as string);
    const newIndex = sectionOrder.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) return;

    updateContent("section_order", arrayMove(sectionOrder, oldIndex, newIndex));
  }

  function toggleSection(section: string) {
    const updated = enabledSections.includes(section)
      ? enabledSections.filter((item) => item !== section)
      : [...enabledSections, section];

    updateContent("enabled_sections", updated);
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Layout Studio
      </p>

      <h2 className="mt-3 text-3xl font-bold">Sections and structure</h2>

      <div className="mt-8 rounded-2xl border border-[#ded4c3] p-5">
        <h3 className="font-bold">Visible Sections</h3>

        <div className="mt-4 grid gap-3">
          {defaultSections.map((section) => (
            <label
              key={section}
              className="flex items-center gap-3 rounded-xl border border-[#ded4c3] p-3"
            >
              <input
                type="checkbox"
                checked={enabledSections.includes(section)}
                onChange={() => toggleSection(section)}
              />
              {sectionLabels[section]}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded4c3] p-5">
        <h3 className="font-bold">Section Order</h3>
        <p className="mt-2 text-sm text-[#5f6b70]">
          Drag sections to rearrange the page.
        </p>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-4 grid gap-3">
              {sectionOrder.map((section) => (
                <SortableSectionItem
                  key={section}
                  id={section}
                  label={sectionLabels[section]}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortableSectionItem({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className="flex cursor-grab items-center justify-between rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4 font-semibold active:cursor-grabbing"
    >
      <span>{label}</span>
      <span className="text-[#5f6b70]">☰</span>
    </div>
  );
}