/* Vercel-ready API layer: accepts the existing OAuth return path without assuming a session store. */
import type { ServerResponse } from "node:http";
import { allowMethod, type ApiRequest } from "../_lib/http";

export default function oauthCallback(req: ApiRequest, res: ServerResponse) {
  if (!allowMethod(req, res, "GET")) return;

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI/100 로그인</title></head><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f7f8fb;color:#172033"><main style="max-width:420px;padding:32px;text-align:center"><h1 style="font-size:24px;margin:0 0 12px">인증 결과를 확인하는 중입니다.</h1><p style="line-height:1.6;color:#526174">이 사이트는 현재 정적 디렉터리로 동작합니다. 창을 닫고 원래 화면으로 돌아가도 됩니다.</p><a href="/" style="display:inline-block;margin-top:18px;padding:12px 16px;background:#172033;color:#fff;text-decoration:none">AI/100 홈으로 돌아가기</a></main></body></html>`);
}
