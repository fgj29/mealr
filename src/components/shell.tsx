import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Heart, Share2, Shuffle, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKitchen } from "@/lib/store";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useClientReady } from "@/components/use-client-ready";
import { RequireAuth } from "@/components/require-auth";

const NAV = [
  { to: "/", label: "This week", icon: UtensilsCrossed },
  { to: "/plan", label: "Planner", icon: Shuffle },
  { to: "/list", label: "Grocery", icon: ClipboardList },
  { to: "/taste", label: "Taste log", icon: Heart },
  { to: "/share", label: "Share", icon: Share2 },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();
  const ready = useClientReady();
  const sessionPending = isPending || !ready;

  useEffect(() => {
    const done = () => useKitchen.getState().setHydrated();
    const unsub = useKitchen.persist.onFinishHydration(done);
    if (useKitchen.persist.hasHydrated()) done();
    return unsub;
  }, []);

  return (
    <div className="relative min-h-dvh bg-bg">
      <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
      <header className="relative z-10 border-b border-border/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
          <Link to="/" className="group min-w-0">
            <p className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
              Weeknight Table
            </p>
            <p className="truncate text-xs text-muted">Mon–Thu · two plates · Carson Sprouts</p>
          </Link>
          <div className="flex min-w-0 items-center gap-2">
            {sessionPending ? (
              <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-surface" />
            ) : (
              <div className="hidden min-w-0 sm:block">
                <UserButton />
              </div>
            )}
            <nav className="flex shrink-0 items-center gap-0.5 rounded-full bg-surface p-1 shadow-[var(--shadow-border)]">
              {NAV.map(({ to, label, icon: Icon }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium transition-colors duration-150 sm:px-3",
                      active
                        ? "bg-primary text-primary-fg"
                        : "text-muted hover:text-fg",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                    <span className="hidden md:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <RequireAuth>{children}</RequireAuth>
      </main>
    </div>
  );
}
