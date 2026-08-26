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

## AI skill sources — 2026-08-20

- User-provided UI/UX Pro Max repository: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill. The public README says it provides design intelligence for professional UI/UX across multiple platforms, supports Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot, Kiro, Codex CLI, Qoder, Roo Code, Gemini CLI, Trae, OpenCode, Continue, CodeBuddy, Droid, KiloCode, Warp, Augment, CodeWhale, and a universal agent standard. It documents `uipro init --ai <assistant>` installation and states the repository uses the MIT License. GitHub page displayed 118k stars and 12.7k forks on 2026-08-20.
- Verified skill index: `/home/ubuntu/ai-tools-directory/research/verified_skills.json`, sourced through the internet-skill-finder workflow. The real-time GitHub fetch fell back to the verified cache because the GitHub API response could not be parsed. The JSON contains seven repositories: anthropics/skills, obra/superpowers, vercel-labs/agent-skills, K-Dense-AI/claude-scientific-skills, ComposioHQ/awesome-claude-skills, travisvn/awesome-claude-skills, and BehiSecc/awesome-claude-skills. Each record includes a name, GitHub URL, and Manus import URL. Repository-level licenses should be shown as `저장소 LICENSE 확인 필요` unless individually verified; do not infer a license from the skill name alone.
- The Anthropic repository list includes skills such as algorithmic-art, brand-guidelines, canvas-design, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, and xlsx.
- The Obra repository list includes brainstorming, dispatching-parallel-agents, executing-plans, finishing-a-development-branch, and receiving-code-review among others.

## Wikidocs sources — 2026-08-20

- [함께해요 바이브 코딩](https://wikidocs.net/338128): 목차에서 바이브코딩 시작하기, CLI AI 코딩 도구(Antigravity, Claude Code, OpenAI Codex CLI, Windsurf 등), AI와 핑퐁하며 디버깅하기, 비용·토큰 최적화, API 서버·TODO 앱·자율형 데이터 분석 보고 에이전트, MCP, GitHub/Figma/Brave Search/Puppeteer/Supabase/Playwright/Filesystem/SQLite/Notion 연동, Agent Skills 생태계, Next.js·React·Tailwind·TypeScript 스킬 등을 다룬다. 본문에 표시된 Next.js 스킬 규칙은 TypeScript strict, any 금지, 서버 컴포넌트 우선, 필요한 경우에만 use client, App Router 규칙, Tailwind 유틸리티, shadcn/ui·Lucide Icons 사용 등이다.
- [ChatGPT로 일하는 법 — 효과적인 프롬프트 작성법](https://wikidocs.net/340811): 문서·데이터·이미지·검색·자동화·산업별 활용, Custom GPT, Gmail·Drive·Slack·Notion·GitHub 커넥터, 웹페이지 제작·게시, 이미지·음성·화면 공유, Memory·Projects, 예약 Tasks 등의 목차를 제공한다. 해당 페이지 본문은 프롬프트의 7가지 원칙으로 구체성, 맥락, 제약, 역할, 예시를 표 형태로 설명하며, 단순히 “요약해줘”보다 대상·목적·형식·길이와 예시를 함께 제공하는 방식을 강조한다.
- Integration note: These sources will be represented as practical, source-linked sections rather than copied text. The website will explain a beginner loop: define the job, provide context and constraints, ask for a plan, build a small slice, test/screenshot, review, then deploy. It will also include safety notes for tokens, privacy, cost, external connectors, and human approval before sending or deleting data.
