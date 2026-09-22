import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useClientReady } from "@/components/use-client-ready";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const ready = useClientReady();
  if (isPending || !ready) {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg text-fg">
        <div className="h-10 w-40 animate-pulse rounded-full bg-surface" />
      </main>
    );
  }
  if (user) return <Navigate to="/" />;

  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-4 text-fg">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Weeknight Table
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Same kitchen on your phone and hers. Google, X, or email.
        </p>
        {authEnabled ? (
          <div className="mt-6 space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="flex h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-medium shadow-[var(--shadow-border)] transition-transform active:scale-[0.96]"
              >
                Continue with {p.label}
              </button>
            ))}
            <EmailForm />
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
        )}
        <p className="mt-6 text-center text-xs text-muted">
          <Link to="/" className="text-primary">
            Back
          </Link>
        </p>
      </div>
    </main>
  );
}

function EmailForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          name: name.trim() || email,
          email: email.trim(),
          password,
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      <p className="text-center text-xs uppercase tracking-wider text-muted">or email</p>
      {mode === "up" ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoComplete="name"
          className="h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
        />
      ) : null}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        className="h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
      />
      <input
        type="password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (8+)"
        autoComplete={mode === "up" ? "new-password" : "current-password"}
        className="h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
      />
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg disabled:opacity-60"
      >
        {busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"}
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === "up" ? "in" : "up")}
        className={cn("w-full text-center text-sm text-muted")}
      >
        {mode === "up" ? "Already have an account? Sign in" : "Wife needs an account? Create one"}
      </button>
    </form>
  );
}

