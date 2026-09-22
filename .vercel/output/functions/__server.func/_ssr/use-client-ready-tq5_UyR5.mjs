import { o as __toESM } from "../_runtime.mjs";
import { H as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-client-ready-tq5_UyR5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** False on SSR and the first client paint so auth UI does not hydrate-mismatch. */
function useClientReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return ready;
}
//#endregion
export { useClientReady as n, cn as t };
