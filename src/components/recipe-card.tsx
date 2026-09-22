import { Link } from "@tanstack/react-router";
import { Clock, Flame } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { VoteBar } from "@/components/vote-bar";

export function RecipeCard({
  recipe,
  dayLabel,
}: {
  recipe: Recipe;
  dayLabel?: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]">
      <Link to="/recipe/$id" params={{ id: recipe.id }} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-border">
          <img
            src={recipe.image}
            alt=""
            className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
          {dayLabel ? (
            <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-fg backdrop-blur-sm">
              {dayLabel}
            </span>
          ) : null}
        </div>
        <div className="px-4 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {recipe.cuisine} · {recipe.protein}
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-fg">
            {recipe.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{recipe.summary}</p>
          <div className="mt-3 flex gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" strokeWidth={1.75} />
              {recipe.minutes} min
            </span>
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <Flame className="size-3.5" strokeWidth={1.75} />
              {recipe.calories} cal
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <VoteBar recipeId={recipe.id} compact />
        <Link
          to="/recipe/$id"
          params={{ id: recipe.id }}
          className="text-sm font-medium text-primary hover:text-fg"
        >
          Cook it
        </Link>
      </div>
    </article>
  );
}
