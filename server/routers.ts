import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { refreshArchive } from "./archive";
import { systemRouter } from "./_core/systemRouter";

const archiveType = z.enum(["contest", "grant", "exhibition", "news", "case-study"]);
const archiveStatus = z.enum(["upcoming", "open", "closed", "ongoing", "unknown"]);
const archiveListInput = z.object({ type: archiveType.optional(), status: archiveStatus.optional(), query: z.string().max(120).optional(), page: z.number().int().min(1).default(1), pageSize: z.number().int().min(1).max(50).default(20) }).default({ page: 1, pageSize: 20 });

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  archive: router({
    list: publicProcedure.input(archiveListInput).query(async ({ input }) => {
      const result = await db.listArchiveItems({ type: input.type, status: input.status, query: input.query, limit: input.pageSize, offset: (input.page - 1) * input.pageSize });
      return { ...result, page: input.page, pageSize: input.pageSize, pages: Math.ceil(result.total / input.pageSize) };
    }),
    getById: publicProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => db.getArchiveItemById(input.id)),
    refresh: adminProcedure.mutation(() => refreshArchive()),
  }),
});

export type AppRouter = typeof appRouter;
