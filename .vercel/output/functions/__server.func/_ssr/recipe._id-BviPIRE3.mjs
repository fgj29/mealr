import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as recipeById } from "./recipes-L-YJySwQ.mjs";
import { d as Flame, g as ArrowLeft, n as Users, p as Clock } from "../_libs/lucide-react.mjs";
import { i as useKitchen, n as Route$1 } from "./router-QRWWhZ4W.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
import { t as VoteBar } from "./vote-bar-BKWLY20N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recipe._id-BviPIRE3.js
var import_jsx_runtime = require_jsx_runtime();
function NoteField({ recipeId }) {
	const rating = useKitchen((s) => s.ratings[recipeId]);
	const setNote = useKitchen((s) => s.setNote);
	if (!rating) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Tap like or dislike first — then you can leave a note."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
			children: "Note"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: rating.note,
			onChange: (e) => setNote(recipeId, e.target.value),
			rows: 3,
			placeholder: rating.vote === "like" ? "What worked — heat, leftover, kid-friendly…" : "Why it missed — too salty, too long, skip next time…",
			className: "w-full resize-y rounded-xl border-0 bg-bg/60 px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)] outline-none ring-0 placeholder:text-muted/70 focus:bg-bg"
		})]
	});
}
function RecipePage() {
	const { id } = Route$1.useParams();
	const recipe = recipeById(id);
	if (!recipe) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Recipe not found."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "mt-4 inline-block text-sm text-primary",
		children: "Back to this week"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "mb-5 inline-flex h-11 items-center gap-1.5 text-sm text-muted hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "This week"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-[16/9] overflow-hidden bg-border sm:aspect-[2/1]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: recipe.image,
				alt: "",
				className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-primary",
					children: [
						recipe.cuisine,
						" · ",
						recipe.protein
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold tracking-tight",
					children: recipe.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: recipe.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-4 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "size-4",
									strokeWidth: 1.75
								}),
								recipe.minutes,
								" min"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									className: "size-4",
									strokeWidth: 1.75
								}),
								recipe.calories,
								" cal / serving"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									className: "size-4",
									strokeWidth: 1.75
								}),
								recipe.servings,
								" adults"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-lg font-semibold",
					children: "Steps"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-3",
					children: recipe.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold tabular-nums text-primary",
							children: i + 1
						}), step]
					}, i))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-paper p-4 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Ingredients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: recipe.ingredients.map((ing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm leading-snug",
							children: ing
						}, ing))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg font-semibold",
						children: "Your verdict"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteBar, { recipeId: recipe.id }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteField, { recipeId: recipe.id })
					})
				] })]
			})]
		})]
	})] });
}
//#endregion
export { RecipePage as component };
