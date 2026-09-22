import { r as getSql } from "./db-CgGesww-.mjs";
import { n as DEFAULT_WEEK } from "./recipes-L-YJySwQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kitchen-ops.server-i9oz7CbS.js
function makeCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "";
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(bytes);
	for (const b of bytes) out += alphabet[b % 32];
	return out;
}
function parseState(row) {
	return {
		weekIds: Array.isArray(row.week_ids) ? row.week_ids : [...DEFAULT_WEEK],
		checked: row.checked && typeof row.checked === "object" && !Array.isArray(row.checked) ? row.checked : {},
		ratings: row.ratings && typeof row.ratings === "object" && !Array.isArray(row.ratings) ? row.ratings : {},
		custom: Array.isArray(row.custom) ? row.custom : []
	};
}
async function ensureKitchen(userId) {
	const sql = await getSql();
	let kitchenId = (await sql`
    select kitchen_id from kitchen_members where user_id = ${userId}
  `)[0]?.kitchen_id;
	let inviteCode = "";
	let ownerId = userId;
	if (!kitchenId) {
		kitchenId = `k_${makeCode()}`;
		inviteCode = makeCode();
		await sql`
      insert into kitchens (id, invite_code, owner_id)
      values (${kitchenId}, ${inviteCode}, ${userId})
    `;
		await sql`
      insert into kitchen_members (kitchen_id, user_id)
      values (${kitchenId}, ${userId})
    `;
		await sql.query(`insert into kitchen_state (kitchen_id, week_ids, checked, ratings, custom)
       values ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb)`, [
			kitchenId,
			JSON.stringify([...DEFAULT_WEEK]),
			JSON.stringify({}),
			JSON.stringify({}),
			JSON.stringify([])
		]);
		ownerId = userId;
	} else {
		const k = await sql`
      select invite_code, owner_id from kitchens where id = ${kitchenId}
    `;
		inviteCode = k[0]?.invite_code ?? "";
		ownerId = k[0]?.owner_id ?? userId;
	}
	const state = await sql`
    select week_ids, checked, ratings, custom from kitchen_state where kitchen_id = ${kitchenId}
  `;
	const parsed = state[0] ? parseState(state[0]) : {
		weekIds: [...DEFAULT_WEEK],
		checked: {},
		ratings: {},
		custom: []
	};
	return {
		inviteCode,
		isOwner: ownerId === userId,
		...parsed
	};
}
async function writeKitchen(userId, data) {
	const sql = await getSql();
	const kitchenId = (await sql`
    select kitchen_id from kitchen_members where user_id = ${userId}
  `)[0]?.kitchen_id;
	if (!kitchenId) throw new Error("No kitchen");
	await sql.query(`insert into kitchen_state (kitchen_id, week_ids, checked, ratings, custom, updated_at)
     values ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb, now())
     on conflict (kitchen_id) do update set
       week_ids = excluded.week_ids,
       checked = excluded.checked,
       ratings = excluded.ratings,
       custom = excluded.custom,
       updated_at = now()`, [
		kitchenId,
		JSON.stringify(data.weekIds),
		JSON.stringify(data.checked),
		JSON.stringify(data.ratings),
		JSON.stringify(data.custom)
	]);
}
async function attachToKitchen(userId, rawCode) {
	const sql = await getSql();
	const kitchenId = (await sql`
    select id from kitchens where invite_code = ${rawCode.trim().toUpperCase()}
  `)[0]?.id;
	if (!kitchenId) throw new Error("Code not found");
	await sql`delete from kitchen_members where user_id = ${userId}`;
	await sql`
    insert into kitchen_members (kitchen_id, user_id)
    values (${kitchenId}, ${userId})
  `;
	return ensureKitchen(userId);
}
//#endregion
export { attachToKitchen, ensureKitchen, writeKitchen };
