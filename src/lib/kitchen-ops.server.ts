import { getSql } from "@/lib/db";
import { DEFAULT_WEEK } from "@/lib/recipes";
import type { CustomRecipe, Rating } from "@/lib/store";

export type KitchenPayload = {
  inviteCode: string;
  isOwner: boolean;
  weekIds: string[];
  checked: Record<string, boolean>;
  ratings: Record<string, Rating>;
  custom: CustomRecipe[];
};

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

function parseState(row: {
  week_ids: unknown;
  checked: unknown;
  ratings: unknown;
  custom: unknown;
}): Pick<KitchenPayload, "weekIds" | "checked" | "ratings" | "custom"> {
  const weekIds = Array.isArray(row.week_ids) ? (row.week_ids as string[]) : [...DEFAULT_WEEK];
  const checked =
    row.checked && typeof row.checked === "object" && !Array.isArray(row.checked)
      ? (row.checked as Record<string, boolean>)
      : {};
  const ratings =
    row.ratings && typeof row.ratings === "object" && !Array.isArray(row.ratings)
      ? (row.ratings as Record<string, Rating>)
      : {};
  const custom = Array.isArray(row.custom) ? (row.custom as CustomRecipe[]) : [];
  return { weekIds, checked, ratings, custom };
}

export async function ensureKitchen(userId: string): Promise<KitchenPayload> {
  const sql = await getSql();
  const member = await sql<{ kitchen_id: string }>`
    select kitchen_id from kitchen_members where user_id = ${userId}
  `;
  let kitchenId = member[0]?.kitchen_id;
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
    await sql.query(
      `insert into kitchen_state (kitchen_id, week_ids, checked, ratings, custom)
       values ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb)`,
      [
        kitchenId,
        JSON.stringify([...DEFAULT_WEEK]),
        JSON.stringify({}),
        JSON.stringify({}),
        JSON.stringify([]),
      ],
    );
    ownerId = userId;
  } else {
    const k = await sql<{ invite_code: string; owner_id: string }>`
      select invite_code, owner_id from kitchens where id = ${kitchenId}
    `;
    inviteCode = k[0]?.invite_code ?? "";
    ownerId = k[0]?.owner_id ?? userId;
  }

  const state = await sql<{
    week_ids: unknown;
    checked: unknown;
    ratings: unknown;
    custom: unknown;
  }>`
    select week_ids, checked, ratings, custom from kitchen_state where kitchen_id = ${kitchenId}
  `;
  const parsed = state[0]
    ? parseState(state[0])
    : {
        weekIds: [...DEFAULT_WEEK],
        checked: {},
        ratings: {},
        custom: [],
      };

  return {
    inviteCode,
    isOwner: ownerId === userId,
    ...parsed,
  };
}

export async function writeKitchen(
  userId: string,
  data: {
    weekIds: string[];
    checked: Record<string, boolean>;
    ratings: Record<string, Rating>;
    custom: CustomRecipe[];
  },
) {
  const sql = await getSql();
  const member = await sql<{ kitchen_id: string }>`
    select kitchen_id from kitchen_members where user_id = ${userId}
  `;
  const kitchenId = member[0]?.kitchen_id;
  if (!kitchenId) throw new Error("No kitchen");
  await sql.query(
    `insert into kitchen_state (kitchen_id, week_ids, checked, ratings, custom, updated_at)
     values ($1, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb, now())
     on conflict (kitchen_id) do update set
       week_ids = excluded.week_ids,
       checked = excluded.checked,
       ratings = excluded.ratings,
       custom = excluded.custom,
       updated_at = now()`,
    [
      kitchenId,
      JSON.stringify(data.weekIds),
      JSON.stringify(data.checked),
      JSON.stringify(data.ratings),
      JSON.stringify(data.custom),
    ],
  );
}

export async function attachToKitchen(userId: string, rawCode: string) {
  const sql = await getSql();
  const code = rawCode.trim().toUpperCase();
  const found = await sql<{ id: string }>`
    select id from kitchens where invite_code = ${code}
  `;
  const kitchenId = found[0]?.id;
  if (!kitchenId) throw new Error("Code not found");
  await sql`delete from kitchen_members where user_id = ${userId}`;
  await sql`
    insert into kitchen_members (kitchen_id, user_id)
    values (${kitchenId}, ${userId})
  `;
  return ensureKitchen(userId);
}
