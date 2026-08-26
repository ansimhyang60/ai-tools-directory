# Vercel Runtime Notes

- Official Node.js runtime docs: https://vercel.com/docs/functions/runtimes/node-js
- Official runtime configuration docs: https://vercel.com/docs/functions/configuring-functions/runtime
- Official vercel.json docs: https://vercel.com/docs/project-configuration/vercel-json

Key findings captured on 2026-08-26: files inside a root `/api` directory are automatically deployed as Vercel Functions using the default Node.js runtime; no `functions.runtime` declaration is required for standard Node.js functions. The `functions.runtime` value in `vercel.json` is for a runtime npm package name including its version, such as a community runtime. `vercel.json` supports `buildCommand`, `installCommand`, `outputDirectory`, `routes`, and `functions` customization. The previous `nodejs22.x` value was therefore removed from this project’s `vercel.json`.
