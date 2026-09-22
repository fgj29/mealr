import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { $t as union, Jt as number, Kt as literal, Qt as string, Ut as array, Vt as _enum, Wt as boolean, Yt as object, Zt as record } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-BhKsBCdj.mjs";
import { n as DEFAULT_WEEK } from "./recipes-L-YJySwQ.mjs";
import { n as auth } from "./server-bFh0SWji.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-QRWWhZ4W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadKitchen = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4b84af156646d42a97db010706f818b402c0f826d833884208aff2f716855265"));
var saveSchema = object({
	weekIds: array(string()).length(4),
	checked: record(string(), boolean()),
	ratings: record(string(), object({
		vote: _enum(["like", "dislike"]),
		note: string()
	})),
	custom: array(object({
		id: string(),
		title: string(),
		cuisine: string(),
		createdAt: number()
	}))
});
var saveKitchen = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(createSsrRpc("90f848e1b6ba161cac119d0c68a2f86b4bbf85a512211f1a0c80e1a374847292"));
var joinKitchen = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ code: string().min(4).max(12) })).handler(createSsrRpc("78b5c75798d520d1cd7e4ed08c792c8fc3ce7e6e8e4208e6f546a2a72a331cdd"));
var useKitchen = create()(persist((set) => ({
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	checked: {},
	toggleItem: (id) => set((s) => ({ checked: {
		...s.checked,
		[id]: !s.checked[id]
	} })),
	resetList: () => set({ checked: {} }),
	ratings: {},
	setVote: (id, vote) => set((s) => {
		const prev = s.ratings[id];
		if (prev?.vote === vote) {
			const next = { ...s.ratings };
			delete next[id];
			return { ratings: next };
		}
		return { ratings: {
			...s.ratings,
			[id]: {
				vote,
				note: prev?.note ?? ""
			}
		} };
	}),
	setNote: (id, note) => set((s) => {
		const prev = s.ratings[id];
		if (!prev) return s;
		return { ratings: {
			...s.ratings,
			[id]: {
				...prev,
				note
			}
		} };
	}),
	custom: [],
	addCustom: (title, cuisine, vote, note) => set((s) => {
		const id = `custom-${Date.now()}`;
		return {
			custom: [...s.custom, {
				id,
				title: title.trim(),
				cuisine: cuisine.trim(),
				createdAt: Date.now()
			}],
			ratings: {
				...s.ratings,
				[id]: {
					vote,
					note: note.trim()
				}
			}
		};
	}),
	removeCustom: (id) => set((s) => {
		const ratings = { ...s.ratings };
		delete ratings[id];
		return {
			custom: s.custom.filter((c) => c.id !== id),
			ratings
		};
	}),
	weekIds: [...DEFAULT_WEEK],
	setWeek: (ids) => set({
		weekIds: ids,
		checked: {}
	}),
	inviteCode: "",
	isOwner: true
}), {
	name: "weeknight-table",
	partialize: (s) => ({
		checked: s.checked,
		ratings: s.ratings,
		custom: s.custom,
		weekIds: s.weekIds
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated();
	}
}));
function KitchenSync() {
	const { user, isPending } = useCurrentUserState();
	const applying = (0, import_react.useRef)(false);
	const timer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		applying.current = true;
		loadKitchen().then((k) => {
			if (cancelled) return;
			useKitchen.setState({
				weekIds: k.weekIds,
				checked: k.checked,
				ratings: k.ratings,
				custom: k.custom,
				inviteCode: k.inviteCode,
				isOwner: k.isOwner,
				hydrated: true
			});
		}).catch(() => {
			useKitchen.getState().setHydrated();
		}).finally(() => {
			applying.current = false;
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const unsub = useKitchen.subscribe((s) => {
			if (applying.current || !s.hydrated) return;
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => {
				saveKitchen({ data: {
					weekIds: s.weekIds.length === 4 ? s.weekIds : [...DEFAULT_WEEK],
					checked: s.checked,
					ratings: s.ratings,
					custom: s.custom
				} }).catch(() => {});
			}, 400);
		});
		return () => {
			unsub();
			if (timer.current) clearTimeout(timer.current);
		};
	}, [user]);
	return null;
}
async function joinWithCode(code) {
	const k = await joinKitchen({ data: { code } });
	useKitchen.setState({
		weekIds: k.weekIds,
		checked: k.checked,
		ratings: k.ratings,
		custom: k.custom,
		inviteCode: k.inviteCode,
		isOwner: k.isOwner,
		hydrated: true
	});
}
var styles_default = "/assets/styles-C4w-V3e4.css";
var APP_NAME = "Weeknight Table";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#14110E"
			},
			{
				name: "description",
				content: "Mon–Thu dinners, Carson Sprouts list, and a like/dislike log for recipes."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-bg font-sans text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitchenSync, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "bottom-center",
						toastOptions: { style: {
							background: "var(--color-surface)",
							color: "var(--color-fg)",
							border: "1px solid var(--color-border)"
						} }
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$6 = () => import("./routes-CO9ofamF.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./list-YXo4FfAc.mjs");
var Route$6 = createFileRoute("/list")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./login-CkP00VWG.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./plan-B6YTDsnh.mjs");
var Route$4 = createFileRoute("/plan")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./share-CdRFcOCn.mjs");
var Route$3 = createFileRoute("/share")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./taste-BSnY1n85.mjs");
var Route$2 = createFileRoute("/taste")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./recipe._id-BviPIRE3.mjs");
var Route$1 = createFileRoute("/recipe/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	ListRoute: Route$6.update({
		id: "/list",
		path: "/list",
		getParentRoute: () => Route$8
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$8
	}),
	PlanRoute: Route$4.update({
		id: "/plan",
		path: "/plan",
		getParentRoute: () => Route$8
	}),
	ShareRoute: Route$3.update({
		id: "/share",
		path: "/share",
		getParentRoute: () => Route$8
	}),
	TasteRoute: Route$2.update({
		id: "/taste",
		path: "/taste",
		getParentRoute: () => Route$8
	}),
	RecipeIdRoute: Route$1.update({
		id: "/recipe/$id",
		path: "/recipe/$id",
		getParentRoute: () => Route$8
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useKitchen as i, Route$1 as n, joinWithCode as r, router_exports as t };
