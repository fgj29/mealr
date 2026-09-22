import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Users } from "lucide-react";
import { Shell } from "@/components/shell";
import { VoteBar } from "@/components/vote-bar";
import { NoteField } from "@/components/note-field";
import { recipeById } from "@/lib/recipes";

export const Route = createFileRoute("/recipe/$id")({ component: RecipePage });

function RecipePage() {
  const { id } = Route.useParams();
  const recipe = recipeById(id);

  if (!recipe) {
    return (
      <Shell>
        <p className="text-muted">Recipe not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-primary">
          Back to this week
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <Link
        to="/"
        className="mb-5 inline-flex h-11 items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        This week
      </Link>

      <div className="overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]">
        <div className="relative aspect-[16/9] overflow-hidden bg-border sm:aspect-[2/1]">
          <img
            src={recipe.image}
            alt=""
            className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
        </div>
        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              {recipe.cuisine} · {recipe.protein}
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              {recipe.title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">{recipe.summary}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" strokeWidth={1.75} />
                {recipe.minutes} min
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Flame className="size-4" strokeWidth={1.75} />
                {recipe.calories} cal / serving
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" strokeWidth={1.75} />
                {recipe.servings} adults
              </span>
            </div>

            <h2 className="mt-8 font-display text-lg font-semibold">Steps</h2>
            <ol className="mt-3 space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-fg">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold tabular-nums text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-xl bg-paper p-4 text-ink">
              <h2 className="font-display text-lg font-semibold">Ingredients</h2>
              <ul className="mt-3 space-y-2">
                {recipe.ingredients.map((ing) => (
                  <li key={ing} className="text-sm leading-snug">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 font-display text-lg font-semibold">Your verdict</h2>
              <VoteBar recipeId={recipe.id} />
              <div className="mt-4">
                <NoteField recipeId={recipe.id} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
