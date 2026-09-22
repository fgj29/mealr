import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/shell";
import { RECIPES } from "@/lib/recipes";
import { useKitchen, type Vote } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/taste")({ component: TastePage });

function TastePage() {
  const ratings = useKitchen((s) => s.ratings);
  const custom = useKitchen((s) => s.custom);
  const removeCustom = useKitchen((s) => s.removeCustom);

  const weekRated = RECIPES.filter((r) => ratings[r.id]);
  const customRated = custom.filter((c) => ratings[c.id]);

  const liked = [
    ...weekRated
      .filter((r) => ratings[r.id]?.vote === "like")
      .map((r) => ({
        id: r.id,
        title: r.title,
        meta: r.cuisine,
        week: true,
      })),
    ...customRated
      .filter((c) => ratings[c.id]?.vote === "like")
      .map((c) => ({
        id: c.id,
        title: c.title,
        meta: c.cuisine || "Logged",
        week: false,
      })),
  ];

  const skipped = [
    ...weekRated
      .filter((r) => ratings[r.id]?.vote === "dislike")
      .map((r) => ({
        id: r.id,
        title: r.title,
        meta: r.cuisine,
        week: true,
      })),
    ...customRated
      .filter((c) => ratings[c.id]?.vote === "dislike")
      .map((c) => ({
        id: c.id,
        title: c.title,
        meta: c.cuisine || "Logged",
        week: false,
      })),
  ];

  return (
    <Shell>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">
        Taste log
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
        Liked & skipped
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Verdicts stay on this device. Rate this week’s four, or log something you
        cooked off-plan.
      </p>

      <LogForm />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Column
          title="Liked"
          empty="Nothing liked yet. Cook Monday and tap thumbs up."
          items={liked}
          ratings={ratings}
          onRemove={removeCustom}
          tone="like"
        />
        <Column
          title="Skip next time"
          empty="No skips logged."
          items={skipped}
          ratings={ratings}
          onRemove={removeCustom}
          tone="dislike"
        />
      </div>
    </Shell>
  );
}

function Column({
  title,
  empty,
  items,
  ratings,
  onRemove,
  tone,
}: {
  title: string;
  empty: string;
  items: { id: string; title: string; meta: string; week: boolean }[];
  ratings: Record<string, { vote: Vote; note: string }>;
  onRemove: (id: string) => void;
  tone: Vote;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
        {tone === "like" ? (
          <ThumbsUp className="size-4 text-primary" />
        ) : (
          <ThumbsDown className="size-4 text-muted" />
        )}
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="rounded-[1.25rem] bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--shadow-border)]">
          {empty}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const note = ratings[item.id]?.note;
            const body = (
              <>
                <p className="text-xs uppercase tracking-wider text-muted">{item.meta}</p>
                <p className="font-display text-lg font-semibold leading-tight">{item.title}</p>
                {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
              </>
            );
            return (
              <li
                key={item.id}
                className="flex items-start gap-2 rounded-[1.25rem] bg-surface p-4 shadow-[var(--shadow-border)]"
              >
                <div className="min-w-0 flex-1">
                  {item.week ? (
                    <Link
                      to="/recipe/$id"
                      params={{ id: item.id }}
                      className="block hover:text-primary"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </div>
                {!item.week ? (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-fg"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function LogForm() {
  const addCustom = useKitchen((s) => s.addCustom);
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [vote, setVote] = useState<Vote>("like");
  const [note, setNote] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast("Give it a name.");
      return;
    }
    addCustom(title, cuisine, vote, note);
    setTitle("");
    setCuisine("");
    setNote("");
    setVote("like");
    toast("Logged.");
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 rounded-[1.25rem] bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
    >
      <h2 className="font-display text-lg font-semibold">Log another recipe</h2>
      <p className="mt-1 text-sm text-muted">
        Takeout, a leftover, something off the list.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            Name
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Al pastor tacos"
            className="h-11 w-full rounded-xl bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted/70"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            Cuisine
          </span>
          <input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Mexican"
            className="h-11 w-full rounded-xl bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted/70"
          />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
          Note
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Worth repeating? Too spicy?"
          className="w-full rounded-xl bg-bg px-3 py-2.5 text-sm text-fg outline-none placeholder:text-muted/70"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setVote("like")}
          className={cn(
            "inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.96]",
            vote === "like" ? "bg-primary text-primary-fg" : "bg-paper/10 text-muted",
          )}
        >
          <ThumbsUp className="size-4" /> Liked it
        </button>
        <button
          type="button"
          onClick={() => setVote("dislike")}
          className={cn(
            "inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.96]",
            vote === "dislike" ? "bg-dislike text-fg" : "bg-paper/10 text-muted",
          )}
        >
          <ThumbsDown className="size-4" /> Skip
        </button>
        <button
          type="submit"
          className="ml-auto inline-flex h-11 items-center rounded-full bg-paper px-5 text-sm font-semibold text-ink transition-transform active:scale-[0.96]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
