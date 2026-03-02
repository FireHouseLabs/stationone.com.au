# AGENTS.md

Guidelines for AI coding agents working in this codebase.

## Project Overview

This is an AstroWind-based website for StationOne, built with Astro 4.x, Tailwind CSS 3.x, and TypeScript. It's a marketing site for a firefighting operations platform.

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

**Note:** No test framework is currently configured.

## Code Style

### Formatting (Prettier)

- Print width: 120 characters
- Semi: true
- Single quotes
- Tab width: 2 spaces
- Trailing commas: es5
- Astro files use the astro parser plugin

**Always run `npm run format` after making changes.**

### ESLint Rules

- `no-mixed-spaces-and-tabs`: error with smart-tabs option
- `@typescript-eslint/no-unused-vars`: error (prefix unused vars with `_`)
- `@typescript-eslint/no-non-null-assertion`: off

**Always run `npm run lint:eslint` after making changes.**

## Imports

### Path Aliases

Use `~/` to reference the `src/` directory:

```typescript
import { SITE_CONFIG } from '~/utils/config';
import Layout from '~/layouts/PageLayout.astro';
```

### Import Order

1. External packages (astro, react, etc.)
2. Internal utilities and config (`~/utils/*`)
3. Components (`~/components/*`)
4. Types (`~/types`)

```typescript
---
import { Icon } from 'astro-icon/components';
import { SITE_CONFIG } from '~/utils/config';
import Layout from '~/layouts/PageLayout.astro';
import type { MetaData } from '~/types';
---
```

## TypeScript

### Configuration

- Strict null checks enabled
- `allowJs: true`
- Base extends `astro/tsconfigs/base`

### Type Patterns

- Use `type` for imports when only importing types: `import type { MetaData } from '~/types';`
- Optional properties use `?:` suffix
- Arrays use `Array<T>` syntax over `T[]`
- Use `Record<string, string>` for class mappings

```typescript
export interface Props {
  title?: string;
  items?: Array<Item>;
}

const { title, items = [] } = Astro.props;
```

## Astro Components

```astro
---
import Layout from '~/layouts/PageLayout.astro';

export interface Props {
  title?: string;
}

const { title } = Astro.props;
---

<Layout>
  <section class="...">
    {title && <h1>{title}</h1>}
  </section>
</Layout>
```

### Slots

```astro
<Hero>
  <Fragment slot="title">Title content</Fragment>
  <Fragment slot="subtitle">Subtitle content</Fragment>
</Hero>
```

## Naming Conventions

- **Files:** kebab-case (`hero-image.png`, `blog-list.astro`)
- **Components:** PascalCase files (`Hero.astro`, `CallToAction.astro`)
- **Variables:** camelCase
- **Constants:** SCREAMING_SNAKE_CASE for exports (`SITE_CONFIG`, `I18N_CONFIG`)
- **Interfaces:** PascalCase (`Props`, `MetaData`, `SiteConfig`)

## Tailwind CSS

### Custom Colors

- `primary` - Main brand color
- `secondary` - Accent color
- `accent` - Highlight color
- `default` - Default text color
- `muted` - Muted/subdued text

### Common Patterns

```html
<section class="relative max-w-7xl mx-auto px-4 sm:px-6">
  <h1 class="text-5xl md:text-6xl font-bold font-heading">
    <p class="text-xl text-muted mb-6 dark:text-slate-300">
      <a class="btn btn-primary"></a>
    </p>
  </h1>
</section>
```

### Dark Mode

Dark mode uses class strategy. Use `dark:` prefix:

```html
<div class="bg-white dark:bg-slate-900"></div>
```

## Configuration

Site configuration is in `src/config.yaml`. Access via utils:

```typescript
import { SITE_CONFIG, I18N_CONFIG, APP_BLOG_CONFIG } from '~/utils/config';
```

## Error Handling

- Use optional chaining: `config?.site?.name`
- Provide default values: `const { items = [] } = Astro.props;`

## File Organization

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # common/, ui/, widgets/, blog/
├── content/         # Blog posts and schemas
├── layouts/         # Page layouts
├── pages/           # Routes (file-based routing)
├── utils/           # Utility functions
├── types.d.ts       # Global type definitions
└── navigation.js    # Header/footer navigation config
```

## Icons

- [Tabler Icons](https://tabler-icons.io/) and [Flat Color Icons](https://icon-sets.iconify.design/flat-color-icons/)
- Use `tabler:` prefix: `icon="tabler:firetruck"`

## Checklist Before Committing

1. Run `npm run format`
2. Run `npm run lint:eslint`
3. Run `npm run build` to verify build succeeds
