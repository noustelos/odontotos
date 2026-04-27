# Project Guidelines

## Build And Validation
- Install dependencies with `npm ci`.
- Build production output with `npm run build`.
- Validate links with `npm run link-check` while editing source files and `npm run link-check:dist` when validating the built site.
- Do not edit generated files in `dist/`; change source files and rebuild.
- See `docs/ci.md` for CI behavior and the strict external-link policy on `production`.

## Architecture
- This is a static site built with `index.html`, `styles.css`, and `map.js`.
- Keep the stack to semantic HTML, modular CSS, and vanilla JavaScript. Do not introduce frameworks.
- Leaflet is the only project-approved external library and is used for the route map.
- Preserve the existing language-switching flow based on the `?lang=en` query parameter.

## Conventions
- Match the cinematic tourism direction documented in `docs/project-context.md`, `docs/project-rules.md`, `docs/design-system.md`, and `docs/wireframe.md`.
- Maintain the established typography and palette: Playfair Display for headings, Inter for body text, Montserrat for UI labels, and the forest/river/train/sand color system from the docs.
- Prefer large visual storytelling sections, minimal UI chrome, and accessible semantic structure.
- Keep mobile behavior explicit; avoid image, blur, and transform treatments that reduce clarity on coarse-pointer devices.
- Use `grep` or `find` for search tasks in this repo if command-line search is needed, because `rg` is not available in this environment.

## Specialized Guidance
- Use `.github/agents/odontotos-frontend.agent.md` for focused frontend work on layout, accessibility, SEO, or Leaflet behavior.
- Use `.github/skills/lighthouse-static-site-speed/SKILL.md` for Lighthouse or PageSpeed optimization passes.
- Link to the existing docs instead of restating them in code comments or new guidance files unless a new rule is truly project-wide.