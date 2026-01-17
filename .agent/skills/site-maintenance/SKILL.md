---
name: site-maintenance
description: Instructions for common site maintenance and configuration tasks
---

# Site Maintenance Skill

This skill provides guidance on maintaining the Gatsby foundation of the site.

## Instructions

1. **Dependency Updates**:
   - Use `yarn` for managing dependencies.
   - Check `package.json` before adding new packages to avoid duplication.

2. **Gatsby Configuration**:
   - Modifications to `gatsby-config.js` or `gatsby-node.js` should be done carefully.
   - Ensure any new plugins are correctly configured and their options are validated.

3. **Netlify Functions**:
   - Manage logic in `netlify/functions/` for serverless features like feedback or forms.
