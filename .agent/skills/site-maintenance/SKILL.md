---
name: site-maintenance
description: Instructions for common site maintenance and configuration tasks
---

# Site Maintenance Skill

This skill provides guidance on maintaining the Next.js foundation of the site.

## Instructions

1. **Dependency Updates**:
   - Use `bun` for managing dependencies.
   - Check `package.json` before adding new packages to avoid duplication.
   - When adding UI-related dependencies, prioritize @gv-tech/ui-web components

2. **Next.js Configuration**:
   - Using Next.js 16.1.6 with the App Router (`src/app/`)
   - Modify `next.config.ts` or TypeScript configuration as needed.
   - Be cautious when changing the `app/` directory structure; understand Next.js routing and layout hierarchies.
   - Validate any new custom webpack or environment settings.

3. **Component Library Compliance**:
   - Ensure all new components use @gv-tech/ui-web before creating custom components
   - Refer to the ui-library-preference skill for component selection guidelines
   - Audit existing components periodically for compliance

4. **Hosting and Serverless**:
   - The site is deployed via **Cloudflare Pages** with auto‑deploys on commit to `develop` (and other branches as configured).
   - Keep an eye on any build environment variables or settings in the Cloudflare dashboard.
   - For serverless logic (route handlers), maintain files under `src/app/api/` following Next.js 16 App Router conventions.
