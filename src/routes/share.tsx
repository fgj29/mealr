import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Copy, Smartphone } from "lucide-react";
import { Shell } from "@/components/shell";
import { joinWithCode } from "@/components/kitchen-sync";
import { useKitchen } from "@/lib/store";

export const Route = createFileRoute("/share")({ component: SharePage });

function SharePage() {
  return (
    <Shell>
      <ShareInner />
    </Shell>
  );
}

function ShareInner() {
  const inviteCode = useKitchen((s) => s.inviteCode);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function copy() {
    if (!inviteCode) return;
    try {
      await navigator.clipboard.writeText(inviteCode);
      toast("Code copied.");
    } catch {
      toast(inviteCode);
    }
  }

  async function join(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await joinWithCode(code);
      toast("You’re on the same kitchen.");
      setCode("");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not join");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">Share</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
        Phone + household
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Publish this app from Grok, then both of you sign in. One kitchen: week,
        grocery checks, likes. Last save wins if you tap at the same time.
      </p>

      <section className="mt-6 rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-lg font-semibold">Invite code</h2>
        <p className="mt-1 text-sm text-muted">
          Text this to her. She signs in (Google, X, or email) then enters it below.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <p className="font-display text-3xl font-semibold tracking-[0.2em] tabular-nums">
            {inviteCode || "————"}
          </p>
          <button
            type="button"
            onClick={copy}
            className="flex size-11 items-center justify-center rounded-full bg-paper/10 text-fg"
            aria-label="Copy invite code"
          >
            <Copy className="size-4" />
          </button>
        </div>
        <form onSubmit={join} className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Her code, if she started first"
            className="h-12 flex-1 rounded-xl bg-bg px-3 text-sm tracking-widest outline-none"
          />
          <button
            type="submit"
            disabled={busy || code.length < 4}
            className="h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg disabled:opacity-50"
          >
            Join kitchen
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
          <Smartphone className="size-4 text-primary" />
          iPhone home screen
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg">
          <li>Publish from this Grok chat (the publish control in the preview).</li>
          <li>Open the published link in <strong>Safari</strong> — not Chrome, not in-app browsers.</li>
          <li>Tap Share (the square with the arrow) → <strong>Add to Home Screen</strong> → Add.</li>
          <li>Sign in once. It stays a full-screen app after that.</li>
          <li>Send her the same link. She repeats 2–4, then enters your invite code.</li>
        </ol>
      </section>
    </>
  );
}
