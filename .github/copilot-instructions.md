# Copilot Instructions for eng618.github.io

## Project Overview

- This is a personal portfolio site built with GatsbyJS, deployed via GitHub Pages and Netlify.
- Main content is in `content/` (notes, posts) and `src/` (React components, data, etc.).
- Static assets are in `static/` and `public/` (do not edit `public/` directly).

## Architecture & Patterns

- Uses Gatsby's file-based routing and GraphQL data layer.
- Custom components live in `src/components/`.
- Content is written in Markdown/MDX and sourced from `content/`.
- Site configuration: `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `gatsby-ssr.js`.
- Netlify functions (if any) are in `netlify/functions/`.

## Developer Workflows

- **Build locally:** `npm run develop` (hot reloads at http://localhost:8000)
- **Production build:** `npm run build`
- **Serve build:** `npm run serve`
- **Lint:** `npm run lint` (uses ESLint, config in `eslint.config.mjs`)
- **Deploy:** Automatic via GitHub Actions (`.github/workflows/build-and-deploy.yml`)
- **Dependencies:** Managed via `package.json` (prefer npm, not yarn/pnpm)

## Conventions

- Use absolute imports from `src/` (e.g., `import Button from 'components/Button'`).
- Prefer functional React components and hooks.
- Content files: use frontmatter for metadata.
- Do not commit generated files in `public/`.
- Use `static/` for assets that should be copied as-is to the root of the built site.

## Integration Points

- GitHub Actions for CI/CD (see `.github/workflows/`).
- Netlify for preview/production deploys (see `netlify.toml`).
- ESLint for code style (see `eslint.config.mjs`).

## Examples

- Add a new blog post: place an `.md` or `.mdx` file in `content/posts/` with frontmatter.
- Add a new React component: create a file in `src/components/` and import as needed.

## References

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

---

If any section is unclear or missing, please provide feedback for further refinement.
