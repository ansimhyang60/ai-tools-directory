/* Paper + Pixel Atlas: a tiny deployment signal rendered as a recoverable status in the UI. */
export function GET() {
  return Response.json({
    ok: true,
    service: "ai-tools-directory",
    runtime: "vercel-serverless",
    timestamp: new Date().toISOString(),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
