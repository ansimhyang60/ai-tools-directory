# External source findings — 2026-08-20

## Directory scale and fields

- Futurepedia homepage: https://www.futurepedia.io/ — describes a directory with thousands of AI tools and category counts; the extracted page reported 2,789 categorized tools on the homepage and 4,000+ curated tools in its ecosystem copy. It also exposes tool cards with categories, descriptions, pricing labels such as Free, Freemium, Free Trial, Paid, and Contact for Pricing, plus links to tool pages and visit URLs.
- Futurepedia business category: https://www.futurepedia.io/ai-tools/business — extracted page reported 2,347 business tools and showed tool entries with tool name, tool page, pricing label, description, tags, and visit URL.
- Futurepedia productivity category: https://www.futurepedia.io/ai-tools/productivity — extracted page reported 741 productivity tools and exposed the same entry fields.
- Futurepedia code category: https://www.futurepedia.io/ai-tools/code — extracted page reported 254 code tools and showed code assistants, low-code/no-code, SQL, pricing labels, descriptions, tags, and visit URLs.
- Futurepedia image category: https://www.futurepedia.io/ai-tools/image — extracted page reported 470 image tools and showed design generators, image generators, image editing, pricing labels, descriptions, tags, and visit URLs.
- There's An AI For That: https://theresanaiforthat.com/ — extracted page displayed live-updating counts including 52,179 tools, 10,902 tasks, 44,230 repositories, 8,718 videos, 1,508 models, and pricing fields for tool entries. These counts are dynamic and should be labeled as source-reported rather than treated as the exact number of unique validated tools.
- GitHub free-ai-tools: https://github.com/ShaikhWarsi/free-ai-tools — curated free/low-cost LLM APIs, coding copilots, IDEs, agents, infrastructure, RAG, local models, automation, and production stack resources. The repository README says the number becomes 550+ when adding models and subservices, and includes pricing/free-tier notes, with some entries marked verify.
- GitHub awesome-chatgpt: https://github.com/sindresorhus/awesome-chatgpt — open list covering ChatGPT apps, web apps, extensions, CLI tools, bots, integrations, packages, and related lists.
- GitHub mahseema/awesome-ai-tools: https://github.com/mahseema/awesome-ai-tools — additional public curated AI tool list used in the snapshot.
- GitHub nanogiants/awesome-ai-tools: https://github.com/nanogiants/awesome-ai-tools — additional public curated AI tool list used in the snapshot.

## UI/UX tool sources

- Framer: https://www.framer.com/ — official page describes an AI design agent native to the canvas, CMS agent, code agent, hosting, analytics, CMS, SEO, and integrations with Codex, Claude Code, Cursor, and GitHub workflows.
- Figma AI: https://www.figma.com/ai/ — official page describes Explore, Polish, Ship workflows; Figma agent, Figma Make, MCP, code-to-canvas, visual search, generative plugins, image editing, and AI credits.
- Canva Magic Design: https://www.canva.com/magic-design/ — official page describes prompt/image-based design generation, brand application, presentations, video, and social content.
- OpenAI Codex: https://openai.com/codex/ — official page describes coding agents that handle features, refactors, migrations, tests, code review, cloud environments, and background work.
- Anthropic Claude Code: https://www.anthropic.com/claude-code — official page describes codebase onboarding, multi-file edits, issue-to-PR workflow, terminal/IDE/web access, and GitHub integrations.

## Implementation note

The static website snapshot currently combines 736 unique records from the public GitHub lists and four Futurepedia category pages, after URL/name deduplication. Pricing is normalized to a coarse state (무료/무료 티어 가능, 무료 체험, 프리미엄, 유료 옵션 또는 요금제 있음, 문의형 가격, 확인 필요) and is not a promise of current price. Each record stores source and verifiedAt=2026-08-20. The data should be described as a public-source snapshot, not an exhaustive list of all AI tools.
