import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import WorkMindMap from "./WorkMindMap";

describe("WorkMindMap", () => {
  it("keeps the branch network as the focal point without a central selected-job card", () => {
    const markup = renderToStaticMarkup(createElement(Router, { hook: () => ["/", () => undefined] }, createElement(WorkMindMap)));

    expect(markup).toContain("KNOWLEDGE BRANCHES");
    expect(markup).toContain("실제 AI 툴");
    expect(markup).toContain("재사용 SKILL");
    expect(markup).not.toContain("SELECTED JOB");
    expect(markup).not.toContain("sketch-map-root");
  });
});
