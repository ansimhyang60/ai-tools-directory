/* Local-only fallback server: mirrors the Vercel API smoke-test contract for pnpm start. */
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");

  app.get("/api/health", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, service: "ai-tools-directory", runtime: "local-express" });
  });

  app.get("/api/oauth/callback", (_req, res) => {
    res.type("html").send('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>AI 활용 가이드 로그인</title></head><body><p>인증 결과를 확인하는 중입니다. <a href="/">홈으로 돌아가기</a></p></body></html>');
  });

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
