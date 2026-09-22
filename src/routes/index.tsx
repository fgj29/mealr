import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { RecipeCard } from "@/components/recipe-card";
import { DAYS, DEFAULT_WEEK, recipeById } from "@/lib/recipes";
import { useKitchen } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ratings = useKitchen((s) => s.ratings);
  const stored = useKitchen((s) => s.weekIds);
  const weekIds = stored.length === 4 ? stored : [...DEFAULT_WEEK];
  const recipes = weekIds.map((id) => recipeById(id)).filter(Boolean);
  const scored = recipes.filter((r) => r && ratings[r.id]).length;

  return (
    <Shell>
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            This week
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Four dinners. One trip.
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Built from your likes and skips: one protein a night, no cuisine twice,
            under 30 minutes. Rebuild it in Planner.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm tabular-nums text-muted">
            {scored} of {recipes.length} rated
          </p>
          <Link
            to="/plan"
            className="inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg"
          >
            Run planner
          </Link>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {recipes.map((recipe, i) =>
          recipe ? (
            <RecipeCard key={recipe.id} recipe={recipe} dayLabel={DAYS[i].label} />
          ) : null,
        )}
      </div>
    </Shell>
  );
}
