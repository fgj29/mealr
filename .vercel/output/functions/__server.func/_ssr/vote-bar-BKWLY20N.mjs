import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ThumbsUp, o as ThumbsDown } from "../_libs/lucide-react.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { t as cn } from "./use-client-ready-tq5_UyR5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vote-bar-BKWLY20N.js
var import_jsx_runtime = require_jsx_runtime();
function VoteBar({ recipeId, compact = false }) {
	const vote = useKitchen((s) => s.ratings[recipeId]?.vote);
	const setVote = useKitchen((s) => s.setVote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		role: "group",
		"aria-label": "Recipe verdict",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteButton, {
			active: vote === "like",
			kind: "like",
			compact,
			onClick: () => setVote(recipeId, "like")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteButton, {
			active: vote === "dislike",
			kind: "dislike",
			compact,
			onClick: () => setVote(recipeId, "dislike")
		})]
	});
}
function VoteButton({ active, kind, compact, onClick }) {
	const like = kind === "like";
	const Icon = like ? ThumbsUp : ThumbsDown;
	const label = like ? "Liked it" : "Skip next time";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]", like ? active ? "bg-primary text-primary-fg" : "bg-paper/10 text-fg hover:bg-paper/16" : active ? "bg-dislike text-fg" : "bg-paper/10 text-muted hover:bg-paper/16 hover:text-fg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4",
				strokeWidth: 1.75
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: label
			})
		]
	});
}
//#endregion
export { VoteBar as t };
