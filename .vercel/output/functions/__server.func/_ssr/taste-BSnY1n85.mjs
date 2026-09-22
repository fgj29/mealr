import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as RECIPES } from "./recipes-L-YJySwQ.mjs";
import { a as ThumbsUp, i as Trash2, o as ThumbsDown } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { t as cn } from "./use-client-ready-tq5_UyR5.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/taste-BSnY1n85.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TastePage() {
	const ratings = useKitchen((s) => s.ratings);
	const custom = useKitchen((s) => s.custom);
	const removeCustom = useKitchen((s) => s.removeCustom);
	const weekRated = RECIPES.filter((r) => ratings[r.id]);
	const customRated = custom.filter((c) => ratings[c.id]);
	const liked = [...weekRated.filter((r) => ratings[r.id]?.vote === "like").map((r) => ({
		id: r.id,
		title: r.title,
		meta: r.cuisine,
		week: true
	})), ...customRated.filter((c) => ratings[c.id]?.vote === "like").map((c) => ({
		id: c.id,
		title: c.title,
		meta: c.cuisine || "Logged",
		week: false
	}))];
	const skipped = [...weekRated.filter((r) => ratings[r.id]?.vote === "dislike").map((r) => ({
		id: r.id,
		title: r.title,
		meta: r.cuisine,
		week: true
	})), ...customRated.filter((c) => ratings[c.id]?.vote === "dislike").map((c) => ({
		id: c.id,
		title: c.title,
		meta: c.cuisine || "Logged",
		week: false
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wider text-primary",
			children: "Taste log"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl font-semibold tracking-tight",
			children: "Liked & skipped"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Verdicts stay on this device. Rate this week’s four, or log something you cooked off-plan."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogForm, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
				title: "Liked",
				empty: "Nothing liked yet. Cook Monday and tap thumbs up.",
				items: liked,
				ratings,
				onRemove: removeCustom,
				tone: "like"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
				title: "Skip next time",
				empty: "No skips logged.",
				items: skipped,
				ratings,
				onRemove: removeCustom,
				tone: "dislike"
			})]
		})
	] });
}
function Column({ title, empty, items, ratings, onRemove, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
		className: "mb-3 flex items-center gap-2 font-display text-lg font-semibold",
		children: [tone === "like" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-4 text-muted" }), title]
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[1.25rem] bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--shadow-border)]",
		children: empty
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: items.map((item) => {
			const note = ratings[item.id]?.note;
			const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: item.meta
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold leading-tight",
					children: item.title
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: note
				}) : null
			] });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-2 rounded-[1.25rem] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: item.week ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/recipe/$id",
						params: { id: item.id },
						className: "block hover:text-primary",
						children: body
					}) : body
				}), !item.week ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onRemove(item.id),
					className: "flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-fg",
					"aria-label": `Remove ${item.title}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				}) : null]
			}, item.id);
		})
	})] });
}
function LogForm() {
	const addCustom = useKitchen((s) => s.addCustom);
	const [title, setTitle] = (0, import_react.useState)("");
	const [cuisine, setCuisine] = (0, import_react.useState)("");
	const [vote, setVote] = (0, import_react.useState)("like");
	const [note, setNote] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		if (!title.trim()) {
			toast("Give it a name.");
			return;
		}
		addCustom(title, cuisine, vote, note);
		setTitle("");
		setCuisine("");
		setNote("");
		setVote("like");
		toast("Logged.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mt-6 rounded-[1.25rem] bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Log another recipe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Takeout, a leftover, something off the list."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block sm:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Al pastor tacos",
						className: "h-11 w-full rounded-xl bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted/70"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
						children: "Cuisine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: cuisine,
						onChange: (e) => setCuisine(e.target.value),
						placeholder: "Mexican",
						className: "h-11 w-full rounded-xl bg-bg px-3 text-sm text-fg outline-none placeholder:text-muted/70"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted",
					children: "Note"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 2,
					placeholder: "Worth repeating? Too spicy?",
					className: "w-full rounded-xl bg-bg px-3 py-2.5 text-sm text-fg outline-none placeholder:text-muted/70"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setVote("like"),
						className: cn("inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.96]", vote === "like" ? "bg-primary text-primary-fg" : "bg-paper/10 text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-4" }), " Liked it"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setVote("dislike"),
						className: cn("inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.96]", vote === "dislike" ? "bg-dislike text-fg" : "bg-paper/10 text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-4" }), " Skip"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "ml-auto inline-flex h-11 items-center rounded-full bg-paper px-5 text-sm font-semibold text-ink transition-transform active:scale-[0.96]",
						children: "Save"
					})
				]
			})
		]
	});
}
//#endregion
export { TastePage as component };
