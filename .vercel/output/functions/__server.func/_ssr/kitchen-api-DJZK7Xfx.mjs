import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Jt as number, Qt as string, Ut as array, Vt as _enum, Wt as boolean, Yt as object, Zt as record } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-BhKsBCdj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kitchen-api-DJZK7Xfx.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadKitchen_createServerFn_handler = createServerRpc({
	id: "4b84af156646d42a97db010706f818b402c0f826d833884208aff2f716855265",
	name: "loadKitchen",
	filename: "src/lib/kitchen-api.ts"
}, (opts) => loadKitchen.__executeServer(opts));
var loadKitchen = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadKitchen_createServerFn_handler, async ({ context }) => {
	const { ensureKitchen } = await import("./kitchen-ops.server-i9oz7CbS.mjs");
	return ensureKitchen(context.userId);
});
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
var saveKitchen_createServerFn_handler = createServerRpc({
	id: "90f848e1b6ba161cac119d0c68a2f86b4bbf85a512211f1a0c80e1a374847292",
	name: "saveKitchen",
	filename: "src/lib/kitchen-api.ts"
}, (opts) => saveKitchen.__executeServer(opts));
var saveKitchen = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(saveKitchen_createServerFn_handler, async ({ context, data }) => {
	const { writeKitchen } = await import("./kitchen-ops.server-i9oz7CbS.mjs");
	await writeKitchen(context.userId, data);
	return { ok: true };
});
var joinKitchen_createServerFn_handler = createServerRpc({
	id: "78b5c75798d520d1cd7e4ed08c792c8fc3ce7e6e8e4208e6f546a2a72a331cdd",
	name: "joinKitchen",
	filename: "src/lib/kitchen-api.ts"
}, (opts) => joinKitchen.__executeServer(opts));
var joinKitchen = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ code: string().min(4).max(12) })).handler(joinKitchen_createServerFn_handler, async ({ context, data }) => {
	const { attachToKitchen } = await import("./kitchen-ops.server-i9oz7CbS.mjs");
	return attachToKitchen(context.userId, data.code);
});
//#endregion
export { joinKitchen_createServerFn_handler, loadKitchen_createServerFn_handler, saveKitchen_createServerFn_handler };
