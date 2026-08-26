import type { IncomingMessage, ServerResponse } from "node:http";
import { refreshArchive } from "../../server/archive";

type VercelRequest = IncomingMessage & { method?: string };
type VercelResponse = ServerResponse & { status: (code: number) => VercelResponse; json: (body: unknown) => VercelResponse };

export function isVercelCronRequest(req: Pick<VercelRequest, "method" | "headers">) {
  return req.method === "GET" && req.headers["user-agent"] === "vercel-cron/1.0" && req.headers["x-vercel-cron-schedule"] === "0 3 * * *";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });
  if (!isVercelCronRequest(req)) return res.status(404).json({ error: "cron_only" });
  try {
    const result = await refreshArchive();
    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Archive] Vercel cron refresh failed", error);
    return res.status(500).json({ ok: false, error: message, timestamp: new Date().toISOString() });
  }
}
