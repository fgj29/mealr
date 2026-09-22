import type { ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useClientReady } from "@/components/use-client-ready";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const ready = useClientReady();
  if (isPending || !ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-40 animate-pulse rounded-full bg-surface" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <>{children}</>;
}
