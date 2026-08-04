# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for StationOne (a firefighting operations platform), built on the AstroWind template (Astro 4.x + Tailwind CSS 3.x + TypeScript). This is a fork of `onwidget/astrowind` (registered as the `upstream` git remote) with StationOne-specific content, pages, and analytics.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npm run format       # Format code with Prettier
npm run lint:eslint  # Run ESLint
npm run astro ...    # Run Astro CLI commands
```

No test framework is configured. Before committing: run `npm run format`, `npm run lint:eslint`, and `npm run build` to verify the build succeeds — there is no CI to catch these otherwise.

## Deployment

Static output (`output: 'static'` in `astro.config.mjs`) built to `./dist`. `wrangler.jsonc` configures Cloudflare Pages as the deploy target (`pages_build_output_dir: "dist"`); `vercel.json` also exists but confirm which platform is actually live before assuming either is authoritative.

## Architecture

### Configuration flows through `src/config.yaml`

Site name, SEO defaults, i18n, blog app settings, analytics vendor toggles, and theme tokens all live in `src/config.yaml`. `src/utils/config.ts` loads and parses this YAML at build time (via `js-yaml`, merged with defaults through `lodash.merge`) and exports typed config objects — `SITE_CONFIG`, `METADATA_CONFIG`, `I18N_CONFIG`, `APP_BLOG_CONFIG`, `ANALYTICS_CONFIG`, `UI_CONFIG`. Never hardcode values that already live in the YAML; import from `~/utils/config` instead. Note the blog app is currently disabled (`apps.blog.isEnabled: false`) even though blog routes/components still exist in the codebase.

`astro.config.mjs` reads `ANALYTICS_CONFIG` directly to conditionally register the Partytown integration (only when Google Analytics is enabled), so changes to analytics config in `config.yaml` can affect the Astro integration list, not just runtime behavior.

### Analytics

GA4 is wired through `src/components/common/Analytics.astro` (gtag/dataLayer) and `src/components/common/SplitbeeAnalytics.astro`, loaded via Partytown for off-main-thread execution. Analytics scripts are gated by `analytics.vendors.googleAnalytics.isEnabled`/`id` in `config.yaml`. GA4 previously had a bug where objects were being stringified into event params incorrectly — if debugging tracking data, check how event payloads are constructed before assuming the GA config itself is wrong.

### Page routing and content

Astro file-based routing under `src/pages/`. Notable patterns:

- `src/pages/[...blog]/` — dynamic blog routes including category and tag sub-routes, driven by `src/content/post/` (via Astro content collections) and `src/utils/blog.ts`.
- `src/pages/features/*.astro` and `src/pages/landing/*.astro` — standalone marketing/landing pages, each typically composed from widgets rather than one-off markup.
- `src/pages/privacy.md`, `src/pages/terms.md` — legal pages authored directly in Markdown, not Astro components.

### Widgets vs components

`src/components/widgets/` holds large, page-level sections (Hero, Features, Pricing, FAQs, CallToAction, Footer, Header, etc.) that pages compose together. `src/components/ui/` and `src/components/common/` hold smaller building blocks and cross-cutting concerns (meta tags, theme toggling, analytics, social share). When adding a new page section, check whether an existing widget can be reused/parameterized via `Astro.props` before writing a new one.

### Path aliases and imports

Use `~/` for everything under `src/` (e.g. `~/utils/config`, `~/layouts/PageLayout.astro`). Import order convention: external packages → internal utils/config (`~/utils/*`) → components (`~/components/*`) → types (`~/types`).

## Code Style

- Prettier: 120 print width, semicolons, single quotes, 2-space tabs, es5 trailing commas, astro parser plugin for `.astro` files.
- ESLint: `no-mixed-spaces-and-tabs` (smart-tabs) is an error; unused vars must be prefixed with `_`; `@typescript-eslint/no-non-null-assertion` is off.
- Naming: kebab-case for files/assets, PascalCase for component files, camelCase for variables, SCREAMING_SNAKE_CASE for exported constants (`SITE_CONFIG`, `I18N_CONFIG`), PascalCase for interfaces (`Props`, `MetaData`).
- Prefer `type` imports for type-only imports; use `Array<T>` over `T[]`; use optional chaining and default values (`Astro.props` destructuring with defaults) rather than manual null checks.

## Tailwind

Custom theme colors: `primary`, `secondary`, `accent`, `default`, `muted`. Dark mode uses the `class` strategy — apply `dark:` variants explicitly rather than relying on `prefers-color-scheme`.

## Icons

Uses `astro-icon` with Tabler (`tabler:*`, full set included) and a curated subset of Flat Color Icons and `ri` icons — see the `icon()` integration config in `astro.config.mjs` for exactly which icon names are bundled. Adding an icon from an already-included set works with no config change; pulling in a new icon set or a not-yet-included icon from Flat Color Icons/`ri` requires updating `astro.config.mjs`.
