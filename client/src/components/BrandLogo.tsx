/* Paper + Pixel Atlas: real brand marks act as generous visual anchors for tool recommendations. */
import { useState } from "react";

const logoSources: Record<string, string> = {
  chatgpt: "/manus-storage/chatgpt_45afef68.svg",
  claude: "/manus-storage/claude_17fe10b6.svg",
  gemini: "/manus-storage/gemini_100d576c.svg",
  manus: "/manus-storage/manus_ccbc9567.svg",
  cursor: "/manus-storage/cursor_b27b77c7.svg",
  canva: "/manus-storage/canva_49da2353.svg",
  gamma: "/manus-storage/gamma_ad820713.png",
  zapier: "/manus-storage/zapier_aa712b85.svg",
};

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
  return <span className={`brand-logo ${compact ? "is-compact" : ""}`}><img src={source} alt={logoLabels[key] || `${name} 로고`} onError={() => setSource((current) => current === fallbackSource ? "" : fallbackSource || "")} /></span>;
}
