# Deployment verification — 2026-08-26

| Target | Result | Evidence |
|---|---|---|
| `https://project-ag61p-ansimhyang60s-projects.vercel.app/` | Could not inspect the app because the request redirected to Vercel login | Browser navigation redirected to `vercel.com/login`; direct fixed-project verification remains blocked by the Vercel session. |
| `https://aitoolsdir-ggz3cppe.manus.space/` | Public page rendered after the initial loading state | Browser view showed the AI/100 Field Guide home page with navigation, Work Atlas, 89 popular services, 100 curated tools, 654 open records, 400 skills, and Vercel API status text. |
| Local `/tools` and `/archive` | Visual screenshots captured successfully | `/tools` rendered the directory; `/archive` rendered the four verified fallback records. |

The fixed Vercel hostname is not marked as verified because the browser session reached a login wall. The Manus public domain is the verified public deployment URL for this project. The archive currently has four fallback records because the official RSS refresh returned four records; no synthetic records were added to manufacture a second page.

## API path follow-up

A direct browser request to `https://aitoolsdir-ggz3cppe.manus.space/api/health` returned `{"ok":true,"service":"ai-tools-directory","runtime":"local-express"}`. A direct request to `/api/trpc/archive.list` with the standard tRPC input query returned the public site's 404 page rather than JSON. The archive UI therefore correctly relies on its static fallback when that API route is unavailable on the current Manus deployment. The Vercel fixed hostname remains blocked by login redirect.
