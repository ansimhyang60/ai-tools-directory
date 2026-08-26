import { describe, expect, it } from "vitest";
import { isVercelCronRequest } from "./archive-refresh";

describe("Vercel archive cron request guard", () => {
  it("accepts the official GET cron signature", () => {
    expect(isVercelCronRequest({ method: "GET", headers: { "user-agent": "vercel-cron/1.0", "x-vercel-cron-schedule": "0 3 * * *" } })).toBe(true);
  });

  it("rejects browser and wrong-schedule requests", () => {
    expect(isVercelCronRequest({ method: "GET", headers: { "user-agent": "Mozilla/5.0", "x-vercel-cron-schedule": "0 3 * * *" } })).toBe(false);
    expect(isVercelCronRequest({ method: "POST", headers: { "user-agent": "vercel-cron/1.0", "x-vercel-cron-schedule": "0 3 * * *" } })).toBe(false);
  });
});
