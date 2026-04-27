"use client";

type Props = {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
};

export default function CategoryRail({ categories, active, onSelect }: Props) {
  return (
    <div className="border-y border-line bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => onSelect(c)}
                className={`shrink-0 text-sm px-3 py-1.5 rounded-full border transition ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "border-line text-muted hover:text-foreground hover:border-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
