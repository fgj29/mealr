import {
  DAYS,
  GROCERY,
  RECIPES,
  type DayKey,
  type Recipe,
} from "@/lib/recipes";
import type { Rating } from "@/lib/store";

const MAX_MINUTES = 30;
const CAL_TARGET = 500;

export type Slot = {
  day: DayKey;
  dayLabel: string;
  recipe: Recipe;
};

export type RankedPlan = {
  ids: string[];
  score: number;
  reasons: string[];
  slots: Slot[];
};

export type PlannerReport = {
  eligible: number;
  skipped: string[];
  feasible: number;
  ranked: RankedPlan[];
  hard: string[];
  soft: string[];
};

function eligiblePool(ratings: Record<string, Rating>): {
  pool: Recipe[];
  skipped: string[];
} {
  const skipped: string[] = [];
  const pool = RECIPES.filter((r) => {
    if (r.minutes > MAX_MINUTES) {
      skipped.push(`${r.title} · over ${MAX_MINUTES} min`);
      return false;
    }
    if (ratings[r.id]?.vote === "dislike") {
      skipped.push(`${r.title} · you marked skip`);
      return false;
    }
    return true;
  });
  return { pool, skipped };
}

function violatesHard(partial: Recipe[]): boolean {
  const last = partial[partial.length - 1];
  const rest = partial.slice(0, -1);
  if (rest.some((r) => r.id === last.id)) return true;
  if (rest.some((r) => r.protein === last.protein)) return true;
  if (rest.some((r) => r.cuisine === last.cuisine)) return true;
  if (partial.length >= 2 && partial[partial.length - 2].protein === last.protein) {
    return true;
  }
  return false;
}

function scorePlan(recipes: Recipe[], ratings: Record<string, Rating>): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  const likes = recipes.filter((r) => ratings[r.id]?.vote === "like").length;
  score += likes * 50;
  if (likes) reasons.push(`+${likes * 50} liked recipes (${likes})`);

  const proteins = new Set(recipes.map((r) => r.protein));
  score += proteins.size * 12;
  reasons.push(`+${proteins.size * 12} protein variety (${proteins.size}/4)`);

  const cuisines = new Set(recipes.map((r) => r.cuisine));
  score += cuisines.size * 10;
  reasons.push(`+${cuisines.size * 10} cuisine spread (${cuisines.size})`);

  const used = new Set(recipes.map((r) => r.id));
  const items = GROCERY.filter((g) => g.recipeIds.some((id) => used.has(id)));
  const shared = items.filter(
    (g) => g.recipeIds.filter((id) => used.has(id)).length >= 2,
  ).length;
  score += shared * 8;
  if (shared) reasons.push(`+${shared * 8} overlapping groceries (${shared} items)`);

  const avgCal = recipes.reduce((n, r) => n + r.calories, 0) / recipes.length;
  const calPen = Math.round(Math.abs(avgCal - CAL_TARGET) * 0.08);
  score -= calPen;
  if (calPen) reasons.push(`−${calPen} calorie drift (avg ${Math.round(avgCal)} vs ${CAL_TARGET})`);

  const maxMin = Math.max(...recipes.map((r) => r.minutes));
  score += Math.round((MAX_MINUTES - maxMin) * 0.5);

  return { score, reasons };
}

function combinations<T>(arr: T[], k: number): T[][] {
  const out: T[][] = [];
  const rec = (start: number, acc: T[]) => {
    if (acc.length === k) {
      out.push([...acc]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      acc.push(arr[i]);
      rec(i + 1, acc);
      acc.pop();
    }
  };
  rec(0, []);
  return out;
}

function permutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  const out: T[][] = [];
  arr.forEach((item, i) => {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permutations(rest)) out.push([item, ...p]);
  });
  return out;
}

/** Greedy-ordered CSP: enumerate feasible 4-day assignments, rank by heuristic. */
export function runPlanner(ratings: Record<string, Rating>): PlannerReport {
  const { pool, skipped } = eligiblePool(ratings);
  const ranked: RankedPlan[] = [];
  const combos = combinations(pool, 4);

  for (const combo of combos) {
    const ordered = permutations(combo);
    ordered.sort((a, b) => {
      const sa = scorePlan(a, ratings).score;
      const sb = scorePlan(b, ratings).score;
      return sb - sa;
    });
    for (const order of ordered) {
      let ok = true;
      const built: Recipe[] = [];
      for (const r of order) {
        built.push(r);
        if (violatesHard(built)) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const { score, reasons } = scorePlan(order, ratings);
      ranked.push({
        ids: order.map((r) => r.id),
        score,
        reasons,
        slots: order.map((recipe, i) => ({
          day: DAYS[i].key,
          dayLabel: DAYS[i].label,
          recipe,
        })),
      });
      break;
    }
  }

  ranked.sort((a, b) => b.score - a.score || a.ids.join().localeCompare(b.ids.join()));

  return {
    eligible: pool.length,
    skipped,
    feasible: ranked.length,
    ranked,
    hard: [
      "Exactly 4 dinners (Mon–Thu)",
      "No recipe twice",
      `Cook time ≤ ${MAX_MINUTES} min`,
      "Skip anything you disliked",
      "One protein per week (turkey / chicken / shrimp / salmon)",
      "No cuisine twice in the same week",
    ],
    soft: [
      "Liked recipes score +50",
      "Protein + cuisine variety",
      "Shared grocery items (one-trip compactness)",
      `Calories near ${CAL_TARGET} / serving`,
    ],
  };
}

export function planKey(ids: string[]): string {
  return ids.join("|");
}
