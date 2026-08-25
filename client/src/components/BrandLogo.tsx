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
  const [failed, setFailed] = useState(false);
  const source = logoSources[name.toLowerCase()];
  if (!source || failed) return <span className={`brand-logo-fallback ${compact ? "is-compact" : ""}`} aria-label={`${name} 로고`}>{name.slice(0, 2).toUpperCase()}</span>;
  return <span className={`brand-logo ${compact ? "is-compact" : ""}`}><img src={source} alt={logoLabels[name.toLowerCase()] || `${name} 로고`} onError={() => setFailed(true)} /></span>;
}
