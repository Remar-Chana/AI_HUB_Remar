# Repository Guidelines

## Project Structure & Documents

- `app/` contains the Next.js App Router entry point, layout, and global styles.
- `src/` contains the React landing page and its interactions.
- `public/` stores browser-served static assets.
- `stitch-export/` stores the original Stitch HTML and screenshot for reference.
- `Raw-Requirements.md`, `PRD.md`, and `DESIGN.md` record product scope and design guidance.

Avoid committing generated output, local environment files, or local research caches.

## Development, Build & Tests

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates and checks the production build.
- `npm start` serves the production build.
- `npm run lint` runs TypeScript validation.

Run the configured build after application changes. Add tests alongside features when a test framework is introduced; no test framework is currently configured.

## Writing & Code Conventions

Write concise Markdown with descriptive headings and short paragraphs. Preserve requirement identifiers such as `FR--001`, `BR--001`, and `AC--001`. Product documents and content are primarily Thai; retain Thai unless the project adopts another language convention. Use Tailwind CSS utilities and the tokens in `app/globals.css`; keep accessible names, semantic elements, and visible focus states on interactive controls.

## Product Constraints

Treat `PRD.md` as the scope reference and `DESIGN.md` as the visual reference. The project targets Next.js and Vercel, defaults to dark mode, and calls for responsive behavior, WCAG 2.2 Level AA accessibility, and homepage load time under two seconds. Mark unresolved decisions as open questions.

## Accessibility

Follow the linked [A11Y.md guidelines](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/A11Y.md) strictly. Verify interactive elements and page flows against WCAG 2.2 Level AA and report any limitations in `REPORT.md`.
