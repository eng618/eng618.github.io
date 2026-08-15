# Copilot Instructions

## Commands

**Package manager:** `bun` (v1.3.9, Node >=22.x required)

| Task                                                       | Command                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| Dev server                                                 | `bun dev`                                                |
| Production build                                           | `bun run build`                                          |
| Full validation (format → lint → typecheck → test → build) | `bun run validate`                                       |
| Full validation with auto-fix                              | `bun run validate --fix`                                 |
| Type check                                                 | `bun run tsc --noEmit`                                   |
| Lint                                                       | `bun run lint`                                           |
| Format                                                     | `bun run format`                                         |
| All tests                                                  | `bun test`                                               |
| Single test file                                           | `bunx vitest run src/components/__tests__/hero.test.tsx` |
| Tests in watch mode                                        | `bun run test:watch`                                     |

## Architecture

This is a **Next.js 16 App Router** personal portfolio site built as a **static export** (`output: 'export'`). There is no server-side rendering — all pages are statically generated at build time.

### Design System

UI components come from `@gv-tech/ui-web` — a private Radix UI + Tailwind design system authored by the site owner. Import from there for primitives like `Button`, `Card`, `NavigationMenu`, `Sheet`, `ThemeToggle`, `Skeleton`, etc. Do not replicate these with raw HTML.

### Content System

Content lives in `content/` as `.md` or `.mdx` files with YAML frontmatter. Three types are supported: `notes`, `code-notes`, `apps`. The `src/lib/notes.ts` module provides:

- `getAllContent(type)` — list all files of a content type
- `getContentBySlug(type, slugArray)` — parse and return content + metadata for a slug

Dynamic routes consume this: `src/app/notes/[...slug]/page.tsx`, `src/app/code-notes/[...slug]/page.tsx`, `src/app/apps/[...slug]/page.tsx`.

### Theming

Tailwind CSS 4 with CSS custom properties for light/dark theming, defined in `src/app/globals.css`. Theme tokens (e.g. `--background`, `--primary`, `--foreground`) map to Tailwind utility classes. Dark mode is managed by `ThemeProvider` from `@gv-tech/ui-web` — do not add a second provider.

### Fonts

Two fonts are loaded in the root layout and exposed as CSS variables:

- `--font-inter` → body text (`font-sans`)
- `--font-outfit` → headings (use `font-outfit` Tailwind class)

## Key Conventions

### Class Merging

Always use `cn()` from `@/lib/utils` when composing Tailwind classes:

```typescript
import { cn } from '@/lib/utils';
className={cn('base-classes', condition && 'conditional-class', className)}
```

### Site Config

`src/config/site.ts` is the single source of truth for the site name, description, URL, nav items, and social links. Reference `siteConfig` rather than hardcoding these values.

### Static Data

Structured data (badges, footer links) lives in `src/data/*.json`. Add new structured data as JSON files there rather than inlining arrays in components.

### Client vs Server Components

- Interactive components (hooks, event handlers, Framer Motion) use `'use client'`
- Page components and layouts default to async server components
- Content pages load MDX server-side via `getContentBySlug`

### Path Alias

Use `@/` for all imports from `src/`. Example: `import { cn } from '@/lib/utils'`.

### Tests

Test files live in `__tests__/` directories co-located with the code under test. The vitest setup at `src/test/setup.ts` already mocks `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`) — do not re-mock these in individual test files.

### Analytics

OpenPanel analytics is initialized in `OpenPanelProvider` and only runs outside of localhost. Do not add ad-hoc tracking calls.
