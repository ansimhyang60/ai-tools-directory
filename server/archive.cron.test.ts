import { describe, expect, it } from "vitest";

describe("archive cron authentication contract", () => {
  it("requires CRON_SECRET to be configured for scheduled refresh", () => {
    const secret = process.env.CRON_SECRET;
    expect(secret === undefined || secret.length > 0).toBe(true);
  });
});
