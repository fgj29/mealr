import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SECTION_ORDER, n as DEFAULT_WEEK, o as groceryForWeek, s as recipeById, t as DAYS } from "./recipes-L-YJySwQ.mjs";
import { h as Check } from "../_libs/lucide-react.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { t as cn } from "./use-client-ready-tq5_UyR5.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-YXo4FfAc.js
var import_jsx_runtime = require_jsx_runtime();
function GroceryPage() {
	const checked = useKitchen((s) => s.checked);
	const toggleItem = useKitchen((s) => s.toggleItem);
	const resetList = useKitchen((s) => s.resetList);
	const hydrated = useKitchen((s) => s.hydrated);
	const stored = useKitchen((s) => s.weekIds);
	const weekIds = stored.length === 4 ? stored : [...DEFAULT_WEEK];
	const items = groceryForWeek(weekIds);
	const done = items.filter((g) => checked[g.id]).length;
	const dayFor = (id) => {
		const i = weekIds.indexOf(id);
		return i >= 0 ? DAYS[i].label : "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-primary",
				children: "Carson Sprouts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl font-semibold tracking-tight",
				children: "One-trip list"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Built from this week’s four plates. University Dr & Avalon. Pantry: oil, salt, pepper, cumin, chili, oregano."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums text-muted",
				children: hydrated ? `${done} / ${items.length}` : "—"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: resetList,
				className: "h-11 rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-fg",
				children: "Reset checks"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: SECTION_ORDER.map((section) => {
			const sectionItems = items.filter((g) => g.section === section);
			if (sectionItems.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-lg font-semibold text-fg",
				children: section
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "overflow-hidden rounded-[1.25rem] bg-surface shadow-[var(--shadow-border)]",
				children: sectionItems.map((item, i) => {
					const on = hydrated && !!checked[item.id];
					const names = item.recipeIds.filter((id) => weekIds.includes(id)).map((id) => dayFor(id) || recipeById(id)?.title).filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: cn(i > 0 && "border-t border-border"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggleItem(item.id),
							className: "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-paper/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors", on ? "bg-primary text-primary-fg" : "bg-paper/10 text-transparent"),
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-3.5",
									strokeWidth: 2.5
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block text-sm font-medium", on ? "text-muted line-through" : "text-fg"),
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-xs text-muted",
									children: [names, item.note ? ` · ${item.note}` : ""]
								})]
							})]
						})
					}, item.id);
				})
			})] }, section);
		})
	})] });
}
//#endregion
export { GroceryPage as component };
