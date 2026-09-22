import { useKitchen } from "@/lib/store";

export function NoteField({ recipeId }: { recipeId: string }) {
  const rating = useKitchen((s) => s.ratings[recipeId]);
  const setNote = useKitchen((s) => s.setNote);

  if (!rating) {
    return (
      <p className="text-sm text-muted">
        Tap like or dislike first — then you can leave a note.
      </p>
    );
  }

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        Note
      </span>
      <textarea
        value={rating.note}
        onChange={(e) => setNote(recipeId, e.target.value)}
        rows={3}
        placeholder={
          rating.vote === "like"
            ? "What worked — heat, leftover, kid-friendly…"
            : "Why it missed — too salty, too long, skip next time…"
        }
        className="w-full resize-y rounded-xl border-0 bg-bg/60 px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)] outline-none ring-0 placeholder:text-muted/70 focus:bg-bg"
      />
    </label>
  );
}
