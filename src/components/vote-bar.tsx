import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useKitchen, type Vote } from "@/lib/store";
import { cn } from "@/lib/utils";

export function VoteBar({
  recipeId,
  compact = false,
}: {
  recipeId: string;
  compact?: boolean;
}) {
  const vote = useKitchen((s) => s.ratings[recipeId]?.vote);
  const setVote = useKitchen((s) => s.setVote);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Recipe verdict">
      <VoteButton
        active={vote === "like"}
        kind="like"
        compact={compact}
        onClick={() => setVote(recipeId, "like")}
      />
      <VoteButton
        active={vote === "dislike"}
        kind="dislike"
        compact={compact}
        onClick={() => setVote(recipeId, "dislike")}
      />
    </div>
  );
}

function VoteButton({
  active,
  kind,
  compact,
  onClick,
}: {
  active: boolean;
  kind: Vote;
  compact: boolean;
  onClick: () => void;
}) {
  const like = kind === "like";
  const Icon = like ? ThumbsUp : ThumbsDown;
  const label = like ? "Liked it" : "Skip next time";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]",
        like
          ? active
            ? "bg-primary text-primary-fg"
            : "bg-paper/10 text-fg hover:bg-paper/16"
          : active
            ? "bg-dislike text-fg"
            : "bg-paper/10 text-muted hover:bg-paper/16 hover:text-fg",
      )}
    >
      <Icon className="size-4" strokeWidth={1.75} />
      {!compact && <span>{label}</span>}
      {compact && <span className="sr-only">{label}</span>}
    </button>
  );
}
