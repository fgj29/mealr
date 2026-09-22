import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-bFh0SWji.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { n as useClientReady, t as cn } from "./use-client-ready-tq5_UyR5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CkP00VWG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const ready = useClientReady();
	if (isPending || !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-40 animate-pulse rounded-full bg-surface" })
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-primary",
					children: "Weeknight Table"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Same kitchen on your phone and hers. Google, X, or email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-2",
					children: [GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						className: "flex h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-medium shadow-[var(--shadow-border)] transition-transform active:scale-[0.96]",
						children: ["Continue with ", p.label]
					}, p.providerId)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailForm, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-primary",
						children: "Back"
					})
				})
			]
		})
	});
}
function EmailForm() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					name: name.trim() || email,
					email: email.trim(),
					password,
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message);
			} else {
				const res = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message);
			}
			window.location.assign("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not sign in");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mt-6 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs uppercase tracking-wider text-muted",
				children: "or email"
			}),
			mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "Name",
				autoComplete: "name",
				className: "h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				required: true,
				value: email,
				onChange: (e) => setEmail(e.target.value),
				placeholder: "Email",
				autoComplete: "email",
				className: "h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				required: true,
				minLength: 8,
				value: password,
				onChange: (e) => setPassword(e.target.value),
				placeholder: "Password (8+)",
				autoComplete: mode === "up" ? "new-password" : "current-password",
				className: "h-12 w-full rounded-xl bg-surface px-3 text-sm outline-none"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: busy,
				className: "flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg disabled:opacity-60",
				children: busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMode(mode === "up" ? "in" : "up"),
				className: cn("w-full text-center text-sm text-muted"),
				children: mode === "up" ? "Already have an account? Sign in" : "Wife needs an account? Create one"
			})
		]
	});
}
//#endregion
export { Login as component };
