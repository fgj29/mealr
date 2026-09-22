import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Shuffle } from "lucide-react";
import { Shell } from "@/components/shell";
import { planKey, runPlanner } from "@/lib/planner";
import { useKitchen } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  const ratings = useKitchen((s) => s.ratings);
  const weekIds = useKitchen((s) => s.weekIds);
  const setWeek = useKitchen((s) => s.setWeek);
  const report = useMemo(() => runPlanner(ratings), [ratings]);
  const currentKey = planKey(weekIds);
  const start = Math.max(
    0,
    report.ranked.findIndex((p) => planKey(p.ids) === currentKey),
  );
  const [cursor, setCursor] = useState(start === -1 ? 0 : start);
  const pick = report.ranked[cursor] ?? report.ranked[0];

  function apply() {
    if (!pick) return;
    setWeek(pick.ids);
    toast("Week updated. Grocery list rebuilt.");
  }

  function next() {
    if (report.ranked.length < 2) return;
    setCursor((c) => (c + 1) % report.ranked.length);
  }

  return (
    <Shell>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        Planner
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
        Constraint solver
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Greedy CSP: drop anything you skipped, then search 4-day assignments
        with one protein and one cuisine each night. Rank by likes, grocery
        overlap, and calorie drift. Same family as research meal planners —
        backtracking search plus a heuristic, not a neural net.
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
        <Stat label="Eligible" value={report.eligible} />
        <Stat label="Feasible weeks" value={report.feasible} />
        <Stat
          label="This score"
          value={pick ? Math.round(pick.score) : "—"}
        />
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-lg font-semibold">Hard rules</h2>
          <ul className="mt-3 space-y-2">
            {report.hard.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-fg">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-display text-lg font-semibold">Soft score</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {report.soft.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {report.skipped.length > 0 ? (
            <>
              <h2 className="mt-6 font-display text-lg font-semibold">Dropped</h2>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {report.skipped.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>

        <section className="rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-lg font-semibold">
              Candidate {report.ranked.length ? cursor + 1 : 0} / {report.feasible}
            </h2>
            <p className="text-sm tabular-nums text-muted">
              {pick ? Math.round(pick.score) : 0} pts
            </p>
          </div>
          {!pick ? (
            <p className="mt-4 text-sm text-muted">
              Not enough eligible recipes. Un-skip a protein or add likes.
            </p>
          ) : (
            <>
              <ol className="mt-4 space-y-3">
                {pick.slots.map((slot) => (
                  <li key={slot.day} className="flex gap-3">
                    <span className="w-10 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {slot.day}
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold leading-tight">
                        {slot.recipe.title}
                      </span>
                      <span className="text-xs text-muted">
                        {slot.recipe.cuisine} · {slot.recipe.protein} ·{" "}
                        {slot.recipe.minutes} min · {slot.recipe.calories} cal
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <ul className="mt-4 space-y-1 text-xs text-muted">
                {pick.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={apply}
                  className={cn(
                    "inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-transform active:scale-[0.96]",
                    planKey(pick.ids) === currentKey
                      ? "bg-paper/10 text-muted"
                      : "bg-primary text-primary-fg",
                  )}
                >
                  {planKey(pick.ids) === currentKey ? "Already this week" : "Use this week"}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full bg-paper/10 px-4 text-sm font-medium text-fg transition-transform active:scale-[0.96]"
                >
                  <Shuffle className="size-4" />
                  Next feasible
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-border)]">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
