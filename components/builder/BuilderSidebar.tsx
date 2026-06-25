import type { StudioPanel } from "@/app/builder/page";

type Props = {
  activePanel: StudioPanel;
  setActivePanel: (panel: StudioPanel) => void;
};

const navItems: { id: StudioPanel; label: string; icon: string }[] = [
  { id: "design", label: "Design", icon: "🎨" },
  { id: "content", label: "Content", icon: "📝" },
  { id: "layout", label: "Layout", icon: "📐" },
  { id: "media", label: "Media", icon: "🖼️" },
  { id: "publish", label: "Publish", icon: "🚀" },
];

export default function BuilderSidebar({ activePanel, setActivePanel }: Props) {
  return (
    <aside className="border-r border-[#ded4c3] bg-[#1f2528] p-4 text-white">
      <div className="mb-6 rounded-2xl bg-white/10 p-4">
        <p className="text-sm text-white/70">Editing</p>
        <h2 className="font-bold">Demo Website</h2>
      </div>

      <nav className="grid gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold ${
              activePanel === item.id
                ? "bg-white text-[#1f2528]"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}