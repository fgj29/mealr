import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DEFAULT_WEEK, s as recipeById, t as DAYS } from "./recipes-L-YJySwQ.mjs";
import { d as Flame, p as Clock } from "../_libs/lucide-react.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
import { t as VoteBar } from "./vote-bar-BKWLY20N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CO9ofamF.js
var import_jsx_runtime = require_jsx_runtime();
function RecipeCard({ recipe, dayLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/recipe/$id",
			params: { id: recipe.id },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/2] overflow-hidden bg-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: recipe.image,
					alt: "",
					className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
				}), dayLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-fg backdrop-blur-sm",
					children: dayLabel
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium uppercase tracking-wider text-primary",
						children: [
							recipe.cuisine,
							" · ",
							recipe.protein
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl font-semibold leading-tight text-fg",
						children: recipe.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed text-muted",
						children: recipe.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-4 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "size-3.5",
									strokeWidth: 1.75
								}),
								recipe.minutes,
								" min"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									className: "size-3.5",
									strokeWidth: 1.75
								}),
								recipe.calories,
								" cal"
							]
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteBar, {
				recipeId: recipe.id,
				compact: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/recipe/$id",
				params: { id: recipe.id },
				className: "text-sm font-medium text-primary hover:text-fg",
				children: "Cook it"
			})]
		})]
	});
}
function Home() {
	const ratings = useKitchen((s) => s.ratings);
	const stored = useKitchen((s) => s.weekIds);
	const recipes = (stored.length === 4 ? stored : [...DEFAULT_WEEK]).map((id) => recipeById(id)).filter(Boolean);
	const scored = recipes.filter((r) => r && ratings[r.id]).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-primary",
				children: "This week"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
				children: "Four dinners. One trip."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base",
				children: "Built from your likes and skips: one protein a night, no cuisine twice, under 30 minutes. Rebuild it in Planner."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-muted",
				children: [
					scored,
					" of ",
					recipes.length,
					" rated"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/plan",
				className: "inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg",
				children: "Run planner"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2",
		children: recipes.map((recipe, i) => recipe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeCard, {
			recipe,
			dayLabel: DAYS[i].label
		}, recipe.id) : null)
	})] });
}
//#endregion
export { Home as component };
