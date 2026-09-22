import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as RECIPES, r as GROCERY, t as DAYS } from "./recipes-L-YJySwQ.mjs";
import { c as Shuffle, h as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { t as cn } from "./use-client-ready-tq5_UyR5.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-B6YTDsnh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_MINUTES = 30;
var CAL_TARGET = 500;
function eligiblePool(ratings) {
	const skipped = [];
	return {
		pool: RECIPES.filter((r) => {
			if (r.minutes > MAX_MINUTES) {
				skipped.push(`${r.title} · over ${MAX_MINUTES} min`);
				return false;
			}
			if (ratings[r.id]?.vote === "dislike") {
				skipped.push(`${r.title} · you marked skip`);
				return false;
			}
			return true;
		}),
		skipped
	};
}
function violatesHard(partial) {
	const last = partial[partial.length - 1];
	const rest = partial.slice(0, -1);
	if (rest.some((r) => r.id === last.id)) return true;
	if (rest.some((r) => r.protein === last.protein)) return true;
	if (rest.some((r) => r.cuisine === last.cuisine)) return true;
	if (partial.length >= 2 && partial[partial.length - 2].protein === last.protein) return true;
	return false;
}
function scorePlan(recipes, ratings) {
	let score = 0;
	const reasons = [];
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
	const shared = GROCERY.filter((g) => g.recipeIds.some((id) => used.has(id))).filter((g) => g.recipeIds.filter((id) => used.has(id)).length >= 2).length;
	score += shared * 8;
	if (shared) reasons.push(`+${shared * 8} overlapping groceries (${shared} items)`);
	const avgCal = recipes.reduce((n, r) => n + r.calories, 0) / recipes.length;
	const calPen = Math.round(Math.abs(avgCal - CAL_TARGET) * .08);
	score -= calPen;
	if (calPen) reasons.push(`−${calPen} calorie drift (avg ${Math.round(avgCal)} vs ${CAL_TARGET})`);
	const maxMin = Math.max(...recipes.map((r) => r.minutes));
	score += Math.round((MAX_MINUTES - maxMin) * .5);
	return {
		score,
		reasons
	};
}
function combinations(arr, k) {
	const out = [];
	const rec = (start, acc) => {
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
function permutations(arr) {
	if (arr.length <= 1) return [arr];
	const out = [];
	arr.forEach((item, i) => {
		const rest = arr.slice(0, i).concat(arr.slice(i + 1));
		for (const p of permutations(rest)) out.push([item, ...p]);
	});
	return out;
}
/** Greedy-ordered CSP: enumerate feasible 4-day assignments, rank by heuristic. */
function runPlanner(ratings) {
	const { pool, skipped } = eligiblePool(ratings);
	const ranked = [];
	const combos = combinations(pool, 4);
	for (const combo of combos) {
		const ordered = permutations(combo);
		ordered.sort((a, b) => {
			const sa = scorePlan(a, ratings).score;
			return scorePlan(b, ratings).score - sa;
		});
		for (const order of ordered) {
			let ok = true;
			const built = [];
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
					recipe
				}))
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
			"No cuisine twice in the same week"
		],
		soft: [
			"Liked recipes score +50",
			"Protein + cuisine variety",
			"Shared grocery items (one-trip compactness)",
			`Calories near ${CAL_TARGET} / serving`
		]
	};
}
function planKey(ids) {
	return ids.join("|");
}
function PlanPage() {
	const ratings = useKitchen((s) => s.ratings);
	const weekIds = useKitchen((s) => s.weekIds);
	const setWeek = useKitchen((s) => s.setWeek);
	const report = (0, import_react.useMemo)(() => runPlanner(ratings), [ratings]);
	const currentKey = planKey(weekIds);
	const start = Math.max(0, report.ranked.findIndex((p) => planKey(p.ids) === currentKey));
	const [cursor, setCursor] = (0, import_react.useState)(start === -1 ? 0 : start);
	const pick = report.ranked[cursor] ?? report.ranked[0];
	function apply() {
		if (!pick) return;
		setWeek(pick.ids);
		toast("Week updated. Grocery list rebuilt.");
	}
	function next() {
		if (report.ranked.length < 2) return;
		setCursor((c) => (c + 1) % report.ranked.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wider text-primary",
			children: "Planner"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl font-semibold tracking-tight",
			children: "Constraint solver"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Greedy CSP: drop anything you skipped, then search 4-day assignments with one protein and one cuisine each night. Rank by likes, grocery overlap, and calorie drift. Same family as research meal planners — backtracking search plus a heuristic, not a neural net."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid grid-cols-3 gap-3 sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Eligible",
					value: report.eligible
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Feasible weeks",
					value: report.feasible
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "This score",
					value: pick ? Math.round(pick.score) : "—"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Hard rules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: report.hard.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }), line]
						}, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 font-display text-lg font-semibold",
						children: "Soft score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted",
						children: report.soft.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					}),
					report.skipped.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 font-display text-lg font-semibold",
						children: "Dropped"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1 text-sm text-muted",
						children: report.skipped.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					})] }) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-lg font-semibold",
						children: [
							"Candidate ",
							report.ranked.length ? cursor + 1 : 0,
							" / ",
							report.feasible
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [pick ? Math.round(pick.score) : 0, " pts"]
					})]
				}), !pick ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Not enough eligible recipes. Un-skip a protein or add likes."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-3",
						children: pick.slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-wider text-primary",
								children: slot.day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-base font-semibold leading-tight",
								children: slot.recipe.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									slot.recipe.cuisine,
									" · ",
									slot.recipe.protein,
									" ·",
									" ",
									slot.recipe.minutes,
									" min · ",
									slot.recipe.calories,
									" cal"
								]
							})] })]
						}, slot.day))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1 text-xs text-muted",
						children: pick.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: apply,
							className: cn("inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-transform active:scale-[0.96]", planKey(pick.ids) === currentKey ? "bg-paper/10 text-muted" : "bg-primary text-primary-fg"),
							children: planKey(pick.ids) === currentKey ? "Already this week" : "Use this week"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: next,
							className: "inline-flex h-11 items-center gap-1.5 rounded-full bg-paper/10 px-4 text-sm font-medium text-fg transition-transform active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), "Next feasible"]
						})]
					})
				] })]
			})]
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { PlanPage as component };
