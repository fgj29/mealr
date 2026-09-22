import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Copy, s as Smartphone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useKitchen, r as joinWithCode } from "./router-QRWWhZ4W.mjs";
import { t as Shell } from "./shell-Bgm9Z5BL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-CdRFcOCn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SharePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareInner, {}) });
}
function ShareInner() {
	const inviteCode = useKitchen((s) => s.inviteCode);
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function copy() {
		if (!inviteCode) return;
		try {
			await navigator.clipboard.writeText(inviteCode);
			toast("Code copied.");
		} catch {
			toast(inviteCode);
		}
	}
	async function join(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await joinWithCode(code);
			toast("You’re on the same kitchen.");
			setCode("");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Could not join");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wider text-primary",
			children: "Share"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl font-semibold tracking-tight",
			children: "Phone + household"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Publish this app from Grok, then both of you sign in. One kitchen: week, grocery checks, likes. Last save wins if you tap at the same time."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Invite code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Text this to her. She signs in (Google, X, or email) then enters it below."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-semibold tracking-[0.2em] tabular-nums",
						children: inviteCode || "————"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: copy,
						className: "flex size-11 items-center justify-center rounded-full bg-paper/10 text-fg",
						"aria-label": "Copy invite code",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: join,
					className: "mt-5 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: code,
						onChange: (e) => setCode(e.target.value.toUpperCase()),
						placeholder: "Her code, if she started first",
						className: "h-12 flex-1 rounded-xl bg-bg px-3 text-sm tracking-widest outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy || code.length < 4,
						className: "h-12 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg disabled:opacity-50",
						children: "Join kitchen"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-[1.25rem] bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 font-display text-lg font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4 text-primary" }), "iPhone home screen"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Publish from this Grok chat (the publish control in the preview)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Open the published link in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Safari" }),
						" — not Chrome, not in-app browsers."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Tap Share (the square with the arrow) → ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Add to Home Screen" }),
						" → Add."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sign in once. It stays a full-screen app after that." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Send her the same link. She repeats 2–4, then enters your invite code." })
				]
			})]
		})
	] });
}
//#endregion
export { SharePage as component };
