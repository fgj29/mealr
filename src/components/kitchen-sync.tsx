import { useEffect, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { joinKitchen, loadKitchen, saveKitchen } from "@/lib/kitchen-api";
import { DEFAULT_WEEK } from "@/lib/recipes";
import { useKitchen } from "@/lib/store";

export function KitchenSync() {
  const { user, isPending } = useCurrentUserState();
  const applying = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    applying.current = true;
    void loadKitchen()
      .then((k) => {
        if (cancelled) return;
        useKitchen.setState({
          weekIds: k.weekIds,
          checked: k.checked,
          ratings: k.ratings,
          custom: k.custom,
          inviteCode: k.inviteCode,
          isOwner: k.isOwner,
          hydrated: true,
        });
      })
      .catch(() => {
        useKitchen.getState().setHydrated();
      })
      .finally(() => {
        applying.current = false;
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (!user) return;
    const unsub = useKitchen.subscribe((s) => {
      if (applying.current || !s.hydrated) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        void saveKitchen({
          data: {
            weekIds: s.weekIds.length === 4 ? s.weekIds : [...DEFAULT_WEEK],
            checked: s.checked,
            ratings: s.ratings,
            custom: s.custom,
          },
        }).catch(() => {});
      }, 400);
    });
    return () => {
      unsub();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [user]);

  return null;
}

export async function joinWithCode(code: string) {
  const k = await joinKitchen({ data: { code } });
  useKitchen.setState({
    weekIds: k.weekIds,
    checked: k.checked,
    ratings: k.ratings,
    custom: k.custom,
    inviteCode: k.inviteCode,
    isOwner: k.isOwner,
    hydrated: true,
  });
}
