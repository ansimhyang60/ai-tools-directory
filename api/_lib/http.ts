/* Vercel-ready API layer: framework-free Node response helpers keep Hobby functions portable. */
import type { IncomingMessage, ServerResponse } from "node:http";

export type ApiRequest = IncomingMessage & {
  query?: Record<string, string | string[] | undefined>;
};

export function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

export function allowMethod(req: ApiRequest, res: ServerResponse, method: string) {
  if (req.method === method) return true;
  res.setHeader("Allow", method);
  sendJson(res, 405, { ok: false, error: "Method not allowed" });
  return false;
}
