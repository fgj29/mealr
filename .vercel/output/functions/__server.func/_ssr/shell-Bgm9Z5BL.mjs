import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as Navigate, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-bFh0SWji.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-DG6UNzh9.mjs";
import { c as Shuffle, l as Share2, m as ClipboardList, t as UtensilsCrossed, u as Heart } from "../_libs/lucide-react.mjs";
import { i as useKitchen } from "./router-QRWWhZ4W.mjs";
import { n as useClientReady, t as cn } from "./use-client-ready-tq5_UyR5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-Bgm9Z5BL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	const ready = useClientReady();
	if (isPending || !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[40vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-40 animate-pulse rounded-full bg-surface" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var NAV = [
	{
		to: "/",
		label: "This week",
		icon: UtensilsCrossed
	},
	{
		to: "/plan",
		label: "Planner",
		icon: Shuffle
	},
	{
		to: "/list",
		label: "Grocery",
		icon: ClipboardList
	},
	{
		to: "/taste",
		label: "Taste log",
		icon: Heart
	},
	{
		to: "/share",
		label: "Share",
		icon: Share2
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { isPending } = useCurrentUserState();
	const ready = useClientReady();
	const sessionPending = isPending || !ready;
	(0, import_react.useEffect)(() => {
		const done = () => useKitchen.getState().setHydrated();
		const unsub = useKitchen.persist.onFinishHydration(done);
		if (useKitchen.persist.hasHydrated()) done();
		return unsub;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grain absolute inset-0 opacity-40",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "relative z-10 border-b border-border/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "group min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold tracking-tight text-fg sm:text-xl",
							children: "Weeknight Table"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: "Mon–Thu · two plates · Carson Sprouts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [sessionPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 shrink-0 animate-pulse rounded-full bg-surface" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden min-w-0 sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex shrink-0 items-center gap-0.5 rounded-full bg-surface p-1 shadow-[var(--shadow-border)]",
							children: NAV.map(({ to, label, icon: Icon }) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to,
									className: cn("flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium transition-colors duration-150 sm:px-3", pathname === to ? "bg-primary text-primary-fg" : "text-muted hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4",
										strokeWidth: 1.75
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline",
										children: label
									})]
								}, to);
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-10 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children })
			})
		]
	});
}
//#endregion
export { Shell as t };
