import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Shell } from "@/components/shell";
import {
  DAYS,
  DEFAULT_WEEK,
  groceryForWeek,
  recipeById,
  SECTION_ORDER,
} from "@/lib/recipes";
import { useKitchen } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/list")({ component: GroceryPage });

function GroceryPage() {
  const checked = useKitchen((s) => s.checked);
  const toggleItem = useKitchen((s) => s.toggleItem);
  const resetList = useKitchen((s) => s.resetList);
  const hydrated = useKitchen((s) => s.hydrated);
  const stored = useKitchen((s) => s.weekIds);
  const weekIds = stored.length === 4 ? stored : [...DEFAULT_WEEK];
  const items = groceryForWeek(weekIds);
  const done = items.filter((g) => checked[g.id]).length;

  const dayFor = (id: string) => {
    const i = weekIds.indexOf(id);
    return i >= 0 ? DAYS[i].label : "";
  };

  return (
    <Shell>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Carson Sprouts
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            One-trip list
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Built from this week’s four plates. University Dr & Avalon. Pantry:
            oil, salt, pepper, cumin, chili, oregano.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm tabular-nums text-muted">
            {hydrated ? `${done} / ${items.length}` : "—"}
          </p>
          <button
            type="button"
            onClick={resetList}
            className="h-11 rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Reset checks
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {SECTION_ORDER.map((section) => {
          const sectionItems = items.filter((g) => g.section === section);
          if (sectionItems.length === 0) return null;
          return (
            <section key={section}>
              <h2 className="mb-3 font-display text-lg font-semibold text-fg">
                {section}
              </h2>
              <ul className="overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]">
                {sectionItems.map((item, i) => {
                  const on = hydrated && !!checked[item.id];
                  const names = item.recipeIds
                    .filter((id) => weekIds.includes(id))
                    .map((id) => dayFor(id) || recipeById(id)?.title)
                    .filter(Boolean)
                    .join(" · ");
                  return (
                    <li
                      key={item.id}
                      className={cn(i > 0 && "border-t border-border")}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-paper/5"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
                            on ? "bg-primary text-primary-fg" : "bg-paper/10 text-transparent",
                          )}
                          aria-hidden="true"
                        >
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block text-sm font-medium",
                              on ? "text-muted line-through" : "text-fg",
                            )}
                          >
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {names}
                            {item.note ? ` · ${item.note}` : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Shell>
  );
}
