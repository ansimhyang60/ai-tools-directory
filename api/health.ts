/* Vercel-ready API layer: lightweight health endpoint for deployment smoke tests. */
import type { ServerResponse } from "node:http";
import { allowMethod, type ApiRequest, sendJson } from "./_lib/http";

export default function health(req: ApiRequest, res: ServerResponse) {
  if (!allowMethod(req, res, "GET")) return;
  sendJson(res, 200, {
    ok: true,
    service: "ai-tools-directory",
    runtime: "vercel-serverless",
    timestamp: new Date().toISOString(),
  });
}
