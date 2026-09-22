import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_WEEK } from "@/lib/recipes";

export type Vote = "like" | "dislike";

export type Rating = {
  vote: Vote;
  note: string;
};

export type CustomRecipe = {
  id: string;
  title: string;
  cuisine: string;
  createdAt: number;
};

type KitchenState = {
  hydrated: boolean;
  setHydrated: () => void;
  checked: Record<string, boolean>;
  toggleItem: (id: string) => void;
  resetList: () => void;
  ratings: Record<string, Rating>;
  setVote: (id: string, vote: Vote) => void;
  setNote: (id: string, note: string) => void;
  custom: CustomRecipe[];
  addCustom: (title: string, cuisine: string, vote: Vote, note: string) => void;
  removeCustom: (id: string) => void;
  weekIds: string[];
  setWeek: (ids: string[]) => void;
  inviteCode: string;
  isOwner: boolean;
};

export const useKitchen = create<KitchenState>()(
  persist(
    (set) => ({
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      checked: {},
      toggleItem: (id) =>
        set((s) => ({ checked: { ...s.checked, [id]: !s.checked[id] } })),
      resetList: () => set({ checked: {} }),
      ratings: {},
      setVote: (id, vote) =>
        set((s) => {
          const prev = s.ratings[id];
          if (prev?.vote === vote) {
            const next = { ...s.ratings };
            delete next[id];
            return { ratings: next };
          }
          return {
            ratings: {
              ...s.ratings,
              [id]: { vote, note: prev?.note ?? "" },
            },
          };
        }),
      setNote: (id, note) =>
        set((s) => {
          const prev = s.ratings[id];
          if (!prev) return s;
          return { ratings: { ...s.ratings, [id]: { ...prev, note } } };
        }),
      custom: [],
      addCustom: (title, cuisine, vote, note) =>
        set((s) => {
          const id = `custom-${Date.now()}`;
          return {
            custom: [
              ...s.custom,
              {
                id,
                title: title.trim(),
                cuisine: cuisine.trim(),
                createdAt: Date.now(),
              },
            ],
            ratings: {
              ...s.ratings,
              [id]: { vote, note: note.trim() },
            },
          };
        }),
      removeCustom: (id) =>
        set((s) => {
          const ratings = { ...s.ratings };
          delete ratings[id];
          return { custom: s.custom.filter((c) => c.id !== id), ratings };
        }),
      weekIds: [...DEFAULT_WEEK],
      setWeek: (ids) => set({ weekIds: ids, checked: {} }),
      inviteCode: "",
      isOwner: true,
    }),
    {
      name: "weeknight-table",
      partialize: (s) => ({
        checked: s.checked,
        ratings: s.ratings,
        custom: s.custom,
        weekIds: s.weekIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
