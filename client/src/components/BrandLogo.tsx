/* Paper + Pixel Atlas: real brand marks act as generous visual anchors for tool recommendations. */
import { useState } from "react";

const logoSources: Record<string, string> = {
  chatgpt: "/assets/logo-chatgpt.svg",
  claude: "/assets/logo-claude.svg",
  gemini: "/assets/logo-gemini.svg",
  manus: "/assets/logo-manus.svg",
  cursor: "/assets/logo-cursor.svg",
  canva: "/assets/logo-canva.svg",
  gamma: "/assets/logo-gamma.png",
  zapier: "/assets/logo-zapier.svg",
};

// Vercel serves these files from the same origin; the CDN remains a last-resort fallback for cached deployments.
const logoFallbackSources: Record<string, string> = {
  chatgpt: "https://cdn.simpleicons.org/openai/111827",
  claude: "https://cdn.simpleicons.org/anthropic/111827",
  gemini: "https://cdn.simpleicons.org/googlegemini/111827",
  manus: "https://cdn.simpleicons.org/manus/111827",
  cursor: "https://cdn.simpleicons.org/cursor/111827",
  canva: "https://cdn.simpleicons.org/canva/111827",
  gamma: "https://cdn.simpleicons.org/gamma/111827",
  zapier: "https://cdn.simpleicons.org/zapier/111827",
};

const logoLabels: Record<string, string> = {
  chatgpt: "ChatGPT 로고",
  claude: "Claude 로고",
  gemini: "Gemini 로고",
  manus: "Manus 로고",
  cursor: "Cursor 로고",
  canva: "Canva 로고",
  gamma: "Gamma 로고",
  zapier: "Zapier 로고",
};

export default function BrandLogo({ name, compact = false }: { name: string; compact?: boolean }) {
  const key = name.toLowerCase();
  const [source, setSource] = useState(logoSources[key]);
  const fallbackSource = logoFallbackSources[key];
  if (!source) return <span className={`brand-logo-fallback ${compact ? "is-compact" : ""}`} aria-label={`${name} 로고`}>{name.slice(0, 2).toUpperCase()}</span>;
  return <span className={`brand-logo ${compact ? "is-compact" : ""}`}><img src={source} alt={logoLabels[key] || `${name} 로고`} loading="lazy" decoding="async" onError={() => setSource((current) => current === fallbackSource ? "" : fallbackSource || "")} /></span>;
}
