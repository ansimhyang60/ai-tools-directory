# Catalog audit — 2026-08-26

The audit uses URL mentions and developer-oriented keyword mentions in the source files. Keyword mentions are a screening signal, not a semantic classification; they are not treated as exact item counts.

| File | Approx. records | URL mentions | Unique URLs | Developer-keyword mentions |
|---|---:|---:|---:|---:|
| `tools.ts` | 100 | 4 | 4 | 45 |
| `popularTools.ts` | 89 | 30 | 30 | 12 |
| `toolCatalog.ts` | 654 | 686 | 684 | 1,443 |
| `skills.ts` | 400 | 200 | 200 | 358 |

The two duplicate URL mentions in `toolCatalog.ts` are source-level duplicates by URL mention. The broader catalog is intentionally separated from `popularTools.ts` and `skills.ts`; developer-keyword mentions are retained as an audit signal because some open records are technical resources rather than mainstream services.
