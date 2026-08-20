# AI Tools 100 Directory — Design Direction

## Three directions

### Theme Name: Editorial Field Guide
Very brief intro: A calm, editorial directory that feels like a printed field guide translated into a modern search tool. It prioritizes clarity, reading rhythm, and trustworthy categorization.
Probability: 0.07

### Theme Name: Signal Console
Very brief intro: A structured intelligence console with strong indexing, compact data density, and a high-contrast operational feel. It is useful for power users who compare many tools quickly.
Probability: 0.04

### Theme Name: Paper + Pixel Atlas
Very brief intro: A tactile hybrid of paper notes and digital signals, using warm surfaces, ink-like typography, and sharp electric accents to make a large catalog feel approachable.
Probability: 0.09

## Selected approach: Paper + Pixel Atlas

### Design Movement
Contemporary editorial brutalism softened by a paper archive sensibility: a practical research atlas rather than a generic SaaS dashboard.

### Core Principles
1. Search first: the first screen should make it obvious how to find a tool by name, job, category, or difficulty.
2. Catalog as culture: each tool is presented as a distinct entry with a clear role, not a uniform anonymous card.
3. Warm structure, sharp signals: cream paper surfaces create trust; vivid cobalt, tomato, and mint identify states and categories.
4. Density with breathing room: the catalog can be information-rich without becoming a spreadsheet.

### Color Philosophy
The base is warm paper cream (#F7F2E8), chosen to make a 100-tool catalog feel readable and human. Ink navy (#172033) gives authority and contrast. Cobalt (#2457FF) marks actions and links, tomato (#FF654F) marks attention and popular paths, and mint (#BFE8D0) marks beginner-friendly routes. The colors are functional labels, not decoration.

### Layout Paradigm
An asymmetric atlas layout: a narrow fixed-feeling index rail and a wide content field on desktop, collapsing into a stacked search-first layout on mobile. Sections use editorial rules, offset labels, and large index numerals instead of a centered marketing grid.

### Signature Elements
1. A “signal strip” hero with oversized index number 100 and small status labels.
2. Tool rows with left-side category markers and a right-side “use it for” action cue.
3. A persistent category rail that behaves like the margin notes of a field guide.

### Interaction Philosophy
Every interaction should reduce uncertainty: search results update instantly, category counts reflect the current view, filter chips explain why an item is visible, and an empty state suggests a next query. Buttons should feel crisp and immediate, never mysterious.

### Animation
Use short 160–220ms transform/opacity transitions for search results, category chips, and detail panels. Prefer subtle row lift and marker color changes over large page motion. Respect prefers-reduced-motion and keep keyboard interactions instant.

### Typography System
Use Space Grotesk for display labels and headings, with IBM Plex Sans for body text and metadata. Headings are compact and editorial; descriptions use readable line-height. Tool names use bold display type, while role labels use uppercase microtype with tracking.

### Brand Essence
A practical, human-curated map of AI tools for people who want to make something useful next. Personality: grounded, curious, direct.

### Brand Voice
Headlines are confident but never hype-driven. CTAs are specific and action-oriented. Microcopy explains what happens next.
Examples:
- “Start with the job, not the tool.”
- “Find the smallest useful stack for your next project.”

### Wordmark & Logo
A bold “AI/100” index mark: an editorial slash separating the category of intelligence from the catalog count. It should appear as a compact text mark in the header and favicon-like badge, not as a default wordmark.

### Signature Brand Color
Cobalt blue #2457FF — ownable, legible, and used only for active search, selected categories, and primary links.

## Implementation reminder
Every component should reinforce the selected Paper + Pixel Atlas direction: warm paper background, editorial rules, asymmetric index layout, Space Grotesk + IBM Plex Sans, and cobalt as the primary action color. Avoid purple gradients, generic centered hero sections, and anonymous dashboard cards.

## Style Decisions

- Korean display typography uses a deliberate grotesque stack with IBM Plex Sans KR first, then IBM Plex Sans, to make Korean headings feel designed rather than default.
- AI/100 is rendered as an index stamp with a rule, slash, and small catalog caption; it is not plain nav text.
- Cobalt #2457FF is reserved for active search, selected filters/categories, primary links, and key headline emphasis. Tomato and mint are functional state colors.
- Tool entries use stronger role labels, explicit category markers, and more prominent “사용 예시” cues so the directory reads like a field guide rather than anonymous SaaS rows.
- Lower guidance sections reuse index numerals, rules, and margin-note labels from the catalog.
