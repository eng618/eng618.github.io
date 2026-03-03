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

2. **Next.js Configuration**:
   - Modify `next.config.ts` or TypeScript configuration as needed.
   - Be cautious when changing the `app/` or `pages/` directories; understand Next.js routing and layout hierarchies.
   - Validate any new custom webpack or environment settings.

3. **Hosting and Serverless**:
   - The site is deployed via **Cloudflare Pages** with auto‑deploys on commit to `develop` (and other branches as configured).
   - Keep an eye on any build environment variables or settings in the Cloudflare dashboard.
   - For serverless logic, maintain files under `src/pages/api/` or dedicated functions directories as required.
