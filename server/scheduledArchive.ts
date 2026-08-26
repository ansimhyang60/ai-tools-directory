import type { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { refreshArchive } from "./archive";

export async function archiveRefreshHandler(req: Request, res: Response) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron) return res.status(403).json({ error: "cron_only" });
    const result = await refreshArchive();
    return res.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Archive] scheduled refresh failed", error);
    return res.status(500).json({ ok: false, error: message, timestamp: new Date().toISOString() });
  }
}
