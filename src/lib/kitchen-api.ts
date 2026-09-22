import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import type { CustomRecipe, Rating } from "@/lib/store";

export type KitchenPayload = {
  inviteCode: string;
  isOwner: boolean;
  weekIds: string[];
  checked: Record<string, boolean>;
  ratings: Record<string, Rating>;
  custom: CustomRecipe[];
};

export const loadKitchen = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { ensureKitchen } = await import("./kitchen-ops.server");
    return ensureKitchen(context.userId);
  });

const saveSchema = z.object({
  weekIds: z.array(z.string()).length(4),
  checked: z.record(z.string(), z.boolean()),
  ratings: z.record(
    z.string(),
    z.object({
      vote: z.enum(["like", "dislike"]),
      note: z.string(),
    }),
  ),
  custom: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      cuisine: z.string(),
      createdAt: z.number(),
    }),
  ),
});

export const saveKitchen = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(saveSchema)
  .handler(async ({ context, data }) => {
    const { writeKitchen } = await import("./kitchen-ops.server");
    await writeKitchen(context.userId, data);
    return { ok: true as const };
  });

export const joinKitchen = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ code: z.string().min(4).max(12) }))
  .handler(async ({ context, data }) => {
    const { attachToKitchen } = await import("./kitchen-ops.server");
    return attachToKitchen(context.userId, data.code);
  });
